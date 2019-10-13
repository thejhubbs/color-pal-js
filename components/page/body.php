<div id="body">

<?php
  if ( isset($_GET['main']) ) {
    require './components/page/colorPage.php';
  } else {
    require './components/page/colorIndex.php';
  }
?>

</div>
