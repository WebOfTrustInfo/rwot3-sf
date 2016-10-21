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

## JSON-LD Validated Claim Formats

### Statement, Evaluation and Evidence All at Once

 ```js
 {
  "@context": "TODO",
  "id": "did:btc1:xyz-id-of-the-claim",
  "type": ["Claim", "Assertion"],
  "issuer": "https://portable-reputation-toolkit.xyz",
  "issued": "2016-10-20T11:36Z",
  "claim": {
    "statement": "age over 21", // statement, proposition, assertion, description?
    "evaluation": true, // true, false, null or range?
    "evidence": ["http://example.com/evidence/1",
    "http://example.com/evidence/2"]
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

### Assertion, Evidence and Evaluation in different claims

#### The Assertion

This assertion delays evaluation until evidence has been provided. It sets `"evaluation" : null` and does not provide evidence. A signature in this case verifies who originated the claim but not that the claim the statement is true. The signature for a statement without an evaluation may be optional in some cases.

```js
{
 "@context": "TODO",
 "id": "did:btc1:xyz-id-of-the-assertion",
 "type": ["Claim", "Assertion"],
 "issuer": "https://portable-reputation-toolkit.xyz",
 "issued": "2016-10-20T11:36Z",
 "claim": {
   "id": "did:btc1:xxx-id-this-proposition-refers-to",
   "assertion": "Competent at TIG welding",
   "evaluation": null
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
 "type": ["Claim", "Evidence"],
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

```js
{
 "@context": "TODO",
 "id": "did:btc1:xyz-id-of-the-evaluation",
 "type": ["Claim", "Evaluation"],
 "issuer": "https://portable-reputation-toolkit.xyz",
 "issued": "2016-10-20T11:36Z",
 "claim": {
   "id": "did:btc1:xyz-id-of-the-assertion",
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
