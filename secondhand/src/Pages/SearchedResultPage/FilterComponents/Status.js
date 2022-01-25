import React, { useState } from "react";
import Header from "./Header";
import "./Status.css";
import "./FilterComponents.css";

function Status(props) {
  const [isVisible, setVisible] = useState(true);
  const [statusNew, setStatusNew] = useState(false);
  const [statusUsed, setStatusUsed] = useState(false);

  function toggleVisibality() {
    var visible = isVisible;
    setVisible(!visible);
  }

  function changeStatus(e,filter) {
    if(filter === "status_new") setStatusNew(!statusNew)     
    else if(filter === "status_used") setStatusUsed(!statusUsed);
  }

  React.useEffect(() => {
    if(statusNew) props.setfilter("status","new");
    else props.resetFilter("status","prop","new");
  }, [statusNew])

  React.useEffect(() => {
      if(statusUsed) props.setfilter("status","used")
      else props.resetFilter("status","prop","used");
  }, [statusUsed])

  return (
    <div className="category border rounded priceStatusContainer filterContainer">
      <Header title="Status" toggleVisible={toggleVisibality} />

      {isVisible && (
        <div className="priceFilterComponents filterBody">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={statusNew}
              
              onChange={(e) => changeStatus(e,"status_new")}
            />
            <label
              className="form-check-label"
              style={{ cursor: "pointer" }}
              onClick={(e) => changeStatus(e,"status_new")}
            >
              Nytt (15/234)
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={statusUsed}
              onChange={(e) => changeStatus(e,"status_used")}
            />
            <label
              className="form-check-label"
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
