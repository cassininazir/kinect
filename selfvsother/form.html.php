<!DOCTYPE html>
<html lang="en">
  <head>
   <link rel="icon" 
      type="image/png" 
      href="images/will.png">
  <meta charset="utf-8">
    <title>Add Thought</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link href="styles.css" rel="stylesheet" media="screen">
   <link href="stylesheet.css" rel="stylesheet" media="screen">
  </head>
  <body>
<div class="jay-ray">
<div class="me">
    <form action="?" method="post" name="myform">
      
        <textarea  placeholder="Enter your thought here." cols="40" rows="2" id="thoughttext" name="thoughttext" wrap="virtual" onKeyDown="limitText(this.form.thoughttext,this.form.countdown,140);" 
onKeyUp="limitText(this.form.thoughttext,this.form.countdown,140);"></textarea>
      <input type="submit" value="Add" id="formSub">
       <div id="hidden">
      This is where we put our vars.
        <div id="bcksp"></div>
        <div id="del"></div>
        <div id="interval"></div>
      </div>
      <br>
<span class="max">(Maximum characters: 140)<br></span>
<span class="characters">You have <input readonly type="text" name="countdown" size="3" value="140" class="characters"> characters left.</span>
    </form></div></div>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>
<script src="javathehutt.js"></script>
<script src="jquery.autosize.min.js"></script>
<script src="moment.min.js"></script>
<script src="livestamp.min.js"></script>
<script>
$( document ).ready(function() {
	$('#thoughttext').on('input',function(e){
    $( "#formSub" ).show();
	});
});
	$("#thoughttext").keyup(function (e) {
    if (e.keyCode == 46) {
		$( "#formSub" ).hide();
    }
});
$("#thoughttext").keyup(function (e) {
    if (e.keyCode == 8) {
		$( "#formSub" ).hide();
    }
});
   
$(function(){
  $('textarea').autosize();
			});
			
function limitText(limitField, limitCount, limitNum) {
	if (limitField.value.length > limitNum) {
		limitField.value = limitField.value.substring(0, limitNum);
	} else {
		limitCount.value = limitNum - limitField.value.length;
	}
}
</script>

<?php
if (get_magic_quotes_gpc())
{
  $process = array(&$_GET, &$_POST, &$_COOKIE, &$_REQUEST);
  while (list($key, $val) = each($process))
  {
    foreach ($val as $k => $v)
    {
      unset($process[$key][$k]);
      if (is_array($v))
      {
        $process[$key][stripslashes($k)] = $v;
        $process[] = &$process[$key][stripslashes($k)];
      }
      else
      {
        $process[$key][stripslashes($k)] = stripslashes($v);
      }
    }
  }
  unset($process);
}

try
{
  $pdo = new PDO('mysql:host=68.178.143.96;dbname=thoughtdb', 'thoughtdb', 'Emac!2014');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->exec('SET NAMES "utf8"');
}
catch (PDOException $e)
{
  $error = 'Unable to connect to the database server.';
  include 'error.html.php';
  exit();
}
if (isset($_POST['OSName']))
{
  try
  {
    $sql = 'INSERT INTO os SET
        Unknown OS = :Unknown OS';
    $s = $pdo->prepare($sql);
    $s->bindValue(':Unknown OS', $_POST['Unknown OS']);
    $s->execute();
  }
  catch (PDOException $e)
  {
    $error = 'Error adding submitted os: ' . $e->getMessage();
    include 'error.html.php';
    exit();
  }

  header('Location: .');
  exit();
}


try
{
  $sql = 'SELECT OSName FROM os';
  $result = $pdo->query($sql);
}
catch (PDOException $e)
{
  $error = 'Error gathering os: ' . $e->getMessage();
  include 'error.html.php';
  exit();
}

while ($row = $result->fetch())
{
  $os[] = $row['OSName'];
}

?>
  </body>
</html>
