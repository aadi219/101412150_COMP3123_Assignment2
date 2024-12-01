import React, { useContext, useEffect, useState } from 'react'
import { empClient } from '../../client/Client';
import { NavLink, useNavigate } from 'react-router-dom';
import BaseInput from '../BaseInput';

const Employees = () => {
    let [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState('');
    const getEmployees = async () => {
        const response = await empClient.get('/emp/employees');
        setEmployees(response.data);
    }
    const navigate = useNavigate();

    const handleFilterChange = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    }

    const handleFilter = (e) => {
        e.preventDefault();

        if (filter == "") {
            getEmployees();
            return;
        }
        empClient.get('/emp/employees/filter', {
            params: {
                criteria: filter
            }
        }).then((response) => {
            setEmployees(response.data);
        })
    }

    const deleteEmployee = async (empId) => {
        try {
            await empClient.delete('emp/employees', {
                params: {
                    eid: empId
                }
            });
            getEmployees();

        } catch (error) {
            console.error(error);
        }

    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate('/');
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
                                    <button onClick={() => deleteEmployee(emp._id)} className="btn btn-error">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        }
        <div>
            <button className='btn btn-secondary my-2 w-64' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Employees