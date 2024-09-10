import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListUsers() {

  const [users, setUsers] = useState();
  const navigate = useNavigate()

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

  const handleFileChange = async (event, userId) => {
    const files = event.target.files;
    if (files.length > 0) {
      console.log(`Selected file for user ${userId}:`, files[0]);
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('userId', userId);

      try {
        const response = await axios.post(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if(response.status === 201) {
          alert('File uploaded successfully!');
        }
      } catch (error) {
        alert('Error while uploading!!'); 
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleListFiles = (userId, userName) => {
    console.log(`List files for user: ${userId}`);
    navigate('/files', {state: {userId, userName}});
  };

  useEffect(()=> {
    getAllUsers();
  },[])
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Users</h1>
      {
        users?.length === 0 ? <p>No Users Found</p> : 
        <table className="table table-striped table-hover table-bordered">
          <tr className="bg-success text-white">
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Upload Files</th>
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
                  Upload Files
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, user._id)}
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
      </table>
      }
      
    </div>
  )
}
export default ListUsers;