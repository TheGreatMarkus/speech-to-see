module.exports.searchImage = async function searchImage(keyword) {
    const sstk = require("shutterstock-api");

    sstk.setBasicAuth(process.env.ID, process.env.SECRET);
    const imagesApi = new sstk.ImagesApi();

    const queryParams = {
        "query": keyword,
        "sort": "popular",
        "orientation": "horizontal",
        "safe": true,
        "image_type": ["photo"]
    };

    const data = await imagesApi.searchImages(queryParams);

    return data.data[0].assets.preview.url;
}
