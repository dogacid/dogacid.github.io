---
layout: post
title:	"Working Memory: Somewhere for the Agent to Write Things Down"
tag: coding
---

I work with AI coding agents most days now, on several machines. I kept running into the same problem. An agent works something out: the command that pulls the logs from every pod behind a deployment, the right flags for a pipeline query, why a connection hangs on my machine but not in the cloud. The answer then sits in a chat transcript. A week later I ask again, or a different agent on a different machine works it out from scratch. The knowledge was produced, but it had nowhere to go.

So I built a working memory: a folder of short notes that I share with the agents. This post is about the idea more than the build. There's a second idea underneath it as well: the machines it runs on are less a home lab than a small local cloud.

## From a scratchpad to a stack

The name comes from Cal Newport. For years I've followed his writing and his podcast. He describes keeping a plain text file, `WorkingMemory.txt`, open during a block of admin work. Everything that comes up goes into it, so he doesn't have to hold it in his head. At the end of the block he sorts it into his task lists and plans, and the file has done its job. I'd been using the same idea for my own personal things.

His file is about the moment: what you need to remember *right now*, while you're doing this. I've come to think of working memory as something closer to a stack. Things get pushed on as they come up. Newer things land on top, and older ones sink further down. Nothing is thrown away, though. Something buried deep can be brought back to the top with a search when I need it again, months later, in the middle of something else.

And I don't have just one. I play several roles in my work: engineer on a team, the person who runs my own infrastructure, someone reading and researching, someone with personal things to keep track of. Each role has its own working memory, its own stack of things in flight. They live in the same folder, separated by tags and subfolders, so a search can stay within one role or cut across all of them.

The new part is that the agents push onto these stacks too.

## An output point

A conversation with an agent is a poor place to keep anything. Transcripts scroll away, get summarised to save space, and live on whichever machine you happened to be using. A code repository keeps code and the decisions about code, not "how do I read the router logs again". And my own memory is the thing I was trying to take the load off.

What was missing was an *output point*: a known place where the agent writes down what I'll want later, written for me rather than for itself, and kept short.

A note is a command that worked, a procedure, a decision, a list, a plan. It isn't a report. Every machine where an agent works has the same few lines in its instructions:

- Look before working something out again: search the notes first.
- Save something worth keeping: a command that worked, a procedure, a decision.
- Write commands in fenced code blocks, one per line, each group under a `# what it does` comment.
- Never put a secret in a note.

The first rule matters as much as the second. The agent reads the memory as well as writing to it, so what one session learned, the next one can find. That's continuity across sessions and machines, without me pasting context back in.

## Shared, not just stored

This changes how I work. Instead of asking the same question twice, I search. Instead of hoping the agent remembers, I ask it to write the answer down, and it does it in a form I can use.

It runs both ways. I capture things too: a key copies whatever's on the clipboard into a new note, or onto the end of an existing one. I've moved my old notes in, and I've had agents turn talks and papers into notes. The research behind my [last post]({% post_url 2026-11-13-executable-specifications %}) is in there as a dozen short notes on Dave Farley's ideas, one idea per note.

It also works as a to-do list, because a list in a note is just a list. An agent can add a follow-up it couldn't finish. I can add the next thing I want done, and the next agent session can pick it up. Neither of us owns the list; we both work from it. That's the part I find most interesting: it's an interface between me and the agents, not just an archive.

## Designed to be boring

The constraints were deliberate:

- **Plain markdown, one note per file.** Any agent that can read a file can use it, and so can any editor. Nothing to log into, no format to outgrow.
- **No network and no git in the read/write path.** The notes are a local folder. They work offline, on a plane, with every other service down.
- **Sync, not a server.** Syncthing keeps the folder the same on every machine, through one always-on hub.
- **History happens elsewhere.** Only the hub runs git. Every ten minutes it commits what changed and pushes it to my own git server. I get history without anyone, me or an agent, having to think about commits.
- **A small command-line tool that never prompts.** Agents can't answer an interactive prompt, so `wm add`, `wm find`, `wm show` and `wm append` take everything as arguments and report through exit codes.

For me there are three keys: one to capture, one to search and open a note in my editor, and one to open a web page over the notes.

## Copying is the point

What I usually want from a note is one line: a command to paste into a terminal. Opening the note in an editor, finding the line and selecting it was the slow part.

So both the search picker and the web page split a fenced code block into its separate commands. Each one is labelled with the comment above it and can be copied on its own. Search for "rollout status", press Enter, and that one command is on the clipboard.

This is why the writing format in the agent's instructions matters. The agent isn't just recording what it did. It's laying out commands so they can be picked one at a time, months later, by someone who has forgotten the context. The output point only works if the output is shaped for the person reading it.

## Many machines, one memory

I run agents on more than one machine: my desktop workstations, a small always-on Linux box, and a couple of development machines set up for particular projects. The notes sync to every one of them. One agent saves a note, and another agent on another machine can find it a few minutes later.

Where a machine can't have the folder, the hub serves the notes over the network. It has a read-only search page, a JSON API, and an MCP server, which is the protocol agents use to call tools. An agent anywhere on my network can search the notes without a copy of them. The same page works on my phone and iPad, so the notes come with me when I'm away from a desk.

## A local cloud, not a home lab

"Home lab" suggests a rack of hardware for tinkering. What I've ended up with is closer to a small private cloud: a handful of always-on machines, each good at a particular job. One host runs containers for my git server, a certificate authority, the notes hub and a research system. Others are development machines where agents do long-running work. Monitoring keeps an eye on all of it.

The reason is simple. A laptop goes to sleep when you close the lid, and everything on it stops: the agent halfway through a task, the sync, any service it was running. Always-on machines keep working, and I connect to them from whatever is in front of me: a workstation, a laptop, a phone.

The working memory is one service among several, but it's the one that ties them together. Whatever an agent works out, on whichever machine, ends up in one place that I can search. And it all stays on my own network, in my own git history, encrypted with certificates from my own CA.

## Questions I'll come back to

- Do the notes stay short, or do agents drift towards writing reports?
- How often does searching beat asking, and when do I still just ask?
- What should an agent never write down? Secrets are rule one. What about guesses it hasn't checked?
- Does the to-do list hold up when several agents add to the same list?

## References

- [zk](https://github.com/zk-org/zk), the plain-text notebook tool the notes are managed with.
- [Syncthing](https://syncthing.net/), continuous file synchronisation.
- [Model Context Protocol](https://modelcontextprotocol.io/), how agents call tools such as the notes search.
- Cal Newport, [Deep Habits: WorkingMemory.txt (The Most Important Productivity Tool You've Never Heard Of)](https://calnewport.com/deep-habits-workingmemory-txt-the-most-important-productivity-tool-youve-never-heard-of/), 2015.
- [Deep Questions with Cal Newport](https://www.thedeeplife.com/), the podcast where he keeps coming back to it.
