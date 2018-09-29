<!DOCTYPE html>
<html lang=it dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="CSS/master.css?v=1.2.2">
    <script src="JS/master.js?V8" charset="utf-8"></script>
    <title>Tombola</title>
  </head>
  <body>
    <article class="body">
      <button type="button" name="reset" id="reset" class="button" onclick="eraseall()">Azzera</button>
      <h1><b>****Tombola****</b></h1>
      <button type="button" name="random" id="startrandom" class="button" onclick="callnumber()">Estrai</button>
      <table id="table" class="table"></table>
      <div id="divnumuscito" style="animation-play-state: paused">
        <p id="numuscito"></p>
      </div>
    </article>
  </body>
</html>
<?php
    system(exec ( "GPIO read 7", $status ));
    system(print_r ( $status ));
?>