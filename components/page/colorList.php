<h3>Premade Palettes</h3>

<?php

function getContrastColor($hexColor) {

        // hexColor RGB
        $R1 = hexdec(substr($hexColor, 1, 2));
        $G1 = hexdec(substr($hexColor, 3, 2));
        $B1 = hexdec(substr($hexColor, 5, 2));

        // Black RGB
        $blackColor = "#000000";
        $R2BlackColor = hexdec(substr($blackColor, 1, 2));
        $G2BlackColor = hexdec(substr($blackColor, 3, 2));
        $B2BlackColor = hexdec(substr($blackColor, 5, 2));

         // Calc contrast ratio
         $L1 = 0.2126 * pow($R1 / 255, 2.2) +
               0.7152 * pow($G1 / 255, 2.2) +
               0.0722 * pow($B1 / 255, 2.2);

        $L2 = 0.2126 * pow($R2BlackColor / 255, 2.2) +
              0.7152 * pow($G2BlackColor / 255, 2.2) +
              0.0722 * pow($B2BlackColor / 255, 2.2);

        $contrastRatio = 0;
        if ($L1 > $L2) {
            $contrastRatio = (int)(($L1 + 0.05) / ($L2 + 0.05));
        } else {
            $contrastRatio = (int)(($L2 + 0.05) / ($L1 + 0.05));
        }

        // If contrast is more than 5, return black color
        if ($contrastRatio > 5) {
            return '#000000';
        } else {
            // if not, return white color.
            return '#FFFFFF';
        }
}

?>

<?php


  $url = 'https://colorpal-09d6.restdb.io/rest/palettes';
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'cache-control: no-cache',
    'x-apikey: 5f83eaaac41339f94a9d769287854b3870eb5',
    'content-type: application/json'
  ));

  $head = curl_exec($ch);

  foreach(explode("},", $head) as &$record) {
      if(strlen($record) > 2) {
        $pairs = explode(",", $record);
        $name = substr(explode('":"', $pairs[1])[1], 0, -1);
        $link = substr(explode('":"', $pairs[2])[1], 0, -1);

        if (strpos($link, '"}') !== false) {
            $link = substr($link, 0, -3);
        }

        $settingValues = explode("&", $link);

        $mainColor = explode('=%23', $settingValues[0])[1];

        $contrastColor = getContrastColor("#" . $mainColor);

        echo "<a class='palette-button' style='background-color: #", $mainColor, ";color: ",  $contrastColor, "' href='", $link, "'>", $name, "</a>  <br />";

      }
  }
  unset($value);
  curl_close($ch);


?>



<hr />
