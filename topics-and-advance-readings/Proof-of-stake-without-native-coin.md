**Architecture of proof-of-stake blockchain that doesn’t have native coin and its applicability to decentralized trading**

Dr. Pavel Kravchenko, Distributed Lab

_Abstract_

This paper outlines challenges and architecture of decentralized trading system that by design should be connected to existing financial infrastructure. It allows any trading platform to participate in consensus while effectively preventing Sybil attack by using proof of trust. We will review the solution on example of auctions that government helds to sell its property. We will show how decentralized trading network unifies relationships between all involved parties.

**1 Introduction**

Decentralized trading is a very important feature of systems that should be used in public sector. Government is bad in managing centralized systems where corruption is very easy. Centralization contradicts with transparency and immutability of information. Potential solution could be usage of decentralized system where government _participates_ in the decision making process. Other participants are market players - trading platforms that sell their services to buyers. Every trading platform has internal goal to maximize own profits and therefore has to watch others. Idea is to allow free access of trading platforms to participate.

Decentralize auction system that is based on described idea was launched in Ukraine in July, 2016, two cities held trades on it. On Sep, the 2nd, it was publicly used by Land Registry of Ukraine and soon by law will be official platform to rent all land in Ukraine.

**2 Inherent challenges of a decentralized trading system**

1. Risk of a Sybil attack in a case why anybody can become a trading platform. Attack happens when somebody obtains control over many nodes.

2. Complicated definition of truth for an existing user or third-party observer (something similar to longest chain rule in Bitcoin). It should be clear which nodes are honest and which are not in such cases:

- when some group of nodes starts rejecting transactions from other nodes

- when there is a fork of the blockchain

3. Complexity of guaranteeing the fact that all require nodes agree with each other

4. Not clear plan of actions for the user in case of misbehavior of some nodes.

Other challenges to create decentralized auction to that could be used in a public sector were:

-  how to connect it to the existing payment infrastructure

- how to prevent censorship from government side and from existing trading platforms

-  how to make consensus fair (i.e. proof-of-what to use?) if everybody can join

-  who is the final source of truth

**3 Ecosystem**

Ecosystem consists of such players:

- --Buyer - user that wants to buy certain item on the auction
- --Seller - user that wants to sell certain item on the auction (government in case of privatization. Actual sale happens after auction is completed)
- --Trading platform - private company that lists items on some web-site and attracts users to it. Business model for it is taking registration fees from the buyers
- --Bank - holds accounts of trading platforms and provides a proof that payments happened
- --Observer - independent entity that does verification of the trading process. Could be auditor, journalist or any of above mentioned player

All these players maintain blockchain, but only trading platforms are validators.

**4 Proof of trust as a way to achieve consensus in a real world**

Since such systemcannot have a proof of work and even native coin the hardest challenge was how to de or decision was to design consensus algorithm that allows anybody join, but is resistant to a Sybil attack. For that we had to define source of truth that everybody recognizes (for example in Bitcoin it is hash rate and in NXT it is stake size). Decision was to make the observer (i.e. anybody) the source of truth. But it was hard to define what is &quot;truth&quot;. That&#39;s why it was decided that money (or trust) is ultimate truth meaning that users will chose those trading platforms that behave correctly. Using trading platform means paying for registration and bids through this platform. Then sort of proof-of-stake consensus algorithm can be used where stake size of the platform equals percentage of money that was sent through it. This leads to a conclusion that if some trading platform is corrupted (for example sells item cheaper to specific users while rejecting higher bids from regular users) then users will move to another trading platform and therefore increase its stake size. To connect blockchain and regular banking infrastructure it  was decided to use signed receipts from banks - when somebody makes a bid, payment goes to a particular account (seller of the item) and bank can produce such a receipt which being added to the blockchain proves that money actually was sent through particular trading platform. I.e. we introduce proof-of-trust (combination of proof of stake and proof of identity). Additionally such a solution solves KYC issue - bank always identifies payee and this information is stated in the receipt.

**5 Assumptions and limitations**

User should be able to watch any node using standard open-source software in order to analyze copy of blockchain that it maintains. It will allow to notice fraud attempts.

Trading process is separated for different items. Different trading platforms are able to participate in different auctions.

We assume that because of transparency and scale effect majority of users will be interested in honest auction process and therefore will not tolerate misbehavior. As a result users will try to join only trading platforms that behaved correctly in the past. However we system can&#39;t be protected from instant fraud where previously honest platforms decided to convince fraud.

In case of fork everybody is able to make decision themselves based on set of consensus rules. In our case it is &quot;higher trust&quot; rule that says that as main is considered fork which is supported by trading platforms that collected majority of registration fees from the users (70% or so). This rule is applied item by item, i.e. proof of trust has no history.

Obviously, proof of trust could be calculated based on any payment scheme that users trust and can verify and could be even Bitcoin. For now we use signed banking receipts because everybody is able to verify digital signature on them and banks are highly unlikely to forge them.

**6 Flow of the trading**

1. Network set-up

Trading platforms set-up nodes and join the network

Trading platforms pay registration fee to some account, mentioning public key and identity of the trading platform

Proof of payment is signed by the bank and is submitted to the network, contains public key of the trading platform

2. Placing item to the action

Seller places item to be sold to the network via API of a particular trading platform

Item gets distributed over the network among trading platforms that want to participate in the trade

3. User registration

Users select trading platform to place bids for particular item being sold

Users pay registration fee to the bank account of the particular trading platform, mentioning their public key, public key of the trading platform and item ID.

Proof of payment is signed by the bank and is submitted to the network

Trading platforms reach consensus about who is eligible to validate bidding process

4. Bidding

Users who are registered for the auction place their bids

As time passes eligible trading platforms reach consensus about the rank of participants in the auction

All processes are independent for different items being sold.

There is no cryptocurrency in the network, but proof of payment signed by the bank is playing its role. When payment happens everybody sees that certain amount of money has been spent.

**Potential attacks**

If malicious user controls 70% (or whatever is the limit) of registration fees for the item, the consensus process can be corrupted (for example bids from honest users could be rejected).

**Future improvements**

The future task is to make semi-anonymous auctions, when bidders are able to prove that they paid deposits without revealing their own identity.
