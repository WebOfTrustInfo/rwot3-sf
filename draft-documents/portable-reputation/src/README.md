Running:

```sh
./claim \
  --target did:btc1:xxx-noah \
  --claim:summary 'blockchain expert' \
  --creator did:bitcoin01:xxx-me \
  --tags Reputation,

 ```

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
    "evidence": ["http://example.com/evidence/1","http://example.com/evidence/2"]
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
 "id": "did:btc1:xyz-id-of-the-proposition",
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
 "id": "did:btc1:xyz-id-of-the-claim-3",
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
 "id": "did:btc1:xyz-id-of-the-claim-1",
 "type": ["Claim", "Assertion"],
 "issuer": "https://portable-reputation-toolkit.xyz",
 "issued": "2016-10-20T11:36Z",
 "claim": {
   "id": "did:btc1:xyz-id-of-the-proposition",
   "evalution": true,
   "evidence": ["http://example.com/evidence/1","http://example.com/evidence/2", "did:btc1:xyz-id-of-signed-evidence"],
   "description": "Has competently reviewed "
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


And then notarize the claim with Open Timestamps or similar.
