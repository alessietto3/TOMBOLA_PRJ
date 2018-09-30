<?php
exec ( "gpio read 7", $status1 );
echo ( $status1[0] );
?>
