## Good Use Cases (Joe Andrieu)

Fluid Development supports requirements modeling, centered on use cases. 

A use case should define how a system is used with a value-creating transaction (creating value for the human user).

A good use case:
* Is a single transaction
* Has a clear, memorable name
* Distinguishes unique capabilities
* Is describable, empathizable, actionable.

There are two ways to think about use cases, as a problem or a solution. Either is incomplete, need them together as action/reaction pair.

[[link to Joe's powerpoint]]

## Identity Lifecycle (Greg Slepak)

Decentralized identity lifecycle management.

There are a lot of related elements:
* Attestations (and revocations)
* Namespaces and how to deal with them
* Thwarting man-in-the-middle atacks
* Recovering identity

The lifecycle goes from Registering an identity (in a namespace) to Use of identity and Use of attestations to Recovery of identity to Expiration of identity.

## Conflicts in Privacy Preserving Architure (Manu Sporny)

There are two camps of thought:
* Self-sovereign identity
* Same-origin identity

### Same-Origin Identity

You should never have an identifier that crosses domains because it allows correlation.

### Self-Sovereign (Cross-Origin) Identity

It's OK to have identifier that crosses domains as long as you have anonymizer.

_These communities are not talking to each other, and this has led to conflicts and will lead to more in the next couple of years. The goal here is simply to note that there's a conflict and we need to talk!_

