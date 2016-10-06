# Blockchain Extensions for Linked Data Signatures

***by Manu Sporny, Harlan Wood, Noah Thorp, Christopher Allen, and Dave Longley***

*A White Paper from Rebooting the Web of Trust III*

## Introduction

The term [Linked Data](https://en.wikipedia.org/wiki/Linked_data%20Linked%20Data) 
is used to describe a recommended best practice for exposing, sharing, and 
connecting information on the Web using standards, such as URLs, to identify 
things and their properties. When information is presented as Linked Data, 
other related information can be easily discovered and new information can be 
easily linked to it. Linked Data is extensible in a decentralized way, greatly 
reducing barriers to large scale integration.

With the increase in usage of Linked Data for a variety of applications, there 
is a need to be able to verify the authenticity and integrity of Linked Data 
documents. The [Linked Data Signatures specification](https://web-payments.org/specs/source/ld-signatures/) added authentication and integrity protection to linked data documents through the use of public/private key cryptography without sacrificing Linked Data features such as extensibility and composability.

Recently, there has been interest in extending Linked Data Signatures to 
support new use cases surfaced in the Blockchain and Verifiable Claims 
ecosystems. These use cases include:

 - Bitcoin-style [secp256k1](http://www.secg.org/sec2-v2.pdf) signatures
 - [Proof of Publication](https://web-payments.org/specs/source/pop2016/), 
   [Chainpoint](http://www.chainpoint.org/), and other Blockchain anchoring 
   use cases
 - Pure JSON normalization and clear-text signing algorithms
 - JOSE JSON Web Token-style signatures

This whitepaper explores various extensions to the Linked Data Signatures 
specification that are designed to support the use cases listed above.

## Support for secp256k1

Support for Bitcoin-style secp256k1 signatures would result in a signature 
block that looks like the following:

    "signature": {
      "type": "sha256-ecdsa-secp256k1-2016",
      "created": "2016-09-22T22:38:03Z",
      "creator": "bitcoin-address:1LGpGhGK8...rP4xWER",
      "domain": "example.com",
      "nonce": "ba9e0b95",
      "signatureValue": "IKwTJ...E37UsLgs="
      }

This signature would require the creation of a new 
[Linked Data Signature Suite](https://web-payments.org/specs/source/lds2016/) 
specification defining the following parameters:

 - canonicalizationAlgorithm - https://w3id.org/security#URDNA2015 defined in 
   [RDF-DATASET-NORMALIZATION]
 - digestAlgorithm - https://w3id.org/security#sha256 defined in 
   [RFC6234](https://tools.ietf.org/html/rfc6234)
 - signatureAlgorithm - http://w3id.org/security#secp256k1 defined in 
   [SEC2v2](http://www.secg.org/sec2-v2.pdf)

There are a few open questions that need to be discussed at Rebooting Web of Trust:

 - Are developers aware that the Universale RDF Dataset Normalization Algorithm 
   is executed when performing the digital signature?
 - Are developers comfortable with using a JSON-LD context with their data? Are 
   they aware that information that doesn't map is dropped? Should the JSON-LD 
   processors fail when information is dropped from signed data?
 - Is a Signature Suite named `sha256-ecdsa-secp256k1-2016` easy for developers 
   to remember?
 - Should the creator field (example: `bitcoin-address:1LGpGhGK8whX23ZNdxrgtjKrek9rP4xWER`) 
   be dereferenceable outside of the Bitcoin Blockchain?
 - Is the Security Vocabulary the best place to put the secp256k1 signature 
   algorithm term?

## Blockchain Anchoring

Blockchain anchoring techniques are used to prove that data existed at a 
specific point in time. These techniques cryptographically embed data in a 
blockchain by publishing a hash of the data in a blockchain transaction. By 
comparing the hash embedded in a blockchain with the hash of a set of data, 
it’s possible to verify that the data existed at a specific time.

Merkle trees are often used to store and hash the data, enabling large volumes 
of data to be stored into blockchains like the Bitcoin blockchain. These 
mechanisms, such as [Chainpoint](http://www.chainpoint.org/), are currently in 
the experimental standardization phase. It is possible to merge approaches like 
Chainpoint with Linked Data Signatures. The Linked Data Signatures 
[Proof of Publication](https://web-payments.org/specs/source/pop2016/) 
specification is one such approach, where the blockchain receipt may be 
embedded in the Linked Data Signature without any modification to 
the [LinkedDataSignature2016](https://web-payments.org/specs/source/lds2016/) 
signature suite.

Included is an example of a Proof of Publication style Linked Data signature:

    "signature": {
        "type": "LinkedDataSignature2015",
        "creator": "http://example.com/i/pat/keys/5",
        "created": "2011-09-23T20:21:34Z",
        "domain": "example.org",
        "nonce": "2bbgh3dgjg2302d-d2b3gi423d42",
        "merklePublicationProof": {
          "type": "PoP2016",
          "ledger": "bitcoin",
          "transactionId": "7ea0cef...ab781a7c28",
          "merkleRoot": "80ab86989...c31a6c14",
          "proof": [{
            "merkleParent": "f51cd07057a813...d8451b567",
            "merkleLeftSibling": "247911c6a...d636863ae45",
            "merkleRightSibling": "93ca67aea710...0b917299"
          }, {
            "merkleParent": "e6a881dd0af...684681bca",
            "merkleLeftSibling": "44c66b40237...e0fb9272",
            "merkleRightSibling": "93ca696fb9...66427399"
          ]
        },
        "signatureValue": "OGQzNGVkMz...ODIyOWM32NjI="
    }

There are a few open questions that need to be discussed at Rebooting Web 
of Trust:

 - Is there interest in supporting proof of publication in the signature block, 
   or are unsigned blockchain receipts good enough because the proof exists 
   in the blockchain itself?
 - Should blockchain receipts have digital signatures, or are digital 
   signatures on blockchain receipts redundant?
 - Is there interest in integrating Chainpoint 2.0 style receipts into the 
   signature block for Linked Data Signatures?

## JSON Normalized Clear Text Signatures

The [JSON Web Signatures](https://tools.ietf.org/html/rfc7515) (JWS) 
specification defines how one may perform digital signatures on a block of 
JSON data. While ideal for a number of use cases that require digital 
signatures, the approach is not a good fit for other use cases that require 
digital signatures. For example, data signed using JWS, called 
[JSON Web Tokens](https://tools.ietf.org/html/rfc7519) (JWT), are base-64 
encoded. This creates a number of problems for developers:

 - JWTs cannot be natively stored in document-based storage engines (like 
   MongoDB and CouchDB) without decoding them, which removes the digital 
   signature information
 - JWTs cannot be nested within each other easily, requiring multiple nested 
   base-64 encodings with duplicated data to support nested signatures
 - JWTs do not easily support multi-signature schemes, meaning that they can't 
   be chained together without duplicating the data for each chained signature
 - JWTs are not JSON, which most developers expect when publishing, consuming, 
   and working with data. While it's true that you can base-64 decode the 
   data, you then lose the signature and have to track it through some other 
   means if the signed object in question needs to be transmitted to a remote
   system.
 - You cannot express Linked Data in a syntax-agnostic way and are forced to 
   create a signature on a JSON-LD document, which binds the signature to the 
   JSON-LD syntax rather than making the signature more syntax agnostic.

Linked Data Signatures were originally designed to sign Linked Data and 
overcome the shortcomings of JWTs above. There have been several requests over 
the years to support clear JSON signatures, resulting in a signature block 
that looks like this:

    "signature": {
       "type": "JsonSignature2017",
       "created": "2017-01-02T12:11:54Z",
       "creator": "https://example.org/keys/123",
       "domain": "example.com",
       "nonce": "ba9e0b95",
       "signatureValue": "IKwTuQqTwz...IEBAE3sLgs="
     }

Doing so requires a new JSON Normalization Algorithm specification and a 
Signature Suite with the following properties:

 - canonicalizationAlgorithm - https://w3id.org/security#JNA2017 which needs 
   to be defined.
 - digestAlgorithm - https://w3id.org/security#sha256 defined in 
   [RFC6234](https://tools.ietf.org/html/rfc6234)
 - signatureAlgorithm - http://www.w3.org/2000/09/xmldsig#rsa-sha1
   defined in [RFC3447](https://tools.ietf.org/html/rfc3447)

There are a few open questions that need to be discussed at 
Rebooting Web of Trust:

 - Is this normalization mechanism desired by participants in the Workshop?
 - Is there a pre-existing JSON normalization algorithm that we should use as 
   the basis for the normalization specification?
 - The JOSE group strictly avoided JSON normalization, is there something we're 
   missing in attempting to provide such a mechanism?
 - Which use cases would require the use of this signature suite instead of 
   using the existing Linked Data Signature 2016 suite?

## JWT-style Linked Data Signatures

It has also been postulated that JWT-style digital signatures could be 
encapsulated in Linked Data Signatures producing a signature format that looks 
like the following:

"signature": {
    "type": "Jwt2017",
    "signatureValue":    "
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Rtdi\n
CJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJkaWQ6ZWJmZWIxZjcxMmVi\n
YzZmMWMyNzZlMTJlYzIxIiwiZW50aXR5Q3JlZGVudGlhbCI6eyJAY29udGV4dCI\n
6Imh0dHBzOi8vdzNpZC5vcmcvc2VjdXJpdHkvdjEiLCJpZCI6Imh0dHA6Ly9leG\n
FtcGxlLmdvdi9jcmVkZW50aWFscy8zNzMyIiwidHlwZSI6WyJDcmVkZW50aWFsI\n
iwiUHJvb2ZPZkFnZUNyZWRlbnRpYWwiXSwiaXNzdWVyIjoiaHR0cHM6Ly9kbXYu\n
ZXhhbXBsZS5nb3YiLCJpc3N1ZWQiOiIyMDEwLTAxLTAxIiwiY2xhaW0iOnsiaWQ\n
iOiJkaWQ6ZWJmZWIxZjcxMmViYzZmMWMyNzZlMTJlYzIxIiwiYWdlT3ZlciI6Mj\n
F9fX0.LwqH58NasGPeqtTxT632YznKDuxEeC59gMAe9uueb4pX_lDQd2_UyUcc6\n
NW1E3qxvYlps4hH_YzzTuXB_R1A9UHXq4zyiz2sMtZWyJkUL1FERclT2CypX5e1\n
fO4zVES_8uaNoinim6VtS76x_2VmOMQ_GcqXG3iaLGVJHCNlCu4"
  }

Doing so would require new JSON Normalization Algorithm specification and a 
Signature Suite with the following properties:

 - canonicalizationAlgorithm - https://w3id.org/security#JWT2017 which needs 
   to be defined.
 - digestAlgorithm - https://w3id.org/security#sha256 defined in
   [RFC6234](https://tools.ietf.org/html/rfc6234)
 - signatureAlgorithm - http://www.w3.org/2000/09/xmldsig#rsa-sha1
   defined in [RFC3447](https://tools.ietf.org/html/rfc3447)

This would raise the following open questions that would need to be discussed 
at Rebooting Web of Trust:

 - Is the ability to embed JWTs in a Linked Data Signature block desirable?
 - Is the duplication of the entirety of the content in the signature desirable?
 - Which use cases would require the use of this signature suite instead of 
   using the existing Linked Data Signature 2016 suite?

## Next Steps

In this paper, four extensions to the Linked Data Signatures specification 
have been introduced. The authors of the paper would like to explore each 
extension in more detail at the Rebooting Web of Trust III Workshop and 
produce one or more W3C-formatted specifications that summarize the state of 
findings during the course of the workshop.
