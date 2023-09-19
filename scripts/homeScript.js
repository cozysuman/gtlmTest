document.addEventListener("DOMContentLoaded", function () {
    // Get the current page URL
    var currentPageUrl = window.location.href;
    // Extract the part of the URL after the last '/'
    var lastSegment = currentPageUrl.substr(currentPageUrl.lastIndexOf('/') + 1);
    console.log(lastSegment);

    // Define an object that maps page URLs to corresponding link IDs
    var pageLinkMap = {
        "home.html": "homeLink",
        "manageprojects.html": "manageProjectsLink",
        "groups.html": "groupsLink",
        "userprofile.html": "userProfileLink",
        "usermanage.html": "userManagementLink",
        "login.html": "logoutLink"
    };

    // Get the ID of the corresponding link for the current page
    var activeLinkId = pageLinkMap[lastSegment];
    console.log(activeLinkId)

    // Add a class to highlight the active link
    if (activeLinkId) {
        var activeLink = document.getElementById(activeLinkId);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }

    //HERE

    let username="";

function init()
{
    var count = localStorage.getItem("count");

    if (count==1){
        //only get from url once!
        const user=getUrlParam("user");
        console.log("local store:"+localStorage.getItem("username")+" count: "+count);
        // To store a value
        if(localStorage.getItem("username").length===0 || (localStorage.getItem("username").length>0 && localStorage.getItem("username")!==user)){
            localStorage.setItem("username",user);
        }

        localStorage.setItem("count",2);
    }
    
    const userName = localStorage.getItem("username");

    console.log("current user: "+userName);
    
    var userManagementLink = document.getElementById("userManagementLink");

    if (userName==='admin') {
        userManagementLink.style.display = "block"; // Show the link for admin users
    } else if(userName==='Evelyn'){
        //check if the user is manager
        userManagementLink.style.display = "none"; // Hide user management link
    }else if(userName==='Sam'){
        //check if the user is not admin or manager
        userManagementLink.style.display = "none"; // Hide user management link
    }
}

function getUrlParam(name)
{
    const params = new URLSearchParams(window.location.search);
    return params.has(name) ? params.get(name) : "";
}

init();

});
