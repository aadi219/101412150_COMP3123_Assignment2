import { Navigate, NavLink, useLocation, useParams } from 'react-router-dom';
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
      success: false,
    }

    this.mode = this.props.id ? "UPDATE" : "CREATE";
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
      const data = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        position: this.state.position,
        salary: this.state.salary,
        date_of_joining: this.state.date_of_joining,
        department: this.state.department 
      }
      let response;
      if (this.mode == "CREATE") {
        response = await client.post('/emp/employees', data);
      }
      else if (this.mode == "UPDATE") {
        response = await client.put(`/emp/employees/${this.props.id}`, data);
      }
      if (response.status == 201 || response.status == 200) {
          this.setState({
            ...this.state,
            success: true,
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadEmployee = () => {
    if (this.mode == "UPDATE") {
      client.get(`/emp/employees/${this.props.id}`).then(response => {
        this.setState({
          ...response.data
        })
      })
    }
  }

  componentDidMount() {
    if (this.mode == "UPDATE") {
      this.loadEmployee();
    }
  }

  render() {
    return (
      <>
      <form onSubmit={this.handleSubmit} className='flex flex-col gap-2 border border-gray-600 rounded-md p-5'>
        <h2 className='text-xl font-bold'>{this.mode == "CREATE" ? "Create" : "Update"} Employee</h2>
        <div className='w-full flex gap-2'>
          <BaseInput placeholder={'First Name'} name={'first_name'} labelText={'First Name'} value={this.state.first_name} handleChange={this.handleChange} />
          <BaseInput placeholder={'Last Name'} name={'last_name'} labelText={'Last Name'} value={this.state.last_name} handleChange={this.handleChange} />
        </div>
          <BaseInput placeholder={'Email'} name={'email'} labelText={'Email'} value={this.state.email} handleChange={this.handleChange} />
          <BaseInput placeholder={'Position'} name={'position'} labelText={'Position'} value={this.state.position} handleChange={this.handleChange} />
          <BaseInput placeholder={'Salary'} name={'salary'} labelText={'Salary'} value={this.state.salary} handleChange={this.handleChange} />
          {
            this.mode == "UPDATE" ? 
            <BaseInput value={new Date(this.state.date_of_joining).toLocaleDateString()} readonly={true} /> :
            <BaseInput type={'date'} placeholder={'Date of Joining'} value={this.state.date_of_joining} name={'date_of_joining'} labelText={'Date of Joining'} handleChange={this.handleChange} />
          }
          <BaseInput placeholder={'Department'} name={'department'} labelText={'Department'} value={this.state.department} handleChange={this.handleChange} />
          <div className="flex gap-2 w-full justify-center">
            <button type='submit' className="btn btn-accent w-1/2">{this.mode == "UPDATE" ? "Update" : "Create"}</button>
            <NavLink to={'/employees'} className='btn btn-error w-1/2'>Cancel</NavLink>
          </div>
      </form>
      {
        this.state.success ?        
        <Navigate to={'/employees'} /> : ''
      }
      </>
    )
  }
}

export default CreateEmployee;