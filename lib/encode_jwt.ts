import { header } from "./constants";
import { base64_url_encode } from "./utils";

export async function encode_jwt(secret: string, id: string | number, payload: object, ttl?: number): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expires_at = ttl ? now + ttl : undefined;

  const jwt_payload: any = {
    sub: id.toString(),
    iat: now,
    ...payload
  };
  
  if (expires_at !== undefined) {
    jwt_payload.exp = expires_at;
  }

  const encodedHeader = base64_url_encode(JSON.stringify(header));
  const encodedPayload = base64_url_encode(JSON.stringify(jwt_payload));

  const encoder = new TextEncoder();
  const data = encoder.encode(`${encodedHeader}.${encodedPayload}`);

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    data
  );

  const signature = base64_url_encode(signatureBuffer);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}