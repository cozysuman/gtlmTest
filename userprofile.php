
<?php

// Check if the user is logged in (user details should be stored in the session)
if (isset($_SESSION['user_details'])) {
    // Retrieve user details from the session
    $userDetails = $_SESSION['user_details'];

    // You can now access user details like $userDetails['username'], $userDetails['jobRole'], etc.

    // Display the user profile or perform actions based on the user details
    // echo "Welcome, " . $userDetails['username'] . "! Your role is: " . $userDetails['jobRole'];
} 
else {
//     // Redirect to the login page if the user is not logged in
//     header("Location: login.php");
echo "<p class='error'>Invalid username or password.</p>";
    exit;
}
?>
    <!-- ....... start profile content...... -->
    <div class="pageTitle"><h2>User Profile</h2></div>
    

    <div class="center">
      <div class="user-card">
        <div class="edit-button-container">
          <button id="edit-btn" class="edit-button">Edit</button>
        </div>
        <div class="user-image">
          <img src="./images/profile1.png" alt="Profile Picture">
        </div>
        <div class="user-info">
          <h2><?php echo  $userDetails['username'] ?></h2>

          <div class="info-row">
            <div class="first-row">
              <div class="front-tag">Employee ID:</div>
              <div class="front-tag">Date of Birth:</div>
              <div class="front-tag">Contact:</div>
              <div class="front-tag">Email ID:</div>
              <div class="front-tag">Job Title:</div>
            </div>

            <div class="second-row">
              <div class="editable" id="employee-id"><?php echo  $userDetails['employeeID'] ?></div>
              <div class="editable" id="date-of-birth"><?php echo  $userDetails['dob'] ?></div>
              <div class="editable" id="contact"><?php echo  $userDetails['contact'] ?></div>
              <div class="editable" id="email"><?php echo  $userDetails['email'] ?></div>
              <div class="editable" id="job-title"><?php echo  $userDetails['jobRole'] ?></div>
            </div>
          </div>
        </div>     
      </div>
    </div>

    <!--EDIT USER DETAIL MODAL WINDOW-->
    <div id="editProfileModal" class="modal">
      <div class="modal-content">
          <h2>Edit Profile</h2>
          <p>Are you sure you want save changes?</p>
          <button id="confirmSaveBtn" class="edit-button">OK</button>
          <button id="cancelSaveBtn" class="edit-button">Cancel</button>
      </div>
  </div>

<!-- ....................end profile content.............. -->



    
