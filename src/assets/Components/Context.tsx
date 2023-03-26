import React, {useState, createContext, useContext} from 'react'


export interface IFormData{
    name: string,
    age: number,
    birthday: Date;
    password: string,
    confirmPassword: string;
    email:string;
    errorMessage:string;
    pattern:string
}


const defaultFormData: IFormData = {
    name: "",
    age: 0,
    birthday: new Date(),
    password: "",
    confirmPassword: "",
    email: "",
    errorMessage:"",
    pattern:""
  };

interface ILoginContext{
    loggedIn:boolean;
    setLoggedIn:React.Dispatch<React.SetStateAction<boolean>> |null;
}

interface IFormContext {
formData: IFormData;
setFormData: React.Dispatch<React.SetStateAction<IFormData>> ;
}

let FormContext = createContext<IFormContext>({ formData:defaultFormData, setFormData: () => { throw new Error('setFormData not implemented')} })
let LoginContext = createContext<ILoginContext>({loggedIn:false,setLoggedIn:() => { throw new Error('setLoggedIn not implemented') }})

export function useFormContext() {
	return useContext(FormContext);
}
export function useLoginContext() {
	return useContext(LoginContext);
}


type Props = {
    children:  React.ReactNode
};

const AppContextProvider = ({children}: Props) => {

    let [loggedIn, setLoggedIn] = useState<boolean>(false)
    let [formData, setFormData] = useState<IFormData>(defaultFormData)

	return (
		<LoginContext.Provider value={{ loggedIn ,setLoggedIn }}>
		<FormContext.Provider value={{ formData ,setFormData }}>
			{children}  
		</FormContext.Provider>
		</LoginContext.Provider>
	);
};

export default AppContextProvider