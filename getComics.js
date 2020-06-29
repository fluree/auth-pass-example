const fs = require("fs");
const axios = require("axios");

const url = "https://api.shortboxed.com/comics/v1/new";

axios
  .get(url)
  .then((res) => {
    console.log(res);
    const { comics } = res.data;
    // console.log(comics);
    const transactions = comics.map((book, index) => {
      return {
        _id: `comic?${index}`,
        title: book.title,
        price: book.price,
        publisher: book.publisher,
        description: book.description,
        creators: book.creators,
        release_date: book.release_date,
        diamond_id: book.diamond_id,
      };
    });
    console.log(transactions);
    fs.writeFile("bookData.json", JSON.stringify(transactions), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((err) => {
    console.log("The Shortboxed API is not responding");
    console.log(err);
  });
