#!/usr/bin/env python3
"""American IPA for 재잘 dictionary headwords, from the CMU Pronouncing Dictionary.

Usage: python3 tools/ipa.py cmudict.dict words.json > ipa.json
  cmudict.dict: https://github.com/cmusphinx/cmudict (cmudict.dict)
  words.json:   JSON list of headwords
Prints {"word": "/ipa/"}; words missing from CMU are listed on stderr to be written by hand.
Stress: primary ˈ / secondary ˌ before the syllable onset (maximal legal onset). Monosyllables get no mark.
"""
import json, re, sys

V = {"AA":"ɑ","AE":"æ","AO":"ɔ","AW":"aʊ","AY":"aɪ","EH":"e","EY":"eɪ","IH":"ɪ","IY":"i","OW":"oʊ","OY":"ɔɪ","UH":"ʊ","UW":"u"}
C = {"B":"b","CH":"tʃ","D":"d","DH":"ð","F":"f","G":"ɡ","HH":"h","JH":"dʒ","K":"k","L":"l","M":"m","N":"n","NG":"ŋ","P":"p","R":"r",
     "S":"s","SH":"ʃ","T":"t","TH":"θ","V":"v","W":"w","Y":"j","Z":"z","ZH":"ʒ"}
ONSETS = set("""P B T D K G F V TH DH S Z SH ZH CH JH M N L R W Y HH
P_L B_L K_L G_L F_L S_L P_R B_R T_R D_R K_R G_R F_R TH_R SH_R T_W D_W K_W G_W S_W TH_W
S_P S_T S_K S_M S_N S_P_R S_T_R S_K_R S_P_L S_K_W S_K_Y P_Y B_Y K_Y F_Y V_Y M_Y HH_Y G_Y S_P_Y""".split())
# part-of-speech or common-usage choices where CMU lists another reading first
OVERRIDES = {"address":"/ˈædres/","elaborate":"/ɪˈlæbəˌreɪt/","perfect":"/ˈpɜrfɪkt/","read":"/rid/","refund":"/ˈrifʌnd/","upgrade":"/ˈʌpɡreɪd/",
  "lead":"/lid/","transfer":"/trænsˈfɜr/","close":"/kloʊz/","discount":"/ˈdɪskaʊnt/","update":"/ʌpˈdeɪt/","detour":"/ˈditʊr/","essay":"/ˈeseɪ/",
  "schedule":"/ˈskedʒul/","tomorrow":"/təˈmɑroʊ/","friday":"/ˈfraɪdeɪ/","minute":"/ˈmɪnɪt/","declutter":"/diˈklʌtər/","doomscrolling":"/ˈdumˌskroʊlɪŋ/",
  "live":"/lɪv/","excuse":"/ɪkˈskjuz/","use":"/juz/","tv":"/ˌtiˈvi/","pdf":"/ˌpidiˈef/","dm":"/ˌdiˈem/","sim":"/sɪm/","decaf":"/ˈdiˌkæf/",
  "takeout":"/ˈteɪˌkaʊt/","usually":"/ˈjuʒuəli/","relationship":"/rɪˈleɪʃənˌʃɪp/","sugarcoat":"/ˈʃʊɡərˌkoʊt/","latte":"/ˈlɑteɪ/","clickbait":"/ˈklɪkˌbeɪt/","livestream":"/ˈlaɪvˌstrim/","selfie":"/ˈselfi/","overshare":"/ˌoʊvərˈʃer/",
  "homebody":"/ˈhoʊmˌbɑdi/","fixer":"/ˈfɪksər/","nighter":"/ˈnaɪtər/","edged":"/edʒd/","dutch":"/dʌtʃ/","seoul":"/soʊl/","korea":"/kəˈriə/",
  "lunchtime":"/ˈlʌntʃˌtaɪm/","layover":"/ˈleɪˌoʊvər/","checkout":"/ˈtʃekˌaʊt/","sidetrack":"/ˈsaɪdˌtræk/","overcook":"/ˌoʊvərˈkʊk/",
  "overrate":"/ˌoʊvərˈreɪt/","overcharge":"/ˌoʊvərˈtʃɑrdʒ/","washable":"/ˈwɑʃəbəl/","shoestring":"/ˈʃuˌstrɪŋ/","toothache":"/ˈtuθˌeɪk/",
  "influencer":"/ˈɪnfluənsər/","podcast":"/ˈpɑdˌkæst/","laptop":"/ˈlæpˌtɑp/","website":"/ˈwebˌsaɪt/","download":"/ˈdaʊnˌloʊd/"}

def vowel(p): return re.sub(r"\d", "", p) in V or re.sub(r"\d", "", p) in ("AH", "ER")
def sym(p):
    b, s = re.sub(r"\d", "", p), (p[-1] if p[-1].isdigit() else "")
    if b == "AH": return "ʌ" if s in "12" else "ə"
    if b == "ER": return "ɜr" if s in "12" else "ər"
    return V.get(b) or C[b]
def convert(phs):
    q = []
    for i, p in enumerate(phs):  # "ər" before a vowel: the r starts the next syllable (around → əˈraʊnd)
        if re.sub(r"\d", "", p) == "ER" and i + 1 < len(phs) and vowel(phs[i+1]): q += ["AH" + p[-1], "R"]
        else: q.append(p)
    phs = q; vi = [i for i, p in enumerate(phs) if vowel(p)]; out = [sym(p) for p in phs]; marks = {}
    if len(vi) > 1:
        for k, i in enumerate(vi):
            s = phs[i][-1]
            if s not in "12": continue
            start = 0 if k == 0 else vi[k-1] + 1
            cl = [re.sub(r"\d", "", x) for x in phs[start:i]]; j = len(cl)
            if k > 0:
                for t in range(len(cl) + 1):
                    if t == len(cl) or "_".join(cl[t:]) in ONSETS: j = t; break
            marks[start + (0 if k == 0 else j)] = "ˈ" if s == "1" else "ˌ"
    return "/" + "".join(marks.get(i, "") + o for i, o in enumerate(out)) + "/"

def main(dict_path, words_path):
    d = {}
    for line in open(dict_path, encoding="utf-8"):
        line = line.split("#")[0].strip()
        if not line: continue
        w, *ph = line.split()
        if "(" not in w: d[w] = ph
    res, miss = {}, []
    for w in json.load(open(words_path)):
        if w in OVERRIDES: res[w] = OVERRIDES[w]
        elif w in d: res[w] = convert(d[w])
        else: miss.append(w)
    if miss: print("missing from CMU: " + " ".join(miss), file=sys.stderr)
    json.dump(res, sys.stdout, ensure_ascii=False)

if __name__ == "__main__": main(sys.argv[1], sys.argv[2])
