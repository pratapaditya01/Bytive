const AllRoutes=require('express').Router()

const {getListOfProfiles,searchProfiles,editProfile} =require("../controllers/ReqUserFeatures");

const { registerUser, loginUser, editUserProfile, deleteUserAccount,UserAccount, logoutUser } =require("../controllers/StretchGoals");
const verifyUserMiddleware=require("../middleware/verifyUser")


AllRoutes.get('/getusers',getListOfProfiles);

AllRoutes.get('/searchusers/',searchProfiles);

AllRoutes.put('/updateusers', editProfile);

AllRoutes.post('/user/register',registerUser);

AllRoutes.post('/user/login',loginUser);

AllRoutes.put('/user/editprofile/:userId', verifyUserMiddleware, editUserProfile);

AllRoutes.get('/user/userprofile/:userId', verifyUserMiddleware , UserAccount);

AllRoutes.delete('/user/deleteprofile/:userId', verifyUserMiddleware , deleteUserAccount);

AllRoutes.get('/user/logout' , verifyUserMiddleware , logoutUser);


module.exports=AllRoutes