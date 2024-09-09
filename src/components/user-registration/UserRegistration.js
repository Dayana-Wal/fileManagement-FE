import axios from "axios";
import { useForm } from "react-hook-form";
function UserRegistration() {
  const {register, handleSubmit} = useForm()

  //handling onSubmit
  const onSubmit = async (userObj) => {
	let user = await axios.post(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/users`, userObj)
	if(user.status === 201){
		//Will navigate to another page related to files
		console.log('User Created')
	}
	if(user.status === 500) {
		//Display error message
	}
  }

  //onClick List Users
  const listUsers = ()=>{
	//Navigate to users component
  }

  return (
	<div className="container mt-5 w-25" >
		<div className="row card p-2 pt-4 pb-4">
			<h3> User Registration </h3>
				{/* Form */}
				<form onSubmit={handleSubmit(onSubmit)}> 
					<div class="form-group mt-3 text-start" >
						<label for="name" className="ps-1" >Name</label>
						<input type="text" class="form-control" id="name"  placeholder="Enter your name" 
						{...register('name')} required></input>
					</div>
					<div class="form-group mt-3 text-start">
						<label for="Email" className="ps-1">Email</label>
						<input type="email" class="form-control" id="email"  placeholder="Enter your Email"
						{...register('email')} required></input>
					</div>
					<div class="form-group mt-3 text-start">
						<label for="phoneNumber" className="ps-1">Phone number</label>
						<input type="tel" class="form-control" id="phoneNumber"  placeholder="Enter your phone number"
						{...register('phoneNumber')}></input>
					</div>
					{/* Submit Button */}

					<button type="submit" className="btn btn-success mt-3">Submit</button>
		
				</form>
		</div>
		<div className="mt-3 text-end">
			<button type="submit" className="btn btn-warning mt-2" onClick={listUsers}>List Users</button>
		</div>			
	</div>
  
  );
}

export default UserRegistration;
