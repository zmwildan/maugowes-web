import React from "react"
import Styled from "styled-components"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import { color_gray_medium } from "../../components/Const"
import InputText from "../../components/form/InputText"
import Submit from "../../components/form/Submit"
import Toast from "../../modules/toast"

const SuperPageStyled = Styled.div`
  .super-login-wrapper {
    margin: 50px 0;
    padding: 20px 30px;
    border: 1px solid ${color_gray_medium};
    text-align: center;
    .form-child {
      margin-bottom: 10px;
    }
  }
`

class SuperPage extends React.Component {
  state = {}

  handleLogin() {
    console.log("check validator...")
  }

  render() {
    return (
      <GlobalLayout metadata={{title: "Login Super Page"}}>
        <DefaultLayout>
          <SuperPageStyled>
            <div className="grid-center">
              <div className="col-4 super-login-wrapper">
                <h1>Super Page</h1>
                <p>Pastikan untuk menjaga keamanan di Mau Gowes</p>
                <br />
                <form className="super-login-form">
                  <InputText
                    placeholder="username / email"
                    type="text"
                    value={this.state.username || ""}
                    required={true}
                    validate={this.state.username_validate || {}}
                    setState={(ns, cb) => this.setState(ns, cb)}
                    name="username"
                  />
                  <InputText
                    placeholder="password"
                    type="password"
                    value={this.state.password || ""}
                    required={true}
                    validate={this.state.password_validate || {}}
                    setState={(ns, cb) => this.setState(ns, cb)}
                    name="password"
                  />
                  <br />
                  <Submit
                    onClick={() => this.handleLogin()}
                    text="Login"
                    requiredInputs={["username", "password"]}
                    setState={(ns, cb) => this.setState(ns, cb)}
                  />
                </form>
              </div>
            </div>
          </SuperPageStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default SuperPage
