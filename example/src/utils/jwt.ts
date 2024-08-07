import * as jawth from "jawth"

export async function create_access_token(id: string,username:string){
    const secret = process.env.ACCESS_TOKEN_SECRET!

    const token = await jawth.encode_jwt(secret,id,{username})
    return token
}


export async function create_refresh_token(id: string,username: string){
    const secret = process.env.REFRESH_TOKEN_SECRET!
    const token = await jawth.encode_jwt(secret,id,{
        username
    })
    return token
}

export async function verify_token(jwt: string){
    const secret = process.env.ACCESS_TOKEN_SECRET!

    const isValid = await jawth.decode_jwt(secret,jwt);
    if(isValid){
        return true;
    }
    return false
}

export async function getIdfromjwt(jwt:string) {
    const secret = process.env.ACCESS_TOKEN_SECRET!
    
    const data = await jawth.decode_jwt(secret,jwt);
    return data.id
}