import React, { useState } from "react";
import Header from "./Header";
// import Slider from "@material-ui/core/Slider";
import Slider from "@mui/material/Slider";
import "./Price.css";
import "./FilterComponents.css";

function Price(props) {
  const [isVisible, setVisible] = useState(true);
  const [priceMinDefault, setPriceMinDefault] = useState(props.priceObject.minPrice);
  const [priceMaxDefault, setPriceMaxDefault] = useState(props.priceObject.maxPrice)
  const [sliderValue, setSliderValue] = useState([props.priceObject.minPrice,props.priceObject.maxPrice])
  const [priceValue, setPriceValue] = useState([
    {current: props.priceObject.minPrice, default: priceMinDefault},
    {current: props.priceObject.maxPrice, default: priceMaxDefault}
  ]);

  function valuetext(value) {
    return `${value} kr`;
  }

  function decreasePrice(e) {
    let min_value = parseInt(e.target.value);
    if(min_value >= props.priceObject.minPrice) {
      setSliderValue([min_value, sliderValue[1]])
    } else if(String(min_value) === "NaN"){
      setSliderValue(['', sliderValue[1]])
    } else if(min_value > 0&& min_value < props.priceObject.minPrice){
      setSliderValue([min_value, sliderValue[1]])
    }
  }

  function increasePrice(e) {
    let max_value = parseInt(e.target.value);
    if(max_value <= props.priceObject.maxPrice) {
      setSliderValue([sliderValue[0], max_value])
    } else if(String(max_value) === "NaN"){
      setSliderValue([sliderValue[0], ''])
    }
  }

  function toggleVisibality() {
    console.log(props.priceObject.minPrice);
    var visible = isVisible;
    setVisible(!visible);
  }

  const handleChange = (event, newValue) => { 
    setSliderValue(newValue);
    var minPrice = priceValue[0].current;
    var maxPrice = priceValue[1].current;
    if (newValue[0] !== minPrice) {
       props.setfilter("price_min", newValue[0], "minPrice",`fra ${newValue[0]}`);
    } else if (newValue[1] !== maxPrice) {
      props.setfilter("price_max", newValue[1], "maxPrice", `til ${newValue[1]}`);
    }
  };

  React.useEffect(() => {
    console.log("slider value",sliderValue)
    setPriceValue([
      {current: sliderValue[0], default: priceMinDefault},
      {current: sliderValue[1], default: priceMaxDefault}
    ])
  }, [sliderValue])

  React.useEffect(() => {
    var priceState = props.priceState;
    var priceMax = props.priceState.priceMax;
    var priceMin = props.priceState.priceMin;
    console.log("before", priceMax + " " + priceMin)
    if(priceState.priceMax === undefined){
      priceMax = priceMaxDefault;
    } 
    if(priceState.priceMin === undefined){
      priceMin = priceMinDefault
    } 
    console.log("after", priceMax + " " + priceMin)

    setSliderValue([priceMin, priceMax])
    
  }, [props.priceState])

  return (
    <div className="category border rounded priceFilterContainer filterContainer">
      <Header title="Pris" toggleVisible={toggleVisibality} />
      {isVisible && (
        <div className="priceFilterComponents filterBody">
          <div className="priceSliderDiv">
            <div className="showNumbersUponSlider w-100">
              <label className="text-muted">
                <small>{priceValue[0].current} kr</small>
              </label>
              <label className="text-muted">
                <small>{priceValue[1].current} kr</small>
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
              value={priceValue[0].current}
              onChange={decreasePrice}
              style={{ marginRight: 15 }}
            ></input>
            <input
              type="number"
              className="form-control"
              id="max-price-input"
              placeholder="max. pris"
              value={priceValue[1].current}
              onChange={increasePrice}
            ></input>
          </div>
          <button className="btn btn-primary w-100 mt-3" onClick="">
            Søk
          </button>
        </div>
      )}
    </div>
  )
}

export default Price;
