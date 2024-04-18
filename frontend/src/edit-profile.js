

    if (userId) {
      fetchUserInfo(userId);
    }else if(loggedInId){
      fetchUserInfo(loggedInId, 'edit');
    } else {
     if(!token){
        swal("Message!", "Login to edit your profile", "success");

      window.location.href='../index.html'
     }
    }
    logoutbtn.addEventListener("click", () => {
        if (logoutbtn.textContent === "Logout") {
          localStorage.removeItem("token");
          swal("Message!", "Logout successfully", "success");
          logoutbtn.textContent = "Login";
        } else {
          logoutbtn.setAttribute("href", "./signup-signin.html");
        }
      });

    function fetchUserInfo(userId,one) {

      const headers = new Headers();
      headers.append("Authorization", `${token}`);
      fetch(
        `http://localhost:8000/api/user/userprofile/${userId}`,
        {
          headers: headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle the user data, for example, update the UI
          console.log("User information:", data.message);
          // 
          if(data.message ==="user fetched"){
            if(data.user.length===0){
              userinfo.innerHTML=`<h1 style='color:red'>
             
             ${data.message} </br>
             No User found with this Id!
             </h1>`

            }else{
             if(one==="edit"){
              renderuser(data.user[0],one);
             }else{
              renderuser(data.user[0]);
             }
           
            }
           
          }else{
           
           userinfo.innerHTML=`<h1 style='color:red'>
             
              ${data.message} </br>
              Login to see more info!
              </h1>`
              localStorage.removeItem('token')

              swal("Alert !", data.message, "error");
          }
          
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
          swal("Alert !",error.responseJSON.message,"error");
        });
    }



    function renderuser(user, one) {
      userinfo.innerHTML=''
 
      if(!one){
        $('#userInfo').append(`<div class="card">
        <div class="row">
        <div class="col-md-6">
          <img src="${user.gravatar}" alt="${user.name}" class="img-fluid rounded border">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h4 class="card-title">Name: ${user.name}</h4>
            <p class="card-text"><strong>Email:</strong> ${user.email}</p>
            <p class="card-text"><strong>Location:</strong> ${user.location}</p>
            <p class="card-text"><strong>Bio:</strong> ${user.bio}</p>
            <p class="card-text"><strong>GitHub:</strong> <a href="${user.githubURL}" target="_blank">${user.githubURL}</a></p>
            <p class="card-text"><strong>Twitter:</strong> <a href="${user.twitterURL}" target="_blank">${user.twitterURL}</a></p>
            <p class="card-text"><strong>Website:</strong> <a href="${user.websiteURL}" target="_blank">${user.websiteURL}</a></p>
            <p class="card-text"><strong>LinkedIn:</strong> <a href="${user.linkedinURL}" target="_blank">${user.linkedinURL}</a></p>
            <p class="card-text"><strong>Tech Stack:</strong> ${user.techStack.join(", ")}</p>
            <p class="card-text"><strong>Field of Interest:</strong> ${user.fieldOfInterest.join(", ")}</p>
            <p class="card-text"><strong>Seeking:</strong> ${user.seeking.join(", ")}</p>
          </div>
        </div>
      </div>
      
</div>
`);
  } else if(one==='edit'){

        $('#userInfo').append(`
        <div class="card">
          <div class="row">
  
  <div class="col-md-3">
    <img src="${user.gravatar}" alt="${user.name}" class="img-fluid">
  </div>
  <div class="col-md-3">
    <div class="card-body">
      <p class="card-title"><strong>Name: </strong>${user.name}</p>
      <p class="card-text"><strong>Email:</strong> ${user.email}</p>
      <p class="card-text"><strong>Location:</strong> ${user.location}</p>
      <p class="card-text"><strong>Bio:</strong> ${user.bio}</p>
      <p class="card-text"><strong>Tech Stack:</strong> ${user.techStack.join(", ")}</p>
      
    </div>
  </div>
  <div class="col-md-6">
    <div class="card-body">
     
      <p class="card-text"><strong>GitHub:</strong> <a href="${user.githubURL}" target="_blank">${user.githubURL}</a></p>
      <p class="card-text"><strong>Twitter:</strong> <a href="${user.twitterURL}" target="_blank">${user.twitterURL}</a></p>
      <p class="card-text"><strong>Website:</strong> <a href="${user.websiteURL}" target="_blank">${user.websiteURL}</a></p>
      <p class="card-text"><strong>LinkedIn:</strong> <a href="${user.linkedinURL}" target="_blank">${user.linkedinURL}</a></p>
    
      <p class="card-text"><strong>Field of Interest:</strong> ${user.fieldOfInterest.join(", ")}</p>
      <p class="card-text"><strong>Seeking:</strong> ${user.seeking.join(", ")}</p>
    </div>
    <button class="btn btn-danger card-text" onclick="deleteProfile('${user._id}')">delete Profile</button>
  </div>

</div>

<hr>
<hr>
        <form id="updateForm" class="row m-3 g-3">
  <!-- Left side of the form -->
  <div class="col-md-6">
    <div class="mb-4">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" required value="${user.name}">
    </div>

    <div class="mb-4">
      <label for="techStack" class="form-label">Tech Stack</label>
      <select name="" class="form-control" id="techStack" multiple></select>
    </div>

    <div class="mb-4">
      <label for="fieldOfInterest" class="form-label">Field of Interest</label>
      <select name="" class="form-control" id="fieldOfInterest" multiple></select>
    </div>

    <div class="mb-4">
      <label for="seeking" class="form-label">Seeking</label>
      <select class="form-select" id="seeking" multiple></select>
    </div>

    <div class="mb-4">
      <label for="location" class="form-label">Location</label>
      <input type="text" class="form-control" id="location" required value="${user.location}">
    </div>
  </div>

  <!-- Right side of the form -->
  <div class="col-md-6">
    <div class="mb-4">
      <label for="gravatar" class="form-label">Gravatar URL</label>
      <input type="url" class="form-control" id="gravatar" required value="${user.gravatar}">
    </div>

    <div class="mb-4">
      <label for="bio" class="form-label">Bio</label>
      <textarea class="form-control" id="bio" rows="3" required>${user.bio}</textarea>
    </div>

    <div class="mb-4">
      <label for="githubURL" class="form-label">GitHub URL</label>
      <input type="url" class="form-control" id="githubURL" required value="${user.githubURL}">
    </div>

    <div class="mb-4">
      <label for="linkedinURL" class="form-label">LinkedIn URL</label>
      <input type="url" class="form-control" id="linkedinURL" required value="${user.linkedinURL}">
    </div>

  

    <div class="mb-4">
      <label for="twitterURL" class="form-label">Twitter URL</label>
      <input type="url" class="form-control" id="twitterURL" required value="${user.twitterURL}">
    </div>

    <div class="mb-4">
      <label for="websiteURL" class="form-label">Website URL</label>
      <input type="url" class="form-control" id="websiteURL" required value="${user.websiteURL}">
    </div>
  </div>

  <!-- Full-width submit button -->
  <div class="col-12">
    <button  type="submit" class="btn btn-warning col-12">Update</button>
  </div>
</form>
</div>
`
);


const techStackOptions = ['HTML/CSS', 'JavaScript', 'node.js', 'php', 'java', 'golang', 'python', 'c#', 'C++', 'erlang'];
populateSelect('#techStack', techStackOptions, user.techStack);

const fieldOfInterestOptions = ['Full Stack developer', 'Data Scientist', 'Backend Developer', 'Frontend Developer', 'Power BI', 'AI ML'];
populateSelect('#fieldOfInterest', fieldOfInterestOptions, user.fieldOfInterest);

const seekingOptions = ['Internship', 'Job', 'Remote', 'Work from Home'];
populateSelect('#seeking', seekingOptions, user.seeking);

// Function to populate  multi-select element 
function populateSelect(selectId, options, selectedValues) {
  const selectElement = $(selectId);
  options.forEach(option => {
    const isSelected = selectedValues.includes(option);
    selectElement.append(`<option value="${option}" ${isSelected ? 'selected' : ''}>${option}</option>`);
  });

}

      }
  
      // console.log(userinfo.innerHTML)
    }

  
   $(document).ready(function () {


  // Assume the form has been dynamically created with the ID 'updateForm'
  $(document).on('submit', '#updateForm', function(event) {

    event.preventDefault();

    // Collect form data
    const formData = {
      name: $('#name').val(),
      techStack: $('#techStack').val(),
      fieldOfInterest: $('#fieldOfInterest').val(),
      seeking: $('#seeking').val(),
      gravatar: $('#gravatar').val(),
      bio: $('#bio').val(),
      githubURL: $('#githubURL').val(),
      linkedinURL: $('#linkedinURL').val(),
      location: $('#location').val(),
      twitterURL: $('#twitterURL').val(),
      websiteURL: $('#websiteURL').val(),
    };


    // Make a PUT request to update user data
    $.ajax({
      url: `http://localhost:8000/api/user/editprofile/${loggedInId}`,
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('token'), // Include your authorization header
      },
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success:async function (response) {
       await swal("Alert !", response.message);
        // alert(response.message);
        // console.log('Update successful:', response);
       
        window.location.reload();
     
      },
      error: function (error) {
        // Handle errors
        console.error('Update error:', error);
        // alert('Update failed. Please try again.');
        swal("Mesaage!", error.responseJSON.message, "error");
      },
    });
  });
});



//  function to delete you account
function deleteProfile(userId) {
    if (confirm("Press OK to delete your Account!")) {
      if (!token) {
        // alert();
        swal("Alert !", "You are not logged in", "warning");
        return;
      }
  
      const headers = new Headers();
      headers.append("Authorization", `${token}`);
  
      // Make the DELETE request
      fetch(
        `http://localhost:8000/api/user/deleteprofile/${userId}`,
        {
          method: "DELETE",
          headers: headers,
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          // console.log(`${userId} `, response);
  
          localStorage.removeItem("token");
          localStorage.removeItem("loggedInId");
        //   alert(response.message);
          swal("Alert !", response.message);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          swal("Alert !", error.responseJSON.message, "error");
        });
    }
  }
  