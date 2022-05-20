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
    console.log(props.subCategoryState)
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
    props.setfilter("mainc",'',"mainCategory",'');
    props.setfilter("subc","","subCategory","");
    props.makeSearch();
  }

  return (
    <div className="category border rounded categorySelectorContainer filterContainer">
      <Header title="Kategori" toggleVisible={toggleVisibality} />
      {isVisible && (
        <div className="categoryFilterComponent filterBody">
          {!isCategorySelected ? 
          
          <div>
            <ul className="categorySelector__ul">
            {categoryArray.map((category) => {
              return (
                <li className="" onClick={() => selectCategory(category)}>
                  <Link>
                    {category.main} (57)
                    </Link>
                </li>
              );
            })}
          </ul>
          </div>
          : (!isSubCategorySelected ? 
            <div>
            <p onClick={() => backToMainCategories()}>Any Category</p>
            <ul className="categorySelector__ul">
            {selectedCategory.sub.map((subCategory) => {
              let subc = subCategory.split('.')[1]
              return(
                <li onClick={() => selectSubCategory(subc)}>
                  <Link>
                   {subc} (13)
                  </Link>
                </li>
              ) 
            })}
          </ul>
          </div>
          
          : 
          
          <div>
            <i className="fas fa-arrow-left" />{selectedSubCategory}
            
            
          </div>)
          
          }
        </div>
      )}
    </div>
  );
}

export default CategorySelector;
