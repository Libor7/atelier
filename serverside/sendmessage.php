<?php 

if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
  exit('Direct access denied');
}

$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

$email = $request->email;
$sender = $request->sender;
$message = $request->message;
$to = 'libor.x@centrum.sk';
$subject = 'Beatkin Ateliér - správa od odosielateľa ' . $sender;
$headers = 'From: ' . $email;

if (mail($to, $subject, $message, $headers) !== false) {
  return 'delivered';
} else {
  return 'failed';
}
