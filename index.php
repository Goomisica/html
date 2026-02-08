<?php
session_start();         
if ($_POST["pass"] === "73411") {
    $_SESSION["auth"] = true;
    header("Location: /main.php");
    die();
}
if ($_SESSION["auth"] === true) {
        header("Location: /main.php");
        die();
}
?>

<!DOCTYPE html>
<html>
    <header>
        <link rel="stylesheet" href="style.css">
    </header>
    
    <body>
        <div id="passwd">
            <form style="align-items:center">
                <label for="pass">Password:</label>
                <br>
                <input type="password" inputmode="numeric" pattern="[0-9]*" required id="pass" name="pass" oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                <br>
                <input type="submit" action="" formmethod="post" value="Submit"></button>
            </form>
        </div>
    </body>
</html>