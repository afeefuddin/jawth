const dummy_data = {typ: 'JWT', alg: 'HS256'} 
import {base64_url_decode,base64_url_encode} from "../lib/utils"

const encoded_data = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"

describe('encoding',()=>{
    test("encode",()=>{
        const encoded_string = base64_url_encode(dummy_data);
        expect(true).toBe(true)
    })
})


describe('decoding',()=>{
    test("decode",()=>{
        const raw_obj = base64_url_decode(encoded_data);
        expect(JSON.parse(raw_obj.toString())).toStrictEqual(dummy_data)
    })
})

