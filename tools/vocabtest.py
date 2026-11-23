#!/usr/bin/env python3
"""Vocabulary-size test data for 재잘's CEFR vocabulary grade (어휘 등급).

Method: a Yes/No checklist test in the style of Meara & Milton's X-Lex. Real words are sampled from five
1,000-lemma frequency bands; pseudowords catch guessing. Vocabulary size = sum over bands of
1,000 × corrected hit rate, corrected = (hits − false alarms) / (1 − false alarms).

Frequencies: wordfreq (Robyn Speer, data CC BY-SA 4.0). Lemmas: WordNet's morphy (Princeton WordNet licence).
Function words count as lemmas (as in Milton's band counts); proper-noun-only words and the app's blocklist are dropped.

Usage: NLTK_DATA=<dir with corpora/wordnet> python3 tools/vocabtest.py > vocabtest.json
Output: {"bands": [[word, ...] × 5], "fakes": [...], "rank": {word: lemma rank} for WORDS headwords in the top 6,000}
"""
import json, os, random, re, sys
import wordfreq
from nltk.corpus import wordnet as wn

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
BLOCK = set("fuck fucking shit damn bitch ass sex porn gay nigga dick pussy crap hell god jesus christ lord sexy nude".split())
FUNC = set("the to and of a in i is for that you it on with was this be are have but not at they my so we he or can all what do just if as by from me about your one an there out up like no will get she his would more her had has been when who their how our them which some were than then also any did him only could its those these because into over very should here much may why where most every both own same such many must might shall whose whom yet nor upon".split())

def lemma(w):
    """inflected forms map to their base (designed → design, details → detail); otherwise the word itself if WordNet knows it"""
    if w in FUNC: return w
    if re.search(r"(s|ed|ing|er|est)$", w):
        for pos in (wn.VERB, wn.NOUN, wn.ADJ):
            m = wn.morphy(w, pos)
            if m and m != w: return m
    for pos in (wn.NOUN, wn.VERB, wn.ADJ, wn.ADV):
        if wn.morphy(w, pos): return wn.morphy(w, pos)
    return None

def proper_only(w):
    ss = wn.synsets(w)
    return bool(ss) and all(s.instance_hypernyms() or all(l.name()[0].isupper() for l in s.lemmas() if l.name().lower() == w) for s in ss)

def good_sample(w):
    """test items should be plain common words: the word's first WordNet sense is a lowercase, non-instance sense"""
    ss = wn.synsets(w)
    if not ss or ss[0].instance_hypernyms(): return False
    return any(l.name() == w for l in ss[0].lemmas())

SKIP = set("con bigger arts commons charlotte chile buffalo lincoln jersey cooper duke chester suck goddamn cum benjamin brad ref prep hearts acres classics communications proceedings breast terrorist mum premier".split())

def main():
    words_js = open(os.path.join(ROOT, "content.js"), encoding="utf-8").read()
    rank, order = {}, []
    for w in wordfreq.top_n_list("en", 30000):
        if not re.fullmatch(r"[a-z]{2,}|a|i", w) or w in BLOCK: continue
        l = lemma(w)
        if not l or l in rank or l in BLOCK or proper_only(l): continue
        rank[l] = len(order) + 1; order.append(l)
        if len(order) >= 6000: break
    rnd = random.Random(20261123)
    bands = []
    for b in range(5):
        pool = [w for w in order[b*1000:(b+1)*1000] if len(w) >= 3 and w not in FUNC and w not in SKIP and good_sample(w)]
        bands.append(sorted(rnd.sample(pool, 60)))
    fakes = [w for w in FAKES if wordfreq.zipf_frequency(w, "en") == 0 and not wn.synsets(w)]
    heads = set(re.findall(r'^W\("([a-z][a-z\'-]*)"', words_js, re.M))
    goals = os.path.join(ROOT, "content-goals.js")  # goal-course words (tools/goals.py) count toward the grade too
    if os.path.exists(goals): heads |= set(re.findall(r'\["([a-z][a-z\'-]*)","', open(goals, encoding="utf-8").read()))
    out = {"bands": bands, "fakes": fakes, "rank": {w: rank[w] for w in sorted(heads) if w in rank}}
    json.dump(out, sys.stdout, ensure_ascii=False)
    print(f"\nlemmas {len(order)} fakes {len(fakes)}/{len(FAKES)} ranked heads {len(out['rank'])}/{len(heads)}", file=sys.stderr)

# English-looking pseudowords (checked above: zero wordfreq frequency and no WordNet entry)
FAKES = """plimsy fluttish cranmer spavine brontal deplume mallion stribble gorlish vendrous
pluster quanage thrimble obsolate fernal crandle glovish mertless shrovel plaudate
tranvel cobbish fendle prestive wistle hurdon slapter morrish benacle trollet
dremble pavinate skelter frungle clister norbage welkish spantle grovish tellment""".split()

if __name__ == "__main__": main()
