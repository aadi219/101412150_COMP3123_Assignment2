import BaseInput from './BaseInput'

import React, { Component } from 'react'

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            credential: "",
            password: ""
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <BaseInput 
                    labelText={"Username/Email"} 
                    placeholder={"Username/Email"}
                    handleChange={this.handleChange}
                    name={"credential"} />
                <BaseInput 
                    type="password"
                    labelText={"Password"} 
                    handleChange={this.handleChange}
                    name={"password"} />
                <button type="submit" className='btn btn-primary'>Log-In</button>
            </form>
        )
    }
}

export default Login

