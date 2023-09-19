let username="";

function permissionChecker()
{

   // var isAdmin=false;
   // if(user=='admin') isAdmin=true;
    const userName = localStorage.getItem("username");

    console.log("current user: "+userName);

    var userManagementLink = document.getElementById("userManagementLink");
    var createProjectBtn = document.getElementById("createProjectBtn");
    var addGrpBtn = document.getElementById("addGroupBtn");


    var currentURL = window.location.href;

    if (userName==='admin') {
        userManagementLink.style.display = "block"; // Show the link for admin users
    } else if(userName==='Evelyn'){
        //check if the user is manager
        userManagementLink.style.display = "none"; // Hide user management link

        // Check if the word is in the URL
        if (currentURL.includes("groups")) {
            addGrpBtn.style.display="block";  //show add group button
        } else if(currentURL.includes("projects")){
            createProjectBtn.style.display="block"; //show project creation button
        }
    }else if(userName==='Sam'){
        //check if the user is not admin or manager
        userManagementLink.style.display = "none"; // Hide user management link

        // Check if the word is in the URL
        if (currentURL.includes("groups")) {
            addGrpBtn.style.display="none";  //show add group button
        } else if(currentURL.includes("projects")){
            createProjectBtn.style.display="none"; //show project creation button
        }
    }
}

permissionChecker();