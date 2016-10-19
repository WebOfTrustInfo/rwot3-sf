# Fit for Purpose Blockchains

***by Manu Sporny, Dave Longley, Dave Lehn, and Adam Lake***

*A White Paper from Rebooting the Web of Trust III*

## Abstract

At some point in the next 5-10 years there will be tens to hundreds of
thousands of blockchains. Like databases today, each blockchain will be
specifically tuned to its problem domain. There will also be a need for
standards related to how these systems interoperate. Successful standards
(e.g. TCP, IP, JSON, HTML) tend to be layered, modular, and solve a
fairly small problem domain. This paper explores the types of modular
standards that may be useful in a predicted future blockchain ecosystem
containing tens to hundreds of thousands of interoperable blockchains.

## Introduction

We have performed a
[feature analysis of existing blockchain technologies](https://lists.w3.org/Archives/Public/public-blockchain/2016Oct/att-0004/BlockchainTechnologiesFeatureAnalysis.html)
with a particular focus on well defined security, privacy, and performance
principles. This analysis has led us to discover a number of modular components
related to blockchain technologies that may eventually be good candidates for
standardization.

## The Technologies

For our study, we picked the following blockchain technologies with a
particular focus on their ability to be used for "identity management" related
activities:

 - Bitcoin
 - Ethereum
 - Stellar
 - IPFS
 - Blockstack, and
 - Hashgraph

## Security, Privacy, and Performance Principles

We studied each Blockchain technology with a particular focus on the following
security, privacy, and performance principles:

 - **Confidentiality** - Asserts that information is not made available or
   disclosed to unauthorized individuals, entities, or processes.
 - **Integrity** - Asserts that information accuracy and completeness of data
   over its entire life-cycle is maintained and assured.
 - **Non-repudiation** - Asserts that one party of a transaction cannot deny
   having received a transaction nor can the other party deny having sent a
   transaction.
 - **Information Availability** - Asserts that all information to perform a
   particular action must be available when it is needed.
 - **Provenance** - Asserts that the the chronology of ownership, custody, or
   location of a piece of information can be traced throughout time.
 - **Pseudonymity** - Asserts that interactions do not expose an entity’s true
   name or legal identity.
 - **Selective Disclosure** - A situation where an entity may disclose
   information to one or more selected entities without disclosing that
   information outside of the selected set.
 - **Consistency** - Asserts that all nodes in a decentralized system see the
   same data at the same time.
 - **System Availability** - Asserts that every request receives a response
   about whether it succeeded or failed.
 - **Failure Tolerance** - Asserts that the a decentralized system continues
   to operate despite arbitrary partitioning due to network failures.
 - **Scalability** - A characteristic of a system that states how performance
   characteristics change as the system grows or shrinks in size.
 - **Latency** - A characteristic of a system that states how much time it
   takes to complete certain operations.
 - **Auditability** - A characteristic of a system that ensures that the
   complete system state can be verified at any given time to be correct.
 - **Liveliness** - A characteristic of a system that states that all data
   requested may be retrieved from the system at any point.
 - **Denial of Service Resistance** - A measure of a system’s ability to
   respond to requests when under extreme load. Typically, a mechanism is
   utilized that is capable of determining a valid request from an invalid
   one or that makes the price the attacker must pay far greater than the
   price the receiver must pay to execute the request.
 - **System Complexity** - The level of complexity in the system that exists
   to achieve a set of tasks.

## Summary of Research Findings

The analysis of these results led to the following two tables that summarize
the research findings:

 - [Security Principles Summary Chart](https://lists.w3.org/Archives/Public/public-blockchain/2016Oct/att-0004/BlockchainTechnologiesFeatureAnalysis.html#h.x3fnf46se7c8)
 - [Performance Principles Summary Chart](https://lists.w3.org/Archives/Public/public-blockchain/2016Oct/att-0004/BlockchainTechnologiesFeatureAnalysis.html#h.sihbr510y2eq)

## Identified Features

The analysis also produced the following list of features that are either
common to a subset of
blockchain systems or are unique to systems related to the solution domain.
The list is not meant to
be exhaustive, but rather suggestive of potential areas for future
standardization:

 - **Mirroring** - A common feature of ledgers and distributed databases
   whereby copies of the same data is stored on multiple nodes, providing
   resilience and high-availability.
 - **Content-based Addressing** - A feature of IPFS whereby content is
   addressed by a cryptographic hash of the content itself, providing an
   implicit check on data integrity.
 - **Proof-of-Work** - A message ordering mechanism for a decentralized system
   that achieves consensus and deters bad actors by requiring participants
   to expend considerable resources.
 - **Gossip Protocol** - An efficient communication method used by peers in
   Hashgraph to transmit their view of events that have occurred in order to
   achieve consensus.
 - **Digital Signatures** - A cryptographic scheme for demonstrating the
   authenticity and integrity of digital documents.
 - **Public Keys** - A cryptographic key that can be obtained by anyone and
   used to verify digital signatures. Public keys can also function as
   pseudonyms.
 - **Permissioned Ledger** - A ledger where participants must be
   pre-authorized and authenticate themselves in order to write to the ledger.
 - **Hash Chaining** - A mechanism for cryptographically linking sets of
   information together. A blockchain utilizes hash chaining, where a current
   block includes the hash of the previous block, to express the order in
   which events occurred in the system.
 - **Merkle Proof Receipts** - A mechanism for storing the root of a Merkle
   tree in a blockchain and then externally providing a receipt containing a
   path from the hash of some private data in the Merkle tree to the root in
   order to establish Proof-of-Publication..
 - **Cross-chain Linking** - The ability to natively reference one ledger
   from another; bi-directional links may also be possible.
 - **Linked Data Identifiers** - In Linked Data, identifiers are URLs that
   can be dereferenced, typically via the Web, to find machine-readable
   data, usually containing more Linked Data.
 - **HTTP API** - An application interface used to build software on the
   Hypertext transfer protocol, the foundation of data communication for
   the World Wide Web.
 - **Ledger Query Format** - A placeholder for a future standardized query
   format for ledgers.
 - **Linked Data** - A method of publishing structured, machine-readable
   data so that it can be interlinked, typically using URLs that can be
   dereferenced via the Web, and become more useful through semantic queries.
 - **JSON Storage** - A mechanism for storing data as JSON documents.
 - **IPLD** - InterPlanetary Linked Data, a data model representation format
   that enables a content addressable system to also contain named paths.
 - **Zero Knowledge Proofs** - Is a method by which one party (the prover)
   can prove to another party (the verifier) that a given statement is true,
   without conveying any information apart from the fact that the statement
   is indeed true.
 - **Proof-of-Signature** - A cryptographic method of consensus that is
   capable of determining if a particular piece of data was signed by a known
   entity.
 - **Proof-of-Stake** - A cryptographic method of consensus where an
   individual vote is adjusted by a particular factor based on how much
   “ownership” that individual has over a particular system.
 - **On-ledger Key Management** - Management and identification of
   cryptographic keys is performed directly on a ledger.
 - **Web-based Key Management** - Management, identification, and
   representation of cryptographic keys via the Web and Linked Data semantics.
 - **Out of Band Key Management** - Cryptographic key management is
   unspecified within the public key infrastructure. Applications must
   design and implement their own key management.
 - **Certificate Revocation Lists** - A CRL can be checked by a verifier
   of a credential to determine if the credential is still deemed to be
   valid by the issuer.
 - **OCSP** - An alternative to Certificate Revocation Lists, the Online
   Certificate Status Protocol (OCSP) is an Internet protocol used for
   obtaining the revocation status of an X.509 digital certificate over HTTP.
 - **Off-chain Lightning Protocols** - A method of communication that
   bypasses the blockchain to directly communicate a series of high
   frequency transactions that are then hashed and placed into a blockchain.
 - **Sharding** - The ability to create horizontal partitions of data in a
   database. Each individual partition is referred to as a shard and is held
   on a separate database server instance to spread load.
 - **Longest Chain Wins** - The chain of blocks that required the greatest
   amount of cumulative “work”, a measure defined by the system in which
   this feature is used, is selected as the consensus chain.

## Potential Areas for Standarization

The list of features above provide hints at potential areas of standardization:

 - Communication Protocols
   - Ledger Create/Write/Read HTTP API
 - Consensus Algorithms
   - Proof of Work
   - Proof of Stake
   - Stellar
   - Hashgraph
 - Key Management
   - Rotation
   - On/Off Chain
   - Delegation and Recovery
 - Blockchain Anchoring and Linking
   - Chainpoint
   - Cross-chain Linking and Blockchain URLs
 - Data Structures
   - Merkle Tree expression format
   - Hashchain expression format
 - Digital Signatures
   - Smart Signatures
   - Base58 Encoding
   - Linked Data Signature Extensions
     - secp256k1 support
     - Multi-signature support
     - Endorsement signature support
   - JSON Normalization

## Fit for Purpose Blockchains

The outcome of this work could result in modular standards that could be
combined into fit for purpose blockchains. A proof of concept has been
created called
[Flex Ledger](http://web-payments.github.io/flex-ledger/)
and has been deployed as a
[public demonstration](http://dhs2016ledger.digitalbazaar.com/) 
of what this sort of standardization could achieve.

## Next Steps

We would like to spend some time at Rebooting Web of Trust to try and flesh
out more potential areas of standardization based on the research that we
and others have done since Rebooting Web of Trust II. Specifically, we'd
like to understand any gaps that others see in the analysis or areas of
standardization that are not in the list in the previous section.
