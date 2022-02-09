import React from "react";
function PrimarySelect(props) {

    const [selectedOption, setSelectedOption] = React.useState("");

    React.useEffect(() => {
        var selectedValue = props.selectedOption;
        if(selectedValue !== undefined){
            selectedValue = selectedValue["queryValue"];
            setSelectedOption(selectedValue)
        }
    }, [props.selectedOption])

    function handleCategoryChange(e) {
        e.preventDefault();
        var value = e.target.value;
        props.setSortingCategory(value);
        setSelectedOption(e.target.value)
    }
    
  return (
    <div>
      <select
        className="form-control"
        style={{ width: 200 }}
        name="primarySelect"
        id="primarySelect"
        value={selectedOption}
        onChange={(e) => handleCategoryChange(e)}
      >
        <option value="published" >Publisert</option>
        <option value="price_desc" >Pris lav til høy</option>
        <option value="price_asc">Pris høy til lav</option>
      </select>
    </div>
  );
}

export default PrimarySelect;
