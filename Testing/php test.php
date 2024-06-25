<?php
 session_start();

 if (isset($_GET['language'])) {
    $_SESSION['language'] = $_GET['language'];
    setcookie('language', $_GET['language'], time() + (86400 * 30), '/'); // 86400 = 1 day
 } else if (isset($_COOKIE['language'])) {
    $_SESSION['language'] = $_COOKIE['language'];
 }
?>
<?php
 function loadLanguage($language) {
    // Include the appropriate language file based on the selected language
    include('languages/' . $language . '.php');
 }
?>