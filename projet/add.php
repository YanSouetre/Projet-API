<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}

$inputJSON = file_get_contents('php://input'); 
$perso = json_decode($inputJSON, TRUE);
$file_name = "data.json";
$persos = [];
if (file_exists($file_name)) {
    $persos = json_decode(file_get_contents($file_name), true);
}
if(empty($persos)){
    $id =1;
}else{
    $id =0;
    foreach ($persos as $key => $value) {
        if($value['id']>=$id){
            $id = $value['id']+1;
        }
    }
}
$perso['id'] = $id;
array_push($persos, $perso);
file_put_contents($file_name, json_encode($persos));