import "./ListFiles.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {saveAs} from 'file-saver';
import { Table, Spinner } from "react-bootstrap";

function ListFiles() {

  const [files, setFiles] = useState();
  const [fileId, setFileId] = useState(false)
  const [loading, setLoading] = useState(null);
  const location = useLocation();
  const userId = location.state?.userId || {};
  const userName = location.state?.userName || {};
  const navigate = useNavigate();

  const toggleMenu = (fileId) => {
    setFileId((prevId)=> prevId === fileId ? null : fileId)
  }

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

  const handleEditFile = (fileId, userId, fileName, fileType) => {
    navigate('/files/openFile', {
      state: { fileId: fileId, userId: userId, fileName: fileName, fileType: fileType }
    });
  };

  const handleDeleteFile = async(fileId) =>{
    setLoading(fileId);
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
    } finally {
      setLoading(null);
    }
  }

  const handleDownloadFile = async(fileId) => {
    setLoading(fileId);
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
    } finally {
      setLoading(null);
    }
  }

  const handleViewThumbnails = (fileId) => {
    navigate('/files/thumbnails', {
      state: { fileId: fileId }
    });
  };

  useEffect(() => {
    getFiles();
  },[])

  return(
    <div className="container mt-5 w-75 position-relative">
      {loading && (
        <div className="loader-overlay d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" />
        </div>
      )}
      <h1 className="text-center mb-4"> {userName} Files</h1>
      {
        files?.length === 0 ? <p>No Files Found</p> : 
        <div className="container row">
          {<Table striped bordered hover >
           
              <tr class="table-header">
                <th className="p-3">File Name</th>
                <th>Targetted Storage</th>
                <th>Options</th>
              </tr>

            <tbody>
              {files?.map((file) => (
                <tr key={file._id}>
                  <td className="col-md-6">{file.fileName}</td>
                  <td className="col-md-4">{file.targettedStorage}</td>
                  <td className="col-md-1 position-relative">
                    <button className="btn" onClick={()=> toggleMenu(file._id)}>
                      &#8942;
                    </button>
                    {fileId === file._id && 
                      <ul className="list-group list-group-flush position-absolute options">
                        <li className="list-group-item" onClick={() => handleEditFile(file._id, userId, file.fileName, file.fileType)}>Open</li>
                        <li className="list-group-item" onClick={() => handleDownloadFile(file._id)}>Download</li>
                        <li className="list-group-item" onClick={() => handleDeleteFile(file._id)}>Delete</li>
                        {file.fileType.split('/')[0] === 'image' &&  <li className="list-group-item" onClick={() => handleViewThumbnails(file._id)}>View thumbnails</li>
                      }
                      </ul>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> }
        </div>
       
      }
    </div>
  )
}

export default ListFiles;