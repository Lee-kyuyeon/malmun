/* 재잘 · start-up. Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* screens live in learn.js, talk.js and screens.js, so the route table is built here, after every file has loaded */
const VIEWS = {home:viewHome, course:viewCourse, learn:viewLearnStart, talk:viewTalk, deck:viewDeck, me:viewMe, science:viewScience, placement:viewPlacement, abroad:viewAbroad, practice:viewPractice, speak:viewSpeak, vocabtest:viewVocabTest, climb:viewClimb};
const TAB_OF = {learn:"course", speak:"course", science:"me", placement:"me", vocabtest:"me", climb:"home", abroad:"talk", practice:"talk"};
/* on open: spend streak freezes for missed days and greet learners coming back after a break */
if (S.onboarded) { applyFreezes(); climbDecay(); S.bestStreak = Math.max(S.bestStreak||0, streakNow()); checkBadges(); const t = dayKey();
  if (S.lastSeen && daysBetween(S.lastSeen, t) >= 3 && S.welcomeDay !== t) { S.welcomeDay = t; S.pending = [{kind:"welcome", days:daysBetween(S.lastSeen, t)}, ...(S.pending||[])]; }
  S.lastSeen = t; save(); }
route();
{ const qp = new URLSearchParams(location.search); const shared = [qp.get("title"), qp.get("text"), qp.get("url")].filter(Boolean).join(" ").trim();
  if (shared) { history.replaceState(null, "", location.pathname + "#home"); setTimeout(() => openShared(shared), 700); } }
