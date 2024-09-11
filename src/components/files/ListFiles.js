import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {saveAs} from 'file-saver';

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
      console.error('something went wrong!',error);
    }
  }

  const handleEditFile = (fileId, fileName) => {
    navigate('/files/editFile', {
      state: { fileId: fileId, fileName: fileName }
    });
  };

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

  const handleDownloadFile = async(fileId) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/files/download/${fileId}`,{
        responseType: 'blob'
      });
      if(response.status === 200) {
        const contentDisposition = response.headers['content-disposition'];
        const fileName = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, '') : 'downloaded-file';
        saveAs(response.data, fileName);
        alert('File Downloaded successfully!!');
      }
    } catch (error) {
      alert('something went wrong!!')
      console.log(error);
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
            <th>Targetted Storage</th>
            <th>Open File</th>
            <th>Delete File</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {files?.map((file) => (
            <tr key={file._id}>
              <td>{file.fileName}</td>
              <td>{file.targettedStorage}</td>
              <td>
              <button className="btn btn-primary"  onClick={() => handleEditFile(file._id, file.fileName)}>
                  Open File
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={()=> handleDeleteFile(file._id)}>
                  Delete File
                  <span style={{ marginLeft: '5px' }}></span>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
              <td>
                <button className="btn btn-warning" onClick={()=> handleDownloadFile(file._id)}>
                Download File
                <span style={{ marginLeft: '5px' }}></span>
                <i className="fas fa-download"></i>
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