import React from "react";
import { Search } from "../../Components/Search/Search";
import SearchStyles from "../Search Page/SearchPage.module.css"
export function SearchPage()
{
    return(
        <div className={SearchStyles.Container} >
        <Search/>
        </div>
    )
}