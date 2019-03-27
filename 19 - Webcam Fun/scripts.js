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
    let pixels = ctx.getImageData(0, 0, videoWidth, videoHeight)
    
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


getVideo()

video.addEventListener('canplay', setCanvasVideo)