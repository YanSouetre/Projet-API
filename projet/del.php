<?php

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
$inputJSON = file_get_contents('php://input');
$perso = json_decode($inputJSON, TRUE);
$file_name = "data.json";
$data = [];
if (file_exists($file_name)) {
    $data = json_decode(file_get_contents($file_name), true);
}
$index = 0;
foreach($data as $key => $value){
    if($perso["id"] == $value["id"]){
        array_splice($data,$index,1);
    }
    $index++;
}

file_put_contents($file_name, json_encode($data));