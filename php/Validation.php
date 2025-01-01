<?php
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$phone = $data['phone'];
$message = $data['message'];
$emailLength = strlen($email);
$atStart = 0;
$emailend ='';

if (empty($email)) {
    $response = array('status' => 'error','message'=> 'Email cannot be empty');
}
foreach ($data as $key => $email) {
    if ($key == '@') {
        for ($i = $key; $i < $emailLength; $i++) {
            $emailend += $email[$i];
        }
        echo''. $emailend .'';
    }
    else {
        $response = array('status' => 'error','message'=> 'Email has no @ or email type');
    }
}
header('Content-Type: application/json');
echo json_encode($response);


/*$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = isset($_POST['email']) ? $_POST['email'] :'';
    $phone = isset($_POST['phone']) ? $_POST['phone'] :'';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['status'] = 'error';
        $response['message'] = 'Invalid phone number format.';
    }
    else if (!preg_match("/^\+?[0-9]{10,15}$/", $phone)) {
        $response['status'] = 'error';
        $response['message'] = 'Invalid phone number format.';
    }
    else {
        $response['status'] = 'success';
        $response['message'] = 'Both emai; and phone number are valid.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'No data received.';
}

echo json_encode($response);*/
?>