<?php

/**
 * Ce fichier est appelé à l'aide d'axios dans le fichier memory.js
 * Il permet de récupérer les 3 meilleurs scores
 */

// Chargement de l'autoloader phpp
require_once '../vendor/autoload.php';

// Chargement des controllers
use Sik\Memory\Controller;

// Appel de la fonction de controller qui récupère les trois meilleurs scores
Controller\ScoreController::getThreeBest();


?>