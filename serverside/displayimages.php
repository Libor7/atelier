<?php 

if(!isset($_GET['portraits'])) {
  exit('Direct access denied');
}

require_once('classes/image.class.php');

$img_instance = new Image;
echo json_encode($img_instance->get_paintings($_GET['portraits'], $_GET['book']));