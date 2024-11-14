import BaseInput from './BaseInput'

import React, { Component } from 'react'

export class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
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
                    labelText={"Username"} 
                    placeholder={"Username"}
                    handleChange={this.handleChange}
                    name={"username"} />
                <BaseInput 
                    labelText={"Email"} 
                    placeholder={"johndoe@domain.com"} 
                    handleChange={this.handleChange}
                    name={"email"} />
                <BaseInput 
                    type="password"
                    labelText={"Password"} 
                    handleChange={this.handleChange}
                    name={"password"} />
                <button type="submit" className='btn btn-primary'>Sign Up</button>
                
            </form>
        )
    }
}

export default Signup
