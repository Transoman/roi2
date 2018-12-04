<?php
  $SITE_TITLE = 'ROI Consulting';
  $SITE_DESCR = '';
  $to = 'Elena357910@yandex.com';

  if ( isset($_POST) ) {
    if (!$_POST['r2d2']) {
      $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
      $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
      $subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';
      $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
      $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'no-reply@yandex.com';

      $headers = "From: $SITE_TITLE \r\n";
      $headers .= "Reply-To: ". $email . "\r\n";
      $headers .= "Content-Type: text/html; charset=utf-8\r\n";
  
      $data = '<h1>'.$subject."</h1>";
      $data .= 'Имя: '.$name."<br>";
      $data .= 'Телефон: '.$phone."<br>";

      if ($message) {
        $data .= 'Вопрос: '.$message."<br>";
      }
  
      $message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
          ".$data."
          <br>\n
          <hr>\n
          <br>\n
          <small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";
      $send = mail($to, $subject, $message, $headers);
  
      if ( $send ) {
        echo '';
      } else {
          echo '<div class="error">Ошибка отправки формы</div>';
      }
    }
  }
  else {
      echo '<div class="error">Ошибка, данные формы не переданы.</div>';
  }
  die();