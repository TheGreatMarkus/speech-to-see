const sstk = require("shutterstock-api");
require('dotenv').config({path:'../.env'});

sstk.setBasicAuth(process.env.ID, process.env.SECRET);
const imagesApi = new sstk.ImagesApi();

const queryParams = {
  "query": "New York",
  "sort": "popular",
  "orientation": "horizontal"
};

imagesApi.searchImages(queryParams)
  .then((data) => {
    console.log(JSON.stringify(data));
  })
  .catch((error) => {
    console.error(error);
  });