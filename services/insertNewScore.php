<?php
/**
 * Ce fichier est appelé à l'aide d'axios dans le fichier memory.js
 * Il permet de sauvegarder un nouveau score
 */


// Chargement de l'autoloadeur
require_once '../vendor/autoload.php';

// Chargement des controllers

use Sik\Memory\Controller;

// Axios à la particularité d'envoyé son contenu en JSON, il est donc nécessaire de décoder ce JSON dans la variable $_POST
$_POST = json_decode(file_get_contents("php://input"),true);

// Le temps envoyé est la chaien de caractère contenue dans la div
// Cette valeur contient un "s" représentant le terme "secondes" qu'il faut supprimer car la base de donnée à été construite pour sauvegarder un entier 
$timeleft = substr($_POST["timeleft"],0, -1 );
Controller\ScoreController::newScore($_POST["username"], $timeleft);

?>