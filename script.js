let lastScroll = 0
const nav = document.querySelector('.nav')

const menuHide = () => {
  const scrollHeight = window.scrollY
  if (scrollHeight > lastScroll) {
    nav.classList.add('hidden')
  } else {
    nav.classList.remove('hidden')
  }
  console.log(scrollHeight)
  lastScroll = scrollHeight
}

window.addEventListener('scroll', menuHide)
// window.addEventListener('load', adjustBgOpacity)

const slider = document.querySelector('.menu__slider')
const slides = document.querySelectorAll('.slide')

let currentSlide = 1
const changeSlide = ({ target }) => {
  const slide = target.closest('.slide')
  if (!slide || slide.classList.contains('curr')) return

  slider.removeEventListener('click', changeSlide)
  setTimeout(() => {
    slider.addEventListener('click', changeSlide)
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
