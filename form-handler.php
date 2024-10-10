<?php
  $name = $_POST['name'];
  $visitor_email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  $email_from = 'info@yourwebsite.com';
  $email_subject = 'New Form Submission';

  $email_body = "User Name: $name.\n".
                "User Email: $visitor_email.\n".
                "Subject: $subject.\n".
                "User Message: $message.\n";  // Corrected variable

  $to = 'ebunowoeye316@gmail.com';  // Added missing semicolon

  $headers = "From: $email_from \r\n";
  $headers .= "Reply-To: $visitor_email \r\n";  // Added missing semicolon

  mail($to, $email_subject, $email_body, $headers);

  header("Location: /contact.html");  // Added missing semicolon
?>
