<?php

namespace UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use UserBundle\Entity\User;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{

    /**
    * @Route("/")
    */
    public function indexAction(Request $request)
    {
      $userregister = new User();
      $error_msg = "";
      $message = "";

      /* START Register User */
      $formregister = $this->get('form.factory')->createBuilder(FormType::class, $userregister);
      $formregister
        ->add('name',           TextType::class)
        ->add('username',       TextType::class)
        ->add('job',            TextType::class, array('required' => false))
        ->add('email',          EmailType::class)
        ->add('plainPassword',  RepeatedType::class, array(
            'type' =>           PasswordType::class,
            'first_options'  => array('label' => "Choose a password"),
            'second_options' => array('label' => "Confirm password"),
            ))
        ->add('submit', SubmitType::class, array('label' => 'create an account'));
      $form = $formregister->getForm();
      $form->handleRequest($request);
      if ($form->isSubmitted() && $form->isValid())
      {
        $em = $this->getDoctrine()->getManager();
        $em->persist($userregister);
        try { $em->flush();} catch (\Exception $e)
        {

          $userManager = $this->get('fos_user.user_manager');
          if (!empty( ($test = $userManager->findUserBy(array('email' => $form['email']->getData()))) ))
            $error_msg = "Already used email, take another one.";
          if (!empty( ($test = $userManager->findUserBy(array('username' => $form['username']->getData()))) ))
            $error_msg = "Username already used, take another one";
          return $this->render('UserBundle:Default:index.html.twig', array('form'=>$form->createView(), 'error_msg'=>$error_msg, 'allrecip'=> null));

        }
      }
      /* END Register User */

      /* START Product Register */
      $productsregister = new User();
      $FormProductRegist = $this->get('form.factory')->createBuilder(FormType::class, $productsregister);
      $FormProductRegist
        ->add('recettename',   TextType::class)
        ->add('recetteingre',  TextareaType::class)
        ->add('recettecalo',   TextType::class)
        ->add('recettemethod',   TextareaType::class)
        ->add('image',          FileType::class)
        ->add('submit',         SubmitType::class, array('label' => "Enregister le produit"));
      $formPro = $FormProductRegist->getForm();
      $formPro->handleRequest($request);
      if ($formPro->isSubmitted() && $formPro->isValid())
        {
          $repository = $this->getUser();

          $file = $productsregister->getImage();
          $filename = md5(uniqid()).'.'.$file->guessExtension();
          $file->move($this->getparameter('recip_directory'), $filename);
          //if (file_exists($repository->getImage()))
            //unlink($repository->getImage());
          $array_1 = $repository->getRecettename(); $array_2 = $productsregister->getRecettename(); if ($array_1 == null) {$array_1 = array($array_2);} else array_push($array_1, $array_2);
          $repository->setRecettename($array_1);
          $array_1 = $repository->getRecetteingre(); $array_2 = $productsregister->getRecetteingre(); if ($array_1 == null) {$array_1 = array($array_2);} else array_push($array_1, $array_2);
          $repository->setRecetteingre($array_1);
          $array_1 = $repository->getRecettemethod(); $array_2 = $productsregister->getRecettemethod(); if ($array_1 == null) {$array_1 = array($array_2);} else array_push($array_1, $array_2);
          $repository->setRecettemethod($array_1);
          $array_1 = $repository->getRecettecalo(); $array_2 = $productsregister->getRecettecalo(); if ($array_1 == null) {$array_1 = array($array_2);} else array_push($array_1, $array_2);
          $repository->setRecettecalo($array_1);
          $array_1 = $repository->getImage(); if ($array_1 == null) {$array_1 = array("images_recip/" . $filename);} else array_push($array_1, ("images_recip/" . $filename));
          $repository->setImage($array_1);
          $em = $this->getDoctrine()->getManager();
          $em->persist($repository);
          try {$em->flush();} catch (\Exception $e) {$message = "Une Erreure est survenue, verfiez que vous ayez remplis tous les champs correctement.";}
        }
        /* END Product Register */

        /* GET PRODUCTS */
        $recip = array();
        $users = $this->getDoctrine()->getManager()->getRepository('UserBundle:User')->findBy(array(), array('name' => 'ASC'));
          foreach ($users as $user) {
            $nbr = 0;
            if (!empty($user->getImage()))
            {
              $i = count($user->getImage());
              if (is_array($user->getImage()) == true)
                foreach ($user->getImage() as $image)
                {
                    array_push($recip, array('name' => $user->getRecettename()[$nbr], 'ingre' => $user->getRecetteingre()[$nbr],
                                            'method' => $user->getRecettemethod()[$nbr], 'calo'=> $user->getRecettecalo()[$nbr], 'image'=> $image));

                  $nbr = $nbr + 1;
                }
              else
                array_push($recip, array('name' => $user->getRecettename(), 'ingre' => $user->getRecetteingre(),
                                      'method' => $user->getRecettemethod(), 'calo'=> $user->getRecettecalo(), 'image'=> $user->getImage()));
            }
        }
        /*END GET PRODUCTS */

        /* Delete products start */
        $val = null;
        $user = $this->getUser();
        if (($user && is_array($user->getRecettename()) && !empty($user->getRecettename())) || ($user && is_array(!$user->getRecettename()) && $user->getRecettename() != null))
          $val = 1;
        if ($request->getMethod() == 'POST' && !$form->isSubmitted() && !$formPro->isSubmitted())
          {
            $idname = array_search($_POST['submit'], $user->getRecettename());
            if (file_exists($user->getImage()[$idname]))
              unlink($user->getImage()[$idname]);
              $name = $user->getRecettename();
              $image = $user->getImage();
              $calo = $user->getRecettecalo();
              $ingre = $user->getRecetteingre();
              $method = $user->getRecettemethod();
            unset($name[$idname]);
            unset($calo[$idname]);
            unset($ingre[$idname]);
            unset($method[$idname]);
            unset($image[$idname]);
            $user->setRecettename($name);
            $user->setRecettecalo($calo);
            $user->setRecetteingre($ingre);
            $user->setRecettemethod($method);
            $user->setImage($image);
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            try {$em->flush();} catch (\Exception $e) {$message = "Une Erreure est survenue en suprimant.";}

          }
        /*delete products end */

      return $this->render('UserBundle:Default:index.html.twig', array('form'=>$form->createView(), 'allrecip'=> $recip, 'error_msg'=>$error_msg, 'formPro'=>$formPro->createView(), 'msg'=>$message, 'val'=> $val));
    }

    /**
    * @Route("/logintest/", name="login_page")
    */
    public function LoginAction()
    {
      return $this->render('loginpage.html.twig');
    }

}
