const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  price: { type: Number, required: true },
  departureTime: { type: Date, required: true },
  busType: {
    type: String,
    required: true,
    enum: ["AC Sleeper", "Luxury", "Seater"],
  },
});

module.exports = mongoose.model("Bus", busSchema);
