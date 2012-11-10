<?php
//header("Access-Control-Allow-Origin: http://iwhiori2.twbbs.org");
?>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="http://www-cdn.justin.tv/javascripts/jtv_api.js"></script>
<script>
$.getJSON("http://api.justin.tv/api/stream/list.json?category=social", function(a){alert(a.name);});
</script>
</head>
<body>
<iframe width="480" height="200" src="http://www.ustream.tv/embed/10568904?v=3&amp;wmode=direct" scrolling="no" frameborder="0" style="border: 0px none transparent;">    </iframe>
</body>
</html>
