#!/usr/bin/env python3
"""Content audit for 재잘 (run by hand before a content release; tests/check-content.js covers what Node can check).

Checks every dictionary example (first examples, EX2, goal-course words):
  - forms: every listed inflected form is a real word (wordfreq Zipf ≥ 1.5)
  - spelling: rare/unknown tokens in English sentences
  - part of speech: spaCy tags the headword in its example; flags when the tag never matches the declared Korean POS
  - translation: the Korean gloss's core word is missing from the Korean sentence (review list, many are fine)
Prints a JSON report. Usage: python3 tools/audit_content.py > audit.json  (needs wordfreq, spacy, en_core_web_sm)
"""
import json, os, re, subprocess, sys
import wordfreq, spacy

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
POS_OK = {"명사": {"NOUN", "PROPN"}, "동사": {"VERB", "AUX"}, "형용사": {"ADJ"}, "부사": {"ADV"}, "전치사": {"ADP"}, "대명사": {"PRON"}}

def load():
    js = """const fs=require('fs'),vm=require('vm');const c={};vm.createContext(c);
vm.runInContext(['content.js','content-goals.js','content-examples.js'].map(f=>fs.readFileSync(f,'utf8')).join(';\\n')+';this.W=WORDS;this.X=EX2',c);
process.stdout.write(JSON.stringify({W:c.W,X:c.X}));"""
    return json.loads(subprocess.run(["node", "-e", js], cwd=ROOT, capture_output=True, text=True, check=True).stdout)

def core(ko):
    first = re.split(r"[,·/;(]", ko)[0].strip()
    return re.sub(r"(하다|되다|시키다|스러운|적인|한|의|게)$", "", first)

def main():
    d = load(); W, X = d["W"], d["X"]; nlp = spacy.load("en_core_web_sm")
    rows = []
    for w, e in W.items():
        if e.get("e"): rows.append((w, e["e"]["en"], e["e"]["ko"], "e"))
        if w in X: rows.append((w, X[w]["en"], X[w]["ko"], "ex2"))
    bad_forms = [(w, f) for w, e in W.items() for f in e["forms"] if "'" not in f and wordfreq.zipf_frequency(f, "en") < 1.5]
    rare = sorted({t.lower() for _, en, _, _ in rows for t in re.findall(r"[A-Za-z][a-z']+", en) if not t[0].isupper() and wordfreq.zipf_frequency(t.lower().replace("'s", ""), "en") < 1.5})
    pos_flags, tr_flags = [], []
    docs = nlp.pipe([en for _, en, _, _ in rows], batch_size=256)
    for (w, en, ko, kind), doc in zip(rows, docs):
        e = W[w]; forms = {w, *e["forms"]}
        toks = [t for t in doc if t.text.lower() in forms or t.lemma_.lower() == w]
        want = set().union(*[POS_OK.get(p.strip(), set()) for p in e["pos"].split("·")]) or None
        if toks and want and not any(t.pos_ in want for t in toks): pos_flags.append({"w": w, "pos": e["pos"], "tag": toks[0].pos_, "en": en, "kind": kind})
        c = core(e["ko"])
        if len(c) >= 2 and c[:2] not in ko: tr_flags.append({"w": w, "ko": e["ko"], "sent": ko, "kind": kind})
    json.dump({"sentences": len(rows), "bad_forms": bad_forms, "rare_tokens": rare, "pos_mismatch": pos_flags, "gloss_not_in_translation": len(tr_flags), "gloss_samples": tr_flags}, sys.stdout, ensure_ascii=False, indent=1)

if __name__ == "__main__": main()
