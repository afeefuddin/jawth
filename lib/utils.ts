export function base64_url_encode(input: string | ArrayBuffer): string {
  let str: string;
  if (input instanceof ArrayBuffer) {
    str = String.fromCharCode.apply(null, new Uint8Array(input) as any);
  } else {
    str = input;
  }
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
export function base64_url_decode(input: string): Uint8Array {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}