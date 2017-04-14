# Blockchain Technologies Feature Analysis

```
Copyright 2016 Digital Bazaar, Inc. (except for Data Structure sections)
Shared under a Creative Commons Attribution 4.0 International license
```

## Abstract

This document analyses the security and performance characteristics of six
interesting software systems related to blockchain technology and decentralized
identity systems. The systems analyzed in this report are Bitcoin, Ethereum,
Stellar, IPFS, Blockstack, and Hashgraph.

## Overview

The security and performance findings of this report are summarized in table
form at the beginning of the report. Each technology is then analyzed in
detail for the rest of the report.

Each analysis of a particular blockchain technology starts by documenting the
basic data structures used for the system. The basic data structures are a
window into the information that the system needs to operate. They also
provide a view into the capabilities and complexity of the given system.

Once the data structures are highlighted, an analysis on the security
characteristics of the system is performed. This analysis is based on what the
system is capable of doing today. A similar analysis is then performed for the
performance characteristics of the system. Finally, the notable
characteristics of the system are outlined in an attempt to highlight what
makes the particular blockchain different from other blockchains.

**Disclaimer**

```
The analysis performed in this document is preliminary, the field of study is
rapidly evolving, and thus this document is a work in progress. There may be
errors or interpretations that do not align with the high-level summaries that
the authors have presented in this analysis. We are actively engaging with the
developer communities that created each technology analyzed in this document
in an attempt to ensure that the information provided and analysis performed
is accurate.
```

<table>
  <tbody>
    <tr>
    </tr>
    <tr>
      <td>
          <h5>Table of Contents</h5>
          <b>﹂</b> <a href="#terminology">
          Terminology
          </a><br>
          <b>﹂</b> <a href="#security-principles-summary-chart">
          Security Principles Summary Chart
          </a><br>
          <b>﹂</b> <a href="#performance-principles-summary-chart">
          Performance Principles Summary Chart
          </a><br>
          <b>﹂</b> <a href="#bitcoin">
          Bitcoin
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#data-structures">
          Data Structures
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#block-format">
          Block Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#blockheader-format">
          Blockheader Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#transaction-format">
          Transaction Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#transaction-input-format">
          Transaction Input Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="transaction-output-format">
          Transaction Output Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#security-characteristics">
          Security Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#performance-characteristics">
          Performance Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#notable-features">
          Notable Features
          </a><br>
          <b>﹂</b> <a href="#ethereum">
          Ethereum
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#data-structures-1">
          Data Structures
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#account-format">
          Account Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#message-transaction-format">
          Message Transaction Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#receipt-format">
          Receipt Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#block-format-1">
          Block Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#security-characteristics-1">
          Security Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#performance-characteristics-1">
          Performance Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#notable-features-1">
          Notable Features
          </a><br>
          <b>﹂</b> <a href="#stellar">
          Stellar
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#data-structures-2">
          Data Structures
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#ledgerheader-format">
          LedgerHeader Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#account-format-1">
          Account Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#transaction-format-1">
          Transaction Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#security-characteristics-2">
          Security Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#performance-characteristics-2">
          Performance Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#notable-features-2">
          Notable Features
          </a><br>
          <b>﹂</b> <a href="#ipfs">
          IPFS
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#data-structures-3">
          Data Structures
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#object-merkle-dag---ipfslink">
          Object Merkle DAG - IPFSLink
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#object-merkle-dag---ipfsobject">
          Object Merkle DAG - IPFSObject
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#other">
          Other
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#security-characteristics-3">
          Security Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#performance-characteristics-3">
          Performance Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#notable-features-3">
          Notable Features
          </a><br>
          <b>﹂</b> <a href="#blockstack">
          Blockstack
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#data-structures-4">
          Data Structures
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#base-name-record-format">
          Base Name Record Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#base-namespace-format">
          Base Namespace Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#name-import-format">
          Name Import Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#namespace-preorder-format">
          Namespace Preorder Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#namespace-reveal-format">
          Namespace Reveal Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#namespace-ready-format">
          Namespace Ready Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#name-preorder-format">
          Name Preorder Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#name-registration-format">
          Name Registration Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#name-revoke-format">
          Name Revoke Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#name-update-format">
          Name Update Format
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#security-characteristics-4">
          Security Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#performance-characteristics-4">
          Performance Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#notable-features-4">
          Notable Features
          </a><br>
          <b>﹂</b> <a href="#hashgraph">
          Hashgraph
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#data-structures-5">
          Data Structures
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;﹂</b> <a href="#gossip-event">
          Gossip Event
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#security-characteristics-5">
          Security Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#performance-characteristics-5">
          Performance Characteristics
          </a><br>
          <b>&nbsp;&nbsp;&nbsp;﹂</b> <a href="#notable-features-5">
          Notable Features
          </a><br>
      </td>
    </tr>
  </tbody>
</table>

## Terminology

In order to perform a meaningful analysis of each system, it is important to
define and use the terminology that is applied to each system consistently.
The terminology below is used throughout the document and readers are strongly
advised to understand the terminology before going further and to refer back
to this section in order to fully understand the usage of each term in the
analysis sections.

* __`Confidentiality`__: Asserts that information is not made available or
disclosed to unauthorized individuals, entities, or processes.

* __`Integrity`__: Asserts that information accuracy and completeness of data
over its entire life-cycle is maintained and assured.

* __`Non-repudiation`__: Asserts that one party of a transaction cannot deny
having received a transaction nor can the other party deny having sent a
transaction.

* __`Information Availability`__: Asserts that all information to perform a
particular action must be available when it is needed.

* __`Provenance`__: Asserts that the the chronology of ownership, custody, or
location of a piece of information can be traced throughout time.

* __`Pseudonymity`__: Asserts that interactions do not expose an entity’s true
name or legal identity

* __`Selective Disclosure`__: A situation where an entity may disclose
information to one or more selected entities without disclosing that
information outside of the selected set.

* __`Consistency`__: Asserts that all nodes in a decentralized system see the
same data at the same time.

* __`System Availability`__: Asserts that every request receives a response
about whether it succeeded or failed.

* __`Failure Tolerance`__: Asserts that the a decentralized system continues
to operate despite arbitrary partitioning due to network failures.

* __`Scalability`__: A characteristic of a system that states how performance
characteristics change as the system grows or shrinks in size.

* __`Latency`__: A characteristic of a system that states how much time it
takes to complete certain operations.

* __`Auditability`__: A characteristic of a system that ensures that the
complete system state can be verified at any given time to be correct.

* __`Liveliness`__: A characteristic of a system that states that all data
requested may be retrieved from the system at any point.

* __`Denial of Service Resistance`__: A measure of a system’s ability to
respond to requests when under extreme load. Typically, a mechanism is
utilized that is capable of determining a valid request from an invalid one or
that makes the price the attacker must pay far greater than the price the
receiver must pay to execute the request.

* __`System Complexity`__: The level of complexity in the system that exists
to achieve a set of tasks.

## Security Principles Summary Chart

| Principle | Bitcoin | Ethereum | Stellar | IPFS | Blockstack | Hashgraph |
| --- |:---:|:---:|:---:|:---:|:---:|:---:|
| __Confidentiality__ | `NONE` | `NONE` | `NONE` | _Hash-based content addresses_ | `NONE` | `NONE` |
| __Information Availability__ | Block Mirroring | Block Mirroring | Ledger Mirroring | _Graph and file Mirroring_ | _Block Mirroring / DHT Mirroring_ | _Hashgraph Mirroring; optional event history_ |
| __Integrity__ | _Multiple block verifications_ | _Multiple block verifications_ | Latest block verification | Hash-based content addressing | _Multiple block verifications_ | Consensus with probability one |
| __Non-repudiation__ | Digital signatures | Digital signatures | Digital signatures | Digital signatures | Digital signatures | Digital signatures |
| __Provenance__ | Transaction inputs/outputs | Ethereum state machine and transition functions | Digitally signed ledger transition instructions | Digital signatures and versioning | Transaction inputs & outputs and virtualchain references | _Hashgraph Mirroring; optional event history_ |
| __Pseudonymity__ | _Public keys_ | _Public keys and contract addresses_ | _Public keys_ | _Public keys_ | _Public keys, but public information encouraged_ | _Not supported; could be layered_ |
| __Selective Disclosure__ | `NONE` | `NONE` | `NONE` | `NONE` | _Selective access to encrypted storage_ | _Not supported; could be layered_ |

## Performance Principles Summary Chart

| Principle | Bitcoin | Ethereum | Stellar | IPFS | Blockstack | Hashgraph |
| --- |:---:|:---:|:---:|:---:|:---:|:---:|
| __Consistency__ | Block verifications. 30-60 minutes | Block verifications. 20-60 minutes | Single block verification. Less than 1 minute | P2P mirroring. Limited primarily by network I/O. Several seconds for files less than 128KB. | Block verifications. 30-60 minutes | Consensus with probability one; Byzantine agreement, but attackers must control less than one-third |
| __System Availability__ | Block verifications. 30-60 minutes | Block verifications. 20-60 minutes | Single block verification. Less than 1 minute. | Single storage request response. Several seconds for files less than 128KB | Block verifications. 30-60 minutes | Virtual voting; DoS resistant w/o proof-of-work, fast gossip |
| __Failure Tolerance__ | Longest chain wins | Longest chain wins | Last balloted block always has consensus. | Content address hash. Highly resilient against network partitioning | Longest chain wins | Strong Byzantine fault tolerance |
| __Scalability__ | Block size. 7 transactions per second | Block size. 7-20 transactions per second | Thousands to tens of thousands of transactions per second. | Thousands to tens of thousands of transactions per second. Scales linearly as nodes are added. | Block size. 7 transactions per second | Thousands to tens of thousands of transactions per second. Limited by bandwidth only |
| __Latency__ | Block verifications. 30-60 minutes | Block verifications. 20-60 minutes | Single block verification. Less than 1 minute. | Single storage request response. Several seconds for files less than 128KB. | Block verifications. 30-60 minutes | Virtual voting; limited only by exponentially fast gossip protocol |
| __Auditability__ | Full | Full | Full | Difficult | Full | Configurable |
| __Liveliness__ | Full | Full | Full | Fails if nodes storing data fail | Full | Full |
| __Denial of Service Resistance__ | Spend Bitcoin | Spend Ether | Spend Stellar | Files are only mirrored if requested | Spend Bitcoin | Signed State / Proof-of-stake / < 1/3 attackers |
| __System Complexity__ | Medium | High | Medium | Medium | Medium | Low, but not full system |

## Bitcoin

### Data Structures

#### Block Format

| Field | Description | Size |
| --- | --- | --- |
| `Magic no` | value always `0xD9B4BEF9` | 4 bytes |
| `Blocksize` | number of bytes following up to end of block | 4 bytes |
| `Blockheader` | See below | 80 bytes |
| `Transaction counter` | positive integer | 1 - 9 bytes |
| `transactions` | the (non empty) list of transactions | `Transaction counter` - many transactions |

#### Blockheader Format

| Field | Description | Size |
| --- | --- | --- |
| `Version` | Block version number | 4 bytes |
| `hashPrevBlock` | 256-bit hash of the previous block header | 32 bytes |
| `hashMerkleRoot` | 256-bit hash based on all of the transactions in the block | 32 bytes |
| `Time` | Current timestamp as seconds since `1970-01-01T00:00 UTC` | 4 bytes |
| `Bits` | Current target in compact format | 4 bytes |
| `Nonce` | 32-bit number (starts at 0) | 4 bytes |

#### Transaction Format

| Field | Description | Size |
| --- | --- | --- |
| `Version no` | currently 1 | 4 bytes |
| `In-counter` | positive integer | 1 - 9 bytes |
| `list of inputs` | the first input of the first transaction is also called "coinbase" (its content was ignored in earlier versions) | `In-counter` - many inputs |
| `Out-counter` | positive integer | 1 - 9 bytes |
| `list of outputs` | the outputs of the first transaction spend the mined bitcoins for the block | `Out-counter` - many outputs |
| `lock_time` | if non-zero and sequence numbers are < `0xFFFFFFFF`: block height or timestamp when transaction is final |  bytes |

#### Transaction Input Format

| Field | Description | Size |
| --- | --- | --- |
| `Previous Transaction hash` | doubled SHA256-hashed of a (previous) to-be-used transaction | 32 bytes |
| `Previous Txout-index` | non negative integer indexing an output of the to-be-used transaction | 4 bytes |
| `Txin-script length` | non negative integer | 1 - 9 bytes |
| `Txin-script / scriptSig` | Script | `in-script length` - many bytes |
| `sequence_no` | normally `0xFFFFFFFF`; irrelevant unless transaction's lock_time is > 0 | 4 bytes |

#### Transaction Output Format

| Field | Description | Size |
| --- | --- | --- |
| `value` | non negative integer giving the number of Satoshis to be transferred | 8 bytes |
| `Txout-script length` | non negative integer | 1 - 9 bytes |
| `Txout-script / scriptPubKey` | Script | `out-script length` - many bytes |

### Security Characteristics

* __`Confidentiality`__: None. All information in the Bitcoin blockchain is
public. Confidentiality is achieved by hashing data and placing it in the
blockchain.

* __`Information Availability`__: Block mirroring. In general, all information
is highly mirrored and available at all times. It may be true that some of the
more recent information cannot be trusted until more block verifications are
performed.

* __`Integrity`__: Multiple block verifications. Information is accurate given
no blockchain forks. Integrity cannot be strongly trusted until at least 6+
verifications have been performed.

* __`Non-repudiation`__: Digital signatures. All transactions are digitally
signed and are thus non-repudiable.

* __`Provenance`__: Transaction inputs and outputs. All transactions can be
traced using block inputs and outputs.

* __`Pseudonymity`__: Public keys used as identifiers. All transactions use
public keys as identifiers (not legal names or identifiers). Pseudonymity may
be compromised via court orders to Bitcoin money transmitters.

* __`Selective Disclosure`__: None. All information in the Bitcoin blockchain
is public. Selective disclosure could theoretically be achieved via symmetric
key encryption, but due to the permanent nature of the Bitcoin blockchain and
the impermanent nature of cryptographic protection, storing encrypted
information directly on the Blockchain is ill advised.

### Performance Characteristics

* __`Consistency`__: Multiple block verifications. Eventual consistency is
guaranteed through multiple block verifications. Consistency of a freshly
committed block cannot be highly trusted until between 30 to 60 minutes after
the transaction.

* __`System Availability`__: Multiple block verifications. Transactions are
not verified to a high degree of certainty until between 30 to 60 minutes
after the transaction occurs.

* __`Failure Tolerance`__: Longest chain wins. Eventual consistency during
arbitrary network partitioning. Mining allocation may cause one network
partition to gain blocks at a faster rate than other partitions. In these
cases, transactions are not very tolerant to failure depending on which
network partition a transaction is written to.

* __`Scalability`__: Block size. Transaction speed is currently set at 7
transactions per second with a 1MB block size.

* __`Latency`__: Multiple block verifications. Transaction verifications take
between 30 to 60 minutes after a transaction occurs to be verified. In May
2016, boot-up time for new nodes takes 1-3 days due to having to download
69GBs of data from peers and audit the blockchain.

### Notable Features

* __`Proof of Work`__: Processing cycles must be expended in order to be able 
to write a new block to the blockchain.

* __`Bitcoin Script`__: A non-turing complete, Forth-like, stack-based 
scripting system, without support for loops is used for transaction inputs and 
outputs enabling some programmability for how transactions can be spent.

* __`Mining Rewards`__: To incentivize block verification, bounties are
provided to miners that make securing the blockchain a profitable endeavor.

## Ethereum

### Data Structures

#### Account Format

| Field | Description | Size |
| --- | --- | --- |
| `nonce` | A scalar value equal to the number of transactions sent from this address or, in the case of accounts with associated code, the number of contract-creations made by this account. | 32 bytes |
| `balance` | A scalar value equal to the number of Wei owned by this address. | 32 bytes |
| `storageRoot` | A 256-bit hash of the root node of a Merkle Patricia tree that encodes the storage contents of the account (a mapping between 256-bit integer values), encoded into the trie as a mapping from the Keccak 256-bit hash of the 256-bit integer keys to the RLP-encoded 256-bit integer values. | 32 bytes |
| `codeHash` | The hash of the EVM code of this account—this is the code that gets executed should this address receive a message call; it is immutable and thus, unlike all other fields, cannot be changed after construction. All such code fragments are contained in the state database under their corresponding hashes for later retrieval. | 32 bytes | 

#### Message Transaction Format

| Field | Description | Size |
| --- | --- | --- |
| `nonce` | A 64-bit hash which proves combined with the mix-hash that a sufficient amount of computation has been carried out on this block | 8 bytes |
| `gasPrice` | A scalar value equal to the number of Wei to be paid per unit of gas for all computation costs incurred as a result of the execution of this transaction. | 32 bytes |
| `gasLimit` | A scalar value equal to the current limit of gas expenditure per block | 32 bytes |
| `to` | The 160-bit address of the message call’s recipient or, for a contract creation transaction, ∅, used here to denote the only member of B0. | 20 bytes |
| `value` | A scalar value equal to the number of Wei to be transferred to the message call’s recipient or, in the case of contract creation, as an endowment to the newly created account | 32 bytes |
| `v, r, s` | Values corresponding to the signature of the transaction and used to determine the sender of the transaction | ? |
| `data` | Only in non-contract messages. An unlimited size byte array specifying the input data of the message call. | unlimited |
| `init` | Only in contract messages.An unlimited size byte array specifying the EVM-code for the account initialisation procedure | unlimited |
| `body` | Only in contract messages. A fragment of code that executes each time the account receives a message call (either through a transaction or due to the internal execution of code) | unlimited |

#### Receipt Format

| Field | Description | Size |
| --- | --- | --- |
| `state` | the post-transaction state | ? |
| `cumulativeGasUsed` | the cumulative gas used in the block containing the transaction receipt as of immediately after the transaction has happened | ? |
| `logs` | the set of logs created through execution of the transaction | ? |
| `logsBloom` | the Bloom filter composed from information in those logs | ? |

#### Block Format

| Field | Description | Size |
| --- | --- | --- |
| `parentHash` | The Keccak 256-bit hash of the parent block’s header, in its entirety | 32 bytes |
| `ommersHash` | The Keccak 256-bit hash of the ommers list portion of this block | 32 bytes |
| `beneficiary` | The 160-bit address to which all fees collected from the successful mining of this block be transferred | 20 bytes |
| `stateRoot` | The Keccak 256-bit hash of the root node of the state trie, after all transactions are executed and finalisations applied | 32 bytes |
| `transactionsRoot` | The Keccak 256-bit hash of the root node of the trie structure populated with each transaction in the transactions list portion of the block | 32 bytes |
| `receiptsRoot` | The Keccak 256-bit hash of the root node of the trie structure populated with the receipts of each transaction in the transactions list portion of the block | 32 bytes |
| `logsBloom` | The Bloom filter composed from indexable information (logger address and log topics) contained in each log entry from the receipt of each transaction in the transactions list | ? |
| `difficulty` | A scalar value corresponding to the difficulty level of this block. This can be calculated from the previous block’s difficulty level and the timestamp. | 32 bytes |
| `number` | A scalar value equal to the number of ancestor blocks. The genesis block has a number of zero | 32 bytes |
| `timestamp` | A scalar value equal to the reasonable output of Unix’s `time()` at this block’s inception | 4 bytes? |
| `extraData` | An arbitrary byte array containing data relevant to this block. This must be 32 bytes or fewer | 0-32 bytes |
| `mixHash` | A 256-bit hash which proves combined with the nonce that a sufficient amount of computation has been carried out on this block | 32 bytes |
| `ommerBlockHeaders` | A list of ommer block headers (of the same format as everything above in this table) | ? |
| `transactions` | a series of the transactions | ? |

### Security Characteristics

* __`Confidentiality`__: None. All information in the Ethereum state machine
is public. Confidentiality is achieved by hashing data and placing it in the
blockchain or storing a pointer to off-chain data.

* __`Information Availability`__: Mirroring. In general, all non-generatable
information is highly mirrored and available at all times. It may be true that
some of the more recent information cannot be trusted until more block
verifications are performed. There is also the possibility of not having to
store all of the state machine transitions via a Simplified Payment
Verification by only downloading the Patricia Merkle Tree block headers and
verifying those, leading to light client implementations.

* __`Integrity`__: Multiple block verifications. Information is accurate given
no long forks in the Merkle Patricia tree. Integrity cannot be strongly
trusted until at least 7+ verifications have been performed.

* __`Non-repudiation`__: Digital signatures. All transactions are digitally
signed and are thus non-repudiable.

* __`Provenance`__: Ethereum state machine and transition functions. All state
machine transitions can be traced by replaying each state and set of inputs
(both external and internal) to the Ethereum state machine.

* __`Pseudonymity`__: Random identifiers, transaction identifiers, or contract
addresses may be used as identifiers each of them having a certain level of
pseudonymity. Pseudonymity may be compromised via other data associated with
the random identifier in the Ethereum state machine or court orders to Bitcoin
money transmitters and/or BTC to ETH gateways.

* __`Selective Disclosure`__: None. All information in the Ethereum state
machine is public. Selective disclosure could theoretically be achieved via
symmetric key encryption, but due to the permanent nature of the Ethereum
state machine transitions and the impermanent nature of cryptographic
protection, storing encrypted information directly in the Ethereum state
machine is ill advised.

### Performance Characteristics

* __`Consistency`__: Multiple block verifications. Eventual consistency is
guaranteed through multiple block verifications. Consistency of a freshly
committed block cannot be highly trusted until between 6-10 confirmations
(20-60 minutes after the first verification).

* __`System Availability`__: Multiple block verifications. Transactions are
not verified to a high degree of certainty until between 20 to 60 minutes
after the transaction occurs.

* __`Failure Tolerance`__: Longest chain wins. Eventual consistency during
arbitrary network partitioning. Mining allocation may cause one network
partition to gain blocks at a faster rate than other partitions. In these
cases, transactions are not very tolerant to failure depending on which
network partition a transaction is written to.

* __`Scalability`__: Block size, proof algorithm, and protocol GHOST and
CASPER. Maximum transaction speed is currently around 7-10 transactions per
second with a 1.7KB block size. Testnet has achieved 10-20 transactions per
second. Predicted future rates range between 10,000 to 100,000 transactions
per second.

* __`Latency`__: Multiple block verifications. Roughly 12-40 seconds to
propagate a transaction to 95% of all nodes. Transaction verifications take
between 20 to 60 minutes after a transaction occurs to be strongly trusted.

### Notable Features

* __`Contracts with a Turing-complete Programming Language`__: Executable code
that runs in the Ethereum state machine moving Ether and data around the state
machine. Ethereum Virtual Machine is turing-complete, allowing any program to
be written and executed.

* __`Asynchronous Multisignatures`__: Enables multi-signatures to be performed
asynchronously vs. Bitcoins requirement for a synchronous multi-signature (all
signatures must be submitted at the same time requiring out of band
coordination).

* __`Gas Fees`__: Turing-complete languages create systems with halting
problems (systems that could possibly execute a program forever - in an
endless loop, for example). Gas fees enforce an upper-bound on Contract
execution cost. Once a Contract’s gas runs out, it stops running, thus solving
the halting problem in Ethereum.

## Stellar

### Data Structures

#### LedgerHeader Format

| Field | Description | Size |
| --- | --- | --- |
| `ledgerVersion` | The protocol version of the ledger | 4 bytes |
| `previousLedgerHash` | Hash of the previous ledger header | 32 bytes |
| `scpValue` | What consensus agreed to | 808 bytes |
| `txSetResultHash` | The TransactionResultSet that led to this ledger | 32 bytes |
| `bucketListHash` | Hash of the ledger state | 32 bytes |
| `ledgerSeq` | Sequence number of this ledger | 4 bytes |
| `totalCoins` | Total number of stroops in existence. There are 10,000,000 stroops in 1 Stellar (XLM) - 1 Stellar is the unit of currency (e.g. U.S. Dollars). | 8  bytes |
| `feePool` | Fees burned since last inflation run | 8 bytes |
| `inflationSeq` | Inflation sequence number | 4 bytes |
| `idPool` | Last used global ID, used for generating objects | 8 bytes |
| `baseFee` | Base fee per operation in stroops | 4 bytes |
| `baseReserve` | Account base reserve in stroops | 4 bytes |
| `maxTxSetSize` | Maximum size a transaction set can be | 4 bytes |
| `skipList` | Hashes of ledgers in the past. allows you to jump back in time without walking the chain back ledger by ledger each slot contains the oldest ledger that is mod of either 50  5000  50000 or 500000 depending on index skipList[0] mod(50), skipList[1] mod(5000), etc. | 128 bytes |

#### Account Format

| Field | Description | Size |
| --- | --- | --- |
| `accountID` | Master public key for this account | 32 bytes |
| `balance` | Account balance in stroops |  8 bytes |
| `seqNum` | Last sequence number used for this account | 8 bytes |
| `numSubEntries` | Number of sub-entries this account has drives the reserve | 4 bytes |
| `inflationDest` | Account to vote for during inflation | 8 bytes |
| `flags` | Flags set on issuer accounts. TrustLines are created with authorized set to "false" requiring the issuer to set it for each TrustLine. Values may be `AUTH_REQUIRED_FLAG` (if set, the authorized flag in TrustLines can be cleared), otherwise, authorization cannot be revoked and the flag is `AUTH_REVOCABLE_FLAG`. If `AUTH_IMMUTABLE_FLAG` is set, causes all `AUTH_*` flags to be read-only. | 4-bytes |
| `homeDomain` | Can be used for reverse federation and memo lookup | 32 bytes |
| `thresholds` | Stores unsigned bytes: [weight of `master`:`low`:`medium`:`high`] | 4 bytes |
| `signers` | Possible signers for this account | 36 bytes per signer (720 bytes total) |

#### Transaction Format

| Field | Description | Size |
| --- | --- | --- |
| `sourceAccount` | Account used to run the transaction | 32 bytes |
| `fee` | The fee the sourceAccount will pay | 4 bytes |
| `seqNum` | Sequence number to consume in the account | 8 bytes |
| `timeBounds` | Validity range (inclusive) for the last ledger close time | 4 bytes (pointer to 16 byte data structure) |
| `memo` | Extra data carried along with the transaction. | 0-32 bytes |
| `operations` | Up to 100 operations associated with this transaction. | 8-N bytes (dependent on op code) |

### Security Characteristics

* __`Confidentiality`__: None. All information in the Stellar ledger is
public. Confidentiality is achieved by hashing data and placing it in the
blockchain or storing a pointer to off-chain data.

* __`Information Availability`__: Mirroring. In general, all non-generatable
information is highly mirrored and available at all times. It may be true that
some of the more recent information cannot be trusted until at least one block
confirmation can be done, which is a great improvement over permissionless
ledgers at the cost of having to trust a set of nodes in the network.

* __`Integrity`__: A single block verification. Information is accurate when a
ballot produces a new block.

* __`Non-repudiation`__: Digital signatures. All transactions are digitally
signed and are thus non-repudiable.

* __`Provenance`__: All transactions (instructions to the ledger) are
digitally signed. A replay of all transactions results in a full understanding
of a particular state’s provenance.

* __`Pseudonymity`__: Public keys are the primary identification mechanism in
the system and provide a certain level of pseudonymity. Court orders to
Stellar to fiat currency gateways can uncover the true identity of a person
using the system.

* __`Selective Disclosure`__: None. All information in the Stellar ledger is
public. Selective disclosure could theoretically be achieved via symmetric key
encryption, but due to the permanent nature of the Stellar ledger and the
impermanent nature of cryptographic protection, storing encrypted information
directly in the Stellar ledger is ill advised.

### Performance Characteristics

* __`Consistency`__: A single block verification. A single block verification
can be propagated in a number of seconds (12 seconds on average to reach 95%
of all nodes, up to 40 seconds to reach the other 5%).

* __`System Availability`__: A single block verification. Requests are
typically answered in under a minute.

* __`Failure Tolerance`__: Stellar Consensus Protocol. As long as trust lines
are allocated to maximize network connectivity, consensus will be achieved
even in the event of multiple node failures and network partitions. If, for
example, half of the network is separated from the other, the consensus
protocol no longer works but the likelihood of an event of that nature is
highly improbable.

* __`Scalability`__: Stellar Consensus Protocol. A single block can store 4
billion transactions, each with 100 transaction operations. The system is
theoretically capable of performing thousands of transactions per second with
the primary limiting factor being network speed and latency.

* __`Latency`__: A single block verification. A single block verification can
be propagated in a number of seconds (12 seconds on average to reach 95% of
all nodes, up to 40 seconds to reach the other 5%).

### Notable Features

* __`Stellar Consensus Protocol`__: An algorithm with a mathematical proof of
correctness for reaching consensus using quorum slices and assuming a certain
level of network connectivity.

* __`Trust Lines`__: The consensus mechanism in Stellar requires that an
entity running a node specify the other nodes in the system that it trusts.
This design choice results in a much faster consensus algorithm (instead of
using proof-of-work and proof-of-stake) with the drawback of making the system
permissioned instead of permission-less.

## IPFS

### Data Structures

#### Object Merkle DAG - IPFSLink

| Field | Description | Type |
| --- | --- | --- |
| `Name` | Name or alias of link. | `string` |
| `Hash` | Cryptographic hash of target. | `Multihash` |
| `Size` | Total size of target. | `int` |

#### Object Merkle DAG - IPFSObject

| Field | Description | Type |
| --- | --- | --- |
| `links` | Array of links. | Array of IPFSLinks |
| `data` | Opaque content data. | Array of bytes |

#### Other

Merkle DAG (directed acyclic graph) structures can be used to build many types
of other systems. Specialized structures exist for encrypted data, signed data,
and a number of versioned file system primitives.

### Security Characteristics

* __`Confidentiality`__: Hash-based obfuscation and encryption (limited
confidentiality). All information in the DHT is available to the peer-to-peer
network. Confidentiality may be achieved by using EncryptedObjects or storing
a pointer to data outside of IPFS.

* __`Information Availability`__: Peer-to-peer mirroring. The DHT and Merkle
DAG store data addressed by content hash. Various peer-to-peer strategies can
be used to find, send, receive, and store data.

* __`Integrity`__: Hash-based content-addressing. Content is stored in a
Merkle DAG and addressed by content hash. Individual data blocks can be
verified for hash correctness. Completeness of all data depends on having a
correct root with links to all data.

* __`Non-repudiation`__: Digital signatures. Data can be digitally signed and
thus non-repudiable.

* __`Provenance`__: Digital signatures and data versioning. While not a core
part of IPFS, these concepts could be layered on top to provide needed
provenance features.

* __`Pseudonymity`__: Public keys. Nodes use identities built from public keys
which could expose information about the person if cross-correlated. Data
itself is opaque and addressed by content hash. Without a known hash it may be
difficult to find and expose arbitrary data from the network.

* __`Selective Disclosure`__: None. All information in the DHT is public.
Selective disclosure could theoretically be achieved via symmetric key
encryption, but due to the permanent nature of the hashed data and the
impermanent nature of cryptographic protection, storing encrypted information
directly in the DHT is ill advised. Some protection is provided as it is
unlikely unknown peers would request arbitrary data by its specific hash value.

### Performance Characteristics

* __`Consistency`__: Peer-to-peer mirroring. Peer-to-peer network can be used
to ensure consistency between all network peers of required immutable data.

* __`Failure Tolerance`__: The peer-to-peer network is resistant to failure
when data is available from many peers and some network connectivity is
available.

* __`Scalability`__: BitSwap peer-to-peer protocol is similar to protocols
such as BitTorrent. Network topology, data locality, and BitSwap strategies
that peers use will will have an effect on scalability.

### Notable Features

* __`IPNS`__: Mutable naming system to compliment immutable IPFS objects.
Allows for easier human naming and references.

* __`Flexible Components`__: Components of the system can be changed depending
on performance, security, and other considerations. Standard interfaces allow
for changing of naming, data exchange, routing, and network transport
components.

## Blockstack

### Data Structures

#### Base Name Record Format

* __`name`__: the name itself

* __`value_hash`__: the hash of the name's associated profile

* __`sender`__: the scriptPubKey hex that owns this name (identifies ownership)

* __`sender_pubkey`__: (OPTIONAL) the public key

* __`address`__: the address of the sender

* __`block_number`__: the block number when this name record was created
(preordered for the first time)

* __`preorder_block_number`__: the block number when this name was last
preordered

* __`first_registered`__: the block number when this name was registered by
the current owner

* __`last_renewed`__: the block number when this name was renewed by the
current owner

* __`revoked`__: whether or not the name is revoked

* __`op`__: byte sequence describing the last operation to affect this name

* __`txid`__: the ID of the last transaction to affect this name

* __`vtxindex`__: the index in the block of the transaction.

* __`op_fee`__: the value of the last Blockstack-specific burn fee paid for
this name (i.e. from preorder or renew)

* __`importer`__: (OPTIONAL) if this name was imported, this is the importer's
scriptPubKey hex

* __`importer_address`__: (OPTIONAL) if this name was imported, this is the
importer's address

#### Base Namespace Format

* __`namespace_id`__: human-readable namespace ID

* __`namespace_id_hash`__: hash(namespace_id,sender,reveal_addr) from the
preorder (binds this namespace to its preorder)

* __`version`__: namespace rules version

* __`sender`__: the scriptPubKey hex script that identifies the preorderer

* __`sender_pubkey`__: if sender is a p2pkh script, this is the public key

* __`address`__: address of the sender, from the scriptPubKey

* __`recipient`__: the scriptPubKey hex script that identifies the revealer.

* __`recipient_address`__: the address of the revealer

* __`block_number`__: block number at which this namespace was preordered

* __`reveal_block`__: block number at which this namespace was revealed

* __`op`__: byte code identifying this operation to Blockstack

* __`txid`__: transaction ID at which this namespace was revealed

* __`vtxindex`__: the index in the block where the tx occurs

* __`lifetime`__: how long names last in this namespace (in number of blocks)

* __`coeff`__: constant multiplicative coefficient on a name's price

* __`base`__: exponential base of a name's price

* __`buckets`__: array that maps name length to the exponent to which to raise
'base' to

* __`nonalpha_discount`__: multiplicative coefficient that drops a name's
price if it has non-alpha characters

* __`no_vowel_discount`__: multiplicative coefficient that drops a name's
price if it has no vowels

#### Name Import Format

* [__`NameRecordFields`__](#base-namespace-format): All of the base Name
Record Format fields

* __`recipient`__: scriptPubKey hex that identifies the name recipient

* __`recipient_address`__: address of the recipient

#### Namespace Preorder Format

* __`namespace_id_hash`__: hash(namespace_id,sender,reveal_addr)

* __`consensus_hash`__: consensus hash at the time issued

* __`op`__: bytecode describing the operation (not necessarily 1 byte)

* __`op_fee`__: fee paid for the namespace to the burn address

* __`txid`__: transaction ID

* __`vtxindex`__: the index in the block where the tx occurs

* __`block_number`__: block number at which this transaction occurred

* __`sender`__: scriptPubKey hex from the principal that issued this preorder
(identifies the preorderer)

* __`sender_pubkey`__: if sender is a p2pkh script, this is the public key

* __`address`__: address from the scriptPubKey

#### Namespace Reveal Format

* [__`NamespaceFields`__](#base-namespace-format): All of the base Name Record
Format fields

#### Namespace Ready Format

* [__`NamespaceFields`__](#base-namespace-format): All of the base Name Record
Format fields

* __`ready_block`__: block number at which the namespace was readied

#### Name Preorder Format

* __`preorder_name_hash`__: hash(name,sender,register_addr)

* __`consensus_hash`__: consensus hash at time of send

* __`sender`__: scriptPubKey hex that identifies the principal that issued the
preorder

* __`sender_pubkey`__: if sender is a pubkeyhash script, then this is the 
public key

* __`address`__: address from the sender's scriptPubKey

* __`block_number`__: block number at which this name was preordered for the 
first time

* __`op`__: blockstack bytestring describing the operation

* __`txid`__: transaction ID

* __`vtxindex`__: the index in the block where the tx occurs

* __`op_fee`__: blockstack fee (sent to burn address)

#### Name Registration Format

* [__`NameRecordFields`__](#base-name-record-format): All of the base Name
Record Format fields

* __`recipient`__: scriptPubKey hex script that identifies the principal to
own this name

* __`recipient_address`__: principal's address from the scriptPubKey in the
transaction

#### Name Revoke Format

* [__`NameRecordFields`__](#base-name-record-format): All of the base Name
Record Format fields

#### Name Transfer Format

* [__`NameRecordFields`__](#base-name-record-format): All of the base Name
Record Format fields

* __`name_hash`__: hash(name)

* __`consensus_hash`__: consensus hash when this operation was sent

* __`keep_data`__: whether or not to keep the profile data associated with the
name when transferred

#### Name Update Format

* [__`NameRecordFields`__](#base-name-record-format): All of the base Name
Record Format fields

* __`name_hash`__: hash(name,consensus_hash)

* __`consensus_hash`__: consensus hash when this update was sent

### Security Characteristics

* __`Confidentiality`__: None. All information in the Bitcoin blockchain and
Blockstack virtualchain is public. Confidentiality could achieved by hashing
data and placing it in either blockchain, but the system is not designed or
intended to preserve confidentiality.

* __`Information Availability`__: Block mirroring. In general, all information
is highly mirrored and available at all times. It may be true that some of the
more recent information cannot be trusted until more block verifications are
performed.

* __`Integrity`__: Multiple block verifications. Information is accurate given
no blockchain forks. Integrity cannot be strongly trusted until at least 6+
verifications have been performed.

* __`Non-repudiation`__: Digital signatures. All transactions are digitally
signed and are thus non-repudiable.

* __`Provenance`__: At the Bitcoin layer via transaction inputs and outputs;
all transactions can be traced using block inputs and outputs. At the
Blockstack layer each virtualchain entry can be traced back to the Bitcoin
block it came from.

* __`Pseudonymity`__: Bitcoin: public keys are used as identifiers;
Blockstack: pseudonyms in .id namespace. All Bitcoin transactions use public
keys as identifiers (not legal names or identifiers). Pseudonymity may be
compromised via court orders to Bitcoin money transmitters to determine who
paid for particular inputs on Blockstack transactions. Blockstack entries in
the .id namespace are pseudonyms, but publication of personally identifiable
information is common practice typically leading to invalidation of
pseudonymity.

* __`Selective Disclosure`__: Bitcoin: None; Blockstack: encrypted data at
secret locations. All information in the Bitcoin blockchain and Blockstack
virtual chain and storage layer is public. Selective disclosure could
theoretically be achieved via symmetric key encryption, but due to the
permanent nature of the Bitcoin blockchain and Blockstack virtualchain and the
impermanent nature of cryptographic protection, storing encrypted information
directly on the Bitcoin blockchain or on the Blockstack virtualchain/storage
layer is ill advised. Blockstack profiles do have a mechanism where hashed
information may be stored at known locations and where access may be provided
to select entities with specific access keys.

### Performance Characteristics

* __`Consistency`__: Multiple block verifications. Eventual consistency is
guaranteed through multiple block verifications. Consistency of a freshly
committed block cannot be highly trusted until between 30 to 60 minutes after
the transaction.

* __`System Availability`__: Multiple block verifications. Transactions are
not verified to a high degree of certainty until between 30 to 60 minutes
after the transaction occurs.

* __`Failure Tolerance`__: Longest chain wins. Eventual consistency during
arbitrary network partitioning. Mining allocation may cause one network
partition to gain blocks at a faster rate than other partitions. In these
cases, transactions are not very tolerant to failure depending on which
network partition a transaction is written to.

* __`Scalability`__: Block size. Transaction speed is currently set at 7
transactions per second with a 1MB block size.

* __`Latency`__: Multiple block verifications. Transaction verifications take
between 30 to 60 minutes after a transaction occurs to be verified.

### Notable Features

* __`Fast Bootstrapping`__: Utilizes log checkpoints and skip lists to provide
fast bootstrapping/auditing for new nodes in the network (called Simple Name
Verification). Use of SNV provides new node bootup times of 1-2 hours vs. 2-4
days without SNV.

* __`Virtualchain`__: Layering a virtualized blockchain on top of an existing
blockchain (e.g. Blockstack on top of Bitcoin)

* __`Separation of Control/Routing/Data planes`__: Separation of control plane
(Bitcoin blockchain / Blockstack Virtualchain) from routing (DHT) from storage
(S3, IPFS, etc.)

## Hashgraph

### Data Structures

No implementation of hashgraph was available, so the hashgraph datastructure,
per the whitepaper is summarized below.

#### Gossip Event

The hashgraph consensus mechanism uses a gossip protocol. Whenever a member of
the hashgraph receives new information, it chooses another member at random and
communicates that information to it. This is called a “gossip event” and it is
stored a sequence of bytes that is digitally signed by its creator.

* __`peer_id`__: The network identifier for the peer that was gossipped with.

* __`self_parent_hash`__: The hash of the last local event prior to this one.

* __`other_parent_hash`__: The hash of the peer’s last event prior to this one.

* __`payload`__: An optional list of transactions created in this event.

* __`timestamp`__: Date and time of event creation.

* __`key_identifer`__: Identifier for the key that can verify the digital
signature.

* __`signature_algorithm`__: Algorithm for the digital signature.

* __`signature`__: The digital signature value.

### Security Characteristics

* __`Confidentiality`__: None. All information in the hashgraph is public.
Confidentiality could achieved by hashing data and placing only the hash in
the hashgraph (within a transaction), but the system is not designed or
intended to preserve confidentiality.

* __`Information Availability`__: Configurable. In general, all information is
highly mirrored and available at all times. However, hashgraph can also be
implemented such that only the effects of the transactions in a block need to
be remembered, the transactions themselves can be destroyed. Another option
uses signed states to allow events to be destroyed as well.

* __`Integrity`__: Consensus guaranteed with probability one and cannot be
changed once reached. Once a transaction enters the system, it cannot be
delayed and will be recorded in an order that cannot manipulated by
individuals. Shortly after recording, due to the gossip protocol, every member
will know the transaction’s place in history and that every other member also
knows the same place.

* __`Non-repudiation`__: Digital signatures. All events/transactions are
digitally signed and are thus non-repudiable.

* __`Provenance`__: The hashgraph is a history of all of the gossip events
that occurred in the network, in the order they occurred. Every event can be
traced back via ancestor hashes. However, the system also allows for event
payloads to be discarded, which would disallow tracking of individual
transactions. Another option also allows for events themselves to be destroyed
via signed states.

* __`Pseudonymity`__: Identifiers for parties to the transactions are
unspecified in the consensus algorithm. Pseudonymity could be implemented as a
separate layer.

* __`Selective Disclosure`__: All information in the hashgraph is public and
highly mirrored. Selective disclosure could theoretically be achieved via
encryption, but due to the permanent nature of the hashgraph and the
impermanent nature of cryptographic protection, storing encrypted information
directly in the hashgraph event payloads is ill advised. The hashgraph
consensus algorithm does allow the payloads to be destroyed with no influence
upon the consensus algorithm, but the information would still have been made
public and gossipped across the entire network.

### Performance Characteristics

* __`Consistency`__: Eventual consensus guaranteed with probability one and
cannot be changed once reached. Once a transaction enters the system, it
cannot be delayed and will be recorded in an order that cannot manipulated by
individuals. When members have different versions of the hashgraph, consensus
is reached via virtual voting (zero bandwidth required) in a few minutes with
no proof-of-work. Attackers must control less than one third of network.

* __`System Availability`__: Gossip protocol and virtual voting ensures quick
success/failure indication. Eventual consensus guaranteed with probability
one; forks are not possible under normal operation. Attackers cannot stop
message recording other than by eliminating internet access. DoS Resistant
without proof-of-work.

* __`Failure Tolerance`__: Strong Byzantine fault tolerance. Network will
continue to function properly when up to just under one third of the members
are attackers that collude, delete, or delay messages between honest members
with no bounds on delays. Consensus algorithm is asynchronous,
nondeterministic, and achieves Byzantine agreement with probability one.

* __`Scalability`__: Bandwidth. System is only limited by the amount of
bandwidth available to its members. Using a few megabits per second (typical
home connection) the network can support 4,000 transactions per second. Only
2-4% overhead added to messages for hashgraph protocol.

* __`Latency`__: Low. Virtual voting allows consensus to occur without network
communication. Communication of the hashgraph via the gossip protocol has low
overhead and gossip spreads exponentially amongst members. Events and
transactions can be discarded if desired whilst preserving consensus state.

### Notable Features

* __`Proof-of-stake`__: The voting power for each member does not have to be
equal; members could be given more power based on trust, based on number of
coins, or a system could allow power to be split when inviting new members.

* __`Signed State`__: Every time consensus is reached following a voting
round, the state of the hashgraph can be considered immutable up to that
round. This state can digitally signed and gossipped amongst members. Once
more than two-thirds of the population have collected signatures, the
information used to generate the state can be destroyed and the state can be
used as a new starting point.

---

```
This document, a part of the "Credentials on Public/Private Linked Ledgers"
project, has been funded in part by the United States Department of Homeland
Security's Science and Technology Directorate under contract HSHQDC-16-C-00058.
The content of this document does not necessarily reflect the position or the
policy of the U.S. Government and no official endorsement should be inferred.
```
