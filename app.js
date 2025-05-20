const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/tripLust";
const Listing = require("./models/listing.js");
const path = require("path");
const { title } = require("process");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main()
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Hi I am Root");
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "Home Town",
//     description: "In Jharkhand",
//     price: 1200,
//     location: "Jamshedpur,JH",
//     country: "India",
//   });
//   await sampleListing.save();
//   res.send("saved successfully");
// });

//Index Route
app.get("/listing", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("./listing/index.ejs", { allListing });
});

//Create Route
app.get("/listing/new", (req, res) => {
  res.render("./listing/new.ejs");
});

app.post("/listing", async (req, res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listing");
});

//Edit Route
app.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listing/edit.ejs", { listing });
});

app.put("/listing/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listing");
});

//Read Route
app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listing/show.ejs", { listing });
});

//Delete Route
app.delete("/listing/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listing");
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
