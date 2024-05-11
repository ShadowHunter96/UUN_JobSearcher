import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";


const UsersGrid = () => {
    const [users, setUsers] = useState([])
    

  useEffect(() => {
    loadUsers();


  }, [])

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8081/users")
    setUsers(result.data)
  }

  const deleteuser = async(id)=>{
    await axios.delete(`http://localhost:8081/user/${id}`)
    loadUsers()
  }
  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">username</th>
              <th scope="col">email</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) =>
                <tr key={index}>
                  <th scope="row" >{index+1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>View</Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
                    <button className="btn btn-danger mx-2" onClick={()=>deleteuser(user.id)}>Delete</button>
                  </td>
                </tr>

              )}


          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersGrid
