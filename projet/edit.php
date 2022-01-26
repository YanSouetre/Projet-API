<?php

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
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
        echo("if 1 ");
        foreach ($perso as $key2 => $value2){
            if($value !== $value["id"]){
                echo("if 2 ");
                print_r($data[$key]);
                print_r($key2);
                print_r($perso);
                $data[$key][$key2] = $perso[$key2];
            }
        }
    }
    $index++;
}

file_put_contents($file_name, json_encode($data));
echo json_encode($data, JSON_PRETTY_PRINT);