window.onload = () => {

  //The initial seed for the color generator.
  let colorSettings = {
    main: "#00ff00",
    colorIntensity: 5,
    hueContrast: 5,
    lightness: 5,
    lightnessContrast: 5,
    color1Direction: 1,
    color2Direction: 1
  }

  //The information for each color palette is stored in the URL. Parse this based on the object above.
  var urlParams = new URLSearchParams(window.location.search);
  Object.entries(colorSettings).forEach(pair => {
    colorSettings[pair[0]] = urlParams.has(pair[0]) ? urlParams.get(pair[0]) : pair[1]
  })

  //Generate the full color list
  colorSettings = generateAndUpdateColors(colorSettings)
  sliderEventListeners(colorSettings)

}

const generateMainPalette = (colorSettings) => {
  const {colorIntensity, hueContrast, lightness, lightnessContrast, color1Direction, color2Direction} = colorSettings
  //Calculating the differences in colors.
  const c1SpinAmount = hueContrast * 9 * color1Direction
  const c2SpinAmount = hueContrast * 27 * color2Direction

  //Creating the actual "tinycolor" object- which allows us to edit/modify the color.
  const mainColor = new tinycolor(colorSettings.main)
  //Some preprocessing done to the color based on the settings.
  mainColor.lighten( (lightness - 6) * (lightness - 6) * (lightness - 6) )
  //This seemingly odd formula is the normalized colorIntensity, subtracting 6 so that dark colors are now negative numbers. That number is cubed, giving us a nice, smooth curve shape for the saturation values.
  mainColor.saturate( (colorIntensity - 6) * (colorIntensity - 6) * (colorIntensity - 6) )

  return [
    mainColor.clone(),
    mainColor.clone().spin(c1SpinAmount).desaturate(colorIntensity * (hueContrast/24)).darken((hueContrast/24) * lightnessContrast),
    mainColor.clone().spin(c2SpinAmount).saturate(colorIntensity * (hueContrast/8)).lighten((hueContrast/8) * lightnessContrast),
    mainColor.clone().lighten( (Number.parseFloat(lightnessContrast)+1) * (lightness) ),
    mainColor.clone().desaturate( 20 + ((12 - colorIntensity) * 5) ),
    mainColor.clone().darken( (Number.parseFloat(lightnessContrast)+1) * (12 - (lightness)) )
  ]
}


const generateAndUpdateColors = (colorSettings) => {
  const {colorIntensity, hueContrast, lightness, lightnessContrast, color1Direction, color2Direction} = colorSettings

  const colorPalette = generateMainPalette(colorSettings)

  //Create all the shades for each item in the color palette.
  colorPalette.forEach((item, i) => {
    //This array keeps track of which colors are printed to the screen, that way the UI doesn't get bogged down by unecessary
    const printedColors = []

    //The formula for setting how much darker/lighter the darkest/lightest shades are. This is halved for the intermediate values.
    const shadeValue = lightnessContrast * lightnessContrast * (lightness/6)

    //The list of shades, in order: lightest, light, original, dark, darkest
    const shades = [
      ['ll', item.clone().lighten(shadeValue).toHex()],
      ['l', item.clone().lighten(shadeValue/2).toHex()],
      ['0', item.clone().toHex()],
      ['d', item.clone().darken(shadeValue/2).toHex()],
      ['dd', item.clone().darken(shadeValue).toHex()],
    ]

    shades.forEach(shade => {
      const shadeTypeShorthand = shade[0]
      const shadeHex = shade[1]
      let element = document.getElementById(`${i}-${shadeTypeShorthand}`)
      element.style.backgroundColor = `#${shadeHex}`
      element.style.color = tinycolor.mostReadable(shadeHex, ['#000', '#fff'])

      if(!printedColors.includes(shadeHex)) {
        element.innerHTML = shadeHex
        printedColors.push(shadeHex)
      } else {
        element.innerHTML = "";
      }

    })
  })

  //Update the link on the page.
  var urlParams = new URLSearchParams();
  Object.entries(colorSettings).forEach(pair => {
    urlParams.append(pair[0], pair[1])
  })
  const copyLink = document.getElementById('copyLink')
  copyLink.value =  "http://localhost/testsite/?" + urlParams.toString()

  return colorSettings
}

const sliderEventListeners = (colorSettings) => {
  const colorSlider = document.getElementById("colorSlider")
  colorSlider.value = colorSettings.main
  colorSlider.style.backgroundColor = colorSettings.main
  colorSlider.addEventListener("change", function(e){
    colorSettings = generateAndUpdateColors({...colorSettings, main: `#${e.target.value}`})
  });

  ['colorIntensity', 'hueContrast', 'lightness', 'lightnessContrast', 'color1Direction', 'color2Direction'].forEach(setting => {
    const htmlSetting = document.getElementById(`${setting}Control`)
    const htmlDisplay = document.getElementById(`${setting}Display`)
    htmlSetting.value = colorSettings[setting]
    displayValue(htmlDisplay, colorSettings, setting)

    htmlSetting.addEventListener('change', function(e){
      colorSettings = generateAndUpdateColors({...colorSettings, [setting]: e.target.value })
      displayValue(htmlDisplay, colorSettings, setting)
    })
  })
}

const displayValue = (htmlDisplay, colorSettings, setting) => {
  if(setting === 'color1Direction' || setting === 'color2Direction'){
    htmlDisplay.innerHTML = ['Counterclockwise', 'None', 'Clockwise'][ Number.parseInt(colorSettings[setting]) + 1 ]
  } else {
    htmlDisplay.innerHTML = colorSettings[setting]
  }
}
