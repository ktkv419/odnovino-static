import fetchMenu from './utils/fetchMenu.js'

const slideActiveClasses = ['prev', 'curr', 'next']
const foodTypesAll = ['hot', 'cold', 'drinks', 'starter', 'desert']
const foodNames = {
  hot: 'Горячие блюда',
  cold: 'Холодные блюда',
  drinks: 'Напитки',
  starter: 'Закуски',
  desert: 'Десерт',
}

;(async () => {
  const menu = await fetchMenu(foodTypesAll)
  const foodTypes = Object.keys(menu)

  const menuHTML = foodTypes.map((type) => {
    return `
            <div class="slide ${type}">
            <div class="slide__bg"></div>
            <div class="slide__content">
              <div class="slide__content__title">${foodNames[type]}</div>
              <ul class="slide__content__list">
      ${menu[type]
        .map((item) => {
          return `
                <li class="item">
                  <div class="item__title">
                  ${item[1]}</div>
                  <div class="item__line"></div>
                  <div class="item__price">${item[2]} руб.</div>
                </li>
        `
        })
        .join('\n')}
              </ul>
            </div>
          </div>
`
  })

  document
    .querySelector('.menu__slider')
    .insertAdjacentHTML('beforeend', menuHTML.join('\n'))

  const slides = [...document.querySelectorAll('.slide')]

  slides
    .slice(0, 3)
    .forEach((slide, i) => slide.classList.add(slideActiveClasses[i]))

  ////////////////////////////////////////////////////////////////////////

  const slider = document.querySelector('.menu__slider')

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
    const prevSlide =
      currentSlide - 1 > -1 ? currentSlide - 1 : slides.length - 1

    slides.forEach((el) => el.classList.remove('prev', 'next', 'curr'))

    slides[prevSlide].classList.add('prev')
    slides[nextSlide].classList.add('next')
    slide.classList.add('curr')
  }

  slider.addEventListener('click', changeSlide)

  ////////////////////////////////////////////////////////////////////////////////////////////////

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

  document
    .querySelector('.menu__slider')
    .addEventListener('touchstart', (e) => {
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
})()

/////////////////////////////////////////////////////////////////

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

// window.addEventListener('scroll', () => {

// })

// window.addEventListener('scroll', () => {

// })
