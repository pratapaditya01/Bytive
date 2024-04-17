const User = require('../model/user.model');


const getListOfProfiles = async (req, res) => {
  try {
    // Fetch all profiles from the database
    const profiles = await User.find({}, { password: 0 });
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const searchProfiles = async (req, res) => {
  try {
    const { name, techStack, bio } = req.query;

    // Build a query object based on provided parameters
    const query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (techStack) query.techStack = new RegExp(techStack, 'i');
    if (bio) query.bio = new RegExp(bio, 'i');

    // Fetch profiles based on the query
    const profiles = await User.find(query, { password: 0 });
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const editProfile = async (req, res) => {
  try {
    const { _id } = req.user; // Assuming you attach user information in the request object

    // Validate and update profile data
    const updatedProfile = await User.findByIdAndUpdate(_id, { $set: req.body }, { new: true, runValidators: true });

    res.json(updatedProfile);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Validation Error', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = { getListOfProfiles, searchProfiles, editProfile };
