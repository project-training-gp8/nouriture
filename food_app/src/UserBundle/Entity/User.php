<?php
// src/UserBundle/Entity/User.php

namespace UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    protected $name;

    /**
     * @ORM\Column(type="string", length=100)
     */
    protected $job;

    /**
     * @ORM\Column(name="recettename", type="array")
     */
    protected $recettename;

    /**
     * @ORM\Column(name="recetteingre", type="array")
     */
    protected $recetteingre;

    /**
     * @ORM\Column(name="recettemethod", type="array")
     */
    protected $recettemethod;

    /**
     * @ORM\Column(name="recettecalo", type="array")
     */
    protected $recettecalo;

    /**
     * @ORM\Column(name="image", type="array", nullable=true)
     */
    protected $image;

    /**
     * Get id
     *
     * @return integer
     */
     public function __construct()
      {
        parent::__construct();
        $this->enabled = true;
        $this->setEnabled(true);
      }


    /**
     * Set name
     *
     * @param string $name
     *
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set job
     *
     * @param string $job
     *
     * @return User
     */
    public function setJob($job)
    {
        $this->job = $job;

        return $this;
    }

    /**
     * Get job
     *
     * @return string
     */
    public function getJob()
    {
        return $this->job;
    }

    /**
     * Set recettename
     *
     * @param array $recettename
     *
     * @return User
     */
    public function setRecettename($recettename)
    {
        $this->recettename = $recettename;

        return $this;
    }

    /**
     * Get recettename
     *
     * @return array
     */
    public function getRecettename()
    {
        return $this->recettename;
    }

    /**
     * Set recetteingre
     *
     * @param array $recetteingre
     *
     * @return User
     */
    public function setRecetteingre($recetteingre)
    {
        $this->recetteingre = $recetteingre;

        return $this;
    }

    /**
     * Get recetteingre
     *
     * @return array
     */
    public function getRecetteingre()
    {
        return $this->recetteingre;
    }

    /**
     * Set recettecalo
     *
     * @param array $recettecalo
     *
     * @return User
     */
    public function setRecettecalo($recettecalo)
    {
        $this->recettecalo = $recettecalo;

        return $this;
    }

    /**
     * Get recettecalo
     *
     * @return array
     */
    public function getRecettecalo()
    {
        return $this->recettecalo;
    }

    /**
     * Set image
     *
     * @param string $image
     *
     * @return User
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set recettemethod
     *
     * @param array $recettemethod
     *
     * @return User
     */
    public function setRecettemethod($recettemethod)
    {
        $this->recettemethod = $recettemethod;

        return $this;
    }

    /**
     * Get recettemethod
     *
     * @return array
     */
    public function getRecettemethod()
    {
        return $this->recettemethod;
    }
}
