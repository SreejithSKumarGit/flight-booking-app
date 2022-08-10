import React from "react";
import NavBarStyles from "../NavBar/NavBar.module.css";
import {useDispatch, useSelector } from "react-redux";
import  {loginUnsuccess} from "../../Redux/Auth/AuthActions";
import { useNavigate } from "react-router-dom";
export function NavBar()
{
    const {auth}=useSelector((state)=>state)
    const [logout,setLogout]=React.useState(true);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=()=>
    {
        dispatch(loginUnsuccess());
        setLogout(false)
        alert("Login to continue");
        navigate("/");

    }
    return(
        
        <div className={NavBarStyles.Container}>
            <img src="https://support.appsflyer.com/hc/article_attachments/360002456265/InApp_Events_flight.png" alt="" />
            <div style={{display:"flex",gap:"15px"}}>
            {auth.status || logout?<><button onClick={()=>(navigate('/search'))}>Search for flights</button><button onClick={handleLogout}>Logout</button></>:<></>}
            </div>
            
        </div>
    )
}