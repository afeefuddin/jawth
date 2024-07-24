import * as crypto from "crypto"
import { base64_url_decode, base64_url_encode } from "./utils";

export default function decode_jwt(secret:string,jwt:string): {
    id: string,
    payload: object,
    expires_at: Date
}{
    //decodes jwt
    const jwtSplitted = jwt.split('.')
    if(jwtSplitted.length !== 3){
        throw new Error("Invalid Json web token")
    }
    const header = jwtSplitted[0];
    const payload = jwtSplitted[1];

    const parsed_payload = JSON.parse(base64_url_decode(payload).toString());
    const parsed_signature = base64_url_decode(jwtSplitted[2]);

    const expected_signature = crypto.createHmac('sha256',secret).update(`${header}.${payload}`).digest("base64url");
    
    if(!crypto.timingSafeEqual(base64_url_decode(expected_signature),parsed_signature)){
        throw new Error("Invalid Signature")
    }
    if(parsed_payload.exp && Date.now() >= parsed_payload.exp *1000){
        throw new Error("JWT Expired")
    }

    return {
        id: parsed_payload.sub,
        payload: parsed_payload,
        expires_at: parsed_payload.exp
    }

}