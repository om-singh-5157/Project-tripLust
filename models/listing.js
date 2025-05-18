const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://unsplash.com/illustrations/seascape-with-rocks-clouds-and-seagulls-qoj94S-6beI",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/illustrations/seascape-with-rocks-clouds-and-seagulls-qoj94S-6beI"
        : v,
  },
  price: {
    type: Number,
    min: [1, "The price is too low"],
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
