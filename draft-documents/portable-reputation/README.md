# Portable Reputation Toolkit
Simple scripts to bring together a proof of concept _Portable Reputation Toolkit_.
They currently:

- Generate DIDs using [did-io](https://github.com/digitalbazaar/did-io)
- Create [JSON-LD claims](http://opencreds.org/specs/source/claims-data-model/#expressing-entity-credentials-in-json)
- Sign the claims with a Bitcoin private key using
  [jsonld-signatures](https://github.com/digitalbazaar/jsonld-signatures)
- Create proof of existence for these claims using
  [OpenTimestamps](https://petertodd.org/2016/opentimestamps-announcement)
- Upload the signed, timestamped claim to [IPFS](https://ipfs.io)

Future goals:

- Allow a user to request a claim
- Retrieve existing claims
- Search and filtering when retrieving claims

## Installation

```
git clone https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-fall2016.git
cd rebooting-the-web-of-trust-fall2016/draft-documents/portable-reputation
npm install
```

## Usage

Use `--help` to see available options:

```
src/claim --help

  Usage: claim [options]

  Options:

    -c, --creator <creator>        DID or URL of claim creator
    -t, --target <target>          DID or URI of claim target
    -p, --private-key <key>        Bitcoin private key
    -s, --claim-summary <summary>  Summary of claim type
    -t, --tags <tag1,tag2>         Add tags
```

For example, running:

```
src/claim \
  --creator did:00a65b11-593c-4a46-bf64-8b83f3ef698f \
  --target did:59f269a0-0847-4f00-8c4c-26d84e6714c4 \
  --private-key L4mEi7eEdTNNFQEWaa7JhUKAbtHdVvByGAqvpJKC53mfiqunjBjw \
  --claim-summary 'Awesome paper!!!' \
  --tags 'Reputation, Professional'
 ```

 will generate a JSON-LD verifiable claim something like:

 ```json
 {
    "@context": "https://w3id.org/credentials/v1",
    "type": [
        "Reputation",
        "Professional",
        "Claim"
    ],
    "issuer": "did:00a65b11-593c-4a46-bf64-8b83f3ef698f",
    "issued": "2016-10-22T01:21:44-07:00",
    "claim": {
        "id": "did:59f269a0-0847-4f00-8c4c-26d84e6714c4",
        "summary": "Awesome paper!!!"
    },
    "signature": {
        "type": "sha256-ecdsa-secp256k1-2016",
        "created": "2016-10-22T08:21:44Z",
        "creator": "sha256-ecdsa-secp256k1-public-key:020d79074ef137d4f338c2e6bef2a49c618109eccf1cd01ccc3286634789baef4b",
        "domain": "example.com",
        "signatureValue": "H7tsv5rpXGXr5XLi7KvWVyYhDzO+ODC5g5ZOuhPx04vZYRW1omE7c104BoQUT6PdZjo/RRoZiFkCfsYEjs+qsIg="
    },
    "openTimestamp": "AE9wZW5UaW1lc3RhbXBzAABQcm9vZgC/ieLohOiSlAEI7wrxwSIVAIJ9pU2GXw2ONcyQxr/wn2XfHhg+7siJRsrwEOlyrF1dR91SCAX1Bj2AGdYI//AQZ0mReqKHaS6C9Y6maBLl2gjxBFgLIZvwCAwzlodWl0BeAIPf4w0u+QyOLi1odHRwczovL2FsaWNlLmJ0Yy5jYWxlbmRhci5vcGVudGltZXN0YW1wcy5vcmfwEHDNg8S8EFKhOM4MF71sTeMI8QRYCyGb8AgSRweqKUbulACD3+MNLvkMjiwraHR0cHM6Ly9ib2IuYnRjLmNhbGVuZGFyLm9wZW50aW1lc3RhbXBzLm9yZw=="
}
```

## JSON-LD Validated Claim Formats

These claims are to be signed by a distributed identifier (DID) and notarized with Open Timestamps or similar.

### JSON-LD claim types

- *Assertion* includes a proposition about an identity, an evaluation of that proposition, and an array of evidence.

### Assertion = Proposition, Evaluation and Evidence
The id of the content is not included in the address. There is no way to include an IPFS id based on the hash JSON-LD itself.

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
