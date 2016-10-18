# Blockchain Attestation Taxonomies

By Christian Lundkvist, ConsenSys

## Introduction

An *attestation* represents a cryptographic proof of a claim made by
an identity, usually about another identity. Attestations provide a
way for an identity to make a claim that can then be verified at a
later point in time. We will attempt to categorize attestations in
terms of their relationship to blockchain systems and give some use
cases for the different categories of attestations.

We assume that there is a system of decentralized identifiers and a
reliable mapping from an identifier to its corresponding signing
key. This mapping would most likely be done using a blockchain, but
one could potentially use a Certificate Authority for the mapping.

## Pure Offchain (manual sharing/issuing, Verifiable Claims)

These attestations are held by the user locally off-chain without a
hash on chain and is shared manually with others when directly
initiated by the user. They can consist of JSON Web Tokens and/or
[Verifiable Claims](http://w3c.github.io/webpayments-ig/VCTF/),
i.e. they consist of data (normally JSON data) with an associated
digital signature.

A user can send an attestation to a service by including it in a
simple HTTP request.

The receiver of an attestation would validate it by getting the
identifier in the claim data, mapping it to the corresponding public
key (using blockchain or CA) and finally verifying that this public
key signed the attestation.

The simplest way of dealing with revocation is to have the attestation
be time-limited. If the expiry timestamp in the validation is in the
past the attestation is considered invalid. Also revocation of keys is
then automatic: when looking up the public signing key corresponding
to the identifier, the attestation is only considered valid if the key
is the current one.

This is quite a strict requirement though, one could imagine accepting
an attestation by an old key as long as the timestamp is
consistent. However this can be hard to verify since an attacker who
steals an old key can also modify the timestamp. It might also be a
pain to have all the attestations made by the user be invalidated when
they lose or update their device (and hence their key). However if
most attestations are issued by corporations the key loss may be less
of an issue.

For examples of use cases, see

<http://w3c.github.io/webpayments-ig/VCTF/use-cases/>


## Offchain with hash on-chain (persistent access)

In this model the attestations are stored in JSON format (normally in
a decentralized system like IPFS, but can also be a traditional
storage service like Dropbox) and a hash of the JSON structure is
stored on the blockchain associated to the identifier (e.g. through an
on-chain registry). This allows persistent access to the data by
anyone, and cryptographically ties it to the identifier of the
identity associated with the attestation (mainly the subject of the
attestation but could also be the issuer potentially). This kind of
attestation is good for profile data of an identity that has been
attested to in a web-of-trust fashion.

If the data is meant to be public then this is a good way of
distributing it, and cryptographically tie it to an identifier. If the
data is meant to be private then it needs to be encrypted. The data
can be encrypted in a way that only selected identities can decrypt
it, this is sometimes referred to as "selective disclosure".

We can have these attestations stored in a data structure in IPFS so
that a single hash encompasses all attestations and their history. It
may then be possible to go back in time to check the blockchain
timestamp on each specific attestation, even though at any point in
time only one hash is on chain.

Examples: [uPort](https://uport.me), [Blockstack](https://blockstack.org)

## On-chain (smart contract based) attestations

This type of attestation exists in a smart contract on a
blockchain. This could be for instance in an access-controlled
registry which maps a key or identifier to the attestation data. The
downside of this approach is that there is a large cost in storing
data on a blockchain and it also requires a blockchain node to
validate the attestation, instead of just checking a digital
signature.

The upside is that these attestations can be used by other smart
contracts. An example of this is a smart contract issuing and selling
shares in a company. The company may require that buyers of shares
have performed a KYC check. A KYC provider can issue an on-chain
attestation stating that a particular identifier has gone through this
KYC check, without necessarily revealing any more personal information
on the blockchain. The smart contract issuing the shares can then
automatically verify that the users of the smart contract fulfill the
requirements and hence are able to buy shares.

Example: [Proof Of Physical Address](https://proofofphysicaladdress.com)
