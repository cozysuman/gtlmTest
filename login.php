<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/signInStyle.css">
    <script src="./scripts/login.js" defer></script>
    <script src="./scripts/visibility.js" defer></script>
    <meta name="author" content="suman" />
    <title>Sign In</title>
</head>
  <body>
    <div class="bg">
      
      <form class="sign" id="loginForm" action="login.php" method="POST">
        <img id="logo" src="images/logitech_innovations_logo.jpg" alt="LogiTech Innovations">

        <h1>SIGN IN</h1>   
        <?php
        session_start();
        
            // Check if the form has been submitted
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                // Get user input
                $username = $_POST["user"];
                $password = $_POST["password"];

                // Replace this with your actual user authentication logic
                if (validateUser($username, $password)) {
                    // Authentication successful, redirect to a secure page
                    header("Location: index.php?page=home");
                    exit;
                } else {
                    // Authentication failed, display an error message
                    echo "<p class='error'>Invalid username or password.</p>";
                }
            }
            ?>

        <div class="form-input">
          <input id="user" type="text" name="user" required/>
          <label for="user">User Name</label>
        </div>

        <div class="form-input">
          <input id="password" name="password" type="password" required/>
          <label for="password">Password</label>
        </div>

        <button class="button" id="loginBtn" type="submit">Sign In</button>  
      </form>
      
    </div>
    

    
  </body>
</html>

<?php
function validateUser($username, $password) {
    require_once "inc/dbconn.inc.php";
   // Define the SQL query
    $sql = "SELECT * FROM users WHERE username = ?;";
    // Use a prepared statement to prevent SQL injection
    $statement = $conn->prepare($sql);
    $statement->bind_param("s", $username);

    // Execute the query
    $statement->execute();

    // Get the result set
    $result = $statement->get_result();

    // Check if a user with the given username exists
    if ($result->num_rows === 1) {
        // Fetch the user data from the result
        $row = $result->fetch_assoc();
        // echo 'console.log("' . $row['username'] .  $row['password'] . '");';

        if ($password==$row['password']) {
          $_SESSION['user_details'] = $row;
            // Authentication successful
            return true;
        }
        // Free up the result set resources
        mysqli_free_result($result);
    }
    mysqli_close($conn);

    // Authentication failed
    return false;
    
}

?>