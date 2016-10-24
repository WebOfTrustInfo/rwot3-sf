# DID (Decentralized Identifier) Specification

**STATUS: Working Draft 03, 17 October 2016**

**Editors:**     Drummond Reed, Les Chasen

**Contributors:**    Christopher Allen, Manu Sporny, David Longley, Jason Law, Daniel Hardman, Markus Sabadello

*Note: Work on this specification has been funded in part by the United States Department of Homeland Security's Science and Technology Directorate under contract HSHQDC-16-R00012-H-SB2016-1-002. The content of this specification does not necessarily reflect the position or the policy of the U.S. Government and no official endorsement should be inferred.*

*Terms in* **bold** *are defined in the Terminology section.*

**Table of Contents**

[[TOC]]

# 1. Introduction

Conventional [identity management](https://en.wikipedia.org/wiki/Identity_management) systems are based on centralized authorities such as corporate [directory services](https://en.wikipedia.org/wiki/Directory_service), [certificate authorities](https://en.wikipedia.org/wiki/Certificate_authority), or [domain name registries](https://en.wikipedia.org/wiki/Domain_name_registry). From the standpoint of cryptographic trust verification, each of these centralized authorities serves as its own [root of trust](https://en.wikipedia.org/wiki/Trust_anchor). To make identity management work across these systems requires implementing [federated identity management](https://en.wikipedia.org/wiki/Federated_identity).

The emergence of **distributed ledger technology** (DLT), sometimes referred to as **blockchain** technology, provides the opportunity to implement fully **decentralized identity management** (DIDM). In DIDM, all participants with identities (called **identity owners**) share a common root of trust in the form of a globally distributed ledger (or a decentralized P2P network that provides similar capabilities). 

In a DIDM architecture, each identity owner can be identified on a ledger with a [key-value pair](https://en.wikipedia.org/wiki/Attribute%E2%80%93value_pair). The index key is a **decentralized identifier** (DID) and the value is its associated **DID description object** (DDO). Together these form a **DID record**. Each DID record is cryptographically secured by private keys under the identity owner’s control. Following the dictums of [Privacy by Design](https://en.wikipedia.org/wiki/Privacy_by_design), each identity owner may have as many DID records as necessary to respect the identity owner’s desired separation of identities, personas, and contexts.

This architecture not only eliminates dependence on centralized registries for identifiers, but also on centralized certificate authorities for key management as is typical of hierarchical [PKI (public key infrastructure](https://en.wikipedia.org/wiki/Public_key_infrastructure)). Instead each identity owner serves as its own root authority via its own DID record(s) on the shared ledger—an architecture called a [DPKI (decentralized PKI)](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust/blob/master/final-documents/dpki.pdf).

# 2. Purpose of this Specification

The purpose of this specification is to define the two logical components of DID records—DIDs and DDOs—in a manner capable of being implemented on any DLT or decentralized network capable of accepting DID records. It is out of scope for this specification to define the precise method by which DID records shall be implemented on any particular DLT or decentralized network—that is the job of a separate **DID method specification**.

Conceptually, the relationship of this specification and a DID method specification is similar to the relationship of the IETF generic URI specification ([RFC 3986](https://www.ietf.org/rfc/rfc3986.txt)) and a specific [URI scheme  specification](http://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml) (such as the http: and https: schemes specified in [RFC 7230](http://www.iana.org/go/rfc7230)). It is also similar to the relationship of the IETF generic URN specification ([RFC 2141](https://www.ietf.org/rfc/rfc2141.txt)) and a specific URN namespace definition (such as the UUID URN namespace defined in [RFC 4122](https://tools.ietf.org/html/rfc4122)). The key difference is that a DID method specification, in addition to specifying a specific DID scheme, must also specify the methods for reading, writing, and revoking DID records on the DLT or decentralized network for which it is written.

This specification defines the requirements of a conformant DID method specification. The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

# 2. Terminology and Acronyms

**Alias.** A hash of a conventional globally unique identifier based on traditional registry services, such as a mobile telephone number, an email address, or a URI ([Uniform Resource Identifier](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)). Aliases are a type of **NCID** used for **DID** discovery. See section 4.6.

**Blockchain.** A specific type of **distributed ledger technology** (DLT) that stores ledger entries in blocks for efficiency. Because this type of DLT was introduced by [Bitcoin](https://en.wikipedia.org/wiki/Bitcoin), the term "blockchain" is sometimes used to refer specifically to the Bitcoin ledger.

**CID.** Acronym for **cryptographic identifier**.

**Cryptographic identifier (CID).** A **DID** with specific cryptographic properties as defined by a **DID method specification**. A CID has an associated private key or signing key that can be used to verify ownership of the CID.

**Cryptonym.** Another name for a **CID**.

**Decentralized identifier (DID).** A globally unique identifier that does not require a centralized registration authority. The generic format of a DID is defined in this specification. A specific **DID scheme** is defined in a **DID method specification**. A DID may be either a **cryptographic identifier** (CID), a **non-cryptographic identifier** (NCID), or an **alias**. 

**Decentralized identity management (DIDM).** [Identity management](https://en.wikipedia.org/wiki/Identity_management) based on decentralized identifiers that do not require centralized authorities such as those required by [X.500 directory services](https://en.wikipedia.org/wiki/X.500), the [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System), national ID systems, etc.

**DDO.** Acronym for **DID descriptor object**. 

**DID.** Acronym for **decentralized identifier**. 

**DID descriptor object (DDO).** A JSON data structure containing metadata describing an identity owner, including the cryptographic key material required for the identity owner to prove ownership and control of the **DID record**. A DDO may also contain other [attributes](https://en.wikipedia.org/wiki/Attribute_(computing)) or [claims](https://en.wikipedia.org/wiki/Claims-based_identity) describing the identity owner.

**DID method.** A definition of how a specific **DID scheme** can be implemented on specific DLT or other decentralized network, including the precise method(s) by which DIDs and DDOs can be read, written, and revoked.

**DID method specification.** The specification for a specific **DID scheme** and **DID method** that is conformant with the requirements of this specification.

**DID record.** The combination of a **DID** and a **DDO** that forms the "root identity record" for an identity. From the standpoint of [claims-based identity](https://en.wikipedia.org/wiki/Claims-based_identity), a DID record is the “genesis claim” for an identity.

**DID scheme.** The formal syntax of a DID identifier. The generic DID scheme is defined in this  specification. A specific DID scheme that works with a specific **DID method** is defined in a **DID method specification**.

**DIDM.** Acronym for **decentralized identity management**.

**Distributed ledger technology (DLT).** A [distributed database](https://en.wikipedia.org/wiki/Distributed_database) in which the various nodes use a [consensus protocol](https://en.wikipedia.org/wiki/Consensus_(computer_science)) to maintain a shared ledger in which each transaction is cryptographically signed and chained to the previous transaction. See also **blockchain**.

**DLT.** Acronym for **distributed ledger technology**. 

**Identity owner.** The person, organization, or thing whose identity is represented by a **DID record**. (Note: this specification avoids the term "user" since an identity owner is not always an individual person.) Note that the identity owner may not be the director controller of the DID record; for example a parent may control the DID record(s) for a young child, but the child is the identity owner.

**Identity record.** Another name for a **DID record**.

**JSON-LD (JSON Linked Data).** A method of encoding [Linked Data](https://en.wikipedia.org/wiki/Linked_data) using JSON. JSON-LD enables object properties in a JSON document to be linked to concepts in an **RDF** [ontology](https://en.wikipedia.org/wiki/Ontology_(information_science)).

**Ledger.** In the context of this specification, a shared database of transactions maintained via **distributed ledger technology**.

**NCID.** Acronym for **non-cryptographic identifier**.

**Non-cryptographic identifier (NCID).** A **DID** that does not have any cryptographic properties. An NCID does not have an associated private key or signing key. A **UUID** is an example of an NCID.

**RDF.** Acronym for Resource Description Framework—a semantic graph model defined by the [W3C RDF Working Group](https://www.w3.org/2011/rdf-wg/).

**Relying party (RP).** The entity accepting a digital identity asserted by an identity owner.

**RP.** Acronym for **relying party**. 

**Service endpoint.** A network address at which a service operates on behalf of an identity owner. Examples of specific DIDM services include discovery services, authentication services, authorization services, interaction services, etc. A **DIDM** service endpoint may also be provided by a generalized data interchange protocol such as **XDI**.

**UUID.** Universally Unique Identifier as specified by [RFC 4122](https://www.ietf.org/rfc/rfc4122.txt).

**URI (Uniform Resource Identifier).** The standard identifier in Web architecture defined by IETF [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt).

**URN (Uniform Resource Name).** A URI intended to serve as a persistent, location-independent identifier of a resource, i.e, an identifier that will always represent the same resource (ideally forever).

**XDI.** Acronym for Extensible Data Interchange (also XRI Data Interchange)—a semantic graph format and semantic data interchange protocol defined by the [OASIS XDI Technical Committee](https://www.oasis-open.org/committees/xdi/).

# 3. Design Goals & Principles

This section summarizes the design goals and principles of DID architecture.

## 3.1. Decentralization

DID architecture should eliminate the requirement for centralized authorities or single points of failure in identity management, including the registration of globally unique identifiers, public verification keys, service endpoints, and other metadata.

## 3.2. Self-Sovereignty

DID architecture should give identity owners the power to directly own and control their own digital identities without the need to rely on external authorities.

## 3.3. Privacy

DID architecture should enable identity owners to control the privacy of their digital identities, including selective disclosure of attributes or other identity data.

## 3.4. Security

DID architecture should provide sufficient security for relying parties to rely on DID records to their required level of assurance.

## 3.5. Cryptography

DID architecture should enable an identity owner to provide cryptographic proof of ownership and proof of access control rights.

## 3.6. Discoverability

DID architecture should make it possible for entities to discover DID records for other entities to learn more about or interact with those entities.

## 3.7. Interoperability

DID architecture should use interoperable standards so DIDs and DID records can be used with the maximum number of existing systems.

## 3.8. Portability

DID architecture should be system-independent and enable identity owners to use their digital identities with any system that supports DIDs and DIDM.

## 3.9. Simplicity

To meet these design goals, DID architecture should be (to paraphrase Albert Einstein) "as simple as possible but no simpler".

## 3.10. Extensibility

When possible, DID architecture should enable extensibility provided it does not hinder interoperability, portability or simplicity.

# 4. DIDs (Decentralized Identifiers)

The foundation of DID architecture is the concept of the decentralized identifier. This concept is not new; the structure of [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier) (Universally Unique IDentifiers) was first developed in the 1980s and later became a standard feature of the Open Software Foundation’s [Distributed Computing Environment](https://en.wikipedia.org/wiki/Distributed_Computing_Environment). UUIDs achieve global uniqueness without a centralized registry service by using an algorithm that generates 128-bit values with sufficient entropy that the chance of collision are infinitesimally small. UUIDs are formally a URN (Uniform Resource Name) namespace specified in [IETF RFC 4122](https://tools.ietf.org/html/rfc4122).

However the UUID URN specification does not provide:

1. A standard mechanism for proving control and ownership of a UUID, or 

2. A standard method for resolving the UUID to discover more about or interact with the resource it identifies. 

This is the motivation for DIDs: a new type of decentralized URN that can have one or both of these additional properties. The abstract syntax of a DID is specified by the generic DID scheme defined in section 4.1. The concrete syntax of a specific DID scheme is defined in a DID method specification. A specific DID scheme MAY define up to three types of DIDs:

1. **CIDs** (cryptographic identifiers) are encodings, hashes, or other derivations of public keys or verification keys that have specific cryptographic properties.

2. **NCIDs** (non-cryptographic identifiers) do not have any cryptographic properties (a UUID is an example of an NCID).

3. **Aliases** are a subtype of NCIDs created from a hash of a conventional unique identifier, such as a mobile telephone number, email address, URI, etc.

Note that each of these DID types can serve as an index key (not to be confused with a cryptographic key) to a corresponding value, which is the DDO. A DID method specification MAY specify how the same DDO may be located by multiple DID index keys, i.e., multiple CIDs, NCIDs, or aliases.

## 4.1. The Generic DID Scheme

The generic DID scheme is a URI scheme conformant with [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt). Due to the limited character set, it also an IRI scheme conformant with [RFC 3987](https://www.ietf.org/rfc/rfc3987.txt). Following is an ABNF definition using the ABNF syntax defined in [RFC 5234](https://tools.ietf.org/html/rfc5234).

```
did                = "did:" method ":" specific-idstring [ "#" fragment ]
specific-idstring  = idstring *( ":" idstring )
method             = 1*idchar
idstring           = 1*idchar
idchar             = ALPHA / DIGIT / "." / "-"
```

See section 4.3 for the balance of the ABNF rules defining DID fragments.

## 4.2. Specific DID Schemes

A DID method specification MUST define exactly one specific DID scheme identified by exactly one method name (the method rule in section 4.1). Since DIDs are intended for decentralized identity infrastructure, it is NOT RECOMMENDED to establish a registry of unique DID method names. Rather the uniqueness of DID method names should be established via human consensus, i.e., a specific DID scheme MUST use a method name that is unique among all DID method names known to the specification authors at the time of publication. 

Since the method name is part of the DID, it SHOULD be as short as practical. A method name of four characters or less is RECOMMENDED. The method name MAY reflect the name of the DLT or decentralized network to which the DID method specification applies.

If needed, a specific DID scheme MAY define multiple specific ID formats (the specific-idstring rule in section 4.1). It is RECOMMENDED that a specific DID scheme define as few specific ID formats as possible.

## 4.3 DID Fragments

A DID—the decentralized identifier that uniquely represents an identity owner—is the entire identifier defined in the ABNF in section 4.1 WITHOUT the fragment identifier. The fragment identifier MUST NOT be considered part of the DID. The DID fragment identifier (the fragment rule in section 4.1) MUST be used only as a pointer into the DDO to identify a unique cryptographic key or other component of the DDO.

Following are the ABNF rules for a DID fragment identifier.

```
fragment      = *( pchar / "/" / "?" )
pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
pct-encoded   = "%" HEXDIG HEXDIG
sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
                 / "*" / "+" / "," / ";" / "="
```

Note that these rules are identical to the fragment rules in [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt), i.e., a DID fragment is identical to a URI fragment.

A specific DID scheme MAY specify ABNF rules for DID fragments that are more restrictive than the rules in this section.

## 4.4 DID Normalization

For the broadest interoperability, DID normalization should be as simple and universal as possible. Therefore:

1. DIDs MUST be case insensitive

2. DIDs SHOULD be normalized to lowercase.

If a specific DID scheme supports DID fragments, DID fragment normalization MUST be specified by the DID method specification.

## 4.5 DID Persistence

Ideally a DID would be a completely abstract decentralized dentifier (like a UUID) that can be bound to multiple underlying DLTs or decentralized networks over time, thus maintaining its persistence independent of any particular ledger or network. However because by definition a ledger- and network-independent DID can be registered on any number of ledgers or networks, it introduces extremely hard identity ownership and [start-of-authority](https://en.wikipedia.org/wiki/List_of_DNS_record_types#SOA) (SOA) problems. It also greatly increases implementation complexity for clients.

To avoid these issues, it is RECOMMENDED that DID method specifications only produce DIDs and DID methods bound to strong, stable ledgers or networks capable of making the highest level of commitment to persistence of the DID and DID method over time.

It is also RECOMMENDED to establish verifiable equivalence statements between DID records representing the same identity owner on multiple ledgers or networks. Such equivalence statements can produce the practical equivalent of a single persistent abstract DID. DID equivalence statements are addressed in section 5.2.

## 4.6. Aliases

DIDs achieve global uniqueness without the need for a central registration authority. However, as [Zooko’s Triangle](https://en.wikipedia.org/wiki/Zooko%27s_triangle) illustrates, this comes at the cost of human memorability. In some use cases, it is desirable to be able to discover the DID record for an identity owner from a conventional address for the owner, such as a mobile telephone number, an email address, a Twitter handle, a URI, etc.

An **alias** is a DID created from a hash of a conventional address. If a specific DID scheme supports aliases, the DID method specification MUST specify: a) the target identifier scheme, b) the normalization algorithm, and c) the hashing algorithm required to produce the alias. Also, because the conventional address is registered with a centralized registration authority, an identity owner MUST prove ownership of an alias prior to registration. The governance rules for this requirement MUST be specified in the DID method specification.

Aliases represent a tradeoff between convenience and privacy. When a DID record is indexed by one or more aliases, it enables discovery by parties who know the conventional address. Because it is a hash, it does not reveal the conventional address directly, however this is relatively weak privacy protection because an alias can be easily discovered via dictionary attacks. Therefore it is RECOMMENDED that if a DID method specification supports aliases:

1. An alias only be used to index a DID record with the permission of the identity owner.

2. Lookups on an alias should be subject to access controls that meet the identity owner’s privacy requirements.

3. Alternately, an additional password or passkey should be combined with the conventional address prior to hashing to allow the identity owner to control who can generate the alias and thus use it to discover the associated DID.

# 5. DDOs (DID Descriptor Objects)

If a DID is the index key in a [key-value pair](https://en.wikipedia.org/wiki/Attribute%E2%80%93value_pair), the DDO is the value to which the index key points. A fundamental goal of this specification is to define DIDs and DDOs such that a DID will always returns a valid DDO regardless of the underlying DLT or decentralized network for which the DID method is defined. This enables the same layer of interoperable root identity objects to operate across all DLTs and decentralized networks that support DIDs.

For enable this interoperability, a DDO is specified as a single JSON object conforming to [RFC 7159](https://tools.ietf.org/html/rfc7159). For purposes of this version of the DID specification, the format of this JSON object is specified in [JSON-LD](http://json-ld.org/), a format for mapping JSON data into the RDF semantic graph model as defined by the [W3C JSON-LD 1.0 specification](https://www.w3.org/TR/json-ld/). Future versions of this specification MAY specify other semantic graph formats for a DDO such as JXD (JSON XDI Data), a serialization format for the XDI graph model as defined by the [OASIS XDI Core 1.0 specification](http://docs.oasis-open.org/xdi/xdi-core/v1.0/csd01/xdi-core-v1.0-csd01.xml).

The following sections define the members of this JSON object, including whether these members are required or optional.

## 5.1. Context (Required)

JSON objects in JSON-LD format must include a JSON-LD context statement. The rules for this statement are:

1. A DDO MUST have exactly one top-level context statement.

2. This statement MUST be the first line in the JSON object. (This is not strictly necessary under JSON-LD but is required for DDOs.)

3. The key for this member MUST be @context.

4. The value of this key MUST be the URL specified in the example below.

Example:
```
{
    "@context": "[TODO-specify-canonical-URL-for-JSON-LD-DDOs]"
}
```
## 5.2. Primary DID (Required)

This primary DID is the primary index key for the DDO. The rules for a primary DID are:

1. A DDO MUST have exactly one member representing the primary DID.

2. The key for this member MUST be id.

3. The value of this key MUST be a valid DID according to a specific DID scheme as defined in section 4.

Example:
```
{
    "id": "did:sov:21tDAKCERh95uGgKbJNHYp"
}
```
## 5.3. Equivalent DIDs (Optional)

An equivalent DID is an additional index key for the DDO. Under the RDF OWL graph model, this is a DID that has [an owl:sameAs relationship](https://www.w3.org/TR/owl-ref/#sameAs-def) with the primary DID. Under the XDI graph model, it is an XDI address that has [an XDI $is identity equivalence relationship](http://docs.oasis-open.org/xdi/xdi-core/v1.0/csd01/xdi-core-v1.0-csd01.xml#idp140693356323016) with the primary DID.

The rules for equivalent identifiers are:

1. A DDO MUST have zero or one member representing an array of equivalent DIDs.

2. The key for this member MUST be equiv-id.

3. The value of this key MUST be an array.

4. The values in this array MUST be valid DIDs according as defined in section 4.

Example:
```
{
    "equiv-id": [
        "did:sov:33ad7beb1abc4a26b89246",
        "did:sov:f336a645f5a941b7ab8oac"
    ]
}
```
[OPEN ISSUE: Should equivalent DIDs be limited to DIDs that use the same method as the primary DID—and thus must registered in the same DLT or network? If not, how do we define the relationship of an equivalent DID to a DID proved with Proof of Publication member per section 5.6?]

## 5.4. Proof of Ownership (Optional)

Proof of Ownership is the mechanism by which an identity owner can cryptographically prove ownership of a DID. This is indicated by publication of a public key or verification key. Note that Proof of Ownership is separate from Proof of Control because an identity owner may wish to enable other entities to update the DDO (for example, to assist with key recovery) without enabling them to prove ownership (and thereby be able to impersonate the identity owner).

The rules for Proof of Ownership are:

1. A DDO MUST have exactly one member for providing Proof of Ownership. [OPEN ISSUE: should this be singular or muttiple—see below.]

2. The key for this member MUST be "verkey". [OPEN ISSUE: should this be “pubkey” or “public-key”?]

3. The value of this key MUST be a public key or verification key as defined by the DID method specification for the primary DID.

Example:
```
{
    "verkey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCABMC"
}
```
[OPEN ISSUE: Should a DDO allow multiple verkeys for Proof of Ownership? If so, is the method for referencing a specific verkey based on using a DID fragment? See an example at [https://authorization.io/dids/did:0768f21b-5371-4726-b784-17707bc8deca](https://authorization.io/dids/did:0768f21b-5371-4726-b784-17707bc8deca). Note that this example actually uses a path and not a fragment.]

[OPEN ISSUE: Should each DID method specification be able to define its own verkey or public key expression format(s)?]

[OPEN ISSUE: Do we need to distinguish between Proof of Ownership and Proof of Possession?]

## 5.5. Proof of Control (Optional)

Proof of Control is the mechanism by which an identity owner can give itself or other entities permission to update the DDO (for example to assist with key recovery) without being able to prove ownership. Like Proof of Ownership, Proof Of Control is indicated by publication of one or more public keys or verkeys.

To give identity owners maximum flexibility for key recovery, Proof of Control SHOULD support both multiple keys and [multisignatures](https://en.wikipedia.org/wiki/Multisignature). 

The rules for Proof of Control using multiple keys are:

1. A DDO MUST have exactly member representing an array of public keys or verkeys for providing Proof of Control.

2. The key for this member MUST be control.

3. The value of this key MUST be an array.

4. The values in this array MUST be either:

    1. The string "self".

    2. A public key or verification key as defined by the DID method specification for the primary DID.

5. If one of the values of this array is "self", then any key in the verkey member specified in section 5.4 MUST be considered valid for Proof of Control.

Example:
```
{
    "control": [
        "self",
        "did:sov:bsAdB81oHKaCmLTsgajtp9AoAHE9ei4",
        "did:sov:21tDAKCERh95uGgKbJNHYpE8WEogrsf"
    ]
}
```
[OPEN ISSUE: Do we define an optional threshold of signatures required if there are multiple keys listed?]

[OPEN ISSUE: How do we want to define multisig?]

## 5.6. Proof of Publication (Optional)

Proof of Publication is the mechanism by which an identity owner can prove that it also owns one or more DIDs that use other DID methods (and thus may be registered on other DLTs or decentralized networks). Proving equivalence across DLTs is a powerful way to maintain persistence of an identity independent of an underlying DLT or network.

[OPEN ISSUE: How should a DDO show proof of publication of equivalent DIDs on other blockchains?]

## 5.7. Service Endpoint References (Optional)

After publication of cryptographic key material, the other primary purpose of DID records is to enable discovery of service endpoints for the identity owner. A service endpoint may represent any type of service the identity owner wishes to advertise, including DIDM services for further discovery, authentication, authorization, or interaction.

The rules for service endpoints are:

1. A DDO MUST have zero or one member representing service endpoints.

2. The key for this member MUST be "service".

3. The value of this key MUST be a nested JSON object.

4. In this nested JSON object, each member MUST have a key representing the name of a service established in the JSON-LD context map.

5. The value of this key MUST be a valid IRI conforming to [RFC 3987](https://www.ietf.org/rfc/rfc3987.txt) that represents the service endpoint.

Example:
```
{
    "service": {
        "openid": "https://openid.example.com/456",
        "xdi": "https://xdi.example.com/123"
    }
}
```
## 5.8. Identity Type (Optional)

An identity type is a semantic assertion about the type of resource an identity owner represents (i.e., a person, an organization, a type of thing). 

The rules for an identity type are:

5. A DDO MUST have zero or one member representing an identity type.

6. The key for this member MUST be type.

7. The value of this key MUST be either:

    1. A valid IRI conforming to [RFC 3987](https://www.ietf.org/rfc/rfc3987.txt) that represents identity type.

    2. A valid XDI address conforming to [XDI Core 1.0](http://docs.oasis-open.org/xdi/xdi-core/v1.0/xdi-core-v1.0.html) that represents the identity type.

Example:
```
{
    "type": "http://schema.org/Person"
}
```
## 5.9. Creator (Optional Unless No Proof of Ownership)

In certain cases, one identity owner (called the creator) may provision an identity record for another identity owner who is not in a position to hold or control the necessary cryptographic keys (such as a parent creating an identity record for a young child). In this case, there are no verkeys to represent the ultimate identity owner. So the DDO needs to express the identity of the creator.

The rules for a creator are:

1. A DDO MUST have zero or one member representing a creator.

2. The key for this member MUST be creator.

3. The value of this key MUST be a valid DID as defined in section 4.

Example:
```
{
    "creator": "did:sov:21tDAKCERh95uGgKbJNHYpE8WEogrsf"
}
```
## 5.10. Created (Optional)

Standard metadata for identity records includes a timestamp of the original creation. The rules for including a creation timestamp are:

1. A DDO MUST have zero or one member representing a creation timestamp.

2. The key for this member MUST be created.

3. The value of this key MUST be a valid XML datetime value as defined in section 3.3.7 of [W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes](https://www.w3.org/TR/xmlschema11-2/).

4. This datetime value MUST be normalized to UTC 00:00 as indicated by the trailing "Z".

Example:
```
{
    "created": "2002-10-10T17:00:00Z"
}
```
[OPEN ISSUE: Is a "created" timestamp RECOMMENDED?]

## 5.11. Updated (Optional)

Standard metadata for identity records includes a timestamp of the most recent change. The rules for including a updated timestamp are:

1. A DDO MUST have zero or one member representing an updated timestamp.

2. The key for this member MUST be updated.

3. The value of this key MUST be a valid XML datetime value as defined in section 3.3.7 of [W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes](https://www.w3.org/TR/xmlschema11-2/).

4. This datetime value MUST be normalized to UTC 00:00 as indicated by the trailing "Z".

Example:
```
{
    "updated": "2016-10-17T02:41:00Z"
}
```
[OPEN ISSUE: Is an "updated" timestamp RECOMMENDED?]

## 5.12. Signature (Required)

The signature is cryptographic proof of the validity of the DDO according to either:

1. The verkey of the identity owner as defined in section 5.4, or if not present:

2. The verkey of the DID creator as defined in section 5.9.

The rules for a signature are:

1. A DDO MUST have zero or one member representing a signature.

2. The key for this member MUST be signature.

3. The value of this key MUST be a valid JSON-LD signature as defined by [OPEN ISSUE: need current reference]

[OPEN ISSUE: Need to specify any additional rules for applying an JSON-LD signature.]

Example:
```
{
    "signature": {
        "type": "LinkedDataSignature2015",
        "created": "2016-02-08T16:02:20Z",
        "creator": "did:76d0cdb7-9c75-4be5-8e5a-e2d7a35ce907/keys/1",
        "signatureValue": "QNB13Y7Q9oLlDLL6AHyL31OE5fLji9DwJSA8qnv81oRaKonij8m+Jv4XdiEYvJ97iRlzKU/92/0LafSL5JftEgl960DLcbqMFxOtbAmFOIMa7eDcrgTL5ytXeYCYKLjHQG3s8a3UKDKRuEK54qK1G5hGKGoLgAVa6xgcDLjW7M19PEJV/c3HpGA7Eez6VFMoTt4yESjZvOXC97xN3KpshOx2HT/btgUbo0XjA1Oi0QHdgrLcUsQGt6w23RjeSToalrsA1G69OFeN2OiQrz9Jb4561hvKLSyWObwRmS6n5Vgr5xkvUm6MONRq0Vg33kXevoVM64KTBkISul61tzjn4w=="
    }
}
```
# 6. DID Operations

To enable the full functionality of DIDs and DDOs on a particular DLT or decentralized network (called the *target system*), a DID method specification MUST specify how each of the following [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations is performed by a client. Each operation MUST be specified to the level of detail necessary to build and test interoperable client implementations with the target system.

Note that, due to the specified contents of DDOs, these operations can effectively be used to perform all the operations required of a CKMS (cryptographic key management system), e.g.:

* Key registration

* Key replacement

* Key rotation

* Key recovery

* Key expiration

## 6.1. Create

The DID method specification MUST specify how a client creates a DID record—the combination of a DID and its associated DDO—on the target system, including all cryptographic operations necessary to establish proof of ownership.

## 6.2. Read/Verify

The DID method specification MUST specify how a client uses a DID to request a DDO from the target system, including how the client can verify the authenticity of the DDO.

## 6.3. Update

The DID method specification MUST specify how a client can update a DID record on the target system, including all cryptographic operations necessary to establish proof of control.

## 6.4. Delete/Revoke

Although a core feature of distributed ledgers is immutability, the DID method specification MUST specify how a client can revoke a DID record on the target system, including all cryptographic operations necessary to establish proof of control.

# 7. References

[RFC-KEYWORDS] Key words for use in RFCs to Indicate Requirement Levels. IETF RFC 2119. [https://www.ietf.org/rfc/rfc2119.txt](https://www.ietf.org/rfc/rfc2119.txt) 

[ABNF] Augmented BNF for Syntax Specifications: ABNF. IETF RFC 5234. [https://tools.ietf.org/html/rfc5234](https://tools.ietf.org/html/rfc5234) 

[SBIR-TOPIC] Applicability of Blockchain Technology to Privacy Respecting Identity Management. U.S Department of Homeland Security Small Business Innovation Research Grant. [https://www.sbir.gov/sbirsearch/detail/867797](https://www.sbir.gov/sbirsearch/detail/867797) 

[SBIR-SUBMISSION] Respect Network submission for DHS SBIR topic on the Applicability of Blockchain Technology to Privacy Respecting Identity Management. Respect-Network-HSHQDC-16-R00012-H-SB2016-1-002

[URI] Uniform Resource Identifiers. IETF RFC 3986. [https://www.ietf.org/rfc/rfc3986.txt](https://www.ietf.org/rfc/rfc3986.txt) 

[IRI] Internationalized Resource Identifiers. IETF RFC 3987. [https://www.ietf.org/rfc/rfc3987.txt](https://www.ietf.org/rfc/rfc3987.txt) 

[UUID] A Universally Unique IDentifier (UUID) URN Namespace. IETF RFC 4122. [https://www.ietf.org/rfc/rfc4122.txt](https://www.ietf.org/rfc/rfc4122.txt) 

[JSON] The JavaScript Object Notation (JSON) Data Interchange Format [https://tools.ietf.org/html/rfc7159](https://tools.ietf.org/html/rfc7159) 

[JSON-LD] JSON-LD 1.0. [http://www.w3.org/TR/json-ld/](http://www.w3.org/TR/json-ld/) 

[VCTF] W3C Verifiable Claims Task Force. [http://opencreds.org/specs/source/claims-data-model/#expressing-entity-credentials-in-json](http://opencreds.org/specs/source/claims-data-model/#expressing-entity-credentials-in-json)

[XDI-CORE] OASIS  XDI Core 1.0 Specification Working Draft 01  [http://docs.oasis-open.org/xdi/xdi-core/v1.0/csd01/xdi-core-v1.0-csd01.xml](http://docs.oasis-open.org/xdi/xdi-core/v1.0/csd01/xdi-core-v1.0-csd01.xml) 

[XML-DATETIME] W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes. W3C Recommendation. [https://www.w3.org/TR/xmlschema11-2/](https://www.w3.org/TR/xmlschema11-2/) 

# Appendix A: The Sovrin DID Method

Sovrin is a public permissioned ledger for self-sovereign identity governed by the global non-profit [Sovrin Foundation](http://www.sovrin.org/). This appendix is the beginning of the DID method specification for the Sovrin DID method.

## A.1. The Sovrin DID Scheme

The Sovrin DID scheme is defined by the following ABNF:
```
sovrin-did    = "did:sov:" idstring
idstring      = 22*22char
char          = ALPHA / DIGIT
```
This means all Sovrin DIDs are exactly 22 characters representing a [base58Check encoding](https://en.bitcoin.it/wiki/Base58Check_encoding) of the first 16 bytes of a 256 bit [Ed25519](https://ed25519.cr.yp.to/) verification key (the public portion of the key pair).

## A.2. Verification Keys

It is impossible to tell from a Sovrin DID alone whether it is a CID or NCID. Rather the associated DDO MUST be checked to determine one of three options for the associated verification key (**verkey**).

1. **Empty.** In this case, the DDO does not contain a verkey, and the DID is an NCID. In this case, the creator of the Sovrin identity record (called a trust anchor) controls the identifier, and no independent proof-of-existence is possible until the DDO is updated to contain either an Abbreviated or Full verkey.

2. **Abbreviated.** In this case, the DDO contains a verkey starting with a tilde '~' followed by 22 characters. The tilde indicates that the DID itself represents the first 16 bytes of the verkey, and the string following the tilde represent the second 16 bytes of the verkey, both using [base58 encoding](https://en.wikipedia.org/wiki/Base58) with the Bitcoin alphabet.

3. **Full.** In this case, the DDO contains a full 44 character verkey, representing a [base58 encoding](https://en.wikipedia.org/wiki/Base58) of all 32 bytes of a [Ed25519](https://ed25519.cr.yp.to/) verification key.

Note that an abbreviated verkey has one security benefit when it is first created: there is a provable binding between the DID and the DDO at the time of registration. However this could also be accomplished by having the Sovrin client signing a nonce, or by some other cryptographic handshake defined by a DID method specification.

In any case, a Sovrin client MUST NOT ever rely on an abbreviated key by itself. The client MUST always check with the Sovrin ledger to ensure that the client has the most current DDO associated with a Sovrin DID.

## A.3. Sovrin DID Operations

### A.3.1. Create

[TODO]

### A.3.2. Read/Verify

[TODO]

### A.3.3. Update

[TODO]

### A.3.4. Delete/Revoke

[TODO]

# Appendix B: Example DDO

This is an example DDO conformant with this specification. The DIDs in this example are defined by the Sovrin DID method in Appendix A.
```
{
    "@context": "https://example.org/did/v1",
    "id": "did:sov:21tDAKCERh95uGgKbJNHYp",
    "equiv-id": [
        "did:sov:33ad7beb1abc4a26b89246",
        "did:sov:f336a645f5a941b7ab8oac"
    ],
    "verkey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCABMC",
    "control": [
        "self",
        "did:sov:bsAdB81oHKaCmLTsgajtp9AoAHE9ei4",
        "did:sov:21tDAKCERh95uGgKbJNHYpE8WEogrsf"
    ],
    "service": {
        "openid": "https://openid.example.com/456",
        "xdi": "https://xdi.example.com/123"
    },
    "type": "http://schema.org/Person",
    "creator": "did:sov:21tDAKCERh95uGgKbJNHYpE8WEogrsf",
    "created": "2002-10-10T17:00:00Z",
    "updated": "2016-10-17T02:41:00Z",
    "signature": {
        "type": "LinkedDataSignature2015",
        "created": "2016-02-08T16:02:20Z",
        "Creator": "did:sov:21tDAKCERh95uGgKbJNHYpE8WEogrsf/keys/1",
        "signatureValue": "IOmA4R7TfhkYTYW87z640O3GYFldw0yqie9Wl1kZ5OBYNAKOwG5uOsPRK8/2C4STOWF+83cMcbZ3CBMq2/gi25s="
    }
}
```
