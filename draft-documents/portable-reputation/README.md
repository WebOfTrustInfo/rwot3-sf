# Portable Reputation
We are writing proof of concept scripts to bring together a _Portable
Reputation Toolkit_ proof of concept.  The scripts should:

- Generate DIDs
- Create signed verifiable claims
- Create proof of existence for these claims on a blockchain
- Retrieve existing claims

Stretch goals:

- Allow a user to request a claim
- Search and filtering when retrieving claims

## Installation

(TODO: Make installing easier.)

```
$ cd src/ots
$ git submodule update --init --recursive
# Optionally create a virtual environment, then:
$ pip install -r requirements.txt
# TODO: More?
```

## Usage

This does not yet work! But usage will be something like:

```sh
./claim \
  --target did:btc1:xxx-noah \
  --claim:summary 'blockchain expert' \
  --creator did:bitcoin01:xxx-me \
  --tags Reputation,
 ```

## JSON-LD Validated Claim Formats

These claims are to be signed by a distributed idenetifier (DID) and notarized with Open Timestamps or similar.

### JSON-LD claim types

- *Assertion* includes a proposition about an identity, an evaluation of that proposition, and an array of evidence.


### Assertion = Proposition, Evaluation and Evidence
The id of the content is not included in the address. There is no way to include an ipfs id based on the hash JSON-LD itself.

 ```js
 {
  "@context": "TODO",
  "type": ["Claim", "Assertion"],
  "issuer": "https://portable-reputation-toolkit.xyz",
  "issued": "2016-10-20T11:36Z",
  "claim": {
    "id": "did:btc1:xxx-id-this-proposition-refers-to",
    "proposition": "Competent at cryptography security reviews", // statement, proposition, assertion, description?
    "evaluation": true, // true, false, null or range?
    "description": "By looking at the git commit comments, penetration test documents they authored, and reviews of their work I have determined they are competent at cryptography security reviews",
    "evidence": ["https://github.com/WebOfTrustInfo/cryptography_foo/xyz",
    "http://example.com/evidence/2",
    "http://example.com/penetration_test_document/5"
    "http://example.com/written_statement_by_trusted_person/3"]
  },
  "signature": {
    "type": "sha256-ecdsa-secp256k1-2016",
    "created": "2016-06-18T21:19:10Z",
    "creator": "did:btc1:xxx-person-making-the-claim",
    "domain": "TODO",
    "nonce": "598c63d6",
    "signatureValue": "H/K6n7KpnxCY6kIkef4wUrLl8QmOKCaLWXXg5YAFM7Z5aOGYVLB0OPxXopnMIsjYqO9WNa5O+JxZT9bxRO6siTc="
  },
  "address": "ipfs-asdfjhasdfhjkahsdflasdf",
  "proofOfExistence": [""]
}
```

### Assertion, Evidence and Evaluation in different claims

#### The Assertion

A proposition is neither true or false. It is like an assertion that delays evaluation until evidence has been provided. It implicitly sets `"evaluation" : null` and does not link to evidence. A signature in this case verifies who originated the claim but not that the proposition is true. The signature for a proposition without an evaluation may be optional in some cases.

```js
{
 "@context": "TODO",
 "id": "did:btc1:xyz-id-of-the-proposition",
 "type": ["Claim", "Proposition"],
 "issuer": "https://portable-reputation-toolkit.xyz",
 "issued": "2016-10-20T11:36Z",
 "claim": {
   "id": "did:btc1:xxx-id-of-the-person-this-proposition-refers-to",
   "proposition": "Competent at TIG welding"
 },
 "signature": {
   "type": "sha256-ecdsa-secp256k1-2016",
   "created": "2016-06-18T21:19:10Z",
   "creator": "did:btc1:xxx-person-making-the-claim",
   "domain": "TODO",
   "nonce": "598c63d6",
   "signatureValue": "H/K6n7KpnxCY6kIkef4wUrLl8QmOKCaLWXXg5YAFM7Z5aOGYVLB0OPxXopnMIsjYqO9WNa5O+JxZT9bxRO6siTc="
 }
}
```

#### Signed Evidence

Note the URL link to the media and the signed evidence hash. This is a compact way to verify that the media evidence has not been tampered with.

```js
{
 "@context": "TODO",
 "id": "did:btc1:xyz-id-of-evidence", // use what did?
 "type": ["Claim", "SignedEvidence"],
 "issuer": "https://portable-reputation-toolkit.xyz",
 "issued": "2016-10-20T11:36Z",
 "claim": {
   "id": "http://youtube.com/xyzabc",
   "description": "Video of TIG welding demonstration",
   "evidence-hash": "xyz-hash-of-evidence"
 },
 "signature": {
   "type": "sha256-ecdsa-secp256k1-2016",
   "created": "2016-06-18T21:19:10Z",
   "creator": "did:btc1:xxx-person-making-the-claim",
   "domain": "TODO",
   "nonce": "598c63d6",
   "signatureValue": "H/K6n7KpnxCY6kIkef4wUrLl8QmOKCaLWXXg5YAFM7Z5aOGYVLB0OPxXopnMIsjYqO9WNa5O+JxZT9bxRO6siTc="
 }
}
```

#### The Evaluation

Claims in this form can be applied to propositions or assertions that already have evidence.

```js
{
 "@context": "TODO",
 "id": "did:btc1:xyz-id-of-the-evaluation",
 "type": ["Claim", "Evaluation"],
 "issuer": "https://portable-reputation-toolkit.xyz",
 "issued": "2016-10-20T11:36Z",
 "claim": {
   "id": "did:btc1:xyz-id-of-the-proposition",
   "evalution": true,
   "evidence": ["did:btc1:xyz-id-of-evidence",
   "http://example.com/written_statement", "did:btc1:xyz-id-of-signed-evidence"],
   "description": "I attest that this person is a competent TIG welder based on my review of the video and their written statement."
 },
 "signature": {
   "type": "sha256-ecdsa-secp256k1-2016",
   "created": "2016-06-18T21:19:10Z",
   "creator": "did:btc1:xxx-person-making-the-claim",
   "domain": "TODO",
   "nonce": "598c63d6",
   "signatureValue": "H/K6n7KpnxCY6kIkef4wUrLl8QmOKCaLWXXg5YAFM7Z5aOGYVLB0OPxXopnMIsjYqO9WNa5O+JxZT9bxRO6siTc="
 }
}
```
