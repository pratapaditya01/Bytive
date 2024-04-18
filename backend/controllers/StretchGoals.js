const User = require("../model/user.model");

const registerUser = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password,
      gravatar,
      location,
      fieldOfInterest,
      techStack,
      seeking,
      bio,
      githubURL,
      twitterURL,
      websiteURL,
      linkedinURL, } = req.body;

    // Check if all required inputs are provided
    if (!email || !name || !password) {
      res.status(400).json({ message: "Provide all the required input" });
    }

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      gravatar,
      location,
      fieldOfInterest,
      techStack,
      seeking,
      bio,
      githubURL,
      twitterURL,
      websiteURL,
      linkedinURL,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", profile: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", profile: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for user profile editing
const editUserProfile = async (req, res) => {
  try {
    const {
      name,
      gravatar,
      location,
      fieldOfInterest,
      techStack,
      seeking,
      bio,
      githubURL,
      twitterURL,
      websiteURL,
      linkedinURL,
    } = req.body;

    // Check if the logged-in user is the owner of the profile
    if (req.user._id.toString() !== req.params.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this profile" });
    }

    // Update user profile
    await User.findByIdAndUpdate(req.params.userId, {
      name,
      gravatar,
      location,
      fieldOfInterest,
      techStack,
      seeking,
      bio,
      githubURL,
      twitterURL,
      websiteURL,
      linkedinURL,
    });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for user account deletion
const deleteUserAccount = async (req, res) => {
  try {
    // Check if the logged-in user is the owner of the account
    if (req.user._id.toString() !== req.params.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this account" });
    }

    // Delete user account
    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to fetch user account
const UserAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch user account
    const user = await User.find({ _id: userId });

    res.status(200).json({ message: "User fetched", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for user logout
const logoutUser = (req, res) => {
  // No specific logout action needed without JWT
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  registerUser,
  loginUser,
  editUserProfile,
  deleteUserAccount,
  UserAccount,
  logoutUser,
};
