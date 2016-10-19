## Good Use Cases (Joe Andrieu)

Fluid Development supports requirements modeling, centered on use cases. 

A use case should define how a system is used with a value-creating transaction (creating value for the human user).

A good use case:
* Is a single transaction
* Has a clear, memorable name
* Distinguishes unique capabilities
* Is describable, empathizable, actionable.

There are two ways to think about use cases, as a problem or a solution. Either is incomplete, need them together as action/reaction pair.

[[link to Joe's powerpoint]]

## Identity Lifecycle (Greg Slepak)

Decentralized identity lifecycle management.

There are a lot of related elements:
* Attestations (and revocations)
* Namespaces and how to deal with them
* Thwarting man-in-the-middle atacks
* Recovering identity

The lifecycle goes from Registering an identity (in a namespace) to Use of identity and Use of attestations to Recovery of identity to Expiration of identity.

## Conflicts in Privacy Preserving Architure (Manu Sporny)

There are two camps of thought:
* Self-sovereign identity
* Same-origin identity

### Same-Origin Identity

You should never have an identifier that crosses domains because it allows correlation.

### Self-Sovereign (Cross-Origin) Identity

It's OK to have identifier that crosses domains as long as you have anonymizer.

_These communities are not talking to each other, and this has led to conflicts and will lead to more in the next couple of years. The goal here is simply to note that there's a conflict and we need to talk!_

## How Do We Get Institutions to Accept Self-Sovereign Identity (Michael)

It's an interesting question, but not something that we have answers for.

An identity is the sum of its verifiable claims or other attestations. So, can we trust the signatures on these attestations to be valid?

There's probably a middle step between enterprise and peer-to-peer attestations where oracles help to bootstrap this.

## What Does Self-Sovereign Identity Really Mean? (Christopher Allen)

Earlier this year, Christopher put together a paper on Self-Sovereign Identity.

It has been accepted well, including at UN, where a number of ambassadors used it as a term.

Now it's time to turn that into a conversation. Are there missing principles? Should they be categorized?

We'd like to create a _pledge_ that agrees we're creating self-sovereign identity system according to their principles.

**Link:** [Path to Self-Sovereign Identity](http://www.lifewithalacrity.com/2016/04/the-path-to-self-soverereign-identity.html)
[link: Path to Self Sovereign Identity article]

## When Does Self-Sovereign Identity Start and End? (Jonathan Endersby)

How do you create identity for children who can't decide for themselves? On the opposite side of the spectrum, what about adults who can no longer control their self-sovereign identity due to accident, etc.?

The question is essentially _when do you step in as a guardian?_ And _what rules do you need to follow?_ This requires _digital guardians_ who look after other peoples' identities. (There are technical ways to do this, but we need something that the rest of the world can use.)


