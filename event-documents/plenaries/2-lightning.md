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

This camp says: _You should never have an identifier that crosses domains because it allows correlation._

### Self-Sovereign (Cross-Origin) Identity

This camp says: _It's OK to have identifier that crosses domains as long as you have anonymizer._

_These communities are not talking to each other, and this has led to conflicts and will lead to more in the next couple of years. The goal here is simply to note that there's a conflict and we need to talk!_

## How Do We Get Institutions to Accept Self-Sovereign Identity (Michael)

It's an interesting question, but not something that we have answers for.

An identity is the sum of its verifiable claims or other attestations. So, can we trust the signatures on these attestations to be valid?

There's probably a middle step between enterprise and peer-to-peer attestations where oracles help to bootstrap this.

## What Does Self-Sovereign Identity Really Mean? (Christopher Allen)

Earlier this year, Christopher put together a paper on Self-Sovereign Identity. It has been well attempted, including at UN, where a number of ambassadors used it as a term. Now it's time to turn that into a conversation. 

Are there missing principles? Should the principles be categorized?

We'd like to create a _pledge_ that lets people agree that they're creating their self-sovereign identity system according to their principles.

**Link:** [Path to Self-Sovereign Identity](http://www.lifewithalacrity.com/2016/04/the-path-to-self-soverereign-identity.html)
[link: Path to Self Sovereign Identity article]

## When Does Self-Sovereign Identity Start and End? (Jonathan Endersby)

How do you create identity for children who can't decide for themselves? On the opposite side of the spectrum, what about adults who can no longer control their self-sovereign identity due to accident, etc.?

The question is essentially _when do you step in as a guardian?_ And _what rules do you need to follow?_ This requires _digital guardians_ who look after other peoples' identities. (There are technical ways to do this, such as Shamir secret sharing, but we need something that the rest of the world can use.)

Another question is, _are current models of guardians and godparents and such translateable into the digital world?_

## Song of Ashok (Christopher Allen)

This is a story.

    A child gets separated from his parents during some natural disaster. To prove his identity, the child can go to a bank and enter a private room and sing a certain song. Then he gets access to certain funds and hire people to find his parents.

How do we do this?

BIP38 + BIP39 encode information in words, but we've expanded this a bit with some other proofs of concept.

One proof of concept: Christopher and Chris V. came up with a new set of words that _are in iambic pentameter_, so are easier to remember.

Another proof of concept: They encoded identity proof into poem instead, but not (yet) a rhyming one.

## Social Authentication (Glenn Willen)

The basic idea is: authentication based on who you know, or better who knows you. 

This is already done at Facebook through Trusted Contacts.

Technically, Shamir secret-sharing scheming allows this type of key recovery.

You want these social authentication to be stronger than your personal key, in case your personal key is compromised.

You need to be able to detect loss of recovery key shards very quickly, else they decay over time.

May need to tie this to a trust system, so that you can penalize people if they verify a false identity.

## Will Smart Contracts Drive Civilization Over a Cliff (Kaliya Young)

The deeper question is, _what checks and balances are needed in these sorts of systems?_

What do you do when natural disasters _should_ cause delays in smart contracts, or when a stock market crash _should_ cause the stock market to pause? How do smart contract account for this?

How do we _upgrade_ contracts

It's how _Courts of Equity_ emerged for legal system.

This is a conversation.

## Identity in the Eye of Beholder (Joe Andrieu)

Identity is _correlation_. It's fluid, it evolves. Data can change. What's right today can be wrong tomorrow. It's a process, not an object. So identity shouldn't be defined by data. 

We need to talk about identity beyond the bits, and this allows it.

**Link:** [Clearer Identity through Correlation](https://github.com/WebOfTrustInfo/ID2020DesignWorkshop/blob/master/final-documents/identity-crisis.pdf)

## Time Stamps (Peter Todd, Wayne Vaughan)

Open Timestamps, Chainpoint.

Wayne's Chainpoint verifies the content and timestamp of data. It's a proof protocol.

Peter's Open Timestamps makes proof of data creation easy.

Part of the problem is that you need to know when signatures were created; you need to be able to prove that data was created at a certain time. So then you can know if something was created before or after a compromise, for example.

Timestamps are _additive_ security.

_One-minute round._

## Slepaks' Triangle (Greg Slepak)

Attempts to solve long-running debate of what the blocksize should be. 

At its base, it says a system can only have two of three attributes: decentralized, consensus, mainstream.

## Anonymous Credential for Blockchain-Based Identities (Dmitry KHOVRATOVICH)

Legders are useful, but the question of privacy is missing. 

Anonymous Credentials can solve this problem.

## Standard Protocols for Accessing Blockchains (Manu Sporny)

It would be neat to recreate HTTP for blockchains. We just need to figure out what they're speaking.

## Identity-Standard Data Models (Manu Sporny)

This is verifiable claims.

## How Do We Ensure an ID is Unique? (Jonathan Endersby)

This will eventually happen, and the question is if it's solvable.

## Self-Sovereign Value Chain (Robert)

Self-sovereign identity has no value until you add endorsements and have usage. We need a taxonomy for a value-chain to allow all of this.

## Portable Reputation Toolkit (Noah)

Want to put together a proof of concept in code for a portable reputation toolkit.

## Decentralized Trust Management Network (Pavel)
## Financial Trust without Centralized Parties or Ledgers (Pavel)

Ideal money is trust, because you can't steal it.

Your balance could be total number of trust lines that all of your friends or creditors give to you, and then you can use that to pay others, transfering through a network of friends (or nodes).

So how do you build this? You _could_ use a centralized entity. Otherwise, you can use blockchain, but you can't scale that. So what do you do instead?

You create a web of connected nodes, a consensus system. You issue IOUs and reach a consensus with a group of friends.

## Identity Containers (Daniel Buchner)

Have container signed with your DID. Going to build a reference implementation out in the next few months. And possibly roll it out to a billion people!
