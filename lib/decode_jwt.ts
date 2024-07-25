import { base64_url_decode } from "./utils";

export async function decode_jwt(secret: string, jwt: string): Promise<{
  id: string,
  payload: object,
  expires_at: Date | undefined
}> {
  // Decodes jwt
  const jwtSplitted = jwt.split('.');
  if (jwtSplitted.length !== 3) {
    throw new Error("Invalid JSON Web Token");
  }
  const [header, payload, signaturePart] = jwtSplitted;

  const parsed_payload = JSON.parse(new TextDecoder().decode(base64_url_decode(payload)));
  const parsed_signature = base64_url_decode(signaturePart);

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const data = encoder.encode(`${header}.${payload}`);
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    parsed_signature,
    data
  );

  if (!isValid) {
    throw new Error("Invalid Signature");
  }

  if (parsed_payload.exp && Date.now() >= parsed_payload.exp * 1000) {
    throw new Error("JWT Expired");
  }

  return {
    id: parsed_payload.sub,
    payload: parsed_payload,
    expires_at: parsed_payload.exp ? new Date(parsed_payload.exp * 1000) : undefined
  };
}