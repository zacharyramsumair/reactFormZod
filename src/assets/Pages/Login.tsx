import React, { useEffect } from "react";
import { useFormContext, useLoginContext } from "../Components/Context";
import { useNavigate } from "react-router-dom";
import FormInput from "../Components/FormInput";

type Props = {};

const Login = (props: Props) => {
	let { loggedIn, setLoggedIn} = useLoginContext();
	let { formData, setFormData } = useFormContext();

	const navigate = useNavigate();
	useEffect(() => {
		if (loggedIn) {
			navigate("/");
		}
	}, [loggedIn]);

	let inputs = [
		{
			id: 1,
			name: "name",
			type: "text",
			placeholder: "Full Name",
			label: "Full Name",
			required: true,
			errorMessage:
				"Username should be 3-16 characters and shouldn't include any special character!",
			pattern: "^[A-Za-z0-9]{3,16}$",
		},
		{
			id: 2,
			name: "age",
			type: "text",
			placeholder: "Age",
			label: "Age",
			required: true,
			errorMessage: "Must be at least 18 and age must be number!",
      pattern: "^(?:1[01][0-9]|120|1[8-9]|[2-9][0-9])$"
		},
		{
			id: 3,
			name: "birthday",
			type: "date",
			placeholder: "Date of Birth",
			label: "Date of Birth",
			required: true,
		},
		{
			id: 4,
			name: "email",
			type: "email",
			placeholder: "Email",
			label: "Email",
			required: true,
			errorMessage: "Not a valid email address!",
		},
		{
			id: 5,
			name: "password",
			type: "password",
			placeholder: "Password",
			label: "Password",
			autoComplete: "on",
			required: true,
			errorMessage:
				"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
		},
		{
			id: 6,
			name: "confirmPassword",
			type: "password",
			placeholder: "Confirm Password",
			label: "Confirm Password",
			autoComplete: "on",
			required: true,
			errorMessage: "Passwords don't match!",
			pattern: formData.password,
		},
	];

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    console.log(formData)
    if(setLoggedIn){
      setLoggedIn(true)
    }
	};

	const updateForm = (e: React.FormEvent<HTMLFormElement>) => {
		if (setFormData) {
			setFormData((prev) => {
				const { name, value } = e.target as HTMLInputElement;
				return {
					...prev,
					[name]: value,
				};
			});
		}

		// console.log(formData);
	};

	return (
		<section className="loginPage">
			<div>
				<h1 className="loginHeader">Login</h1>
				{/* <p>{loggedIn ? "true" : "false"}</p> */}
			</div>

			<form onSubmit={handleSubmit}>
				{inputs.map((input) => (
					<FormInput key={input.id} {...input} onChange={updateForm} />
				))}

				<button className="submit">Submit</button>
			</form>
		</section>
	);
};

export default Login;
