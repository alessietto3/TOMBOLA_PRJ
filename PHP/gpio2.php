<?php
exec ( "gpio read 8", $status2 );
echo ( $status2[0] );
?>
