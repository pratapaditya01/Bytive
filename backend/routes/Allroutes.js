const AllRoutes=require('express').Router()

const {getListOfProfiles,searchProfiles,editProfile} =require("../controllers/ReqUserFeatures");

const { registerUser, loginUser, editUserProfile, deleteUserAccount,UserAccount, logoutUser } =require("../controllers/StretchGoals");
const verifyUserMiddleware=require("../middleware/verifyUser")

// require functionalities
// working
AllRoutes.get('/getusers',getListOfProfiles);
// working
AllRoutes.get('/searchusers/',searchProfiles);

AllRoutes.put('/updateusers', editProfile);
// Stretch goals
// working
AllRoutes.post('/user/register',registerUser);
// working
AllRoutes.post('/user/login',loginUser);
// protected routes

// working
AllRoutes.put('/user/editprofile/:userId', verifyUserMiddleware, editUserProfile);
// working
AllRoutes.get('/user/userprofile/:userId', verifyUserMiddleware , UserAccount);
// working
AllRoutes.delete('/user/deleteprofile/:userId', verifyUserMiddleware , deleteUserAccount);

AllRoutes.get('/user/logout' , verifyUserMiddleware , logoutUser);


module.exports=AllRoutes