import encode_jwt from "../lib/encode_jwt"

const test_secret = "hi"

describe("encode_jwt",()=>{
    test("encoding_jwt",()=>{
        const data = encode_jwt(test_secret,1234567890,{
            "name": "John Doe",
          })
        expect(data).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.LcHZk02N7mJdHso3cnoQNah5_qNDcqdyt8mk5MtwEEI")

    })
})