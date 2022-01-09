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
      return res.json({ items: result });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: err });
    });
};

function getFilterParams(query,itemArr) {
  const queryParams = new URLSearchParams(query);
  console.log(queryParams)
  var itemArr = itemArr;
  var resultItemArr = [];

  var textInput = queryParams.get('q');
resultItemArr = itemArr.filter((item) =>
  item.annonce.title.includes(textInput)
);

  if(queryParams.has('price_min')) {
    let minPrice = parseInt(queryParams.get('price_min'));
    resultItemArr = resultItemArr.filter((item) =>
    item.annonce.price > minPrice
    );
  }

  if(queryParams.has('price_max')) {
    let maxPrice = parseInt(queryParams.get('price_max'));
    resultItemArr = resultItemArr.filter((item) =>
    maxPrice > item.annonce.price  
    );
  }
  
  return resultItemArr;
}

module.exports = { productSearch };

