import React , {useEffect}from "react";
import { useFormContext, useLoginContext } from "../Components/Context";
import { useNavigate } from 'react-router-dom';

type Props = {};

const Home = (props: Props) => {
    let { loggedIn } = useLoginContext();
    let {formData} = useFormContext()

    const navigate = useNavigate()
    useEffect(()=>{
        if(!loggedIn){
            console.log(loggedIn)
            navigate("/login") 
        }
    },[loggedIn])


	return (
		<section className="homeSection">
            <div>
            <h1>Home</h1>
            <p>Welcome {formData.name}!</p>
            <p>You are {formData.age} and your email is {formData.email}</p>
            </div>
			
			
		</section>
	);
};

export default Home;
