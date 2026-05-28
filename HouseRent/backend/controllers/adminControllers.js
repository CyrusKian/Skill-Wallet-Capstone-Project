import Property from "../models/Property.js";
import User from "../models/User.js";

/////////getting all users///////////////
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No users present",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All users",
      data: allUsers,
    });
  } catch (error) {
    console.log("Error in getAllUsersController", error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

/////////handling status for owner/////////
const handleStatusController = async (req, res) => {
  const { userid, status } = req.body;
  try {
    await User.findByIdAndUpdate(userid, { granted: status }, { new: true });
    return res.status(200).send({
      success: true,
      message: `User has been ${status}`,
    });
  } catch (error) {
    console.log("Error in handleStatusController", error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

/////////getting all properties in app//////////////
const getAllPropertiesController = async (req, res) => {
  try {
    const allProperties = await Property.find({});
    if (!allProperties || allProperties.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No properties present",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All properties",
      data: allProperties,
    });
  } catch (error) {
    console.log("Error in getAllPropertiesController", error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

export { getAllUsersController, handleStatusController, getAllPropertiesController };

