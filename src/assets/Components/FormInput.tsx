import React, { useState } from "react";

type Props = {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required: boolean;
  autoComplete?: string;
	onChange: React.ChangeEventHandler<HTMLInputElement> | React.FormEventHandler<HTMLFormElement>;
  errorMessage?: string;
  pattern?: string;
};

const FormInput = (props: Props) => {
	const [focused, setFocused] = useState<boolean>(false);
	const { label, id, name, errorMessage, onChange, ...inputProps } = props;

	const handleFocus = () => {
		setFocused(true);
	};
	return (
		<div className="formInput">
			<label htmlFor={name}>{label}</label>
			<input
				name={name}
				id={name}
				{...inputProps}
				onBlur={handleFocus}
				onChange={onChange}
				onFocus={() =>name === "confirmPassword" && setFocused(true)}
				focused={focused.toString() as string}
			/>
			<span>{errorMessage}</span>
		</div>
	);
};

export default FormInput;
