<?php
$path = $_SERVER['DOCUMENT_ROOT'];
session_start();
  if (!isset($_SESSION['email'])) {
    //$_SESSION['msg'] = "You must log in first";
    header('location: login');
  }
  if (isset($_POST['logout'])) {
    session_destroy();
    unset($_SESSION['email']);
    header("location: login");
  }
require_once('routes.php');

    function login(){
        $path = $_SERVER['DOCUMENT_ROOT'];
        include_once($path.'/views/login.php');
    }

    function register(){
        include_once('register.php');
    }

    function panel(){
        include_once('panel.php');
    }

    function page404(){
        die('Page not found. Please try some different url.');
    }

    if($request == '' || '/'){
      if($_SESSION['email'] != ""){
        dashboard();
      }else{
        login();
      }
    }else if($request == 'login'){
        login();
    }else if($request == 'register'){
        register();
    }else if($request == 'panel'){
        panel();
    }else
        page404();
?>