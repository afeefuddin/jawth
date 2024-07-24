export function base64_url_encode(data: object): string {
  let s = btoa(JSON.stringify(data));
  let base64_url_encoded_str = s
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  return base64_url_encoded_str;
}

export function base64_url_decode(data: string): Buffer {
  let s = data.replace("/-/g", "+").replace("/_/g", "/");
  const padding =
    data.length % 4 === 0 ? "" : "=".repeat(4 - (data.length % 4));
  const base64withPadding = s + padding;
  return Buffer.from(base64withPadding,'base64url')
}
