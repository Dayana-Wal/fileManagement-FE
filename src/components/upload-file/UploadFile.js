import axios from "axios";
import { Modal,Button } from "react-bootstrap"
import { useState } from "react";
import { useEffect } from "react";

export function UploadFile({ show, onHide, userId }) {
	const [ fileName, setFileName] = useState('No file chosen')
	const [selectedFile, setSelectedFile] = useState(null)
	const [storageOption, setStorageOption] = useState('');

	const handleFileName = (e) => {
		if (e.target.files.length > 0) {
      		setFileName(e.target.files[0].name); 
			setSelectedFile(e.target.files[0])
    }
	}

	// Reset the file name when modal is closed
	useEffect(() => {
		if (!show) {
			setFileName('No file chosen');
			setSelectedFile(null);
		}
	}, [show]); 
	

	//Calling upload API
	const handleFileChange = async (userId) => {
		if(!selectedFile) {
			alert('No file selected')
		}
		if(!storageOption){
			alert('Please select a storage option')
		}

		console.log(`Selected file for user ${userId}:`, selectedFile, storageOption);
		const formData = new FormData();
		formData.append('file', selectedFile);
		formData.append('userId', userId);
		formData.append('targettedStorage', storageOption)

		try {
			const response = await axios.post(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/files`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			if(response.status === 201) {
				alert('File uploaded successfully!');
				onHide()
			}
		} catch (error) {
			alert('Error while uploading!!'); 
			console.error('Error uploading file:', error);
		}
	};

	return(
		<Modal
		show= { show }
		onHide = { onHide }
		size="md"
		aria-labelledby="contained-modal-title-vcenter"
		centered
		>
		<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
				Upload File
				</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<h5 className="m-1"> Select target storage</h5>
      <div className="m-2 w-50">
				<select 
				className="form-select" 
				value={storageOption} 
				onChange={(e) => setStorageOption(e.target.value)}
				>
					<option value="">Select storage option</option>
					<option value="LocalStorage">Local Storage</option>
					<option value="Aws">AWS S3</option>
					<option value="Azure">Azure Storage</option>
				</select>
      </div>
			<div>
				<label className="btn btn-primary custom-file-upload mt-4">
						Select File
						<input
							type="file"
							style={{ display: 'none' }}
							onChange={handleFileName}
							/>
				</label>
				<div>{fileName}</div> {/* Display the selected file name */}
			</div>
			


		</Modal.Body>
		<Modal.Footer>
				<Button className='btn btn-success' onClick={(e) => handleFileChange(userId)}>Upload</Button>
		</Modal.Footer>
		</Modal>
	)
}

export default UploadFile