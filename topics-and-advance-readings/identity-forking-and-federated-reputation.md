# Identity Forking and Federated Reputation

By Christopher Malon, Group Ring, Inc. (https://groupring.net)

Motivation
==========

Privacy requires an individual to perform transactions under many
different identity tokens, which are not linked in any outside database.
A principal may wish to establish his possession of a attestation,
without revealing his complete identity. However, attestations should
not be bearer instruments. An attestation must be issued in a way so
that it is useless to anyone but the person to whom it was originally
issued.

This proposal provides a "forking" mechanism to issue attestations and spawn new
identities from parent identities, in a way that attestations can be
attributed to the spawned identity individually.

The last section provides a federated mechanism for identities to
establish their reputation data, both positive and negative, using a
public blockchain. Forking is essential for this proposal, because this
proposal gives a method to establish a complete history of a single
identity’s actions, which could easily become public knowledge. A
principal retains control only by spawning subidentities up to the
finest level of activities that she wishes to be evaluated as a unit.

Composite keys
==============

As implemented in Bitcoin&apos;s P2SH protocol, an M-of-N multisig address
is implemented by a script address.  When payment using the script address
is verified, the script is revealed, including the addresses of the
participating public keys.

However, some public key cryptosystems have a property that enables a
composite signature scheme in which the participating keys can remain private.
For example, in an elliptic curve digital signature algorithm (ECDSA) [1],
a finite field F, an elliptic curve E with points taking cordinates in F,
and a base point G on the curve E are fixed.  In Bitcoin, E, F, and G
are defined by the standard secp256k1 [2].
Private keys are integers x from 1 to n-1, where n is the order of the point G,
and the corresponding public key is the scalar multiple Q = xG.
Thus, if Q = xG and R = yG are two public keys, Q+R is a public key
with private key x+y.

Identity forking
================

Attestation with identity forking
---------------------------------

For Bob to confer an attestation upon Alice that she can present separately from her other attestations,

1. Alice generates an additional keypair, called Carol.

2. Alice sends her own public key and Carol&apos;s to Bob.  She signs the message twice, once with Alice&apos;s private key, and once with Carol&apos;s private key.

3. Bob decides that he wants to confer the attestation upon Alice, usually based on some prior knowledge of Alice.

4. Bob computes the public key Diana = Alice + Carol.

5. Bob signs a message conferring the attestation upon Diana, and sends it to Alice.

Note that Bob cannot simply issue the attestation to one of Alice&apos;s derived keypairs, per BIP 32 [3], in lieu of this procedure, because derived keys are recognizable based on knowledge of an ancestor public key.

The point of requiring Alice&apos;s private key for every use of Diana&apos;s key is to prevent Alice from giving or selling use of her attestation to some party Eve who could use it without her further participation.  If Alice did not have to sign a message once using Carol&apos;s key, Alice could give her credential to Eve without knowing Eve&apos;s private key and without Eve knowing Alice&apos;s private key, simply by defining Carol = Eve - Alice. 

Verification
------------

To verify that Elizabeth has the attestation addressed to Diana, Frank
may require Elizabeth to sign her messages using the composite key
Diana + Elizabeth = (Alice + Carol) + Elizabeth.

Completeness of a reputation chain
==================================

Reputation is a concept that mixes positive and negative attestations,
or successes and failures. 
An example of a positive attestation is a diploma, which certifies that someone
graduated from a certain college with a certain degree.  
Typically, people are happy to present positive attestations on demand,
but they do not have an incentive to report all the
times they failed.

Publication to a blockchain allows an identity to establish the
completeness of a series of actions whose ratings are being reported.

Each identity in our framework is identified by a globally unique string
and possesses a public/private keypair. An <span>*identity*</span>
refers simply to this set of attributes. A principal may utilize many
different identities, with or without links or attestations among them.
The principals generate at least one identity for participating in each
group of activities whose reputation they may want to reveal separately.

Our system involves interactions between three kinds of roles, some of
which may be shared by a single identity: <span>*raters*</span>, who
assign ratings; <span>*ratees*</span>, who receive ratings; and
<span>*bazaars*</span>, which operate services in which raters rate
ratees. 

A <span>*reputation claim*</span> consists of: a <span>*rater*</span>; a
<span>*ratee*</span>; a <span>*bazaar*</span>; a
<span>*timestamp*</span>; (optionally) a <span>*subject identifier*;
(optionally) <span>*comments* from the rater</span>; a unique <span>*action
identifier*</span>; the rater’s <span>*rating*</span> (a real number);
the ratee’s desired <span>*weighting*</span> of the action; and a
<span>*signature*</span> from the bazaar. The bazaar simply asserts that
the rater rated the ratee as indicated. Typically, the bazaar would be
an online service mediating a transaction, but it could be the same as
the rater.

In order to receive ratings for an action X, Elizabeth:

1.  Publishes an <span>*authorization*</span> to be rated on X to a
    blockchain. The authorization establishes that the ratee identity
    took the action being rated, and designates where the ratings should
    come from. The authorization specifies: the <span>*action
    identifier*</span> (X); the <span>*ratee*</span> (Elizabeth); the
    <span>*bazaar*</span> to collect the rating from the rater(s);
    whether only a <span>*single*</span> rating is expected, or many;
    the <span>*rating delivery frequency*</span>, if many ratings are
    expected; the ratee’s desired <span>*weighting*</span> for the
    action; (optionally) a <span>*subject identifier*</span> string; and
    a <span>*multisig*</span> of the above data by the ratee and the
    bazaar.

2.  Receives deliveries of reputation claims from the bazaar, which it
    also publishes on the blockchain.

Bitcoin’s transaction capacity would not provide enough space for every
authorization and reputation event to be published directly to its
blockchain. Additionally, transaction fees would be prohibitive. We
suggest that a bazaar that deals with large volumes of reputation events
consolidate its posts, by posting a tiny URL of the complete event list
along with a hash of the list’s contents. Interested verification
services may follow all these links and expand them into a database of
identities and their authorizations and ratings.

Bibliography
============
[1] https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm

[2] http://www.secg.org/sec2-v2.pdf

[3] https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki

