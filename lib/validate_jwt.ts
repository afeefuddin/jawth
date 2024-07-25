import {decode_jwt} from "./decode_jwt";

export async  function validate_jwt(secret: string, jwt: string): Promise<boolean>{
    try {
       await decode_jwt(secret,jwt)
    } catch (error) {
        return false;
    }
    return true;
}