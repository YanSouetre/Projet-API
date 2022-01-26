<?php 

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
header("Content-Type: application/json; charset=utf-8");

$file_name = "data.json";
$persos = [];
if(file_exists($file_name)){
    $persos = json_decode(file_get_contents($file_name),true);
}

$json_text = json_encode($persos,JSON_PRETTY_PRINT);
echo $json_text;

?>