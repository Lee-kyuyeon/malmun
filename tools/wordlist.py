#!/usr/bin/env python3
"""Frequency-ranked English headwords for 재잘's vocabulary course.

Source: wordfreq (Robyn Speer, data CC BY-SA 4.0) — a blend of subtitles, books, web, Wikipedia, news and social media.
Steps: take the top N surface forms → lemmatize with spaCy (en_core_web_sm) → drop function words, numbers,
contractions, proper nouns and a short blocklist → keep the first `--count` content lemmas in rank order.

Usage: python3 tools/wordlist.py --count 2500 > wordlist.json   (needs: pip install wordfreq spacy en_core_web_sm)
Output: [{"w": lemma, "rank": 1-based rank of its most frequent form}, ...]
"""
import argparse, json, re, sys, os
import wordfreq, spacy

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
# the app's function-word list (js/words.js FUNC_WORDS) plus pronoun/determiner leftovers
src = open(os.path.join(ROOT, "js", "words.js"), encoding="utf-8").read()
FUNC = set(re.search(r'const FUNC_WORDS = new Set\("([^"]+)"', src).group(1).split())
FUNC |= set("ok okay yeah yes no nah hey hi hello oh ah um uh lol wow mr mrs ms dr st etc vs per via am pm ii iii yet whether though although unless until while since upon within without against among during toward towards across along around behind beside beyond despite except inside outside onto per than whose whom itself himself herself themselves ourselves yourselves anybody anyone anything anywhere everybody everyone everything everywhere nobody nothing nowhere somebody someone something somewhere".split())
BLOCK = set("fuck fucking shit damn bitch ass sex porn gay nigga dick pussy crap hell god jesus christ lord".split())

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--count", type=int, default=2500); ap.add_argument("--scan", type=int, default=12000)
    a = ap.parse_args()
    nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
    out, seen = [], set()
    for rank, w in enumerate(wordfreq.top_n_list("en", a.scan), 1):
        if not re.fullmatch(r"[a-z]{2,}", w) or w in FUNC or w in BLOCK: continue
        tok = nlp(w)[0]
        if tok.pos_ in ("PROPN", "NUM", "X", "SYM", "PUNCT", "DET", "PRON", "CCONJ", "SCONJ", "ADP", "AUX", "PART", "INTJ"): continue
        lemma = tok.lemma_.lower()
        if not re.fullmatch(r"[a-z]{2,}", lemma) or lemma in FUNC or lemma in BLOCK or lemma in seen: continue
        seen.add(lemma); out.append({"w": lemma, "rank": rank})
        if len(out) >= a.count: break
    json.dump(out, sys.stdout)

if __name__ == "__main__": main()
