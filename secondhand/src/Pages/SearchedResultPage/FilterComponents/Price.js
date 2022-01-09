import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Slider from "@material-ui/core/Slider";
import "./Price.css";
import './FilterComponents.css';
import { setMinPriceAction, setMaxPriceAction } from "../../../actions/SearchActions";

function Price(params) {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(true);
  const [priceValue, setPriceValue] = useState([0, 100]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice,setMaxPrice] = useState(100);

  const handlePriceSliderChange = (event, newValue) => {
    setPriceValue(newValue);
  };

  const handlePriceInputChange = (event, target) => {
    if (target === "min") {
      setPriceValue([event.target.value, priceValue[1]]);
    } else {
      setPriceValue([priceValue[0], event.target.value]);
    }
  };

  function decreasePrice(e) {
    let min_value = e.target.value;
    console.log(min_value, maxPrice)
    if(min_value >= maxPrice){
      console.log("if")
      setMinPrice(maxPrice-1);
    setPriceValue([minPrice,maxPrice]);

    } else {
      console.log("else")
      setMinPrice(min_value);
    setPriceValue([minPrice,maxPrice]);

    }
    dispatch(setMinPriceAction(min_value))
  }

  function increasePrice(e) {
    let max_value = e.target.value
    setMaxPrice(max_value);
    setPriceValue([minPrice, max_value]);
    dispatch(setMaxPriceAction(max_value));
  }

  function toggleVisibality() {
    var visible = isVisible;
    setVisible(!visible);
  }

  React.useEffect(() => {
    setMinPrice(priceValue[0]);
    setMaxPrice(priceValue[1]);
  }, [priceValue])

  return (
    <div className="category border rounded priceFilterContainer filterContainer">
      <Header title="Pris" toggleVisible={toggleVisibality} />
      {isVisible && (
        <div className="priceFilterComponents filterBody">
          <div className="priceSliderDiv">
            <div id="showNumbersUponSlider w-100">
              <label className="text-muted">
                <small>{priceValue[0]} kr</small>
              </label>
              <label className="text-muted">
                <small>{priceValue[1]} kr</small>
              </label>
            </div>
            <Slider
              value={priceValue}
              onChange={handlePriceSliderChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              max={100}
            />
          </div>
          <div className="priceInputDiv form-group">
            <input
              type="number"
              className="form-control"
              id="min-price-input"
              placeholder="min. pris"
              value={minPrice}
              onChange={decreasePrice}
              style={{marginRight: 15}}
            ></input>
            <input
              type="number"
              className="form-control"
              id="max-price-input"
              placeholder="max. pris"
              value={maxPrice}
              onChange={increasePrice}
            ></input>
          </div>
          <button className="btn btn-primary w-100 mt-3">Søk</button>
        </div>
      )}
    </div>
  );
}

export default Price;
