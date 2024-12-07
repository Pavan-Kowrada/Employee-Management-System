import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import EmployeeService from '../services/EmployeeService'


function CreateEmployeeComponent() 
{

  let navigate=useNavigate();

  const [employee,setEmployee]=useState({
    first_name:"",
    last_name:"",
    email:""
  })

    const cancelHandle=()=>
    {
      navigate("/employees");
    }

    const handleChange=(e)=>
    {
      const name=e.target.name;
      const value=e.target.value;
      setEmployee({...employee,[name]:value});
    }

    const saveHandle=(e)=>
    {
      e.preventDefault();
      console.log(JSON.stringify(employee));

      EmployeeService.addEmployee(employee).then((res)=>
      {
            navigate("/employees");
      })
    }
  return (
    <div clasName='container'>
      <div className='row mt-2'>
        <div className='col-6 offset-md-3'>
          <div className='card p-5'>
            <h3 className='text-center'>Add Employee</h3>
            <form>
              <div className='form-group'>
                <lable className='my-3'>First Name</lable>
                <input type="text" name="first_name" id='first_name' className='form-control' value={employee.first_name}
                onChange={handleChange}/>

                <lable className='my-3'>Last Name</lable>
                <input type="text" name="last_name" id='last_name' className='form-control' value={employee.last_name}
                onChange={handleChange}/>

                <lable className='my-3'>Email</lable>
                <input type="text" name="email" id='email' className='form-control' value={employee.email} 
                onChange={handleChange}/>

                <button className='mt-3 btn btn-danger' onClick={cancelHandle}>Cancel</button>
                <button className='mt-3 btn btn-success ms-3' onClick={saveHandle}>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEmployeeComponent
