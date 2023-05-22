<?php
//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
require '../vendor/autoload.php';

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->SMTPAuth = true;
//to view proper logging details for success and error messages
// $mail->SMTPDebug = 1;
$mail->Host = 'smtp.gmail.com';  //gmail SMTP server
$mail->Username = 'camofficialteam@gmail.com';   //email
$mail->Password = 'uqmeqngvlmfmxnhs' ;   //16 character obtained from app password created
$mail->Port = 465;                    //SMTP port
$mail->SMTPSecure = "ssl";

//sender information
$mail->setFrom('camofficialteam@gmail.com', 'CAM');

//receiver email address and name
$mail->addAddress($_POST['email'], $_POST['name']); 

// Add cc or bcc   
// $mail->addCC('email@mail.com');  
// $mail->addBCC('user@mail.com');  
 
 
$mail->isHTML(true);
 
$mail->Subject = 'PHPMailer SMTP test';
$mail->Body    = "<h4> PHPMailer the awesome Package </h4>
<b>PHPMailer is working fine for sending mail</b>
    <p> This is a tutorial to guide you on PHPMailer integration</p>";

// Send mail   
if (!$mail->send()) {
    echo 'Email not sent an error was encountered: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent.';
}

$mail->smtpClose();


?>