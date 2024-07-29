
## JAWTH
A minimalistic jwt library




## Installation
```
npm i jawth
```



## Usage

### `jawth.encode_jwt(secret: string, id: string | number, payload: object, ttl?: number): Promise<string>`

Returns a jwt token signed with a symmetric algorithm (HCMA SHA2-56)

### `jawth.decode_jwt(secret: string, jwt: string): Promise<{  id: string, payload: object, expires_at: Date | undefined }>`

Returns a object if the signature is valid else throws error.

### `validate_jwt(secret: string, jwt: string): Promise<boolean>`

Checks if the given token is valid or not.


## Supported Runtimes

The `jawth` module is Supported in all enviroments that exposes web crypto module globally including:

- Vercel's Edge Runtime
- Node JS
- Browser
- Bun
