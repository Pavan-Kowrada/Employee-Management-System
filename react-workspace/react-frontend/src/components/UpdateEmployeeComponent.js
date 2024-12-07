import React from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';
import EmployeeService from '../services/EmployeeService.js'

function UpdateEmployeeComponent() 
{
    const navigate=useNavigate();

    const [first_name,setFirst_name]=useState("");
    const [last_name,setLast_name]=useState("");
    const [email,setEmail]=useState("");
    const {id}=useParams();


    useEffect(()=>{
        EmployeeService.getEmployeeById(id).then((res)=>
        {
            setFirst_name(res.data.first_name);
            setLast_name(res.data.last_name);
            setEmail(res.data.email);
        }
        )
    },[])

    const updateHandler=(e)=>
    {
      e.preventDefault();
      console.log(id);
      const employee={first_name,last_name,email};

      if(id)
      {
        EmployeeService.updateEmployee(id,employee).then((res)=>
        {
          navigate("/employees");
        }
        )
      }
      else{
        EmployeeService.addEmployee(employee).then(()=>
        {
          navigate("/employees");
        }
        )
      }
    }


    const cancelHandle=(e)=>
    {
        e.preventDefault();
        navigate("/employees");
    }

  return (
    <div clasName='container'>
      <div className='row mt-2'>
        <div className='col-6 offset-md-3'>
          <div className='card p-5'>
            <h3 className='text-center'>Update Employee</h3>
            <form>
              <div className='form-group'>
                <lable className='my-3'>First Name :</lable>
                <input type="text" name="first_name" id='first_name' className='form-control' value={first_name}
                onChange={(e)=> setFirst_name(e.target.value)}/>

                <lable className='my-3'>Last Name :</lable>
                <input type="text" name="last_name" id='last_name' className='form-control' value={last_name}
                onChange={(e)=> setLast_name(e.target.value)}/>

                <lable className='my-3'>Email :</lable>
                <input type="text" name="email" id='email' className='form-control' value={email} 
                onChange={(e)=> setEmail(e.target.value)}/>

                <button className='mt-3 btn btn-danger' onClick={cancelHandle}>Cancel</button>
                <button className='mt-3 btn btn-success ms-3' onClick={updateHandler}>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UpdateEmployeeComponent
