window.onload = () => {
  //The initial seed for the color generator.
  let start = {
    main: "#00ff00",
    colorIntensity: 5,
    hueContrast: 5,
    lightness: 5,
    lightnessContrast: 5,
    color1Direction: 1,
    color2Direction: 1
  }
  var urlParams = new URLSearchParams(window.location.search);
  Object.entries(start).forEach(pair => {
    start[pair[0]] = urlParams.has(pair[0]) ? urlParams.get(pair[0]) : pair[1]
  })

  start = generateAndUpdateColors(start)

  const colorSlider = document.getElementById("colorSlider")
  colorSlider.value = start.main
  colorSlider.style.backgroundColor = start.main
  colorSlider.addEventListener("change", function(e){
    start = generateAndUpdateColors({...start, main: `#${e.target.value}`})
  });

  ['colorIntensity', 'hueContrast', 'lightness', 'lightnessContrast', 'color1Direction', 'color2Direction'].forEach(setting => {
    const htmlSetting = document.getElementById(`${setting}Control`)
    const htmlDisplay = document.getElementById(`${setting}Display`)
    htmlSetting.value = start[setting]
    displayValue(htmlDisplay, start, setting)

    htmlSetting.addEventListener('change', function(e){
      start = generateAndUpdateColors({...start, [setting]: e.target.value })
      displayValue(htmlDisplay, start, setting)
      //htmlDisplay.innerHTML = start[setting]
    })
  })

}

const displayValue = (htmlDisplay, start, setting) => {
  if(setting === 'color1Direction' || setting === 'color2Direction'){
    htmlDisplay.innerHTML = ['Counterclockwise', 'None', 'Clockwise'][ Number.parseInt(start[setting]) + 1 ]
  } else {
    htmlDisplay.innerHTML = start[setting]
  }
}


const generateAndUpdateColors = (start) => {
  const {colorIntensity, hueContrast, lightness, lightnessContrast, color1Direction, color2Direction} = start
  const c1SpinAmount = hueContrast * 6 * color1Direction
  const c2SpinAmount = hueContrast * 27 * color2Direction

  const mainColor = new tinycolor(start.main)
  mainColor.lighten( (lightness - 6) * 3)
  mainColor.saturate( (colorIntensity - 6) * (colorIntensity - 6) * (colorIntensity - 6) )



  const colorPallete = [
    mainColor.clone(),
    mainColor.clone().spin(c1SpinAmount).desaturate(colorIntensity).lighten(lightnessContrast),
    mainColor.clone().spin(c2SpinAmount).saturate(colorIntensity).darken(lightnessContrast),
    mainColor.clone().lighten( (Number.parseFloat(lightnessContrast)+1) * (lightness*2) ),
    mainColor.clone().desaturate( 20 + ((12 - colorIntensity) * 5) ),
    mainColor.clone().darken( (Number.parseFloat(lightnessContrast)+1) * (20 - (lightness*2)) )
  ]


  colorPallete.forEach((item, i) => {
    let element = document.getElementById(`${i}-0`)
    let hex = item.toHex()
    element.style.backgroundColor  = `#${hex}`
    element.innerHTML = hex

    element = document.getElementById(`${i}-d`)
    hex = item.clone().darken(lightnessContrast*lightnessContrast/2).toHex()
    element.style.backgroundColor  = `#${hex}`
    element.innerHTML = hex

    element = document.getElementById(`${i}-dd`)
    hex = item.clone().darken(lightnessContrast*lightnessContrast).toHex()
    element.style.backgroundColor  = `#${hex}`
    element.innerHTML = hex

    element = document.getElementById(`${i}-l`)
    hex = item.clone().lighten(lightnessContrast*lightnessContrast/2).toHex()
    element.style.backgroundColor  = `#${hex}`
    element.innerHTML = hex

    element = document.getElementById(`${i}-ll`)
    hex = item.clone().lighten(lightnessContrast*lightnessContrast).toHex()
    element.style.backgroundColor  = `#${hex}`
    element.innerHTML = hex
  })

  var urlParams = new URLSearchParams();
  Object.entries(start).forEach(pair => {
    urlParams.append(pair[0], pair[1])
  })
  const copyLink = document.getElementById('copyLink')
  copyLink.value =  "localhost/testsite/?" + urlParams.toString()

  return start

}
