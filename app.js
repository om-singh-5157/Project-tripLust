const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/tripLust";
const Listing = require("./models/listing.js");

main()
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hi I am Root");
});

app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "Home Town",
    description: "In Jharkhand",
    price: 1200,
    location: "Jamshedpur,JH",
    country: "India",
  });
  await sampleListing.save();
  res.send("saved successfully");
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
