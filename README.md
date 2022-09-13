# JWK Authorization Mock Server

Provides a JWT token signed with a RSA private key and a JWK generate with the RSA public key to verify the signature.

## Generate RSA key pair

```sh
cd certs/

# Generating the private key
openssl genrsa -out private.pem 3072 

# Generating the public key from the private key
openssl rsa -in private.pem -pubout -out public.pem
```

## Convert your RSA public key into a JWK

- go [here](https://russelldavies.github.io/jwk-creator/) and enter your public key with the algorithm RS256 and the signing use case.
- store your JWK within the __/public/.well-known/jwks.json__ file.

## Launch the server

```sh
npm run dev --host 0.0.0.0
```

## How to use it as a mock

Here's how you can consum the API.

- http://localhost:4000/token to retrieve the JWT.
- http://localhost:4000/.well-known/jwks.json to retrieve JWKs. Provides this URI inside your resource server to check the signature.

Use the retrieved token inside a header to query your resource:

```sh
curl -H "Authorization: Bearer <token>" ...
```
