import React, { useState } from "react";
import Header from "./Header";
import "./Status.css";
import "./FilterComponents.css";

function Status(props) {
  const [isVisible, setVisible] = useState(true);
  const [statusNew, setStatusNew] = useState({current: false, default:false});
  const [statusUsed, setStatusUsed] = useState({current: false, default:false});
  const [checkedValues, setCheckedValues] = useState(props.checkedState)
  const [statNew, setStatNew] = useState(false)
  const [statUsed, setStatUsed] = useState(false)
  function toggleVisibality() {
    var visible = isVisible;
    setVisible(!visible);
  }

  function changeStatus(e,filter) {
    var target = e.target.id;
    if(target === "newCheckbox" || target === "newCheckboxLabel"){
      var snew = !statNew;
      if (snew === true) props.setfilter("status","new","statusNew", "Nytt");
      else props.setfilter("status",'',"statusNew",'');
    }
    /* if(filter === "status_new") setStatusNew({current: !statusNew.current, default: false})     
    else if(filter === "status_used") setStatusUsed({current: !statusUsed.current, default: false}); */
  }

  React.useEffect(() => {
    if(props.state === undefined){
      setStatNew(false)
    } else {
      setStatNew(true)
    }
  }, [props.state])

/*   React.useEffect(() => {
    if(statusNew.current) props.setfilter("status","new","statusNew","Nytt");
    else {
      props.setfilter("status",'',"statusNew",'');
      setStatusNew({current:statusNew.default, default: false})
    };
  }, [statusNew.current])

  React.useEffect(() => {
      if(statusUsed.current) props.setfilter("status","used","statusUsed","Brukt")
      else {
        props.removeFilter("status","used");
        setStatusUsed({current: statusUsed.default, default: false})
      }
  }, [statusUsed.current])

  React.useEffect(() => {
    var checkedState = String(props.checkedState)
    if(checkedState.includes('new')){
      setStatusNew({current:true,default:false})
    } else {
      setStatusNew({current: statusNew.default, default: false})
    }

    if(checkedState.includes('used')){
      setStatusUsed({current: true, default: false});
    } else {
      setStatusUsed({current: statusUsed.default, default: false})
    }

}, [props.checkedState]) */

  return (
    <div className="category border rounded priceStatusContainer filterContainer">
      <Header title="Status" toggleVisible={toggleVisibality} />
      <p>{props.checkedState}</p>
      {isVisible && (
        <div className="priceFilterComponents filterBody">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="newCheckbox"
              checked={statNew}
              onChange={(e) => changeStatus(e,"status_new")}
            />
            <label
              className="form-check-label"
              id="newCheckboxLabel"
              style={{ cursor: "pointer" }}
              onClick={(e) => changeStatus(e,"status_new")}
            >
              Nytt (15/234)
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="usedCheckbox"
              type="checkbox"
              checked={statusUsed.current }
              onChange={(e) => changeStatus(e,"status_used")}
            />
            <label
              className="form-check-label"
              id="usedCheckboxLabel"
              style={{ cursor: "pointer" }}
              onClick={(e) => changeStatus(e,"status_used")}
            >
              Brukt (34)
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Status;
