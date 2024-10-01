const Bus = require("../models/bus");

exports.createBus = async (req, res) => {
  const { busNumber, from, to, seatsAvailable, price, departureTime, busType } =
    req.body;
  try {
    const bus = new Bus({
      busNumber,
      from,
      to,
      seatsAvailable,
      price,
      departureTime,
      busType,
    });
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ message: "Error creating bus", error });
  }
};

exports.searchBuses = async (req, res) => {
  const { from, to, date, requiredSeats } = req.body;

  if (!from || !to || !date || !requiredSeats) {
    return res.status(400).json({
      message: "All fields are required: from, to, date, requiredSeats",
    });
  }

  try {
    const buses = await Bus.find({
      from,
      to,
      departureTime: { $gte: new Date(date) },
      seatsAvailable: { $gte: requiredSeats },
    });

    if (buses.length === 0) {
      return res.status(404).json({ message: "No buses found" });
    }

    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Error searching for buses", error });
  }
};
