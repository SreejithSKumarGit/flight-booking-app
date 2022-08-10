import React from "react";
import PaymentStyles from "../PaymentPage/Payment.module.css";
import { useToast } from '@chakra-ui/react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Payment()
{
    const [isSubmitted,setisSubmitted]=React.useState(false);
    const [checkoutData,setCheckoutData]=React.useState({});
    const toast = useToast();
    const {auth}=useSelector((state)=>state);
    const navigate=useNavigate();
    const handleBook=()=>
    {
        let bookingData={
            checkoutData:checkoutData,
            userData:auth
        }
        fetch ("/bookings",
        {
           method:"POST",
           body:JSON.stringify(bookingData),
           headers:{"Content-type":"Application/json"} 
        })
        .then((res)=>res.json())
        .then((res)=>
        {
            console.log(res);
        })
        alert("Booking Done! Redirecting to Home page")
        navigate("/search")
        

    }
    React.useEffect(()=>
    {
        fetch("/checkout")
        .then((res)=>res.json())
        .then((res)=>(
            setCheckoutData(res[res.length-1])
        ))
    },[])
    return(
        <div className={PaymentStyles.Container}>
            <div className={PaymentStyles.leftContainer}>
                <h1>Enter you payment details</h1>
                <div className={PaymentStyles.cardBox}>
                    <div>
                        <input 
                            type="text"
                            placeholder="First Name" />
                        <input 
                            type="text"
                            placeholder="Last Name" />
                    </div>
                    <div>
                        <input 
                            type="text"
                            placeholder="Card Number" />
                    </div>
                    <div>
                        <div style={{width:"300px",display:"flex",justifyContent:"space-between"}}>
                            <label htmlFor="">Expiry Date</label>
                            <input 
                                type="date"
                                placeholder="Expiry Date" />
                        </div>
                        
                        <input 
                            type="text"
                            placeholder="CVV" />
                    </div>
                    </div>
                    
                </div>
                <div className={PaymentStyles.rightContainer}>
                    <h3>Basic charges:- ₹ {checkoutData.basic_fare}</h3>
                    <hr />
                    <h3>Food and Beverage charge :- ₹{checkoutData.food_charge}</h3>
                    <hr />
                    <h3>Service charges :- ₹{checkoutData.service_charge}</h3>
                    <hr />
                    <br />
                    <h3>Total Charges :- ₹{checkoutData.total}</h3>
                    <button onClick={handleBook} > Confirm Booking </button>
                </div>
                {
                           isSubmitted? toast({
                                title: 'Booking Done !',
                                description: "We have submitted your hotel booking.",
                                position: 'top',
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                              }):<></>
                        }
        </div>
    )
}