<?php
// Check if the user is logged in (user details should be stored in the session)
if (isset($_SESSION['user_details'])) {
    // Retrieve user details from the session
    $userDetails = $_SESSION['user_details'];
  }
// Check if the form was submitted (data was edited)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Retrieve edited data from the form
  $editedUername = $_POST['username'];
  $editedDOB = $_POST['DOB'];
  $editedContact = $_POST['contact'];
  $editedEmail = $_POST['email'];
  // $editedJobRole = $_POST['jobRole'];
$sql = "UPDATE users SET username='$editedUername', dob='$editedDOB', contact='$editedContact', email = '$editedEmail' WHERE employeeID  = " . $userDetails['employeeID'];
if (mysqli_query($conn, $sql)) {
    // Update successful
    echo "Profile updated successfully!";
    // Fetch the updated user details from the database
    $sql = "SELECT * FROM users WHERE employeeID = " . $userDetails['employeeID'];
    $result = mysqli_query($conn, $sql);

    if ($result) {
        $updatedUserDetails = mysqli_fetch_assoc($result);
        // Update $userDetails with the new data
        $_SESSION['user_details'] = $updatedUserDetails;
        $userDetails = $updatedUserDetails;
    } else {
        // Handle the error
        echo "Error fetching updated user details: " . mysqli_error($conn);
    }
} 
else {
    // Update failed
    echo "Error updating profile: " . mysqli_error($conn);
}

mysqli_close($conn);
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
      <form id="userProfileFrom" method="POST" action="">
      <div class="form-group">
        <label for="username">Username:</label>
        <input name="username" type="text" value="<?php echo  $userDetails['username'] ?>"/>
      </div>
      <div class="form-group">
        <label for="DOB">Date of Birth:</label>
        <input name="DOB" type="date" value="<?php echo  $userDetails['dob'] ?>"/>
      </div>
      <div class="form-group">
        <label for="contact">Contact:</label>
        <input name="contact" type="tel" value="<?php echo  $userDetails['contact'] ?>"/>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input name="email" type="email" value="<?php echo  $userDetails['email'] ?>"/>
      </div>
      <!-- <div class="form-group">
        <label for="jobRole">Job Role:</label>
        <input name="jobRole" type="text" value="<?php echo  $userDetails['jobRole'] ?>"/>
      </div> -->

      <button type="button" id="saveButton" class="edit-button">Save</button>
      <button type="button" id="cancelButton" class="edit-button">Cancel</button>

      </form>
      </div>
  </div>

<!-- ......confirmation modal.............. -->
    <div id="confirmationModal" class="modal">
      <div class="modal-content">
          <h2>Edit Profile</h2>
          <p>Are you sure you want save changes?</p>
          <button id="confirmSaveBtn" class="edit-button">OK</button>
          <button id="cancelSaveBtn" class="edit-button">Cancel</button>
      </div>
  </div>

<!-- ....................end profile content.............. -->



    
