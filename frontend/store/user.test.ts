import * as user from "@/store/user"
// @ponicode
describe("user.state", () => {
    test("0", () => {
        let callFunction: any = () => {
            user.state()
        }
    
        expect(callFunction).not.toThrow()
    })
})
