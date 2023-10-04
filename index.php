<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/homeStyle.css">
    <link rel="stylesheet" href="./styles/menubar.css">
    <!-- <link rel="stylesheet" href="./styles/groups.css"> -->
    <!-- <link rel="stylesheet" href="./styles/kanban.css"> -->
    <!-- <link rel="stylesheet" href="./styles/manageprojectStyle.css"> -->
    <link rel="stylesheet" href="./styles/userManage.css">
    <link rel="stylesheet" href="./styles/userProfileStyle.css">
    <script src="./scripts/homeScript.js" defer></script>
    <!-- <script src="./scripts/groups.js" defer></script> -->
    <!-- <script src="./scripts/kanban.js" defer></script> -->
    <!-- <script src="./scripts/projectscript.js" defer> </script> -->
    <script src="./scripts/userManage.js" defer></script>
    <script src="./scripts/userProfileScript.js" defer></script>
    <!-- <script src="./scripts/visibility.js" defer></script> -->
    <meta name="author" content="davidgong" />
    <title>Home</title>
</head>

<body>
<?php session_start() ?>
<?php require_once "inc/dbconn.inc.php"; ?>
<?php require_once "inc/menu.inc.php"; ?>



     <!---------page content----------------->
     <section class="content">
      <div class="container-fluid">
         <?php 
            $page = isset($_GET['page']) ? $_GET['page'] : 'home';
            if(!file_exists($page.".php")){
                include '404.html';
            }else{
            include $page.'.php';
            }
          ?>
      </div>
    </section>
    <!----------- end page content ------------>



</html>