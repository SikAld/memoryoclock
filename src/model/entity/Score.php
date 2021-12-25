<?php
namespace Sik\Memory\Entity;

class Score{

    private $username;
    private $timeleft;

    /**
     * @param $username
     * @param $timeleft
     */
    public function __construct($username, $timeleft)
    {
        $this->username = $username;
        $this->timeleft = $timeleft;
    }

    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param mixed $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @return mixed
     */
    public function getTimeleft()
    {
        return $this->timeleft;
    }

    /**
     * @param mixed $timeleft
     */
    public function setTimeleft($timeleft)
    {
        $this->timeleft = $timeleft;
    }





}

?>