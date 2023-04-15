let lastScroll = 0
const nav = document.querySelector('.nav')

const menuHide = () => {
  const scrollHeight = window.scrollY
  if (scrollHeight > lastScroll) {
    nav.classList.add('hidden')
  } else {
    nav.classList.remove('hidden')
  }
  lastScroll = scrollHeight
}

window.addEventListener('scroll', menuHide)

////////////////////////////////////// EXPERIMENTAL
// const body = document.body,
//   html = document.documentElement

// const height = Math.max(
//   body.scrollHeight,
//   body.offsetHeight,
//   html.clientHeight,
//   html.scrollHeight,
//   html.offsetHeight
// )

// const viewheight = window.innerHeight
// const wine = document.querySelector('.wine-level')
// const wineSensitivity = 100

// const wineScroll = () => {
//   console.log(window.scrollY)
//   wine.style.left = `-${(window.scrollY / height) * wineSensitivity}%`
// }

// window.addEventListener('scroll', wine)
//////////////////////////////////////////////////////////////

const slider = document.querySelector('.menu__slider')
const slides = document.querySelectorAll('.slide')

let currentSlide = 1
const changeSlide = ({ target }) => {
  const slide = target.classList.contains('.slide')
    ? target
    : target.closest('.slide')
  if (!slide || slide.classList.contains('curr')) return

  slider.removeEventListener('click', changeSlide)
  setTimeout(() => {
    slider.addEventListener('click', changeSlide)
    swipeAnimationRunning = false
  }, 1000)

  if (slide.classList.contains('prev'))
    currentSlide =
      currentSlide - 1 > -1
        ? currentSlide - 1
        : (currentSlide = slides.length - 1)
  if (slide.classList.contains('next'))
    currentSlide =
      currentSlide + 1 < slides.length ? currentSlide + 1 : (currentSlide = 0)

  ////////////////// DEBUG PURPOSES
  // if (slide.classList.contains('prev')) {
  //   if (currentSlide - 1 > -1) {
  //     currentSlide = currentSlide - 1
  //     console.log('test')
  //   } else {
  //     currentSlide = slides.length - 1
  //     console.log('test')
  //   }
  // } else if (slide.classList.contains('next')) {
  //   if (currentSlide + 1 < slides.length) {
  //     currentSlide = currentSlide + 1
  //     console.log('test')
  //   } else {
  //     currentSlide = 0
  //     console.log('test')
  //   }
  // }

  const nextSlide = currentSlide + 1 < slides.length ? currentSlide + 1 : 0
  const prevSlide = currentSlide - 1 > -1 ? currentSlide - 1 : slides.length - 1

  slides.forEach((el) => el.classList.remove('prev', 'next', 'curr'))

  slides[prevSlide].classList.add('prev')
  slides[nextSlide].classList.add('next')
  slide.classList.add('curr')
}

slider.addEventListener('click', changeSlide)

////////////////////////////////////////////////////////////////////////////////////////////////

const menu = document.querySelector('.menu')
let swipeAnimationRunning = false

let touchstartX = 0
let touchendX = 0

const swipeMenu = (swipeSlide) => {
  changeSlide({ target: swipeSlide })
}

function checkDirection() {
  if (swipeAnimationRunning) return
  swipeAnimationRunning = true

  let swipeSlide
  if (touchendX < touchstartX) {
    swipeSlide = document.querySelector('.slide.next')
  } else if (touchendX > touchstartX) {
    swipeSlide = document.querySelector('.slide.prev')
  }
  console.log(swipeSlide)
  swipeMenu(swipeSlide)
}

document.body.addEventListener('touchstart', function () {})

document.querySelector('.menu__slider').addEventListener('touchstart', (e) => {
  touchstartX = e.changedTouches[0].screenX
})

document.querySelector('.menu__slider').addEventListener('touchend', (e) => {
  touchendX = e.changedTouches[0].screenX
  if (
    Math.abs(touchstartX) - Math.abs(touchendX) > 100 ||
    Math.abs(touchendX) - Math.abs(touchstartX) > 100
  )
    checkDirection()
})
// window.addEventListener('scroll', () => {

// })

// window.addEventListener('scroll', () => {

// })
