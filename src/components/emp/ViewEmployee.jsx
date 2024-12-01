import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import client from '../../client/Client';

const ViewEmployee = () => {

    const { id } = useParams();
    let [employee, setEmployee] = useState(null);
    
    const getEmployee = async () => {
        const response = await client.get(`/emp/employees/${id}`);
        setEmployee(response.data);
    }

    useEffect(() => {
        getEmployee();
    }, [])
    
  return (
        !employee ?
        <p>Loading employee...</p> :
        <div className='card border rounded-lg w-1/2 text-xl'>
            <div className="card-body">
                <h2 className="card-title text-6xl text-green-400">{employee.first_name} {employee.last_name}</h2>
                <div className="flex justify-center">
                    <p className='text-amber-600'><b>ID: </b> {employee._id}</p>
                    <p className='text-amber-600'><b>Email: </b>{employee.email}</p>
                </div>
                <div className='flex'>
                    <p>Created At: {new Date(employee.createdAt).toLocaleDateString()}</p>
                    <p>Updated At: {new Date(employee.updatedAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className='text-cyan-500'><b>Salary:</b> ${employee.salary}</p>
                    <p className='text-cyan-500'><b>Department:</b> {employee.department}</p>
                    <p className='text-cyan-500'><b>Position:</b> {employee.position}</p>
                    <p className='text-cyan-500'><b>Date of Joining:</b> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
                </div>
                <div className="card-actions justify-start">
                    <NavLink to={-1} className='btn btn-primary justify-self-start px-8'>Back</NavLink>
                    <NavLink to={`edit/${employee._id}`} className='btn btn-warning px-8'>Edit</NavLink>
                    <button to={`delete/${employee._id}`} className='btn btn-error px-8'>Delete</button>
                </div>
            </div>
        </div>
  )
}

export default ViewEmployee