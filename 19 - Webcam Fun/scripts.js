const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream
      video.play()

    })
    .catch(err => console.error(`oops`, err))
}

const setCanvasVideo = () => {
  const { videoWidth, videoHeight } = video

  canvas.height = videoHeight
  canvas.width = videoWidth

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
    // grab pixels
    let pixels = ctx.getImageData(0, 0, videoWidth, videoHeight)
    // change pixel effects
    // pixels = redEffect(pixels)
    // pixels = splitRGB(pixels)
    pixels = greenScreen(pixels)
    // put pixels back
    ctx.putImageData(pixels, 0, 0)
    
  }, 16)
}

const screenshot = () => {
  // play screenshot sound
  snap.currentTime = 0
  snap.play()

  // get data from canvas

  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')

  link.href = data
  link.setAttribute('download', 'screenshot')
  link.textContent = 'Download Image'
  link.innerHTML = `<img src='${data}' alt='screenshot' />`
  strip.insertBefore(link, strip.firstChild)
}

const redEffect = pixels => {
  for (let i = 0; i < pixels.data.length; i += 4 ) {
    // red
    pixels.data[i] = pixels.data[i] + 100
    // green
    pixels.data[i + 1] = pixels.data[i + 1] - 50
    // blue
    pixels.data[i + 2] = pixels.data[i + 2] + 5
  }
  return pixels 
}

const splitRGB = pixels => {
  for (let i = 0; i < pixels.data.length; i += 4 ) {
    // red
    pixels.data[i - 150] = pixels.data[i]
    // green
    pixels.data[i + 500] = pixels.data[i + 1]
    // blue
    pixels.data[i - 550] = pixels.data[i + 2]
  }
  return pixels 
}

const greenScreen = pixels => {
  const levels  = {}

  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value
  })

  for (i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i]
    green = pixels.data[i + 1]
    blue = pixels.data[i + 2]
    alpha = pixels.data[i + 3]

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
        // set alpha to 0 (so transparent)
        pixels.data[i + 3] = 0
      }
  }
  return pixels

}


getVideo()

video.addEventListener('canplay', setCanvasVideo)