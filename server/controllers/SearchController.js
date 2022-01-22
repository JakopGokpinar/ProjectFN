const mongoose = require("mongoose");

productSearch = (req, res) => {
  console.log(req.query)
  var annoncesDb = mongoose.connection.useDb("announcements");
  annoncesDb
    .collection("annonces")
    .find({}, {})
    .toArray()
    .then((items) => {
       const result = getFilterParams(req.query,items);
      //console.log(result);
      return res.json({ message: "items found successfully",status:true, items: result });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ message: "error occured while getting the items", status: false, error: err });
    });
};

function getFilterParams(query,itemArr) {
  const queryParams = new URLSearchParams(query);
  console.log(queryParams)
  var itemArr = itemArr;
  var finalItemArray = [];

  var textInput = queryParams.get('q');
finalItemArray = itemArr.filter((item) =>
  item.annonce.title.includes(textInput)
);

  if(queryParams.has('price_min')) {
    let minPrice = parseInt(queryParams.get('price_min'));
    finalItemArray = finalItemArray.filter((item) =>
    item.annonce.price > minPrice
    );
  }

  if(queryParams.has('price_max')) {
    let maxPrice = parseInt(queryParams.get('price_max'));
    finalItemArray = finalItemArray.filter((item) =>
    maxPrice > item.annonce.price  
    );
  }
  
  if(queryParams.has('order')) {
    let type = queryParams.get('order');
    switch(type){
      case "published":
        return finalItemArray;
     case "price_desc":
       let priceDescArray = [].concat(finalItemArray)
       .sort((a, b) => a.annonce.price > b.annonce.price ? 1 : -1)
        finalItemArray = priceDescArray;
        break;
     case "price_asc":
      let priceAscArray = [].concat(finalItemArray)
      .sort((a, b) => a.annonce.price < b.annonce.price ? 1 : -1)
      finalItemArray = priceAscArray;
       break;
     default: 
       return finalItemArray;
  }
  return finalItemArray;
}
return finalItemArray;  
}

module.exports = { productSearch };

