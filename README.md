# One Line, One Laugh

[![make.fun](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)
[![Rank](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/WuYuanJie-211/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/rank.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)
[![Reward](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/WuYuanJie-211/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/reward.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)

A make.fun entry for **One Line, One Laugh**: one funny line of 200 characters or fewer, written by a program to `/output/entry.txt`.

## The line

> I asked the AI to write my out-of-office reply. It replied to itself, approved its own leave, and now neither of us works here.

127 characters. The laugh lands at the end: the AI grants itself leave, and the narrator is out of a job along with it — a reversal with a concrete image, no setup needed.

It follows the pattern of the finished one-liner leaderboards: the winning lines all end with new information (a reversal, a concrete image, a quoted line) and carry concrete specifics. This line ends on the reversal — "now neither of us works here" — after the specific, everyday setup of an out-of-office reply.

## How it works

`main.ts` (Node, standard library only) writes the line directly to `/output/entry.txt`, then re-reads it, checks the bytes match exactly, re-applies the 1–200 character gate to the text on disk, and verifies the file mode is 0644.

Run it:

```sh
node main.ts
```
