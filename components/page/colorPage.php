<div id="colorPage">

  <div id='colorBox'>

      <a href="http://localhost/testsite">Back to Home</a>
    <div>
      <span></span>
      <span>Main</span>
      <span>Secondary</span>
      <span>Highlight</span>
      <span>Light</span>
      <span>Grey</span>
      <span>Dark</span>
    </div>
    <div>
      <span>Lighest</span>
      <span id='0-ll'></span>
      <span id='1-ll'></span>
      <span id='2-ll'></span>
      <span id='3-ll'></span>
      <span id='4-ll'></span>
      <span id='5-ll'></span>
    </div>
    <div>
      <span>Light</span>
      <span id='0-l'></span>
      <span id='1-l'></span>
      <span id='2-l'></span>
      <span id='3-l'></span>
      <span id='4-l'></span>
      <span id='5-l'></span>
    </div>
    <div id="mainRow">
      <span>Color</span>
      <span id='0-0'></span>
      <span id='1-0'></span>
      <span id='2-0'></span>
      <span id='3-0'></span>
      <span id='4-0'></span>
      <span id='5-0'></span>
    </div>
    <div>
      <span>Dark</span>
      <span id='0-d'></span>
      <span id='1-d'></span>
      <span id='2-d'></span>
      <span id='3-d'></span>
      <span id='4-d'></span>
      <span id='5-d'></span>
    </div>
    <div>
      <span>Darkest</span>
      <span id='0-dd'></span>
      <span id='1-dd'></span>
      <span id='2-dd'></span>
      <span id='3-dd'></span>
      <span id='4-dd'></span>
      <span id='5-dd'></span>
    </div>
  </div>

  <div id="colorForm">
    Seed Color<br />
    <input class="jscolor" id="colorSlider" value="ab2567"><br />

    Color Intensity:  <span id="colorIntensityDisplay"></span><br />
    <input type="range" min="0" max="12" value="5" step='.2' class="slider" id="colorIntensityControl"><br />
    <br />

    Hue Contrast: <span id="hueContrastDisplay"></span><br />
    <input type="range" min="0" max="12" value="5" step='.5' class="slider" id="hueContrastControl"><br />
    <br />

    Secondary Color Spin Direction: <span id="color1DirectionDisplay"></span><br />
    <input type="range" min="-1" max="1" value="1" class="slider" id="color1DirectionControl"><br />
    <br />

    Highlight Color Spin Direction: <span id="color2DirectionDisplay"></span><br />
    <input type="range" min="-1" max="1" value="1" class="slider" id="color2DirectionControl"><br />
    <br />

    Lightness: <span id="lightnessDisplay"></span><br />
    <input type="range" min="0" max="12" value="5" step='.2' class="slider" id="lightnessControl"><br />
    <br />

    Lightness Contrast: <span id="lightnessContrastDisplay"></span><br />
    <input type="range" min="0" max="12" step='.2' value="5" class="slider" id="lightnessContrastControl"><br />
    <br />

  </div>

  <br />
  <hr />
  <br />

  Copy & Paste this URL to save & share this pallete: <input type="text" id="copyLink">

  <br />
  <hr />
  <br />

  <h3>Color Intensity</h3>
  <p>Setting this to 0 will cause it to be greyscale, and setting it to 12 will cause bright, vivid colors.</p>
  <h3>Hue Contrast</h3>
  <p>How "far apart" the three colors are on the color wheel. Setting it to 0 will cause it be 3 close shades of the same color, and setting it to 12 will result in 3 contrasting colors. "Highlight" color is rotated at a much higher rate than "secondary".</p>
  <h3>Color Spin Directions</h3>
  <p>Color spin sets "which way" on the color wheel the color is rotated. Orange rotated counterclockwise produces red, and clockwise produces yellow. These can be toggled off to produce a shade of the same color as the main.</p>
  <h3>Lightness</h3>
  <p>Sets the overall lightness of the colors.</p>
  <h3>Lightness contrast</h3>
  <p>Sets the contrast in lightness between the lightest & darkest shade of a color. Setting this to 0 will produce a very flat color scheme, with no difference in lights and darks. Setting it to 12 will result in a "cartoon" scheme with little shades, but bold lights and darks. Halfway will produce a more realistic variety.

</div>
