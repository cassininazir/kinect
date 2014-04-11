<!DOCTYPE html>
<html lang="en">
  <head>
  <link rel="icon" 
      type="image/png" 
      href="images/will.png">
    <meta charset="utf-8">
    <title>List of Thoughts</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="styles.css" rel="stylesheet" media="screen">
       <link href="stylesheet.css" rel="stylesheet" media="screen">
  </head>

  <body>
  <div class="litany">
    <p><a href="?addthought">Add your own thought</a></p>
  <p>Here are all the thoughts in the database:</p></span>
    <p><?php foreach ($thoughts as $thought): ?><br><span data-livestamp="1397198056"></span></p>
        <?php echo htmlspecialchars($thought, ENT_QUOTES, 'UTF-8'); ?>
    <?php endforeach; ?></div>
     <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>
<script src="javathehutt.js"></script>
<script src="moment.min.js"></script>
<script src="livestamp.min.js"></script>
  </body>
</html>
