// function to get query parameters
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }



let userinfo= document.getElementById("userInfo")
let token = localStorage.getItem("token");
let logoutbtn = document.getElementById("logoutBtn");
let userId = getQueryParam("userId");
let loggedInId=getQueryParam('LoggedInId') || localStorage.getItem('loggedInId');
// index only
let editprofile = document.getElementById("editProfile");
    

if (token) {
    logoutbtn.textContent = "Logout";
  } else {
    logoutbtn.textContent = "Login";
  }

