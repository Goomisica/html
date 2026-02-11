<?php
session_start();

$

if (!$_SESSION["auth"] === true) {
    echo "<!DOCTYPE html><html><body>not authenticated\n<button><a href=\"/\">Go Back</a></button></body></html>";
        die();
}?>

<!DOCTYPE html>
<html>
    <header>
        <link rel="stylesheet" href="style.css">
    </header>
    
    <body>
        <p><?php echo $_GET["team"];?></p>
    </body>
</html>