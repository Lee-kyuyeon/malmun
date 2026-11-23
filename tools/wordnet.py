#!/usr/bin/env python3
"""Synonyms and antonyms for 재잘's dictionary words, from Princeton WordNet 3.0 (WordNet licence: free to use with attribution).

For each WORDS headword: synonyms from the first (most frequent) sense of its part of speech, antonyms from the first two (single words that are
in the app's dictionary or very common, wordfreq Zipf ≥ 4.2, so learners know them), antonyms from WordNet's antonym links (with derivational fallbacks).
Used for the synonym/antonym panel on word cards and for the "bonus hint" (a synonym typed in a blank).

Usage: NLTK_DATA=<dir with corpora/wordnet> python3 tools/wordnet.py > syn.json
Output: {word: {"s": [...], "a": [...]}} for words with at least one synonym or antonym
"""
import json, os, re, sys
import wordfreq
from nltk.corpus import wordnet as wn

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
POS = {"명사": [wn.NOUN], "동사": [wn.VERB], "형용사": [wn.ADJ, wn.ADJ_SAT], "부사": [wn.ADV]}
BLOCK = set("fuck shit damn bitch ass sex dick crap hell piss bastard".split())

def common(w): return re.fullmatch(r"[a-z]{2,}", w) and w not in BLOCK and wordfreq.zipf_frequency(w, "en") >= 3.2

REVIEW = {}
for line in open(os.path.join(ROOT, "tools", "data", "syn-review.txt"), encoding="utf-8"):
    if line.strip() and not line.startswith("#"):
        w, rs, ra = line.rstrip("\n").split("|"); REVIEW[w] = (rs, ra)

def main():
    src = open(os.path.join(ROOT, "content.js"), encoding="utf-8").read()
    heads = set(re.findall(r'^W\("([a-z][a-z\'-]*)"', src, re.M))
    nice = lambda n: common(n) and (n in heads or wordfreq.zipf_frequency(n, "en") >= 4.2)
    out = {}
    for m in re.finditer(r'^W\("([a-z][a-z\'-]*)","([^"]+)"', src, re.M):
        w, pos_ko = m.group(1), m.group(2)
        poss = POS.get(pos_ko.split("·")[0].split("/")[0].strip())
        if not poss: continue
        senses = [s for s in wn.synsets(w) if s.pos() in poss][:2]
        syn, ant = [], []
        for k, s in enumerate(senses):
            for l in s.lemmas():
                n = l.name().lower()
                if k == 0 and n != w and n not in syn and nice(n) and wn.morphy(n, s.pos() if s.pos() != "s" else "a") != w: syn.append(n)
                for a in l.antonyms():
                    an = a.name().lower()
                    if an not in ant and common(an): ant.append(an)
        if not ant:  # adjectives in satellite synsets reach antonyms through their head ("similar to")
            for s in senses:
                for sim in s.similar_tos():
                    for l in sim.lemmas():
                        for a in l.antonyms():
                            an = a.name().lower()
                            if an not in ant and common(an): ant.append(an)
        syn, ant = syn[:5], ant[:3]
        if w in REVIEW:  # human review: "=" keeps WordNet's list, anything else replaces it
            rs, ra = REVIEW[w]
            syn = syn if rs == "=" else [x for x in rs.split(",") if x]
            ant = ant if ra == "=" else [x for x in ra.split(",") if x]
        if syn or ant: out[w] = {k: v for k, v in (("s", syn), ("a", ant)) if v}
    json.dump(out, sys.stdout, ensure_ascii=False, separators=(",", ":"))
    print(f"\n{len(out)} words with synonyms/antonyms", file=sys.stderr)

if __name__ == "__main__": main()
