function debounce (func, wait = 20, immediate = true) {
  var timeout
  return function () {
    var context = this, args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

const images = document.querySelectorAll('.slide-in')

function checkSlide() {
  images.forEach(image => {
    // displayed half way
    const slideIn = (window.scrollY + window.innerHeight) - image.height / 2
    // bottom of image
    const imageBottom = image.offsetTop + image.height
    // half in view
    const halfView = slideIn > image.offsetTop
    // scroll still in view
    const scrollInView = window.scrollY < imageBottom

    if(halfView && scrollInView) {
      image.classList.add('active')
    } else {
      image.classList.remove('active')
    }
  })
}

window.addEventListener('scroll', debounce(checkSlide))
