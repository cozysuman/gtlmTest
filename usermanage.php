<?php
    $sql = "SELECT employeeID, username, jobRole FROM users";
    $result = mysqli_query($conn, $sql);
    $users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}
?>
<script>
  const users = <?php echo json_encode($users); ?>;
</script>
    
    <div class="pageTitle"><h2>User Management</h2></div>
    
    <!--user table-->
    <div class="users_container">
        
        <button id="addUserButton">Add User</button>
        <table id="userTable">
            <tr>
                <th>Employee ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </table>
    </div>

<?php
// Check if the form was submitted (data was edited)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['addNewUserForm'])) {
    // Retrieve edited data from the form
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
    $contact = filter_input(INPUT_POST, "contact", FILTER_SANITIZE_SPECIAL_CHARS);
    $dob = filter_input(INPUT_POST, "dob", FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_SPECIAL_CHARS);
    $employeeID = $_POST['employeeID'];
    $role = $_POST['newJobRole'];

    $hash_password = password_hash($password, PASSWORD_DEFAULT);
  
  // Prepare an INSERT statement
$stmt = $conn->prepare("INSERT INTO users (employeeID, username, password, dob, contact, email, jobrole) VALUES (?, ?, ?, ?, ?, ?, ?)");

// Bind parameters
$stmt->bind_param("sssssss", $employeeID, $username,$hash_password,$dob,$contact,$email, $role);

// Execute the statement
if ($stmt->execute()) {
    echo "New user added successfully.";
    header("Location: index.php?page=usermanage");
    
} else {
    echo "Error: " . $stmt->error;
}
$stmt->close();
  }
  elseif (isset($_POST['editUserForm'])) {
    // Retrieve edited data from the form
  $editedEmployeeID = $_POST['editEmployeeID'];
  $editedName = $_POST['editName'];
  $editedRole = $_POST['editRole'];
  
  

// Example query to update email
$sql = "UPDATE users SET username='$editedName', employeeID='$editedEmployeeID', jobRole = '$editedRole' WHERE employeeID  = " .$editedEmployeeID;

if (mysqli_query($conn, $sql)) {
    // Update successful
    echo "Profile updated successfully!";
    header("Location: index.php?page=usermanage");
    // // Fetch the updated user details from the database
    // $sql = "SELECT * FROM users WHERE employeeID = " . $userDetails['employeeID'];
    // $result = mysqli_query($conn, $sql);

    // if ($result) {
    //     $updatedUserDetails = mysqli_fetch_assoc($result);
    //     // Update $userDetails with the new data
    //     $_SESSION['user_details'] = $updatedUserDetails;
    //     $userDetails = $updatedUserDetails;
    // } else {
    //     // Handle the error
    //     echo "Error fetching updated user details: " . mysqli_error($conn);
    // }
} 
else {
    // Update failed
    echo "Error updating profile: " . mysqli_error($conn);
}




  }



// Close the statement

  
  mysqli_close($conn);
//   echo '<script>window.location.reload();</script>';
  }
  ?>
    <!--ADD A NEW USER MODAL WINDOW-->
    <div id="addModal" class="modal">
      <div class="modal-content modal-content-scroll">
          <h2>Add User</h2>
          <form id="newUserForm" action="" method="POST">
          <ul>
            <li>
                <label for="newEmployeeID">Employee ID</label>
                <input type="text" id="newEmployeeID" name="employeeID">
            </li>
            <li>
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName">
            </li>
            <li>
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName">
            </li>
            <li>
              <label for="username">Username</label>
              <input type="text" id="username" name="username">
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" id="password" name="password">
            </li>
            <li>
              <label for="dob">DOB</label>
              <input type="text" id="dob" name="dob">
            </li>
            <li>
              <label for="contact">Contact</label>
              <input type="text" id="contact" name="contact">
            </li>
            <li>
              <label for="email">Email</label>
              <input type="text" id="email" name="email">
            </li>
            <li>
                <label for="newRole">Role:</label>
                <select id="newRole" name="newJobRole">
                    <option value="Developer">Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
            </li>
          </ul>
          <button id="saveNewUserBtn" type="submit" class="button" name="addNewUserForm">Save</button>
          <button id="cancelNewUserBtn" class="button">Cancel</button>
          </form>
      </div>
  </div>

  <!--EDIT A NEW USER MODAL WINDOW-->
    <div id="editModal" class="modal">
        <div class="modal-content">
            <h2>Edit User</h2>
            <form id="editUserForm" action="" method="POST">
            <ul>
              <li>
                    <label for="editEmployeeID">Employee ID:</label>
                    <input type="text" id="editEmployeeID" name="editEmployeeID">
              </li>
              <li>
                  <label for="editName">Name:</label>
                  <input type="text" id="editName" name="editName">
              </li>
              <li>
                  <label for="editRole">Role:</label>                  
                  <select id="editRole" name="editRole">
                    <option value="Developer">Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
              </li>

                <button id="saveEditBtn" type="submit" name="editUserForm">Save</button>
                <button id="cancelEditUserBtn">Cancel</button>
            </ul>
            </form>
        </div>
    </div>

    <!--DELETE A NEW USER MODAL WINDOW-->
    <div id="deleteModal" class="modal">
        <div class="modal-content">
            <h2>Delete User</h2>
            <p>Are you sure you want to delete this user?</p>
            <button id="confirmDeleteBtn">OK</button>
            <button id="cancelDeleteBtn">Cancel</button>
        </div>
    </div>

