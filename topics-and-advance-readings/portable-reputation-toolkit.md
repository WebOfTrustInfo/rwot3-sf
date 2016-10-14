# Portable Reputation Toolkit

### By Noah Thorp and Harlan T Wood

## Abstract

Symbolically represented reputation can be regarded as a meta-currency. Like money, reputation gives us access to opportunities, relationships, and resources.

Reputation information about people's skills is primarily siloed into centralized systems like Linkedin and Upwork. Because of this the value of reputation on these platforms is limited, for both commerce and accreditation. This value may also disappear unexpectedly when centralized services shut down. Both users and platforms can increase the value of reputation "currency" by adopting portable reputation protocols.

## The Role of Blockchains

Cryptocurrencies, blockchains, and smart contracts are designed to be "trustless". This means that once programmed, algorithmic intent cannot be tampered with or corrupted by coercive force. Trustless blockchains are enabled through properties of cryptography in the digital domain.

Smart contract scripts can be initiated to affect assets stored in blockchain accounts. But any asset or interaction that is not data on a secure blockchain represents counterparty risk. For example, if you wish to pay me Bitcoin in exchange for apples, how do you know that the apples are not rotten? How do you know from blockchain data that the apples are delicious enough to initiate an escrow smart contract to purchase it? Why buy my apples instead of someone else's apples?

The leap from the domain of the blockchain to outside of it (e.g. the world of apples) implicitly relies upon reputation. Unless every atom in the universe is digitized and controlled by a cryptographically secure reputation system, trust will be necessary to reduce various forms of counterparty risk. Reputation is also essential to decision making amongst possible actions.

Although blockchains don't fully remove the need for reputational trust, they can play a key role in improving reputation systems.

## Desirable Properties for Portable Reputation

From Aristotle to central banks, currencies have been designed with functional characteristics in mind. Like reputation currencies discussed below, a useful currency is:
* Portable
* Non-forgeable
* Uniform
* Durable

_Unlike_ reputation currencies, a useful currency is also:
* Scarce
* Divisible
* Transferable
* Fungible 

When all these characteristics are satisfied, money can be an effective store of value, unit of account, and medium of exchange.

Reputation requires a different but overlapping set of properties.  A desirable reputation currency is:
* Verifiable - Reputation is issued by an identity to another identity. Public and private keys are well suited to this.
* Portable - Reputation can be moved from system to system with minimal friction. Portability increases the value of reputation.
* Non-forgeable - Like currency, the account of the reputation issuer and receiver must be securely controlled.
* Uniform - A uniform format is necessary for consistent assessment, discovery and aggregation.
* Timestamped - Reputation claims may be correlated with other events. The order of multiple reputation claims from entity A to B matters.
* Summable - To make decisions one must be able to aggregate and assess multiple claims about the same identity.
* Unique - This summing should not double count copies of the same reputation claim. Reputation increases in usefulness with copying, but copies of the same reputation should not be mistaken for multiple endorsements.
* Durable - Reputation should outlast individual enterprises and technological changes.

It's worth noting that reputation is frequently assessed recursively. The reputation of the issuer affects the reputation claims they issue. This approach to reputation has been used by Google page rank and described in the Trust Exchange protocol mentioned below.

## Towards a Portable Reputation Toolkit

We propose a portable reputation toolkit. The components of this toolkit are:
* A protocol for storing reputation data in JSON-LD format
* A blockchain anchored timestamp (e.g. OpenTimestamps, Chainpoint)
* Distributed identifier implementation
* API reference implementation for core reputation methods

## Related Work To Draw from

There is significant work by Rebooting The Web of Trust participants and others to build on including:
* [Blockchain Extensions for Linked Data Signatures](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-fall2016/blob/master/topics-and-advance-readings/blockchain-extensions-for-linked-data-signatures.md)
* [Trust Exchange: An Architecture for a Permanent Open Trust Network](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust/blob/master/topics-and-advance-readings/Trust-Exchange-An-Architecture-for-a-Permanent-Open-Trust-Network.md)
* [Open Timestamps](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-fall2016/blob/master/topics-and-advance-readings/opentimestamps.md)
* [JSON-LD](http://json-ld.org/)
* [Mozilla OpenBadges](http://openbadges.org/)

## Attribution

Many thanks to those who informed this paper, including Christopher Allen and Manu Sporny.
