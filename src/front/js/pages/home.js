import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Form, Signup } from "../component/Signup";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5" style={{width:"750px"}}>
			<h1>Hello Rigo!!</h1>
			<Signup/>
			
		</div>
	);
};
