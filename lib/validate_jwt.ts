import decode_jwt from "./decode_jwt";

export default function validate_jwt(secret: string, jwt: string): boolean{
    try {
        decode_jwt(secret,jwt)
    } catch (error) {
        return false;
    }
    return true;
}