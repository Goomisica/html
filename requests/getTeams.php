<?php
session_start();
if ($_SESSION["auth"] !== true) {
    echo "not authenticated";
    die();
}

$database = new mysqli("localhost", "root", "1138", "1138scapp");

$resArr = $database->query("select TeamNumber from team")->fetch_all(MYSQLI_NUM);

foreach($resArr as &$arr) {
    $arr = $arr[0];
}

echo json_encode($resArr);
?>