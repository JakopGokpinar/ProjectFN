import React from "react";
import { setMaxPriceAction } from "../../../../../actions/SearchActions";
import { useDispatch } from "react-redux";
import FilterBox from "../../../../../Component/FilterSearch/FilterBox";

function FuelType() {

    const dispatch = useDispatch();

    function handleChange() {
        console.log("h")
        dispatch(setMaxPriceAction(Math.random()))
    }

    function returnContent() {
        return(
<div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={handleChange}/>
                <label class="form-check-label" for="defaultCheck1">
                    Bensin
                </label>
            </div>
            <div className="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                <label class="form-check-label" for="defaultCheck2">
                    Electric
                </label>
            </div>
        </div>
        )
    }

    return(
        <FilterBox title="Fuel type" content={returnContent()}></FilterBox>
    )
}

export default FuelType;