<?php

namespace UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use UserBundle\Entity\User;
use Symfony\Component\Form\Extension\Core\Type\TextType;
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
          return $this->render('UserBundle:Default:index.html.twig', array('form'=>$form->createView(), 'error_msg'=>$error_msg));

        }
      }
      /* END Register User */

      /* START Product Register */
      $productsregister = new User();
      $FormProductRegist = $this->get('form.factory')->createBuilder(FormType::class, $productsregister);
      $FormProductRegist
        ->add('recettename',   TextType::class)
        ->add('recetteingre',  TextType::class)
        ->add('recettecalo',   TextType::class)
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
          if (file_exists($repository->getImage()))
            unlink($repository->getImage());

          $repository->setRecettename(array($repository->getRecettename(), $productsregister->getRecettename()));
          $repository->setRecetteingre(array($repository->getRecetteingre(), $productsregister->getRecetteingre()));
          $repository->setRecettecalo(array($repository->getRecettecalo(), $productsregister->getRecettecalo()));
          $repository->setImage("images_recip/" . $filename);
          $em = $this->getDoctrine()->getManager();
          $em->persist($repository);
          try {$em->flush();} catch (\Exception $e) {$message = "Une Erreure est survenue, verfiez que vous ayez remplis tous les champs correctement.";}
        }
        /* END Product Register */

      return $this->render('UserBundle:Default:index.html.twig', array('form'=>$form->createView(), 'error_msg'=>$error_msg, 'formPro'=>$formPro->createView(), 'msg'=>$message));
    }

    /**
    * @Route("/logintest/", name="login_page")
    */
    public function LoginAction()
    {
      return $this->render('loginpage.html.twig');
    }

}
