<?php

namespace Sik\Memory\Utility;

use Dotenv\Dotenv;

class DataBaseManager{





    /**
     * @return \PDO
     */
    public static function getConnection(){

        // Chargement du .env
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();


        /**
         * Récupération des données depuis le fichier .env
         */
        $host = $_ENV["DB_HOST"];
        $dbname = $_ENV["DB_NAME"];
        $user = $_ENV["DB_USER"];
        $pass = $_ENV["DB_PASS"];

        // Initialisation de la vaelur de retour 
        // Ici on souhaite retourner un objet représentant une connexion à MySQL
        $connection = NULL;
        try
        {
            $connection = new \PDO('mysql:host='.$host.';dbname='.$dbname.';charset=utf8mb4', $user, $pass);
        }
        // Gestion des erreurs
        catch (\Exception $e){
            die('Erreur : '. $e->getMessage().' ' . $e->getTraceAsString());
        }
        return $connection;
    }
}

?>