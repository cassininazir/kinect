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

if (isset($_GET['addthought']))
{
  include 'form.html.php';
  exit();
}

try
{
  $pdo = new PDO('mysql:host=hostname;dbname=database', 'user', 'password');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->exec('SET NAMES "utf8"');
}

catch (PDOException $e)
{
  $error = 'Unable to connect to the database server.';
  include 'error.html.php';
  exit();
}

if (isset($_POST['thoughttext']))
{
  try
  {
    $sql = 'INSERT INTO thought SET
        thoughttext = :thoughttext, 
        elapsed="' . $_POST['elapsed'] . '",
		browser="' . $_POST['browser'] . '",
		osname="' . $_POST['osname'] . '",
		monitor_width="' . $_POST['monitor_width'] . '",
		monitor_height="' . $_POST['monitor_height'] . '",
		width="' . $_POST['width'] . '",
		height="' . $_POST['height'] . '",
		lat="' . $_POST['lat'] . '",
		lng="' . $_POST['lng'] . '",
	    thoughtdate = CURDATE()';
    $s = $pdo->prepare($sql);
    $s->bindValue(':thoughttext', $_POST['thoughttext']);
    $s->execute();
  }
  catch (PDOException $e)
  {
    $error = 'Error adding submitted thought: ' . $e->getMessage();
    include 'error.html.php';
    exit();
  }

  header('Location: .');
  exit();
}


try
{
  $sql = 'SELECT thoughttext FROM thought';
  $result = $pdo->query($sql);
}
catch (PDOException $e)
{
  $error = 'Error gathering thoughts: ' . $e->getMessage();
  include 'error.html.php';
  exit();
}

while ($row = $result->fetch())
{
  $thoughts[] = $row['thoughttext'];
}

include 'thoughts.html.php';


 
