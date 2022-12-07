<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';



$errors = '';

if(empty($_POST['name'])  || 
   empty($_POST['email']) || 
   empty($_POST['message']))
{
    $errors .= "\n Error: all fields are required";
}

$name = $_POST['name']; 
$email_address = $_POST['email']; 
$message = $_POST['message']; 

if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
$email_address))
{
    $errors .= "\n Error: Invalid email address";
}

if( empty($errors))
{
		
	$mail = new PHPMailer();
	$mail->CharSet = 'UTF-8';

	//Enable SMTP debugging. 
	// $mail->SMTPDebug = 3;                               
	//Set PHPMailer to use SMTP.
	$mail->isSMTP(); 
	$mail->Encoding = "base64";  
           
	//Set SMTP host name                          
	$mail->Host = "smtp.gmail.com";
	//Set this to true if SMTP host requires authentication to send email
	$mail->SMTPAuth = true;                          
	//Provide username and password of sender     
	$mail->Username = "projects@ideamore.com.sa";                 
	$mail->Password = "";                           
	//If SMTP requires TLS encryption then set it
	//$mail->SMTPSecure = "tls";                           
	//Set TCP port to connect to 
	$mail->Port = 587;                                   
	//sender mail and sender name
	$mail->From = "projects@ideamore.com.sa";
	$mail->FromName = "Client";

	$mail->smtpConnect(
		array(
			"ssl" => array(
				"verify_peer" => false,
				"verify_peer_name" => false,
				"allow_self_signed" => true
			)
		)
	);

	// add as many recipient as you want here
	$mail->addAddress("projects@ideamore.com.sa
	", "Idea-more");

	$mail->isHTML(true);

	//mail subject
	$mail->Subject = "Contact form submission: $name";
	//mail body in html
	// $mail->Body = "<i>This mail is sent using localhost with the help of phpmailer using php.</i>";
	$mail->Body = "You have received a new message.<br> ".
	" Here are the details:<br> Name: $name </br> Email: $email_address <br> Message: <br> $message";
	//mail alternate body if html is not loded
	// $mail->AltBody = "This mail is sent using localhost with the help of phpmailer using php.";
	
	//if you want files attacment 
	//$mail->addAttachment("//path/to/attachment");

	if(!$mail->send()) 
	{
		echo "Mailer Error: " . $mail->ErrorInfo;
	} 
	else 
	{
		header('Location: contact-form-thank-you.html');
		echo "Message has been sent successfully";
	}

	//redirect to the 'thank you' page
} 
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>Contact form handler</title>
</head>

<body>

<?php
echo nl2br($errors);
?>


</body>
</html>