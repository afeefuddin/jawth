import decode_jwt from "../lib/decode_jwt"

const test_secret = "hi"

describe("encode_jwt",()=>{
    test("encoding_jwt",()=>{
        const data = decode_jwt(test_secret,
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.LcHZk02N7mJdHso3cnoQNah5_qNDcqdyt8mk5MtwEEI"
      )
        expect(data).toStrictEqual(
            {
                id: '1234567890',
                payload: { sub: '1234567890', name: 'John Doe' },
                expires_at: undefined
              }
        )
    })
})