import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ListFiles() {

  const [files, setFiles] = useState();
  const location = useLocation();
  const userId = location.state?.userId || {};
  const userName = location.state?.userName || {};
  const navigate = useNavigate();

  const getFiles = async() =>{
    try{
      const response = await axios.get(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/files`, {
        params: {
          userId: userId
        }
      });
      if(response.status === 200) {
        setFiles(response?.data)
      }
    } catch(error) {
      console.error('something went wrong!');
    }
  }

  const handleEditFile = async(fileId) => {
    // TODO
  }

  const handleDeleteFile = async(fileId) =>{
    try{
      const response = await axios.delete(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/files/${fileId}`, {
        params: {
          userId: userId
        }
      })
      if(response.status === 200) {
        getFiles();
        alert('File deleted successfully!!')
      }
    } catch(error) {
      alert('Something went wrong');
      console.error('something went wrong!!');
    }
  }

  useEffect(() => {
    getFiles();
  },[])

  return(
    <div className="container mt-5">
      <h1 className="text-center mb-4"> {userName} Files</h1>
      {
        files?.length === 0 ? <p>No Files Found</p> : 
        <table className="table table-striped table-hover table-bordered">
        <thead className="bg-dark">
          <tr>
            <th>File Name</th>
            <th>Edit File</th>
            <th>Delete File</th>
          </tr>
        </thead>
        <tbody>
          {files?.map((file) => (
            <tr key={file._id}>
              <td>{file.fileName}</td>
              <td>
              <button className="btn btn-primary" onClick={()=> handleEditFile(file._id)}>
                  Edit File
                </button>
              </td>
              <td>
                <button className="btn btn-secondary" onClick={()=> handleDeleteFile(file._id)}>
                  Delete File
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

export default ListFiles;