import BaseInput from "./BaseInput";
import client from "../client/Client";
import React, { Component } from "react";
import { Navigate, NavLink } from "react-router-dom";
import Employees from "./emp/Employees";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credential: "",
      password: "",
      loginSuccessful: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  login = async (credential, password) => {
    const response = await client.post("/user/login", {
      username: credential,
      email: credential,
      password: password,
    });
    return response;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.login(this.state.credential, this.state.password).then((res) => {
      localStorage.setItem("token", res.data.token);
      console.log("User token set to: " + res.data.token);
      this.setState({
        ...this.state,
        loginSuccessful: true
      })
    });
  };

  render() {
    return (
      <>
      <form onSubmit={this.handleSubmit} className="flex flex-col gap-3 w-1/4">
        <label>Credential:</label>
        <BaseInput
          labelText={"Username/Email"}
          placeholder={"Username/Email"}
          handleChange={this.handleChange}
          name={"credential"}
        />
        <label>Password:</label>
        <BaseInput
          type="password"
          labelText={"Password"}
          handleChange={this.handleChange}
          name={"password"}
        />
        <div className="w-full flex justify-around">
          <button type="submit" className="btn btn-primary">
            Log-In
          </button>
          <NavLink className='btn btn-secondary' to={'/signup'}>Signup</NavLink>
        </div>
      </form>
      {
        this.state.loginSuccessful ?
        <Navigate to='/employees'/> :
        ''
      }
      </>
    );
  }
}

export default Login;
