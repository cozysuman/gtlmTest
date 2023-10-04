<?php
        require_once "inc/dbconn.inc.php";
        session_start();
        ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/signInStyle.css">
    <script src="./scripts/login.js" defer></script>
    <!-- <script src="./scripts/visibility.js" defer></script> -->
    <meta name="author" content="suman" />
    <title>Sign In</title>
</head>
  <body>
  
 
    <div class="bg">
      
      <form class="sign" id="loginForm" action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="POST">
        <img id="logo" src="images/logitech_innovations_logo.jpg" alt="LogiTech Innovations">

        <h1>SIGN IN</h1>  
        <?php
        // require_once "inc/dbconn.inc.php";
        // session_start();

        
            // Check if the form has been submitted
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                // Get user input
                $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
                $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);


                if (empty($username)) {
                  echo "<p style=\"text-align: center; margin-top: 10px;\">Please enter a username</p>";
              } elseif (empty($password)) {
                  echo "<p style=\"text-align: center; margin-top: 10px;\">Please enter a password</p>";
              } else {
                  $sql = "SELECT * FROM users WHERE username = '$username';";
                  $result = mysqli_query($conn, $sql);
                  if (mysqli_num_rows($result) > 0) {
                      $row = mysqli_fetch_assoc($result);
                      echo "Password: " . $row["password"] . "<br>";
                      echo "Password: " . $password . "<br>";
                      // echo "<p style=\"text-align:center; margin-top:10px;\">ID: " . $row["id"] . "<br>";
                      // echo "Username: " . $row["username"] . "<br>";
                      if (password_verify($password, $row["password"])) {
                        // if ($password==$row['password']) {
                        $_SESSION['user_details'] = $row;
                        header("Location: index.php?page=home");
                        echo "<b>password is correct</b><br>";
                        exit;
                          
                          // echo "Password: " . $row["password"] . "<br>";
                          // echo "Address: " . $row["address"] . "<br>";
                          // echo "DoB: " . $row["dob"] . "<br>";
                          // echo "User role: " . $row["userRole"] . "</p>";
                      } else {
                          echo "<i style=\"color: red\">password incorrect</i></p><br>";
                      }
                  }else{
                      echo "<p style=\"color: red; text-align: center; margin-top:10px;\"><i>User does not exist</i></p><br>";
                  }
              }

                // Replace this with your actual user authentication logic
                // if (validateUser($username, $password)) {
                //     // Authentication successful, redirect to a secure page
                //     header("Location: index.php?page=home");
                //     exit;
                // } else {
                //     // Authentication failed, display an error message
                //     echo "<p class='error'>Invalid username or password.</p>";
                // }
            }
            ?> 
        
        
        <div class="form-input">
          <input id="user" type="text" name="username" required/>
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
        

