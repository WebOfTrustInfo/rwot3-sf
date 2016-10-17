# Privacy Preserving Web Identity Architectures

***by Anonymous (no, not that Anonymous, the other one)***
_-- Dave Longley, Manu Sporny, Christopher Allen, Drummond Reed, and Marta Piekarska_

*A White Paper from Rebooting the Web of Trust III*

## Abstract

It is important to be wary of the privacy implications and trade-offs of
verifiable attribute, claim, and attestation systems. As with other ecosystems,
different design decisions lead to different trade-offs. There is rarely one
solution to a particular problem. Rather there tend to be a handful of
solutions that make different trade-offs. This paper focuses on how privacy
may be preserved using two different designs: same-origin identity and
self-sovereign identity. We briefly analyze the trade-offs that come with each
design approach in an attempt to progress a conversation in the community
related to the appropriate path forward for a particular set of use cases.

## Problem

There is no widely used, privacy-preserving, standard protocol for sharing
verifiable claims that cuts across industries and market verticals.

## Terminology

A **claim** is the expression of one or more attributes about an entity.

A **verifiable claim** is a claim whose authorship can be cryptographically
asserted.

## Introduction

The general use case for sharing verifiable claims on the Web is as follows:

You visit domain A and you need a verifiable claim from domain B in order to
access some service.

In this use case, you’re trying to prove to one party that another party
(that they trust) believes something is true about you -- or that you have a
certain "identity". In order to talk about a particular identity, computers
typically assign an identifier (like an email address or UUID) to it. In order
to give the identity meaning, entities may associate a variety of attributes
with the identifier (such as name, place of residence, etc.).

You may decide  to make this identifier public or keep some aspects of it
private. Designers of identity systems are often concerned with making sure
you’re aware of which aspects are public and which are private -- and this can
be very difficult to do. Depending on how identifiers are handled between
computer systems, unintentional correlations may become possible, potentially
revealing more information about your identities than you intended.

There are two emerging schools of thought on how to address the use case.
Both schools take a layered approach to solving the problem and both are
interested in protecting privacy. The foundational layer in each school
sets out core principles for identity that result in effects in how
identity interactions may occur and constraints upon the software that
must exist to enable them.

As each school relies upon different core principles, we must be careful to
not assume that a school has no concern for certain values, such as protecting
privacy. Rather, each approach has different advantages and disadvantages by
pushing complexity in different directions.

## Approach One: Same Origin Identity

This school of thought is employed primarily in the Web browser and FIDO
security model.

### Core Principles

  * Never create long lived, cross domain identifiers.
  * Identifiers must always be uniquely tied to a particular domain,
    never shared across domains, thus prohibiting any possibility
    for undue privacy-harming correlation.
  * Assume that many users lack the knowledge or experience to adequately
    protect their own privacy. Note that this assumption does not address
    collusion across domains (e.g. correlating based on email address).
  * All layers in this approach must adhere to and build on top of this
    foundational principle.

### Addressing the Use Case

When you visit domain A, it will generate a random identifier that you take
to domain B. Then, domain B will associate attributes with the random
identifier and digitally sign this information, handing it back to you.
You present this verifiable claim to domain A and get access to your
desired service.

The benefits of this approach include:

  * There is no way for domain A or domain B to correlate the identifier
    with anything other than the information it already knows.
  * Domain B does not directly learn about the user’s decision to share
    information with domain A.
  * Users that do not understand the complexities of correlating identifiers
    cannot harm themselves.
  * Revocation is privacy preserving and can be implemented via short timeouts.

The drawbacks of this approach include:
  * Domain B must have highly available infrastructure in order to ensure
    that you can get access to domain A.
  * Domain A is dependent upon domain B implementing highly available
    infrastructure in order to authenticate and service its users.
  * The user does not get to use the claims made about them by domain B
    independently of (without interaction with) domain B. In other words,
    claims made about a user are not easily aggregated and made available
    for independent reuse; rather a user’s identity information is fractured
    across main domains or “identity providers”.
  * For public identities, there exists no common correlatable identifier
    for claims from different domains. User interaction or published
    correlation maps are required to share public claims.

## Approach Two: Self-sovereign Identity

### Core Principles

  * Identifiers must have independent existence from any particular domain;
    users must have control over their identity, without fear of losing it.
  * Management of identities should be simple and not spread across many
    websites. Identifiers can therefore be long lived and travel across domains.
  * If publicly accessible infrastructure is required to ensure people
    have and control independent identifiers, that’s fine, so long as layers
    can be added to blind identifiers for greater privacy.
  * Start simple, rely on shared infrastructure, and add layers to support
    private/anonymized identity.
  * Trusted third parties may provide additional infrastructure to blind
    identifiers as needed.
  * Rely on software solutions in higher layers to help users make safe choices.

### Addressing the Use Case

As users have more choice (at a cost of having to understand the choices),
there are two options.

Option #1: When you visit domain A you directly hand over a digitally signed
verifiable claim from domain B.

The benefits of this approach include:
  * No interaction with domain B is necessary.
  * Domain B does not learn about the user’s decision to share information
    with domain A.
  * Domain B does not need highly available infrastructure.
  * Domain A is not dependent on domain B implementing highly available
    infrastructure.
  * Revocation can be privacy preserving through the use of a highly
    available ledger running on shared infrastructure.

The drawbacks of this approach include:
  * Privacy-harming correlation is possible with the identifier in the
    verifiable claim. This isn’t a problem for a publicly used identifier,
    but it is for a private one.
  * Users may not understand that correlations can be made and need some
    level of assistance to avoid potentially harming themselves.

Option #2: When you visit domain A, you give your pre-digitally signed
verifiable claim from domain B to a trusted third party. That third party
verifies the signature, anonymizes your identifier, and places their own
signature on the claim before passing it back to you to hand to domain A.

The benefits of this approach include:
  * There is no way for domain A or domain B to correlate the identifier
    with anything other than the information it already knows.
  * No interaction with domain B is necessary.
  * Domain B does not directly learn about the user’s decision to share
    information with domain A.
  * Domain B does not need highly available infrastructure.
  * Domain A is not dependent on domain B implementing highly available
    infrastructure.
  * Users that do not understand the complexities of correlating identifiers
    cannot harm themselves.
  * Revocation can be privacy preserving through the use of a highly
    available ledger running on shared infrastructure.
  * Third party verifiers can add value to the ecosystem, providing highly
    available infrastructure, privacy protection, and trustworthiness.

The drawbacks of this approach include:

  * Third party verifiable learns of your information and can correlate
    identifiers. However, their viability as a service depends on their
    trustworthiness and providing a good quality, privacy-preserving
    service is a requirement for people to be interested in using them.

## Implications of Each Approach

The Same Origin Identity approach leans on some assumptions about
highly available infrastructure. Namely, that everyone has it or can
provide it as needed. If this assumption is not true, then this approach
has the potential to result in more centralized systems and blocking
certain low budget or temporal parties from participating. Even if
designers try really hard to make the core layer prevent the correlation
of identifiers that the software framework introduces, that does not
prevent the correlation of other strongly-personally-identifying
identifiers that may be associated with identifiers from the framework.

In other words, attributes such as email address, IP address, browser
fingerprint, and first and last name may be associated with randomized
identifiers. At this point, it does not matter that a lot of care is
taken to randomize the identifier and that a lot of highly available
infrastructure was put in place to prevent the correlation of that
identifier with other information -- as an email address or any of the
previously mentioned information is sufficiently correlatable already
as strong personally identifiable information. It may be better to only
pay the higher infrastructure costs when necessary -- instead of at
the core layer (and, thus, for every problem in the whole ecosystem).

The Self-Sovereign Identity supports privacy at a higher level instead
of as a core assumption of its foundational layer. This approach
actually enables privacy in a number of additional ways for example:

  * Claims Issuers don’t have to be notified each time a credential is used.
  * Identity Providers can be prevented from knowing where credentials are
    being used.
  * Anonymizer services may add value by providing stronger verification
    of Subjects while not leaking information that otherwise would have
    been leaked to Claims Inspectors.

## Next Steps

We would like to explore these two approaches at Rebooting Web of Trust
and see if there is agreement on the implications of each approach. We
would then like to continue the conversation at the Internet Identity
Workshop and see if we could bring people from these two schools of
thought together to increase understanding among both groups. There
seems to be a gulf of understanding between the two schools of
thought that we’d like to fill with knowledge, discussion, and
understanding.
