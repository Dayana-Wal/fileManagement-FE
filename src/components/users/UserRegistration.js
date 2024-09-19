import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UserRegistration.css'

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
	<div class="d-flex justify-content-center align-items-center min-vh-100">
		<div className="container w-25 row card p-2 pt-4 pb-4 register-box">
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
				.max(20, 'Name must be at most 20 characters'),
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
					<ErrorMessage name="name" component="div" className="text-danger" />
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
					<ErrorMessage name="email" component="div" className="text-danger" />
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
					<ErrorMessage name="phoneNumber" component="div" className="text-danger" />
				</div>
				<div class="d-flex justify-content-between mt-4">
					{/* List users Button */}
					<button
						type="submit"
						class="btn w-75 me-1 listUsers-btn"
						disabled={isSubmitting}
						onClick={listUsers}
					>
						List users
					</button>
					{/* Register Button */}
					<button
						type="submit"
						class="btn w-75 ms-1 register-btn"
						disabled={isSubmitting}
					>
						Register
					</button>
				</div>
				{/* Display message if necessary */}
				{message && <p><br/> {message}</p>}
				</Form>
			)}
			</Formik>
		</div>
	</div>
  );
}

export default UserRegistration;
