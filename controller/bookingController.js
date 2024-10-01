const Booking = require("../models/booking");
const Bus = require("../models/bus");

exports.bookBus = async (req, res) => {
  const { userId, busId, seatsBooked } = req.body;
  try {
    const bus = await Bus.findById(busId);
    if (bus.seatsAvailable < seatsBooked) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const totalAmount = bus.price * seatsBooked;
    const booking = new Booking({
      user: userId,
      bus: busId,
      seatsBooked,
      totalAmount,
    });

    await booking.save();

    bus.seatsAvailable -= seatsBooked;
    await bus.save();

    res.status(201).json({ message: "Bus booked successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error booking bus", error });
  }
};
