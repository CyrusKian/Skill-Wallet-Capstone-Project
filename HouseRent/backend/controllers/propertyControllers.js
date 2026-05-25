import Property from "../models/Property.js";

// CREATE
export const createProperty = async (req, res) => {
  const property = await Property.create({
    ...req.body,
    user: req.user.id,
  });

  res.json(property);
};

// GET ALL
export const getProperties = async (req, res) => {
  const properties = await Property.find().populate("user", "name email");
  res.json(properties);
};

// GET SINGLE
export const getProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.json(property);
};

// DELETE
export const deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};