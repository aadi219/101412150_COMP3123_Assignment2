import axios from "axios";
import BaseInput from "./BaseInput";
import client from "../client/Client";
import React, { Component } from "react";
import { Navigate, NavLink } from "react-router-dom";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      registrationSuccessful: false,
    };
  }

  registerUser = async (userData) => {
    const response = await client.post("/user/signup", userData);
    return response;
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    this.registerUser(userData)
      .then(({ data }) => {
        this.setState({
          ...this.state,
          registrationSuccessful: true
        }) 
      })
      .catch((err) => {
        alert("Error occurred while registering user");
        console.log(err);
      });
  };

  render() {
    return (
      <>
      <form className="border border-gray-500 rounded-lg px-4 py-9 w-1/4 flex flex-col gap-3" onSubmit={this.handleSubmit}>
        <label>Username:</label>
        <BaseInput
          labelText={"Username"}
          placeholder={"Username"}
          handleChange={this.handleChange}
          name={"username"}
        />
        <label>Email:</label>
        <BaseInput
          labelText={"Email"}
          placeholder={"johndoe@domain.com"}
          handleChange={this.handleChange}
          name={"email"}
        />
        <label>Password:</label>
        <BaseInput
          type="password"
          labelText={"Password"}
          handleChange={this.handleChange}
          name={"password"}
        />
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <NavLink to='/' className='btn btn-secondary'>Login</NavLink>
      </form>
      {
        this.state.registrationSuccessful ? 
          <Navigate to='/' /> :
          ''
      }
      </>
    );
  }
}

export default Signup;
