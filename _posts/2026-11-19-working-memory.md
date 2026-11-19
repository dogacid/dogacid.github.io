---
layout: post
title:	"Working Memory: Somewhere for the Agent to Write Things Down"
tag: coding
---

I work with AI coding agents most days now, and I kept running into the same problem. An agent works something out: the command that pulls the logs from every pod behind a deployment, the right flags for a pipeline query, why a connection hangs on my machine but not in the cloud. The answer then sits in a chat transcript. A week later I ask again, or a different agent works it out from scratch. The knowledge was produced, but it had nowhere to go.

So I built a working memory: a folder of short notes that I share with the agents. This post is about the idea, and how it keeps the work flowing.

## From a scratchpad to a stack

The name comes from Cal Newport. He describes keeping a plain text file, `WorkingMemory.txt`, open during a block of admin work. Everything that comes up goes into it, so he doesn't have to hold it in his head. At the end of the block he sorts it into his task lists and plans, and the file has done its job.

His file is about the moment: what you need to remember *right now*. I've come to think of working memory as something closer to a stack. Things get pushed on as they come up, newer things land on top, and older ones sink. Nothing is thrown away, though. Something buried deep can be brought back to the top with a search, months later, in the middle of something else.

I keep one stack per role: engineer on a team, the person who runs my own infrastructure, someone reading and researching, someone with personal things to track. They live in the same folder, separated by tags and subfolders, so a search can stay within one role or cut across all of them.

The new part is that the agents push onto these stacks too.

## An output point

A conversation with an agent is a poor place to keep anything. Transcripts scroll away, get summarised to save space, and live on whichever machine you happened to be using. A code repository keeps code and the decisions about code, not "how do I read the router logs again". And my own memory is the thing I was trying to take the load off.

What was missing was an *output point*: a known place where the agent writes down what I'll want later, written for me rather than for itself, and kept short. A note is a command that worked, a procedure, a decision, a list, a plan. It isn't a report. Every agent I use has the same few lines in its instructions:

- Look before working something out again: search the notes first.
- Save something worth keeping: a command that worked, a procedure, a decision.
- Write commands in fenced code blocks, one per line, each group under a `# what it does` comment.
- Never put a secret in a note.

The first rule matters as much as the second. The agent reads the memory as well as writing to it, so what one session learned, the next one can find, on any machine, without me pasting context back in.

## How it helps the flow of work

Instead of asking the same question twice, I search. Instead of hoping the agent remembers, I ask it to write the answer down, and it does it in a form I can use. The interruption of re-deriving something I already knew, or waiting while an agent re-derives it, mostly goes away.

It runs both ways. A key copies whatever's on the clipboard into a new note, or onto the end of an existing one, so capturing something costs me a second and doesn't break my concentration. I've had agents turn talks and papers into notes too: the research behind my [last post]({% post_url 2026-11-13-executable-specifications %}) is in there as a dozen short notes on Dave Farley's ideas, one idea per note.

It also works as a to-do list, because a list in a note is just a list. An agent can add a follow-up it couldn't finish. I can add the next thing I want done, and the next session picks it up. Neither of us owns the list; we both work from it. That's the part I find most interesting: it's a hand-off point between me and the agents, not just an archive.

## Copying is the point

What I usually want from a note is one line: a command to paste into a terminal. Opening the note, finding the line and selecting it was the slow part.

So the search picker splits a fenced code block into its separate commands, each labelled with the comment above it. Search for "rollout status", press Enter, and that one command is on the clipboard.

This is why the writing format in the agent's instructions matters. The agent isn't just recording what it did. It's laying out commands so they can be picked one at a time, months later, by someone who has forgotten the context. The output point only works if the output is shaped for the person reading it.

## Designed to be boring

The constraints were deliberate, so that nothing gets in the way of reading or writing a note:

- **Plain markdown, one note per file.** Any agent that can read a file can use it, and so can any editor. Nothing to log into, no format to outgrow.
- **A local folder, synced.** Reads and writes never wait on a network. Syncthing keeps the folder the same on every machine, and history is committed in the background, so nobody, me or an agent, has to think about it.
- **A small command-line tool that never prompts.** Agents can't answer an interactive prompt, so `wm add`, `wm find`, `wm show` and `wm append` take everything as arguments and report through exit codes.

For me there are three keys: one to capture, one to search and open a note, and one to open a web page over the notes.

## Questions I'll come back to

- Do the notes stay short, or do agents drift towards writing reports?
- How often does searching beat asking, and when do I still just ask?
- What should an agent never write down? Secrets are rule one. What about guesses it hasn't checked?
- Does the to-do list hold up when several agents add to the same list?

## References

- [zk](https://github.com/zk-org/zk), the plain-text notebook tool the notes are managed with.
- [Syncthing](https://syncthing.net/), continuous file synchronisation.
- Cal Newport, [Deep Habits: WorkingMemory.txt (The Most Important Productivity Tool You've Never Heard Of)](https://calnewport.com/deep-habits-workingmemory-txt-the-most-important-productivity-tool-youve-never-heard-of/), 2015.
- [Deep Questions with Cal Newport](https://www.thedeeplife.com/), the podcast where he keeps coming back to it.
