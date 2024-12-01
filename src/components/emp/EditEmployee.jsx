import React from 'react'
import { useParams } from 'react-router-dom'
import CreateEmployee from './CreateEmployee';

const EditEmployee = () => {
    const { id } = useParams();
  return (
    <>
        <CreateEmployee id={id} />
    </>
  ) 
}

export default EditEmployee