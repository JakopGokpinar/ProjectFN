const mongoose = require("mongoose");

productSearch = (req, res) => {
  console.log(req.query)
  var annoncesDb = mongoose.connection.useDb("announcements");
  annoncesDb
    .collection("annonces")
    .find({}, {})
    .toArray()
    .then((items) => {
       const {finalItemArray, minPrice, maxPrice} = getFilterParams(req.query,items);
      return res.json({ 
        message: "items found successfully",
        status:true, 
        items: finalItemArray,
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
  var itemArr = itemArr;
  var finalItemArray = [];

  var textInput = queryParams.get('q');
  finalItemArray = itemArr.filter((item) =>{
  let input = textInput.toUpperCase();
  let title = item.annonce.title.toUpperCase();
  return title.includes(input)
  }
  );

  var {minPrice, maxPrice } = getMaxAndMinPrice(finalItemArray);

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
    finalItemArray = finalItemArray.filter(item => {
      return status.includes(item.annonce.status)
    })
  }

  if(queryParams.has('published')) {
    let published = queryParams.get('published');
    var time = 0;
    if (published === "today") {
      time = 1
    } else if(published === "week") {
      time = 7;
    } else if (published === "month") {
      time = 30
    }

    finalItemArray = finalItemArray.filter(item => {
      var date = new Date(item.annonce.date);
      var d = new Date();
      d.setTime(d.getTime() - (time*24*3600000))
      return date > d
    })
  }

  finalItemArray = orderItems(queryParams, finalItemArray);

return {finalItemArray, minPrice, maxPrice};  
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
  var minPrice = 0;
  var maxPrice = Math.max(...priceArr);

  return {minPrice,maxPrice}
}
module.exports = { productSearch };

