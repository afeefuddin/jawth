import * as crypto from "crypto"
import { header } from "./constants"
import { base64_url_encode } from "./utils";

export default function encode_jwt(secret: string, id: string | number, payload: object, ttl?: number): string{
    const now = Math.floor(Date.now()/1000);
    const expires_at = ttl ? now + ttl : undefined;

    const jwt_payload: any = {
        sub: id.toString(),
        // iat: now,
        ...payload
    }
    if(expires_at !== undefined)
    jwt_payload.iat = expires_at

    const encodedHeader = base64_url_encode(header);
    const encodedPayload = base64_url_encode(jwt_payload)

    const signature = crypto.createHmac('sha256',secret).update(`${encodedHeader}.${encodedPayload}`).digest('base64url');

    return `${encodedHeader}.${encodedPayload}.${signature}`
}

