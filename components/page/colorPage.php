<a href="http://localhost/testsite">Back to Home</a>
<div id="colorPage">

  <div id="colorDisplayComponent">
    <div id='colorBox'>
      <?php require './components/page/colorPage/colorTable.php' ?>
    </div>

    <div id="colorForm">
      <?php require './components/page/colorPage/colorControl.php' ?>
    </div>
  </div>

  <hr />
  Copy & Paste this URL to save & share this pallete:<br /> <input type="text" id="copyLink">
  <hr />


  <?php require './components/page/colorList.php' ?>

  <div id="settingExplanations">
    <?php require './components/page/colorPage/colorInfo.php' ?>
  </div>

</div>
