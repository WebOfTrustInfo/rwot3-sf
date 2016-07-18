---
authors:
- |
    <span>Christopher D. Malon</span>\
    Group Ring, Inc.
title: Identity Forking and Federated Reputation
...

Motivation
==========

Privacy requires an individual to perform transactions under many
different identity tokens, which are not linked in any outside database.
A principal may wish to establish his possession of a attestation,
without revealing his complete identity. However, attestations should
not be bearer instruments. An attestation must be issued in a way so
that it is useless to anyone but the person to whom it was originally
issued.

This proposal provides a mechanism to issue attestations and spawn new
identities from parent identities, in a way that attestations can be
attributed to the spawned identity individually.

The last section provides a federated mechanism for identities to
establish their reputation data, both positive and negative, using a
public blockchain. Forking is essential for this proposal, because this
proposal gives a method to establish a complete history of a single
identity’s actions, which could easily become public knowledge. A
principal retains control only by spawning subidentities up to the
finest level of activities that she wishes to be evaluated as a unit.

Identity forking
================

Attestation
-----------

To confer an attestation upon Alice, Bob does the following:

1.  Generates a new keypair, called Carol

2.  Generates a multisig $Diana = (Alice, Carol)$

3.  Signs a mesage conferring the credential upon Diana

4.  Sends the signed message to Alice

5.  Sends Carol’s public and private keys to Alice

Verification
------------

To verify that Elizabeth has the attestation addressed to Carol, Frank
may require Elizabeth to sign her messages from a multisig of the form
$(Carol, Elizabeth)$.

Completeness of a reputation chain
==================================

Attestations are examples of positive credentials, or successes. An
example of a positive credential is a diploma, which proves that someone
graduated from a certain college with a certain degree. Reputation is a
concept that mixes positive and negative credentials, or successes and
failures. Generally, people have an incentive not to report all the
times they failed.

Publication to a blockchain allows an identity to establish the
completeness of a series of actions whose ratings are being reported.

Each identity in our framework is identified by a globally unique string
and possesses a public/private keypair. An <span>*identity*</span>
refers simply to this set of credentials. A principal may utilize many
different identities, with or without links or attestations among them.
The principals generate at least one identity for participating in each
group of activities whose reputation they may want to reveal separately.

Our system involves interactions between four kinds of roles, some of
which may be shared by a single identity: <span>*raters*</span>, who
assign ratings; <span>*ratees*</span>, who receive ratings; and
<span>*bazaars*</span>, which operate services in which raters rate
ratees. Each is identified by a globally unique identity string and
possesses a public/private keypair.

A <span>*reputation claim*</span> consists of: a <span>*rater*</span>; a
<span>*ratee*</span>; a <span>*bazaar*</span>; a
<span>*timestamp*</span>; (optionally) a <span>*subject*</span> string;
(optionally) <span>*claim content*</span>; a unique <span>*action
identifier*</span>; the rater’s <span>*rating*</span> (a real number);
the ratee’s desired <span>*weighting*</span> of the action; and a
<span>*signature*</span> from the bazaar. The bazaar simply asserts that
the rater rated the ratee as indicated. Typically, the bazaar would be
an online service mediating a transaction, but it could be the same as
the rater.

In order to receive ratings for an action $X$, Elizabeth:

1.  Publishes an <span>*authorization*</span> to be rated on $X$ to a
    blockchain, The authorization establishes that the ratee identity
    took the action being rated, and designates where the ratings should
    come from. The authorization specifies: the <span>*action
    identifier*</span> ($X$); the <span>*ratee*</span> (Elizabeth); the
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
