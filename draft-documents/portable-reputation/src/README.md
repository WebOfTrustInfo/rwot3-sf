Running:

```sh
./claim \
  --target did:bitcoin01:xxx-noah \
  --claim:summary 'blockchain expert' \
  --creator did:bitcoin01:xxx-me \
  --tags Reputation,

 ```

## JSON-LD Validated Claim Formats

### Statement, Evaluation and Evidence All at Once

 ```js
 {
  "@context": "TODO",
  "id": "did:bitcoin01:xyz-id-of-the-claim",
  "type": ["Claim", "Reputation"],
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
    "creator": "did:bitcoin01:xxx-person-making-the-claim",
    "domain": "TODO",
    "nonce": "598c63d6",
    "signatureValue": "H/K6n7KpnxCY6kIkef4wUrLl8QmOKCaLWXXg5YAFM7Z5aOGYVLB0OPxXopnMIsjYqO9WNa5O+JxZT9bxRO6siTc="
  }
}
```

### Proposition, Evaluation and Evidence by different claimants

#### The Proposition
```js
{
 "@context": "TODO",
 "id": "did:bitcoin01:xyz-id-of-the-proposition",
 "type": ["Claim", "Proposition"],
 "issuer": "https://portable-reputation-toolkit.xyz",
 "issued": "2016-10-20T11:36Z",
 "claim": {
   "id": "did:bitcoin01:xxx-id-this-proposition-refers-to",
   "proposition": "Competent cryptography code reviewer"
 },
 "signature": {
   "type": "sha256-ecdsa-secp256k1-2016",
   "created": "2016-06-18T21:19:10Z",
   "creator": "did:bitcoin01:xxx-person-making-the-claim",
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
 "id": "did:bitcoin01:xyz-id-of-the-claim-1",
 "type": ["Claim", "PropositionEvaluation"],
 "issuer": "https://portable-reputation-toolkit.xyz",
 "issued": "2016-10-20T11:36Z",
 "claim": {
   "id": "did:bitcoin01:xyz-id-of-the-proposition",
   "evidence": ["http://example.com/evidence/1","http://example.com/evidence/2", "did:bitcoin01:xyz-id-of-signed-evidence"]
 },
 "signature": {
   "type": "sha256-ecdsa-secp256k1-2016",
   "created": "2016-06-18T21:19:10Z",
   "creator": "did:bitcoin01:xxx-person-making-the-claim",
   "domain": "TODO",
   "nonce": "598c63d6",
   "signatureValue": "H/K6n7KpnxCY6kIkef4wUrLl8QmOKCaLWXXg5YAFM7Z5aOGYVLB0OPxXopnMIsjYqO9WNa5O+JxZT9bxRO6siTc="
 }
}
```

#### Signed Evidence as alternate to a URL
```js
{
 "@context": "TODO",
 "id": "did:bitcoin01:xyz-id-of-the-claim-3",
 "type": ["Claim", "Reputation"],
 "issuer": "https://portable-reputation-toolkit.xyz",
 "issued": "2016-10-20T11:36Z",
 "claim": {
   "id": "did:bitcoin01:xyz-id-of-the-claim-2",
   "description": "picture of iphone map GPS in the factory",
   "evidence-hash": "xyz-hash-of-evidence"
 },
 "signature": {
   "type": "sha256-ecdsa-secp256k1-2016",
   "created": "2016-06-18T21:19:10Z",
   "creator": "did:bitcoin01:xxx-person-making-the-claim",
   "domain": "TODO",
   "nonce": "598c63d6",
   "signatureValue": "H/K6n7KpnxCY6kIkef4wUrLl8QmOKCaLWXXg5YAFM7Z5aOGYVLB0OPxXopnMIsjYqO9WNa5O+JxZT9bxRO6siTc="
 }
}
```


And then notarize the claim with Open Timestamps or similar.
