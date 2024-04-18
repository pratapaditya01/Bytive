
  $(document).ready(function () {

    $("#toggleForm").click(function () {
      $("#registerFields").toggle();
      $("#authForm").toggle();
      var buttonText = $(this).text() === "Register" ? "Login" : "Register";
      $(this).text(buttonText);
      $("#authForm")[0].reset();
    });

   
    $("#authForm").submit(function (event) {
      event.preventDefault();
      let loginemail = $("#loginemail").val();
      let loginpassword = $("#loginpassword").val();
      console.log(loginemail, loginpassword);
      let formdata = {
        email: loginemail,
        password: loginpassword,
      };
      loginUser(formdata);
    });


    $("#registerForm").submit(function (event) {
      event.preventDefault();
      var name = $("#name").val();
      var email = $("#email").val();
      var password = $("#password").val();
      var techStack = $("#techStack").val();
      var fieldOfInterest = $("#fieldOfInterest").val();
      var seeking = $("#seeking").val();
      var gravatar = $("#gravatar").val();
      var bio = $("#bio").val();
      var githubURL = $("#githubURL").val();
      var linkedinURL = $("#linkedinURL").val();
      var location = $("#location").val();
      var twitterURL = $("#twitterURL").val();
      var websiteURL = $("#websiteURL").val();
      
      formdata={
        name,
        email,
        password,
        techStack,
        fieldOfInterest,
        seeking,
        gravatar,
        bio,
        githubURL,
        linkedinURL,
        location,
        twitterURL,
        websiteURL,
      };

      registerUser(formdata)

    });


   
 function registerUser(formData) {
  console.log(formData);
  $.ajax({
    url: "https://stretch-git-main-pratapaditya01s-projects.vercel.app/api/user/register",
    type: "POST",
    data: JSON.stringify(formData), 
    contentType: 'application/json',
    success: async function (response) {
     await swal("Alert !", response.message);
      console.log("Registration successful:", response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('loggedInId', response.profile);
     
      window.location.href=`../index.html?LoggedInId=${response.profile}`
    },
    error: function (error) {
        swal("Alert !", error.responseJSON.message, "error");
        // alert(error.responseJSON.message)
      console.log("Registration error:", error);
    },
  });
}

 
  function loginUser(formData) {
    console.log(formData);
    $.ajax({
      url: "https://stretch-git-main-pratapaditya01s-projects.vercel.app/api/user/login",
      type: "POST",
      data: JSON.stringify(formData), 
    contentType: 'application/json',
      success: function (response) {
        console.log( response.message);
        swal("Alert !", response.message,);
        if(response.message==="Login successful"){
          localStorage.setItem('token', response.token);
          localStorage.setItem('loggedInId', response.profile);
          window.location.href=`../index.html?LoggedInId=${response.profile}`
        }
       
      },
      error: function (error) {
        // alert(error.responseJSON.message)
        swal("Alert !", error.responseJSON.message, "error");
        console.error("Login error:", error);
      },
    });
  }

});

