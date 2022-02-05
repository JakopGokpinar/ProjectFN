import React, { useState } from "react";
import Header from "./Header";
// import Slider from "@material-ui/core/Slider";
import Slider from "@mui/material/Slider";
import "./Price.css";
import "./FilterComponents.css";

function Price(props) {
  const [isVisible, setVisible] = useState(true);
  const [priceMinimum, setPriceMinimum] = useState('')
  const [priceMaximum, setPriceMaximum] = useState('')
  const [priceMinDefault, setPriceMinDefault] = useState(props.priceObject.minPrice);
  const [priceMaxDefault, setPriceMaxDefault] = useState(props.priceObject.maxPrice)
  const [sliderValue, setSliderValue] = useState([props.priceObject.minPrice,props.priceObject.maxPrice])

  function valuetext(value) {
    return `${value} kr`;
  }

  function applyPrice() {
  
      props.setfilter("price_min", priceMinimum, "minPrice", `fra ${priceMinimum}`);

      props.setfilter("price_max", priceMaximum, "maxPrice", `til ${priceMaximum}`);
    
  }

  function decreasePrice(e) {
    let min_value = parseInt(e.target.value);
    if(min_value >= 0) {
      setPriceMinimum(min_value)
    } else if(String(min_value) === "NaN"){
      setPriceMinimum('')
    } 
  }

  function increasePrice(e) {
    let value = parseInt(e.target.value);
    if(value >= 0) {
      setPriceMaximum(value)
    } else if(String(value) === "NaN"){
      setPriceMaximum('')
    } 
  }

  function toggleVisibality() {
    var visible = isVisible;
    setVisible(!visible);
  }

  const handleChange = (event, newValue) => { 
    var minVal = sliderValue[0];
    var maxVal = sliderValue[1];

  if(newValue[1] === priceMaxDefault){
      props.setfilter("price_max",'',"maxPrice",'')
      setPriceMaximum('')
  } else if(maxVal !== newValue[1]) {
    props.setfilter("price_max", newValue[1],"maxPrice", `til ${newValue[1]}`)
    setPriceMaximum(newValue[1])
  }

  if(newValue[0] === priceMinDefault){
    props.setfilter("price_min",'',"minPrice",'')
    setPriceMinimum('')
  } else if(minVal !== newValue[0]){
      props.setfilter("price_min", newValue[0],"minPrice", `fra ${newValue[0]}`)
      setPriceMinimum(newValue[0])
    }

    setSliderValue(newValue);
  };

  React.useEffect(() => {
    var value = props.minPriceState;
    var max = props.maxPriceState;

    if(value === undefined && max=== undefined) {
      setSliderValue([priceMinDefault, priceMaxDefault])
    } else if(value !== undefined && max === undefined ){
      setSliderValue([value["queryValue"], priceMaxDefault])
    }   else if (value === undefined && max !== undefined) {
      setSliderValue([priceMinDefault, max["queryValue"]])
    } else {
      setSliderValue([value["queryValue"], max["queryValue"]])
    }
  }, [props.minPriceState, props.maxPriceState]);
/* 
  React.useEffect(() => {
    var value = props.maxPriceState;
    if(value === undefined) {
      setSliderValue([sliderValue[0], priceMaxDefault])
    } else {
      setSliderValue([sliderValue[0], value["queryValue"]])
    }
  }, [props.maxPriceState]); */

  return (
    <div className="category border rounded priceFilterContainer filterContainer">
      <Header title="Pris" toggleVisible={toggleVisibality} />
      {isVisible && (
        <div className="priceFilterComponents filterBody">
          <div className="priceSliderDiv">
            <div className="showNumbersUponSlider w-100">
              <label className="text-muted">
                <small>{sliderValue[0]} kr</small>
              </label>
              <label className="text-muted">
                <small>{sliderValue[1]} kr</small>
              </label>
            </div>
            <Slider
              getAriaLabel={() => "Price range"}
              value={sliderValue}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={props.priceObject.minPrice}
              max={props.priceObject.maxPrice}
              disableSwap
            />
          </div>
          <div className="priceInputDiv form-group">
            <input
            type="number"
              className="form-control"
              id="min-price-input"
              placeholder="min. pris"
              onChange={decreasePrice}
              style={{ marginRight: 15 }}
            ></input>
            <input
              type="number"
              className="form-control"
              id="max-price-input"
              placeholder="max. pris"
              onChange={increasePrice}
            ></input>
          </div>
          <button className="btn btn-primary w-100 mt-3" onClick={applyPrice}>
            Søk
          </button>
        </div>
      )}
    </div>
  )
}

export default Price;
