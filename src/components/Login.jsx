import BaseInput from "./BaseInput";
import client from "../client/Client";
import React, { Component } from "react";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credential: "",
      password: "",
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
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
      console.log(res.data);
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <BaseInput
          labelText={"Username/Email"}
          placeholder={"Username/Email"}
          handleChange={this.handleChange}
          name={"credential"}
        />
        <BaseInput
          type="password"
          labelText={"Password"}
          handleChange={this.handleChange}
          name={"password"}
        />
        <button type="submit" className="btn btn-primary">
          Log-In
        </button>
      </form>
    );
  }
}

export default Login;
