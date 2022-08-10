import React from "react";
import { Results } from "../Results/Results";
import SearchStyles from "../Search/Search.module.css";

export function  Search()
{
    const [searchData,setSearchData]=React.useState({
        from:"",
        to:"",
        departure_date:"",
        no_of_passengers:""
    })
    const [results,setResults]=React.useState([]);
    const handleChange=(e)=>
    {
        let {name,value}=e.target;
        setSearchData({...searchData,[name]:value});
    }
    const handleSearch =(e)=>
    {   
        e.preventDefault();
        console.log(new Date());
        let date_diff=Math.floor((new Date(searchData.departure_date)-new Date()) / (1000 * 3600 * 24));
        let date_diff_in_months=Math.floor(date_diff/30);
        console.log(date_diff_in_months)
        fetch(`/flights?date_diff=${date_diff_in_months}`)
        .then((res)=>res.json())
        .then((res)=>(
            
            setResults(res)
        ))
        .catch((err)=>
        (
            console.log(err)
        ))
    }
    const{from ,to, departure_date,no_of_passengers}=searchData;
    return (
        <div>
            <div className={SearchStyles.Container}>
            <form className={SearchStyles.inputBox}>
                <input 
                    type="text"
                    name="from"
                    value={from}
                    onChange={(e)=>(handleChange(e))}
                    placeholder="From"
                     />
                <input 
                    type="text"
                    name="to"
                    value={to}
                    onChange={(e)=>(handleChange(e))}
                    placeholder="To"
                     />
                <input 
                    type="date"
                    name="departure_date"
                    value={departure_date} 
                    onChange={(e)=>(handleChange(e))}
                    placeholder="Departure Date"/>
                <input 
                    type="number"
                    name="no_of_passengers"
                    value={no_of_passengers}
                    onChange={(e)=>(handleChange(e))}
                    placeholder="Number of passengers"
                 />
                <button onClick={(e)=>(handleSearch(e))}>
                    Search 
                </button>
            </form>
        </div>
        <div >
            <Results from={from} to={to} results={results} no_of_passengers={no_of_passengers}/>
        </div>
        </div>
        
    )
}