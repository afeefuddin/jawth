import validate_jwt from "../lib/validate_jwt"


const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.LcHZk02N7mJdHso3cnoQNah5_qNDcqdyt8mk5MtwEEI"

describe("validate_jwt",()=>{
    test("validate_jwt",()=>{
        const isValid = validate_jwt("hi",token1)
        expect(isValid).toBe(true)
    })
    test("Invalid_jwt",()=>{
        const isValid = validate_jwt("hi",token1.split('.')[0])
        expect(isValid).toBe(false)
    })
})