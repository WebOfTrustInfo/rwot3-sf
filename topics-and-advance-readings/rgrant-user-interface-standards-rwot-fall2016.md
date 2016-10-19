# Towards a User Interface for Selectively Revealing Fine-Grained Personal Information to Transaction Counterparties

### by Ryan Grant &lt;rgrant@contract.design&gt;, for Web-of-Trust Design Workshop (fall2016)

In a world where identity is carried with dignity by the participants
themselves, built through a stored history of social interactions,
revealed (or proven) with the fine granularity necessary to respect
privacy and the security only it can afford, choices multiply.  In
this rich sea of choices, we can now ask how to interface a human with
the marketplace, engaged to find the best deal for the least security
risk.

Domains to Consider
===================

The user-interface questions involved may lead us through domains as
diverse as product logistics, medical assistance, the ongoing
governance of human movement, education and caretaking, financial
deals, billing for infrastructure, insurance, peripheral device key
management, task and sharing contracts, the seemingly simple
transmission of messages, and more.

The Three Standards
===================

Along the way to enabling fine-grained identity capabilities in client
software, standardization will be required in three key areas:

- feature negotiation;
- domain-specific namespaces; and
- transaction dependencies (including templates).

This is in addition to architectural components less central to the
concern of user interface, such as issuers, repositories, inspectors,
holders, public ledgers, and root storage (terms mostly borrowed from
the list in "Self-Sovereign Identity Architecture" by Manu Sporny and
David Longley).

To successfully deliver products enabling this vision,
implementations must also develop:

- a protocol of questions, usually asked by a computer to an authorizing human; and
- clear test scenarios.

Two Test Scenarios in fully collateralized lending
==================================================

Of the many domains listed above, here are two financial contracts
with a slight difference, intended to expose some user interface
issues and spark discussion.

Collateralized Zero Coupon Bond #1
----------------------------------

Description of terms:

> A zero coupon bond, with values measured in USD but transacted in
> BTC.  Final payment in-kind (as BTC).  borrower will lock up
> collateral of 3x BTC into multisig contract.  Price oracle required
> as one signing party, along with at least one of the other parties.
> Borrower receives BTC worth "discounted price" at bond initiation,
> and pays about 9% interest.  Deal initiates as an atomic
> transaction.

        Face Value           : $10,000
        Discounted Price     : $8,000
        Term in Months       : 24
        Value of Collateral  : $24,000

Wallet user interface requirements (borrower and lender):

- generate address for multisig payout
- hold complete transaction until bond matures
- alert user when bond matures
- review price oracle's reputation
- request counterparty help revoke price oracle authorization if it fails
- sign complete transaction, with price oracle

Collateralized Zero Coupon Bond #2
----------------------------------

Description of terms:

> Exact same numbers and terms as above, except borrower will receive
> USD at bond initiation, and lender will send fiat money through a
> standard escrow house.  Once the bond is initiated, the work of the
> escrow house is completed.  The bond's collateral is held on the
> Bitcoin blockchain as in the prior example.

Additional wallet user interface requirements (borrower and lender):

- store terms of contract with escrow house
- sign escrow contract
- review escrow house AML/KYC requests
- send AML/KYC information to escrow house
- track bond's bitcoin collateral through escrow stages
- review escrow house determination that USD has transferred
- pay invoice to escrow house

Notes on Direction
==================

Comparing the two scenarios above, we observe one consequence of
building out Self-Sovereign Identity tools is increased awareness
about the price of security.
Participants will be able to quickly reject deals containing too
much risk of harm from misused identity, for too little reward.

The examples we develop further can help guide discussion about how to
solve the three standardization challenges:

- feature negotiation;
- domain-specific namespaces; and
- transaction dependencies.

