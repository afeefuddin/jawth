import { decode_jwt } from "../lib/decode_jwt"
import {encode_jwt} from "../lib/encode_jwt"

const test_secret = "hi"

describe("encode_jwt",()=>{
    test("encoding_jwt",async()=>{
        const data =await encode_jwt(test_secret,1234567890,{
            "name": "John Doe",
          })
        const decode_now = await decode_jwt(test_secret,data);
        console.log(decode_now)
        expect(decode_now.id).toBe("1234567890")
    })
})