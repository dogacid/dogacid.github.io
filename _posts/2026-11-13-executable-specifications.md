---
layout: post
title:	"Executable Specifications, and Who Gets to Change Them"
tag: coding
---

# Executable Specifications, and Who Gets to Change Them

I've been building practara, a practice-management and bookkeeping app, with an AI coding agent doing most of the typing. That works well. Over the past year, though, my specifications have piled up as markdown: stories, analysis files, prompt files, acceptance criteria written as bullet points. Markdown is easy to write and easy to drift from. A bullet point says nothing when the code stops doing what it describes.

So I'm changing approach. From now on, a specification has to be something that runs. This post is a snapshot of my thinking at the start, so I can come back to it and report what actually happened.

## The idea: Acceptance Test Driven Development

The approach comes from Dave Farley. What set me on this path was [one of his videos](https://www.youtube.com/watch?v=EkH_uoybj8k), and this passage in particular:

> When a machine writes the code, the human's job is to say precisely what the code should do in a form that can be checked automatically. Not a prompt, not a markdown document, a specification that runs and verifies that the system does what you want it to do. If you don't know what you want it to do yet, you aren't really a programmer. You're just along for the ride.

"Not a markdown document" was aimed squarely at how I'd been working. His short [ATDD how-to guide](https://continuous-delivery.co.uk/downloads/ATDD%20Guide%2026-03-21.pdf) sums it up. An acceptance test is a "business facing" test that also "supports programming". You write it before any code, and it acts as an *executable specification*: the work is done when the test passes. Developers then use ordinary, finer-grained TDD underneath to get there.

The guide lists the properties of a good acceptance test. It:

- is written from the perspective of an external user of the system,
- runs in life-like scenarios, in a production-like environment,
- talks to the system only through its public interfaces, with no back doors,
- says *what* the system does, never *how* it does it.

Two of its tips stuck with me. First, imagine the least technical person who understands the problem domain reading your test, and make sure it makes sense to them. Second, imagine throwing the system away and replacing it with something completely different. The tests should still make sense. So no "fill in this field" or "click this button": say "pay by credit card" instead.

## Four layers

The structural idea is a four-layer separation of concerns:

| Layer | Job |
|---|---|
| **Test cases** | The specifications, written purely in the language of the problem domain. |
| **Domain-specific language (DSL)** | A shared vocabulary the test cases are written in. It fills in detail the test doesn't care about, using optional parameters for nearly everything. |
| **Protocol drivers** | Translators from the DSL into the system's own language: a browser, an API, a CLI. One per channel. All knowledge of *how* lives here. |
| **System under test** | Deployed the same way as production, so it can't tell it's being tested. |

If you know the [Page Object](https://martinfowler.com/bliki/PageObject.html) pattern, protocol drivers will look familiar, but they're broader. The DSL sits above them, so a scenario written against the web UI can later run against an API driver without changing a word.

Each test also starts from a running system that holds no data of its own, and shares no test data with any other test. My implementation does this by having each test onboard its own practice and giving every name a unique per-test suffix. Tests can then share one running instance and run in any order.

## Why this matters more with an AI agent

The guide makes a point that I think is underrated: well-written acceptance tests are a precise language for prompting an AI, and a way to verify what it produces. Here's the arrangement I'm aiming for:

- **I own the test cases.** The agent can draft one for me to review, but it can't change an accepted one without my agreement.
- **The agent has full autonomy over the code**, including the protocol drivers and how the system is started.
- **The tests run outside the coding phase**, in the pipeline, as a gate the agent can't move.

There's a catch I didn't see at first. Farley says developers own the DSL and the drivers. Here the "developer" is the agent. If it can change the DSL, it can weaken a check while my test case reads exactly the same. The same goes for test wiring: a pytest hook or a config flag can quietly skip a test without touching it.

The ownership lines therefore have to be drawn more carefully than "specs are mine, code is yours":

- **Test cases**: mine, and locked against the agent's writes.
- **DSL and test wiring**: the agent writes them, I review every change. Every assertion lives in the DSL, so this is where the meaning is.
- **Drivers and system setup**: the agent's.
- **The pipeline** checks that a new test fails on `main` before it passes on the branch, which catches a hollowed-out check. It also fails the run if any test was skipped.

Failing first isn't ceremony. A test that fails before any code is written tells the programmer what the goal is: make this pass. That was true when the programmer was a person, and it's just as true now that it's an AI agent. A test that has never failed hasn't told anyone anything. We all learn by failing first.

## Choosing a language

I considered staying in Rust, which is what the app is written in. I also considered C# with FluentAssertions, which I've enjoyed using before, and Python. I chose Python with pytest, for three reasons:

1. **Optional, named parameters.** The guide asks for "optional parameters for nearly everything" in the DSL. Python's keyword arguments do that directly. Rust needs builder types, which make test cases noisier.
2. **A language boundary enforces the public-interface rule.** Python code can't reach into the Rust internals, so the tests *can't* take a back door.
3. **No new toolchain.** C# would have been fine for the DSL, but it would add a third language to the repository for no real gain.

I also moved away from Gherkin. I already had a cucumber suite, and its `.feature` files read nicely. But their meaning lives in step definitions matched by regular expressions, and those are exactly the files an agent would be editing. A DSL in plain code is more precise, and the line between "spec" and "plumbing" is easier to see.

Here's the first test case, a port of one of those Gherkin features:

```python
def test_a_rule_matched_payment_with_no_unpaid_invoice_offers_drafting_one(practice):
    practice.has_clinician()
    account = practice.has_bank_account()
    client = practice.has_client("Priya Patient")

    first = account.import_feed(payment(100, payee="PAYMENT RECEIVED", on="2026-04-01"))
    first.payment.link_to(client, save_rule=True)
    first.reconcile()

    feed = account.import_feed(payment(100, payee="ANOTHER PAYMENT RECEIVED", on="2026-04-05"))
    feed.payment.should_be_classified_as_payment_from(client)
    feed.should_not_be_reconcilable()
    feed.payment.should_offer_to_draft_invoice()

    invoice = feed.payment.draft_invoice()
    invoice.issue()
    invoice.should_be_issued_and_unpaid()

    feed.should_be_reconcilable()
    feed.reconcile()
    invoice.should_be_paid()
    client.income_balance_should_be(200)
```

There's no URL, selector or button in it. Behind it, a Playwright driver does the clicking, and the suite starts a fresh server with empty data for each run.

One early lesson: my first version of the balance check tested whether the ledger row *contained* "$200.00". That would have passed for "$1,200.00". Precision has to be designed into the DSL.

## The why comes first

An executable specification captures *what* the system must do. The agent decides *how*. But neither of those makes sense without *why*. Purpose and context come before the what, and they frame the how.

This is task assignment as described in Systems Leadership, which I've [written about before]({% post_url 2023-05-31-thoughts-on-teams %}). In Ian Macdonald, Catherine Burke and Karl Stewart's *Systems Leadership: Creating Positive Organisations*, a well-formed task states its context and purpose, then the quantity and quality expected, and the resources and time available. Within those limits, the person doing the work has discretion over how to do it. That maps closely onto this setup:

- **Context and purpose** are the why. They sit above any single test.
- **Quantity and quality** are what the executable specification pins down.
- **Resources and time** are the limits of the assignment.
- **The how** is the agent's discretion, inside those limits.

So the why has to be written down somewhere, and both the agent and I need to be able to read it. Where it fits in the repository, that's where it should live, next to the specifications that serve it. Some of it sits at a higher level of work, though: a plan or strategy that ties many whats to a single why. That may live elsewhere, but every specification should be able to point back to the purpose it serves. Building software is a system too, and it only works when it sits within a context and has a purpose at each level of work. That's probably a post of its own.

## Questions I'll come back to

- Does the DSL stay small and domain-shaped, or does it grow into a second application?
- Is reviewing every DSL change sustainable, or does it become the bottleneck?
- How often does the agent push back on a spec, and is it right when it does?

## References

- Dave Farley, [Acceptance Test Driven Development: How-To Guide](https://continuous-delivery.co.uk/downloads/ATDD%20Guide%2026-03-21.pdf), continuous-delivery.co.uk.
- Dave Farley, *Modern Software Engineering*, Addison-Wesley, 2021.
- Jez Humble and David Farley, *Continuous Delivery*, Addison-Wesley, 2010.
- Steve Freeman and Nat Pryce, *Growing Object-Oriented Software, Guided by Tests*, Addison-Wesley, 2009.
- Gojko Adzic, *Specification by Example*, Manning, 2011.
- Kent Beck, *Test-Driven Development: By Example*, Addison-Wesley, 2002.
- Dan North, [Introducing BDD](https://dannorth.net/introducing-bdd/), 2006.
- Ian Macdonald, Catherine Burke and Karl Stewart, *Systems Leadership: Creating Positive Organisations*, Gower, 2006 (2nd edition, Routledge, 2018).
- Martin Fowler, [PageObject](https://martinfowler.com/bliki/PageObject.html).
- Dave Farley, [the video quoted above](https://www.youtube.com/watch?v=EkH_uoybj8k), Modern Software Engineering on YouTube.
- [Modern Software Engineering](https://www.youtube.com/@ModernSoftwareEngineeringYT) on YouTube, especially [Requirement Specification v User Stories](https://youtu.be/KP0U3I-f9-Y) and [5 Common Mistakes in User Stories](https://youtu.be/0HMsh459h5c).

