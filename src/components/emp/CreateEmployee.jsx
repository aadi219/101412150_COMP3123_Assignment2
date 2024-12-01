import { Navigate, NavLink } from 'react-router-dom';
import client from '../../client/Client';
import BaseInput from '../BaseInput'
import React, { Component } from 'react'

export class CreateEmployee extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      position: '',
      salary: 0,
      date_of_joining: '',
      department: '',
      createSuccess: false,
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }
  
  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await client.post('/emp/employees', {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        position: this.state.position,
        salary: this.state.salary,
        date_of_joining: this.state.date_of_joining,
        department: this.state.department 
      });
      if (response.status == 201) {
          this.setState({
            ...this.state,
            createSuccess: true,
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <>
      <form onSubmit={this.handleSubmit} className='flex flex-col gap-2 border border-gray-600 rounded-md p-5'>
        <h2 className='text-xl font-bold'>Create Employee</h2>
        <div className='w-full flex gap-2'>
          <BaseInput placeholder={'First Name'} name={'first_name'} labelText={'First Name'} handleChange={this.handleChange} />
          <BaseInput placeholder={'Last Name'} name={'last_name'} labelText={'Last Name'} handleChange={this.handleChange} />
        </div>
          <BaseInput placeholder={'Email'} name={'email'} labelText={'Email'} handleChange={this.handleChange} />
          <BaseInput placeholder={'Position'} name={'position'} labelText={'Position'} handleChange={this.handleChange} />
          <BaseInput placeholder={'Salary'} name={'salary'} labelText={'Salary'} handleChange={this.handleChange} />
          <BaseInput type={'date'} placeholder={'Date of Joining'} name={'date_of_joining'} labelText={'Date of Joining'} handleChange={this.handleChange} />
          <BaseInput placeholder={'Department'} name={'department'} labelText={'Department'} handleChange={this.handleChange} />
          <div className="flex gap-2 w-full justify-center">
            <button className="btn btn-accent w-1/2">Create</button>
            <NavLink to={'/employees'} className='btn btn-error w-1/2'>Cancel</NavLink>
          </div>
      </form>
      {
        this.state.createSuccess ?
        <Navigate to={'/employees'} /> : ''
      }
      </>
    )
  }
}

export default CreateEmployee