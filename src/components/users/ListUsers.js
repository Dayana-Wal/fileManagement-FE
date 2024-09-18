import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadFile from "../upload-file/UploadFile";
import { Table } from "react-bootstrap";
import './ListUsers.css'


function ListUsers() {

  const [users, setUsers] = useState();
  const navigate = useNavigate()
  const [ modalShow, setModalShow]  = useState(false)
  const [ selectedUserId, setSelectedUserId ] = useState(null)

  const getAllUsers  = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/users`);
      if(res.status === 200) {
        setUsers(res.data);
      }
    } catch(error) {
      console.log('error', error);
    }
  }

  const handleUploadClick = (userId) =>{
    setSelectedUserId(userId)
    setModalShow(true)
  }
  

  const handleListFiles = (userId, userName) => {
    console.log(`List files for user: ${userId}`);
    navigate('/files', {state: {userId, userName}});
  };

  useEffect(()=> {
    getAllUsers();
  },[])
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Users list </h2>
      {
        users?.length === 0 ? <p>Please register any user , No users found registered</p> : 
        <Table striped bordered hover >
          <tr class="table-header">
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Upload File</th>
            <th>List Files</th>
          </tr>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                <label className="btn btn-primary custom-file-upload">
                    Upload File
                    <input
                      style={{ display: 'none' }}
                      onClick={() => handleUploadClick(user._id)}
                    />
                  </label>
                </td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleListFiles(user._id, user.name)}>
                    List Files
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
      <UploadFile 
      show = {modalShow} 
      onHide = {()=>setModalShow(false)}
       userId = {selectedUserId}
      />
    </div>
  )
}
export default ListUsers;