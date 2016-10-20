Running:

```sh
./claim \
  --target did:bitcoin01:xxx-noah \
  --claim:summary 'blockchain expert' \
  --creator did:bitcoin01:xxx-me \
  --tags Reputation,
  
 ```
 
 Should create JSON-LD:
 
 ```js
 {
  "@context": "TODO",
  "id": "did:bitcoin01:xyz123",  // is this valid JSON-LD?
  "type": ["Claim", "Reputation"],
  "issuer": "https://portable-reputation-toolkit.xyz",
  "issued": "2016-10-20T11:36Z",
  "claim": {
    "id": "did:bitcoin01:xxx-noah",
    "summary": "blockchain expert"
  },
  "signature": {
    "type": "sha256-ecdsa-secp256k1-2016",
    "created": "2016-06-18T21:19:10Z",
    "creator": "did:bitcoin01:xxx-me",
    "domain": "TODO",
    "nonce": "598c63d6",
    "signatureValue": "H/K6n7KpnxCY6kIkef4wUrLl8QmOKCaLWXXg5YAFM7Z5aOGYVLB0OPxXopnMIsjYqO9WNa5O+JxZT9bxRO6siTc="
  }
}
```

And then notarize the claim with Open Timestamps or similar.
