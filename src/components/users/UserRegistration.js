import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function UserRegistration() {
	const [message, setMessage] = useState('');
	const navigate = useNavigate()
  //Handling onSubmit
  const onSubmit = async (userObj) => {
		try {
			let user = await axios.post(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/users`, userObj);
			
			if (user.status === 201) {
				setMessage('User Registered successfully');
				navigate('/users');
			}
		} catch (error) {
			console.log(error);
			alert(error?.response?.data?.message); 
		}
  }

  const listUsers = ()=>{
		navigate('/users');
  }

return (
	<div className="container mt-5 w-25">
	  <div className="row card p-2 pt-4 pb-4">
		<h3>User Registration</h3>
		{/* Form */}
		<Formik
		  initialValues={{
			name: '',
			email: '',
			phoneNumber: ''
		  }}
		  validationSchema={Yup.object({
			name: Yup.string()
			  .required('Name is required')
			  .min(3, 'Name must be at least 3 characters')
			  .max(10, 'Name must be at most 10 characters'),
			email: Yup.string()
			  .required('Email is required')
			  .email('Invalid email address'),
			phoneNumber: Yup.string()
			  .required('PhoneNumber is required')
			  .matches(/^\d{10}$/, 'PhoneNumber must be exactly 10 digits')
		  })}
		  onSubmit={onSubmit}
		>
		  {({ isSubmitting }) => (
			<Form>
			  <div className="form-group mt-3 text-start">
				<label htmlFor="name" className="ps-1">Name</label>
				<Field
				  type="text"
				  id="name"
				  name="name"
				  className="form-control"
				  placeholder="Enter your name"
				/>
				<ErrorMessage name="name" className="text-danger" />
			  </div>
			  <div className="form-group mt-3 text-start">
				<label htmlFor="email" className="ps-1">Email</label>
				<Field
				  type="email"
				  id="email"
				  name="email"
				  className="form-control"
				  placeholder="Enter your Email"
				/>
				<ErrorMessage name="email" className="text-danger" />
			  </div>
			  <div className="form-group mt-3 text-start">
				<label htmlFor="phoneNumber" className="ps-1">Phone number</label>
				<Field
				  type="tel"
				  id="phoneNumber"
				  name="phoneNumber"
				  className="form-control"
				  placeholder="Enter your phone number"
				/>
				<ErrorMessage name="phoneNumber" className="text-danger" />
			  </div>
			  {/* Submit Button */}
			  <button
				type="submit"
				className="btn btn-success mt-3"
				disabled={isSubmitting}
			  >
				Submit
			  </button>
			  <br />
			  {/* Display message if necessary */}
			  {message && <p>{message}</p>}
			</Form>
		  )}
		</Formik>
	  </div>
	  <div className="mt-3">
		<button
		  type="button"
		  className="btn btn-warning mt-2"
		  onClick={listUsers}
		>
		  List Users
		</button>
	  </div>
	</div>
  );
}

export default UserRegistration;
