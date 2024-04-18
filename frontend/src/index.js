const dotenv=require('dotenv').config();
fetchProfiles("/getusers");

if (loggedInId) {
  editprofile.setAttribute(
    "href",
    `./pages/edit_profile.html?LoggedInId=${loggedInId}`
  );
} 
logoutbtn.addEventListener("click", () => {
    if (logoutbtn.textContent === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem('loggedInId')
      swal("Message!", "Logout successfully", "success");
      logoutbtn.textContent = "Login";
    } else {
      logoutbtn.setAttribute("href", "./pages/signup-signin.html");
    }
  });





// function to search
function searchProfiles() {
  const name = document.getElementById("searchName").value;
  const techStack = document.getElementById("searchTechStack").value;
  const bio = document.getElementById("searchBio").value;

  const uri = `/searchusers?name=${name}&techStack=${techStack}&bio=${bio}`;
  fetchProfiles(uri);
}

// Function to fetch user profiles
function fetchProfiles(uri) {
  const baseurl = "https://stretch-git-main-pratapaditya01s-projects.vercel.app/api";

  const apiUrl = `${baseurl}${uri}`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => renderUserProfiles(data))
    .catch((error) =>{
        swal("Alert !", error.responseJSON.message, "error");
    } );
}

// Function to render user profiles dynamically
function renderUserProfiles(userProfiles) {
  const userProfilesSection = document.getElementById("userProfilesSection");

  // Clear any existing content
  userProfilesSection.innerHTML = "";

  // Set flex container properties
  userProfilesSection.classList.add("d-flex", "flex-wrap", "justify-content-start", "gap-3");

  // Iterate through each user profile and create a card for each
  userProfiles.forEach((user) => {
    const cardHtml = `
      <div class="col-md-3 mb-4">
        <div class="card shadow" style="width: 100%;">
          <img src="${user.gravatar}" class="card-img-top" alt="Gravatar Image" style="max-height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text"><strong>Field of Interest:</strong> ${user.fieldOfInterest.join(", ")}</p>
            <p class="card-text"><strong>Tech Stack:</strong> ${user.techStack.join(", ")}</p>
          </div>
          <div class="card-footer bg-transparent border-0 text-end">
            ${
              user._id == loggedInId
                ? `<button class="btn btn-danger me-2" onclick="deleteProfile('${user._id}')">Delete Profile</button>`
                : ""
            }
            <button class="btn btn-success" onclick="viewProfile('${user._id}')">View Profile</button>
          </div>
        </div>
      </div>`;

    userProfilesSection.innerHTML += cardHtml;
  });
}


//   function to view profile on new page
function viewProfile(userId) {
  window.location.href = `./pages/edit_profile.html?userId=${userId}`;
}

//  function to delete you account
function deleteProfile(userId) {
  if (confirm("Press OK to delete your Account!")) {
    if (!token) {
      swal("Message!", "You are not logged in");
      return;
    }

    const headers = new Headers();
    headers.append("Authorization", `${token}`);

    // Make the DELETE request
    fetch(
      `https://stretch-git-main-pratapaditya01s-projects.vercel.app/${userId}`,
      {
        method: "DELETE",
        headers: headers,
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
       
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInId");
        swal("Alert !", response.message, );
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        swal("Alert !", error.responseJSON.message, "error");
      });
  }
}
