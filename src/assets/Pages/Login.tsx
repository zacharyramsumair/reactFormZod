import React, { useEffect } from "react";
import { useFormContext, useLoginContext } from "../Components/Context";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ZodType } from "zod/lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const Login = (props: Props) => {
	let { loggedIn, setLoggedIn } = useLoginContext();
	let { formData, setFormData } = useFormContext();

	const navigate = useNavigate();
	useEffect(() => {
		if (loggedIn) {
			navigate("/");
		}
	}, [loggedIn]);

	let eighteenYearsAgo = () => {
		if (new Date().getMonth() + 1 == 13) {
			return `${new Date().getFullYear() - 17}-01-${new Date().getDate()}`;
		} else {
			return `${new Date().getFullYear() - 18}-${
				new Date().getMonth() + 1
			}-${new Date().getDate()}`;
		}
	};

	type FormData = {
		name: string;
		age: number;
		birthday: Date;
		email: string;
		password: string;
		confirmPassword: string;
	};

	const schema: ZodType<FormData> = z
		.object({
			name: z.string().min(3, { message: "Must be 3 or more characters long" }).max(30, { message: "Must be less than 30 characters long" }).refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), { message: "Must contain only characters from the alphabet" }),
			age: z.number({
				required_error: "Age is required",
				invalid_type_error: "Age is required & Age must be a number",
			  }).gte(18, { message: "Must 18 and over to use this site" }),
			birthday: z.date().max(new Date(eighteenYearsAgo()), { message: "Too young! You must be 18 and over to use this site" }),
			email: z.string().email({ message: "Enter a valid email" }),
			password: z.string().refine((value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value), { message: "Password must be at least 8 characters, including 1 number, 1 letter and 1 special character(@$!%*#?&)" }),
			confirmPassword:z.string().refine((value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value), { message: "Password must be at least 8 characters, including 1 number, 1 letter and 1 special character(@$!%*#?&)" }),
		})
		.refine((data) => data.password == data.confirmPassword, {
			message: "Passwords do not match",
			path: ["confirmPassword"],
		});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const submitData = (data: FormData) => {
		if (setLoggedIn) {
			setLoggedIn(true);
		}

		setFormData(data)

		console.log(data);
		console.log("coming throught");
	};
	return (
		<section className="loginPage">
			<div>
				<h1 className="loginHeader">Login</h1>
			</div>

			<form onSubmit={handleSubmit(submitData)}>
				<input type="text" placeholder="Full Name" {...register("name")} />
				{errors.name && <span>{errors.name.message}</span>}

				<input
					type="number"
					placeholder="Age"
					{...register("age" , {valueAsNumber:true})}
				/>
				{errors.age && <span>{errors.age.message}</span>}

				<input
					type="date"
					placeholder="Date of Birth"
					{...register("birthday", {valueAsDate:true})}
				/>
				{errors.birthday && <span>{errors.birthday.message}</span>}

				<input type="text" placeholder="Email" {...register("email")} />
				{errors.email && <span>{errors.email.message}</span>}

				<input
					type="password"
					placeholder="Password"
					{...register("password")}
				/>
				{errors.password && <span>{errors.password.message}</span>}

				<input
					type="confirmPassword"
					placeholder="Confirm Password"
					{...register("confirmPassword")}
				/>
				{errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

				{/* <input type="submit" /> */}
				<button className="submit" type="submit">
					Submit
				</button>
			</form>
		</section>
	);
};

export default Login;
