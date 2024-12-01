import React, { useContext, useEffect, useState } from 'react'
import { empClient } from '../../client/Client';
import { NavLink } from 'react-router-dom';
import BaseInput from '../BaseInput';

const Employees = () => {
    let [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState('');
    const getEmployees = async () => {
        const response = await empClient.get('/emp/employees');
        setEmployees(response.data);
    }

    const handleFilterChange = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    }

    const handleFilter = async (e) => {
        e.preventDefault();

        if (filter == "") {
            getEmployees();
            return;
        }
        await empClient.get('/emp/employees/filter', {
            params: {
                criteria: filter
            }
        }).then((response) => {
            setEmployees(response.data);
        })
    }

    useEffect(() => {
        getEmployees();
    }, [])

  return (
    <div className='w-3/4 rounded-lg '>
        <div className='flex items-center gap-3'>
            <NavLink to={'create'} className="btn btn-accent my-4">Add Employee</NavLink>
            <div className='flex gap-2 w-full'>
                <BaseInput className='w-full' labelText={"Filter"} value={filter} placeholder={"Filter by Department/Position"} 
                    handleChange={handleFilterChange} />
                <button className='btn btn-primary' onClick={handleFilter}>Filter</button>
            </div>
        </div>
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