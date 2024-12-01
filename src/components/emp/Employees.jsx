import React, { useEffect, useState } from 'react'
import client from '../../client/Client';
import { NavLink } from 'react-router-dom';

const Employees = () => {
    let [employees, setEmployees] = useState([]);

    const getEmployees = async () => {
        const response = await client.get('/emp/employees');
        setEmployees(response.data);
    }

    useEffect(() => {
        getEmployees();
    }, [])

  return (
    <div className='w-3/4 rounded-lg '>
        <NavLink to={'create'} className="btn btn-accent my-4">Add Employee</NavLink>
        {
            !employees ? 
            <p>No employees to show...</p> :
            <table className="table table-zebra rounded border border-gray-500">
                <thead>
                    <tr>
                        <th scope='col' className='text-lg'>ID</th>
                        <th scope='col' className='text-lg'>Full Name</th>
                        <th scope='col' className='text-lg'>Department</th>
                        <th scope='col' className='text-lg'>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(emp => (
                            <tr>
                                <th>{emp._id}</th>
                                <td>{emp.first_name} {emp.last_name}</td>
                                <td>{emp.department}</td>
                                <td className='flex justify-around'>
                                    <NavLink to={`${emp._id}`} className="btn btn-primary">View</NavLink>
                                    <NavLink to={`edit/${emp._id}`} className="btn btn-warning">Edit</NavLink>
                                    <button className="btn btn-error">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        }
    </div>
  )
}

export default Employees