# Anonymous Credentials in Sovrin

Jason Law and Daniel Hardman

Sovrin is a public permissioned distributed ledger dedicated to self-sovereign identity. It runs on open source software distributed under a permissive open source license from the Sovrin Foundation, a nonprofit organization responsible for worldwide governance of the Sovrin Network.

## Distributed Consensus

Sovrin leverages an advanced Byzantine Fault Tolerant protocol, [Plenum](https://github.com/evernym/plenum/wiki), to achieve distributed consensus. Plenum makes several security improvements on the [Redundant Byzantine Fault Tolerant](http://pakupaku.me/plaublin/rbft/report.pdf) (RBFT) protocol, such as digital signatures over MAC authenticators, and full end-to-end encryption.

RBFT is itself is an improvement on the [Aardvark](ftp://ftp.cs.utexas.edu/pub/techreports/tr08-27.pdf) protocol. RBFT executes several protocol instances with different primaries in parallel to detect any performance problems in real-time, without making assumptions about the previous or future performance/condition of the system. Aardvark sets the expected throughput based on past performance and triggers a view change as soon as the primary fails to match those expectations. This works well when the load is static but fails to detect a poor performing primary when load is not near the peak. RBFT resolves this.

Aardvark addresses several known vulnerabilities of [Practical Byzantine Fault Tolerance](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.127.6130) (PBFT): (1) a malicious client can trigger view changes at will that will stop the progression of the protocol, (2) it does not separate the logic of accepting client requests and ordering them, which leads to possible DoS attacks from the client, and (3) a malicious primary can order requests at an arbitrary speed without being detected.

Consensus protocols will continue to advance, and the goal of the Sovrin Foundation is to continually leverage these advances over time. Although Plenum represents some of the best current thinking in the space, if a stronger protocol emerges that meets the requirements and has suitable licensing, Sovrin will migrate to it.

## Risk of Unintended Correlation

Real-world use cases reveal how easy it is to violate privacy in a public ledger by correlating across transactions to make inferences about users. For example, every attribute stored and shared in the ledger has a unique address or transaction ID. If user attributes E, F, and G were shared with website A, and attributes E, H, and I were shared with website B, the two websites can easily collude to discover that all the attributes described the same user.

To combat this risk, Sovrin supports anonymous credentials. While this form of privacy-preserving crypto is not new, to date neither UProve nor Idemix has enjoyed wide-scale adoption. Sovrin offers the opportunity for anonymous credentials to become a defacto standard for cross-domain identity and privacy. By including the logic in the Sovrin client to create anonymous public keys, issue credentials, generate proofs, and verify those proofs, these capabilities can become widely available to developers with little or no effort on their part.

Sovrin’s current implementation supports a rudimentary implementation of Jan Camenisch’s Anonymous Credentials. We believe it will be relatively easy to extend Sovrin to support UProve credentials or other advanced privacy-respecting signature schemes.

## Implementation

Sovrin has specific transactions for bootstrapping Issuers and establishing schemas for the credentials they will issue. Issuers have a globally unique Sovrin identifier and publish a set of public attributes. To create a new credential, Issuers create a credential definition with its associated attributes and public keys. This credential schema can evolve; other Sovrin transaction types enable adding or deleting attributes from the schema definition.

Note that Issuers do not need to be public. Any entity in Sovrin has the ability to be an Issuer, Prover (Holder), or Verifier (Relying Party) at different times. The entity can add a credential definition with its associated attributes and public keys, issue an instance of the credential, and verify a proof of a credential it issued, all either directly or anonymously.

Credentials can be issued as transactions on the ledger or directly to a principal or Prover/Holder depending on the use case. Provers/Holders may hold the credential in a wallet or repository. Provers/Holders call methods within the Sovrin client to generate zero-knowledge proofs of one or more credentials to present to some relying party or Verifier. The Verifier verifies the proof against the public key for the credential definition stored in the ledger.

## Use Cases

### Trust Establishment

The Sovrin ledger serves as a registry for self-sovereign identifiers and associated public keys. These entries can be trusted to be correct based on the strength of the distributed consensus network. Requests to modify attributes of a Sovrin identifier are authenticated via verification of an Ed25519 digital signature. The only way a credential definition (including its public keys) can be established for an issuer is through verification of the issuer’s signature by a consensus of distributed Sovrin Validator nodes.

Sovrin also supports reputation events. These transactions may be public (unencrypted) or private (encrypted) and can support any type of reputation assertion. At the most basic level, reputation events enable an observer to trust that the ledger entry identifying an Issuer really is the issuer. This bootstrapping of trust could of course also be established "off-ledger", for example by pointing to the Sovrin ledger entry from the Issuer’s website or distributing an X.509 certificate of the Issuer’s public key. But the Sovrin ledger is arguably more secure and trustworthy than DNS (and if the digital signature of a Certificate Authority is to be trusted, then the Issuer’s X.509 certificate could simply be published as a credential on the Sovrin ledger).

While Sovrin supports publishing public or private reputation events that can be compiled into public or private reputation graphs, it does not include algorithms for compiling, evaluating or scoring these graphs. While the Sovrin Foundation may publish reference implementations of such algorithms, this is an area where market forces can and should innovate and compete.

### Facilitating Trusted Interactions

The Sovrin ledger can bootstrap trusted interactions that take place entirely outside the Sovrin network. It enables Issuers, Provers/Holders, and Verifiers to publish endpoints (e.g., URLs) for any type of out-of-band communication. These endpoints can be public, semi-private, or fully pairwise private endpoints. The Sovrin network can also, with a user’s authorization, facilitate the real-time disclosure of the IP address and port of the user’s client (known by a Sovrin node, but not recorded in the ledger). This allows an Issuer to directly and securely deliver a credential to a Holder.

This endpoint negotiation can be used for pre-negotiation of an agreement, secure messaging, or even bootstrapping of an interactive zero-knowledge proof. After establishing a trusted connection, peers can exchange as many messages as needed to establish the required confidence level without affecting the Sovrin network.

Of course, IP addresses can become correlation points, so depending on the use case, some form of anonymizing routing may required. This is not currently implemented in Sovrin clients.

### Multiple Non-Linkable Identifiers

To avoid widespread correlation, the notion of multiple identifiers for a single principal is integral to Sovrin’s design. These identifiers cannot be created directly by the principal, or that itself would lead to correlation; instead, they can be created by a third-party Registrar/Sponsor. However that requires trusting the Registrar/Sponsor not to store or share the correlation.

A better solution is to use anonymous credentials to create new identifiers. The Registrar/Sponsor can issue an anonymous credential to a principal that allows the principal to create new Sovrin identifiers (pseudonyms/cryptonyms) without those identifiers being linkable. In Sovrin, transactions will ultimately have some cost in order to pay for the Validators nodes that achieve distributed consensus. A Registrar/Sponsor could sell (or gift) a principal a credential providing the right to create, for example, 100 new identifiers. The principal could prove this with zero knowledge, enable the transactions be correlatable back to the Issuer but not the principal.

### Anonymous Voting with Verifiable Right to Vote

With anonymous credentials, a voter registration authority could issue a one-time voting credential to a voter. What’s more, with the Sovrin network, voters can actually vote anonymously by *submitting their vote directly to the Sovrin network*. 

The Sovrin Validators would all independently verify the anonymous credential against the public keys of the voter registration authority found on Sovrin. The anonymous, yet fully verifiable, vote would then be stored as an entry in the ledger and tallied automatically. Not only does this provide non-repudiable, provably authentic anonymous voting, but Validators can also verify that the voting credential was not expired and that a vote was not issued twice. (In fact, a second vote by the same voter could constitute a change of a vote, if allowed by the rules of the election.)

This protects against attacks where a vote, while anonymous, is lost or censored by a voting authority because it provides a perceived advantage (e.g., the vote comes from a region of a country not sympathetic to an incumbent, and thus is likely contain a high percentage of negative votes).

This approach can also be used for many other use cases including:

* Employees giving anonymous peer-to-peer feedback or reviews. 

* Product vendors giving every purchaser the right to issue publicly verifiable yet anonymous feedback. 

* Hospitals giving patients the ability to provide to give anonymous feedback about a doctor (either public or private).

* Anonymous tip-line. Limits "Swatting" and trusting credible sources.

### Anonymous Endorsements

Skills endorsements such those on LinkedIn could also leverage anonymous credentials to improve quality and veracity. For example, a LinkedIn member could issue anonymous credentials to verified colleagues, past and present, allowing them to rate skills. By issuing the credential, the member understands that there may be some negative ratings, but the upside is more accurate and useful feedback for all parties.

To guard against Sybil attacks, endorsers may also need a second credential, such as a verifiable proof of relationship to the principal, from LinkedIn. Also, the size of the group of colleagues could create a correlation risk if it was too small (e.g., for a group of one, the response is 100% linkable). However if the skills endorsement credentials were published in Sovrin, Alice could see that 150 others were issued the same credential from Bob, and therefore be assured that her endorsement would be sufficiently anonymous.

### Credential Revocation

Blockchain technologies are triggering innovation in credential revocation. Some recent papers outline new schemes for simplified revocation; however most of these schemes remain to be tested.

Anonymous credentials on Sovrin provides at least one clear solution using proof of group membership. Take the case of Alice as an employee of XYZ Corp. XYZ Corp gives Alice an employee credential that it must be able to revoke if Alice leaves or is fired. However, to protect Alice’s privacy, XYZ Corp does not want to publicly announce revocation of the credential. 

To solve this problem, XYZ Corp can publish a number of anonymous commitments in a format and at a URL published on Sovrin. XYZ Corp would regularly update these anonymous commitments to reflect its active employees. The publication would include a digital signature for the updates, verifiable with XYZ Corp’s current public keys on Sovrin. When Alice presents her proof of employment, the presentation could also include a non-interactive zero knowledge proof for set membership ([https://infoscience.epfl.ch/record/128718/files/CCS08.pdf](https://infoscience.epfl.ch/record/128718/files/CCS08.pdf)). In this case, the set would be the current employees of XYZ Corp. 

Using this scheme, if Alice is an employee, the credential will be valid; as soon as she is removed from the employee list, the credential will fail. The proof will be anonymous, and Alice will have no way to fake being a current employee of XYZ Corp.

## Continuing Innovation

We are constantly finding cases where privacy can be compromised on a public ledger if proper care is not taken. In many of those cases, we’ve found that anonymous credentials can play a pivotal role. At the same time, other mechanisms can also be employed to help preserve privacy, such as anonymous authentication using group signatures. 

We will continue to advance Privacy by Design in Sovrin by exploring ways to remove the need for identification from any Sovrin transaction that does not require it, and to rely on privacy-protecting cryptographic proofs whenever possible.

