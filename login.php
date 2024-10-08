<?php
// Startar en session
session_start();

// Array med användarnamn och lösenord
$users = [
    "test" => "1234",
    "user1" => "password1",
    "user2" => "password2",
    "user3" => "password3" // Lägg till fler användare och lösenord här
];

// Hämta användarnamn och lösenord från POST-förfrågan
$username = $_POST['username'];
$password = $_POST['password'];

// Kontrollera om användarnamn och lösenord stämmer
if (array_key_exists($username, $users) && $users[$username] === $password) {
    // Om korrekt, sätt en session och omdirigera till chat.html
    $_SESSION['loggedin'] = true;
    header("Location: chat.html");
    exit;
} else {
    // Om fel, visa ett felmeddelande
    echo "Fel användarnamn eller lösenord";
}
?>