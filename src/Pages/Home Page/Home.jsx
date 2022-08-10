import React from "react";
import { Login } from "../../Components/Login/Login";
import { Signup } from "../../Components/Signup/Signup";
import HomeStyles from "../Home Page/Home.module.css";



export function Home()
{
    return(
        <div className={HomeStyles.mainContainer}> 
        <Signup/>
        <Login/>
        </div>
    )
}