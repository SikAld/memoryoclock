<?php

// Définition du namespace
namespace Sik\Memory\Controller;

// Imports 
use Sik\Memory\Repository;
use Sik\Memory\Entity;


class ScoreController{


    public static function getThreeBest(){
        Repository\ScoreRepository::getRecord();
    }

    public static function newScore($username, $timeleft){
        $score = new Entity\Score($username, $timeleft);
        Repository\ScoreRepository::saveScore($score);
    }
}

?>