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
      var {minPrice, maxPrice } = getMaxAndMinPrice(result);
      var additionMap = new Map();
      additionMap.set('minPrice',minPrice)
      additionMap.set('maxPrice', maxPrice)
      
      //console.log(result);
      return res.json({ 
        message: "items found successfully",
        status:true, 
        items: result,
        additional: {minPrice: minPrice, "maxPrice":maxPrice}
      });
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
  Math.min()
  var textInput = queryParams.get('q');
finalItemArray = itemArr.filter((item) =>{
  let input = textInput.toUpperCase();
  let title = item.annonce.title.toUpperCase();
  return title.includes(input)
}
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
  if(queryParams.has('status')){
    let status = queryParams.get('status');
    console.log(status)
    finalItemArray = finalItemArray.filter(item => {
      return status.includes(item.annonce.status)
    })
  }

  finalItemArray = orderItems(queryParams, finalItemArray);

return finalItemArray;  
}

function orderItems(queryParams, finalItemArray) {
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

getMaxAndMinPrice = (items) => {
  var priceArr = []
  for(var e of items){
    priceArr.push(e.annonce.price)
  }
  console.log(priceArr)
  var minPrice = Math.min(...priceArr)
  var maxPrice = Math.max(...priceArr);

  return {minPrice,maxPrice}
}
module.exports = { productSearch };

