<?php
namespace Sik\Memory\Repository;

use Sik\Memory\Entity\Score;
use Sik\Memory\Utility;

class ScoreRepository{

    /**
     * Cette méthode enregistre un nouveau score en base de donnée
     * @param Score $score
     * @return void
     */
    public static function saveScore(Score $score){
        // Connexion à la base de donnée
        $mysql_connection = Utility\DataBaseManager::getConnection();
        
        // Rédaction et exécution de la requête MySQL
        $sql = "INSERT INTO scoring (score_username, score_timeleft) VALUES ('".$score->getUsername()."', ".$score->getTimeleft().")";
        $result = $mysql_connection->query($sql);
        
        // Encodage et affichage du résultat au format JSON
        $json = json_encode($result->fetchAll(\PDO::FETCH_ASSOC));
        echo $json;
    }

      /**
     * Cette méthode récupère les trois meilleurs scores depuis la base de donnée
     * @return void
     */
    public static function getRecord(){

        // Connexion à la base de données
        $mysql_connection = Utility\DataBaseManager::getConnection();
        
        // Rédaction et exécution de la requête MySQL
        $sql = "SELECT score_username, score_timeleft FROM scoring ORDER BY score_timeleft DESC LIMIT 3";
        $result = $mysql_connection->query($sql);
        
        // Encodage et affichage du résultat au format JSON
        $json = json_encode($result->fetchAll(\PDO::FETCH_ASSOC));
        echo $json;
    }
}

?>