import React from "react";
import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./CategorySelector.css";

function CategorySelector(props) {
  const [isVisible, setVisible] = useState(true);
  const [categoryArray, setCategoryArray] = useState([
    props.categoryState
  ]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [isSubCategorySelected, setIsSubCategorySelected] = useState(false);

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
      setIsCategorySelected(false)
    }
  }, [props.subCategoryState])


  function selectCategory(category) {
    setSelectedCategory(category);
    setIsCategorySelected(true);
    props.setfilter("mainc",category.main, "mainCategory",category.main)
    props.makeSearch();
  }

  function selectSubCategory(sub) {
    console.log(sub)
    setSelectedSubCategory(sub)
    setIsSubCategorySelected(true)
    props.setfilter("subc",sub, "subCategory",sub)
    props.makeSearch();
  }

  function backToMainCategories() {
    setIsCategorySelected(false);
    /* props.setfilter("mainc",'',"mainCategory",'');
    props.setfilter("subc","","subCategory","");
    props.makeSearch(); */
  }

  function backToSubCategories() {
    setIsSubCategorySelected(false);
  /*   props.setfilter("subc","","subCategory","");
    props.makeSearch(); */
  }

  return (
    <div className="category border rounded categorySelectorContainer filterContainer" key={"fslmöfspşömnv"}>
      <Header title="Kategori" toggleVisible={toggleVisibality} key="feskmn"/>
      {isVisible && (
        <div className="categoryFilterComponent filterBody" key={"fesfse"}>
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
          
          }
        </div>
      )}
    </div>
  );
}

export default CategorySelector;
