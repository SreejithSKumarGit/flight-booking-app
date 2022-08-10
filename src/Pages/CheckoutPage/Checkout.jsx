import React from "react";
import { useParams } from "react-router-dom";
import CheckoutStyles from "../CheckoutPage/Checkout.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function Checkout()
{
    const {id,from,to,no_of_passengers}=useParams();
    const [checkoutData,setCheckoutData]=React.useState({});
    const [food,setFood]=React.useState(false);
    const navigate=useNavigate();
    const handleFood=(e)=>
    {
        let {name,value}=e.target;
        setFood(value);
    }
    const addCheckout=()=>
    {
        let food_charge=food=="true"?400*no_of_passengers:0;
        let data={
            basic_fare:(checkoutData.fare)*no_of_passengers,
            food_charge:food_charge,
            service_charge:(checkoutData.fare)*no_of_passengers*0.05,
            total:(checkoutData.fare)*no_of_passengers+(checkoutData.fare)*no_of_passengers*0.05+(food=="true"?(400*no_of_passengers):0),
            from:from,
            to:to,
            id:id,
            no_of_passengers:no_of_passengers

        }
        fetch("/checkout",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{"Content-type":"Application/json"}
        })
        navigate("/payment");
    }
    React.useEffect(()=>
    {
        fetch(`/flights?id=${id}`)
        .then((res)=>res.json())
        .then((res)=>
        {
            setCheckoutData(res[0])
            console.log(res)
        })
    },[id])
    return(
        <div className={CheckoutStyles.Container}>
            <div>
                <img src={checkoutData.img} alt="" />
            </div>
            <div className={CheckoutStyles.ContentBox} style={{height:"307px"}}>
                <div className={CheckoutStyles.Content}>
                    <h2>{checkoutData.flight_name}</h2>
                    <h2>{from}-->{to}</h2>
                </div>
                <div className={CheckoutStyles.Content}>
                    <h3>Departure Time:- {checkoutData.departure_time} | </h3>
                    <h3>Arrival Time:-{checkoutData.arrival_time}</h3>
                </div>
                <h3>Number of passengers :- {no_of_passengers}</h3>
            </div>
            
            <div className={CheckoutStyles.ContentBox} style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",height:"307px"}} >
                <h3>Basic charges:- ₹ {(checkoutData.fare)*no_of_passengers}</h3>
                <div>
                <label htmlFor="">Food and Beverage</label>
                <select name="food" value={food} onChange={(e)=>handleFood(e)} id="">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                </div>
                {food=="true"?<h3>Food and Beverage charge :- ₹{400*no_of_passengers}</h3>:<></>}
                <h3>Service charges :- ₹{(checkoutData.fare)*no_of_passengers*0.05}</h3>
                <h3>Total Charges :- ₹{(checkoutData.fare)*no_of_passengers+(checkoutData.fare)*no_of_passengers*0.05+(food=="true"?(400*no_of_passengers):0)}</h3>
                <button onClick={addCheckout}> Proceed to Payment </button>
            </div>
        </div>
    )
}