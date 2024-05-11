import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AddUser(){
    let navigate = useNavigate()

    const[user,setUser] = useState(
        {
            name:"",
            username:"",
            email:"",
        }
    )

    const {name,username,email}=user

    const onInputChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const onSubmit = async(e)=>{
        e.preventDefault()
        try{
        await axios.post("http://localhost:8081/user",user)
        navigate("/")
        } catch (error) {
            console.error('Error loading applicant details:', error);
            
          }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center">Register User</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <div className="mb-3" >
                        <label htmlFor="Name" className="form-label">
                            Name
                        </label>
                        <input type="{text}" className="form-control" placeholder="Enter your name" name="name" value={name} onChange={(e)=>onInputChange(e)} ></input>
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="username" className="form-label">
                            username
                        </label>
                        <input type="{text}" className="form-control" placeholder="Enter your userame" name="username" value={username} onChange={(e)=>onInputChange(e)} ></input>
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="Name" className="form-label">
                            email
                        </label>
                        <input type="{text}" className="form-control" placeholder="Enter your email" name="email" value={email} onChange={(e)=>onInputChange(e)} ></input>
                    </div>
                    <button type="submit" className="btn btn-outline-primary">submit</button>
                    <Link to="/" className="btn btn-outline-danger mx-2">cancel</Link>
                    </form>
                </div>

            </div>

        </div>

    )

}