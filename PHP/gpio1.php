<?php
exec ( "gpio read 9", $status1 );
echo ( $status1[0] );
?>
