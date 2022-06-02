import React from "react";
import { useState } from "react";
import Header from "./Header";
import "./CategorySelector.css";

function CategorySelector(props) {
  const [isVisible, setVisible] = useState(true);
  const [categoryArray, setCategoryArray] = useState([props.categoryState]);
  const [selectedMainCategory, setSelectedMainCategory] = useState({});
  const [isMainCategorySelected, setIsMainCategorySelected] = useState(false);


  function toggleVisibality() {
    var visible = isVisible;
    setVisible(!visible);
  }

  React.useEffect(() => {
    setCategoryArray(props.categoryState);
  }, [props.categoryState])

  React.useEffect(() => {
    let subCatState = props.subCategoryState;
    if(subCatState === "no value") {
      setIsMainCategorySelected(false)
    }
  }, [props.subCategoryState])


  function selectMainCategory(e) {
    e.preventDefault();

      var category = JSON.parse(e.target.value)
    console.log(category)
    setSelectedMainCategory(category);
    setIsMainCategorySelected(true);
    props.setfilter("mainc",category.main, "mainCategory",category.main)
    props.makeSearch();
  }

  function selectSubCategory(e) {
    e.preventDefault();
    var sub = e.target.value;
    props.setfilter("subc",sub, "subCategory",sub)
    props.makeSearch();
  }


  return (
    <div className="category border rounded categorySelectorContainer filterContainer">
      <Header title="Kategori" toggleVisible={toggleVisibality}/>
      {isVisible && (
        <div className="categoryFilterComponent filterBody" >
          <label htmlFor="mainCategorySelect" className="form-label">Main Category</label>
          <select
            className="form-select"
            id="mainCategorySelect"
            defaultValue=""
            onChange={(e) => selectMainCategory(e)}>
              <option value="" disabled>Select a main category</option>
              {categoryArray.map((category,index) => {
              return (
                <option value={JSON.stringify(category)} key={index} >
                    {`${category.main} (${category.itemCount})`} 
                </option>
              );
            })}
            </select>
            {isMainCategorySelected && 
            <div>
              <label htmlFor="subCategorySelect" className="form-label">Sub Category</label>
            <select
              className="form-select"
              id="subCategorySelect"
              onChange={(e) => selectSubCategory(e)}
              defaultValue="">
              <option value="">Select a sub category</option>
              {selectedMainCategory.sub.map((subCategory,index) => {
              let subc = subCategory.name.split('.')[1]
              return(
                <option value={subc}  key={index + 100}>
                   {`${subc} (${subCategory.count})`}
                </option>
              ) 
            })}
            </select>
            </div>
            }        
        </div>
      )}
    </div>
  );
}

export default CategorySelector;



/* 
          {!isCategorySelected ? 
          
          <div key={"nqwerty"}>
            <ul className="categorySelector__ul" key={"fe"} >
            {categoryArray.map((category,index) => {
              return (
                <li className="" onClick={() => selectCategory(category)} key={index}>
                  <Link to="#" key={Math.random() * 900} >
                    {`${category.main} (${category.itemCount})`} 
                    </Link>
                </li>
              );
            })}
          </ul>
          </div>
          : (!isSubCategorySelected ? 
            <div className="categoryFilter_subCategory" key={"efow"}>
              <i onClick={() => backToMainCategories()} key="pkppokpo" className="fas fa-arrow-left" style={{marginRight: 20}}/>

              <ul className="categorySelector__ul" key={"feow"}>

            {selectedCategory.sub.map((subCategory,index) => {
              let subc = subCategory.name.split('.')[1]
              return(
                <li onClick={() => selectSubCategory(subc)} key={index + 100}>
                  <Link to="#" key={(Math.random() * 900).toString()}>
                   {`${subc} (${subCategory.count})`}
                  </Link>
                </li>
              ) 
            })}
          </ul>
          </div>
          
          : 
          
          <div key={"mnvmc"}>
            <i onClick={() => backToSubCategories()} key="njjn" className="fas fa-arrow-left" style={{marginRight: 20}}/>
            {selectedSubCategory}
            
            
          </div>)
          
          } */
