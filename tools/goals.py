#!/usr/bin/env python3
"""Goal vocabulary courses for 재잘 (목표별 단어장) → content-goals.js.

Word lists (only the lists of words are used, with their order):
  - 교육부 고시 제2022-33호 [별책 14] 영어과 교육과정 기본 어휘 3,000 (public notice; levels 초등 / 중고 공통 / 선택)
  - TSL 1.2 — TOEIC Service List, Browne & Culligan (2016), CC BY-SA 4.0
  - NAWL 1.2 — New Academic Word List, Browne, Culligan & Phillips (2013), CC BY-SA 4.0
Meanings, parts of speech and example sentences for words not yet in the dictionary were written for 재잘
(tools/data/goal-words/*.tsv: word, pos, Korean meaning, English example, Korean example).
Bands from wordfreq (CC BY-SA 4.0), IPA from the CMU Pronouncing Dictionary via tools/ipa.py.

Usage: python3 tools/goals.py lists.json cmudict.dict > content-goals.js
  lists.json: {"moe_e": [...], "moe_m": [...], "moe_s": [...], "tsl": [...], "nawl": [...]} in source order
"""
import glob, json, os, re, sys
import wordfreq
sys.path.insert(0, os.path.dirname(__file__))
import ipa as IPA_TOOL

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def heads_and_forms():
    src = open(os.path.join(ROOT, "content.js"), encoding="utf-8").read()
    heads, owned = set(), {}
    for m in re.finditer(r'^W\("([a-z][a-z\'-]*)",[^\n]*', src, re.M):
        w = m.group(1); heads.add(w); owned[w] = w
        f = re.search(r'f:"([^"]*)"', m.group(0))
        for x in (f.group(1).split() if f else []): owned.setdefault(x, w)
    return heads, owned

IRREGULAR = {"dive": "dove", "cling": "clung", "creep": "crept", "flee": "fled", "overcome": "overcame", "undertake": "undertook",
    "forbid": "forbade forbidden", "forgive": "forgave forgiven", "lend": "lent", "lay": "laid", "lean": "leant", "leap": "leapt", "bend": "bent",
    "bet": "bet", "burst": "burst", "dig": "dug", "seek": "sought", "shine": "shone", "sweep": "swept", "swell": "swollen", "spit": "spat",
    "undergo": "underwent undergone", "withdraw": "withdrew withdrawn", "weave": "wove woven", "overlook": "overlooked", "mislead": "misled",
    "overpay": "overpaid", "arise": "arose arisen", "bind": "bound", "strive": "strove", "breed": "bred", "dwell": "dwelt", "seize": "seized"}

REGULAR_OFF = {"forgive", "mislead", "proofread", "overcome", "undertake", "undergo", "withdraw", "weave", "arise", "dive", "cling",
    "creep", "flee", "lend", "dig", "seek", "sweep", "bind", "breed", "dwell", "spit", "shine", "bet", "burst", "overpay", "lay"}
UNCOUNTABLE = re.compile(r"(ness|ity|ism|ics|ship|ware|dom|hood|ment)$|^(scissors|jeans|goods|species|stairs|news|leisure|postage|tuition|"
    r"meantime|renown|seaside|inexperience|furniture|machinery|equipment|jewelry|baggage|luggage|homework|wellness|nutrition|hygiene|"
    r"fatigue|courtesy|acclaim|amateur|paperwork|stationery|mileage|clothing|footwear|attire|cotton|wool|flour|rubber|gasoline|calcium|"
    r"aluminum|mercury|hydrogen|nitrogen|oxygen|sodium|potassium|algebra|calculus|anthropology|archaeology|genetics|linguistics|ethics|"
    r"popcorn|bacon|pork|beef|tuna|vanilla|spaghetti|badminton|volleyball|chess|jazz|sunshine|gravity|freedom|wisdom|honesty|poverty)$")

def inflect(w, pos):
    """candidate forms by spelling rules; main() keeps only the ones that are real words (wordfreq Zipf ≥ 1.5)"""
    out = set(IRREGULAR.get(w, "").split())
    v, n = "동사" in pos, "명사" in pos
    if n and w.endswith("man"): out.add(w[:-3] + "men")
    elif (v or n) and not (n and not v and UNCOUNTABLE.search(w)):
        if re.search(r"(s|x|z|ch|sh)$", w): out.add(w + "es")
        elif re.search(r"[^aeiou]y$", w): out.add(w[:-1] + "ies")
        else: out.add(w + "s")
    if v and w not in REGULAR_OFF:
        if w.endswith("ee"): out |= {w + "d", w + "ing"}
        elif w.endswith("e"): out |= {w + "d", w[:-1] + "ing"}
        elif re.search(r"[^aeiou]y$", w): out |= {w[:-1] + "ied", w + "ing"}
        elif w.endswith("c"): out |= {w + "ked", w + "king"}
        else:
            out |= {w + "ed", w + "ing"}
            if re.search(r"[^aeiou][aeiou][bdgklmnprt]$", w): out |= {w + w[-1] + "ed", w + w[-1] + "ing"}  # both spellings; the real one survives
    return out

def main(lists_path, cmu_path):
    lists = json.load(open(lists_path)); heads, owned = heads_and_forms()
    cmu = {}
    for line in open(cmu_path, encoding="utf-8"):
        line = line.split("#")[0].strip()
        if line:
            w, *ph = line.split()
            if "(" not in w: cmu[w] = ph
    rows = {}
    for f in sorted(glob.glob(os.path.join(ROOT, "tools", "data", "goal-words", "*.tsv"))):
        for line in open(f, encoding="utf-8"):
            parts = line.rstrip("\n").split("\t")
            if len(parts) == 5 and parts[0] not in rows and parts[0] not in heads: rows[parts[0]] = parts
    new, missing_ipa = [], []
    for w, (_, pos, ko, en, eko) in rows.items():
        z = wordfreq.zipf_frequency(w, "en"); band = 1 if z >= 5 else 2 if z >= 4 else 3
        forms = inflect(w, pos)
        for t in re.findall(r"[a-z][a-z'-]*", en.lower()):
            t = re.sub(r"'s$", "", t)
            if t != w and t.startswith(w[:max(3, len(w) - 2)]) and 0 < len(t) - len(w) <= 4: forms.add(t)
        forms = sorted(x for x in forms if x != w and x not in owned and x not in rows and (x in IRREGULAR.get(w, "").split() or wordfreq.zipf_frequency(x, "en") >= 1.5))
        ipa = IPA_TOOL.OVERRIDES.get(w) or (IPA_TOOL.convert(cmu[w]) if w in cmu else "")
        if not ipa: missing_ipa.append(w)
        new.append([w, pos, ko, band, " ".join(forms), en, eko, ipa])
    known = heads | set(rows)
    def course(words): seen = []; [seen.append(x) for x in words if x in known and x not in seen]; return seen
    freq = lambda ws: sorted(ws, key=lambda x: -wordfreq.zipf_frequency(x, "en"))
    courses = [
        {"id": "elem", "t": "초등 필수", "d": "교육과정 기본 어휘 중 초등 800", "src": "교육부 기본 어휘", "words": course(freq(lists["moe_e"]))},
        {"id": "school", "t": "중고등 필수", "d": "교육과정 기본 어휘 중 중고 공통 1,200", "src": "교육부 기본 어휘", "words": course(freq(lists["moe_m"]))},
        {"id": "csat", "t": "수능 대비", "d": "교육과정 기본 어휘 3,000 전체 (초등 → 중고 공통 → 선택)", "src": "교육부 기본 어휘", "words": course(freq(lists["moe_e"]) + freq(lists["moe_m"]) + freq(lists["moe_s"]))},
        {"id": "toeic", "t": "토익", "d": "토익 시험에 자주 나오는 단어 (TSL)", "src": "TOEIC Service List 1.2", "words": course(lists["tsl"])},
        {"id": "academic", "t": "토플·IELTS", "d": "대학 강의·논문에 자주 나오는 단어 (NAWL)", "src": "New Academic Word List 1.2", "words": course(lists["nawl"])},
    ]
    j = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":"))
    print("""/* 재잘 · goal vocabulary courses (목표별 단어장), generated by tools/goals.py — do not edit by hand.
   Lists: 교육부 고시 제2022-33호 영어과 교육과정 기본 어휘 (public notice), TOEIC Service List 1.2 and New Academic Word List 1.2
   (Browne, Culligan & Phillips, CC BY-SA 4.0). Meanings and example sentences written for 재잘. Classic script: runs after content.js. */""")
    print("const GOAL_WORDS = " + j(new) + ";")
    print('GOAL_WORDS.forEach(([w, pos, ko, band, f, en, eko, ipa]) => { W(w, pos, ko, band, {f, e:{en, ko:eko}}); if (ipa) WORDS[w].ipa = ipa; WORDS[w].goal = true; });')
    print("const GOAL_COURSES = " + j(courses) + ";")
    print(f"new {len(new)} | courses " + ", ".join(f"{c['id']} {len(c['words'])}" for c in courses) + f" | no ipa {len(missing_ipa)}: {' '.join(missing_ipa[:40])}", file=sys.stderr)

if __name__ == "__main__": main(*sys.argv[1:3])
