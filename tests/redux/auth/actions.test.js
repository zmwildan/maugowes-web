import { LOGIN, login, logout } from "../../../redux/auth/actions"
import { CALL_API } from "../../../redux/middlewares/requestApi"

describe("Login Action Test", () => {
  it("success login", () => {
    const formdata = { username: "username", password: "password" }
    const result = login(formdata)
    const expexted = {
      [CALL_API]: {
        type: LOGIN,
        method: "post",
        formdata,
        endpoint: `/api/login`,
      },
    }
    expect(result).toEqual(expexted)
  })
})
