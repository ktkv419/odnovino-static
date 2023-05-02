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
  //   const menu = await fetchMenu(foodTypesAll)
  //   const foodTypes = Object.keys(menu)

  //   const menuHTML = foodTypes.map((type) => {
  //     return `
  //             <div class="slide ${type}">
  //             <div class="slide__bg"></div>
  //             <div class="slide__content">
  //               <div class="slide__content__title">${foodNames[type]}</div>
  //               <ul class="slide__content__list">
  //       ${menu[type]
  //         .map((item) => {
  //           return `
  //                 <li class="item">
  //                   <div class="item__title">
  //                   ${item[1]}</div>
  //                   <div class="item__line"></div>
  //                   <div class="item__price">${item[2]} руб.</div>
  //                 </li>
  //         `
  //         })
  //         .join('\n')}
  //               </ul>
  //             </div>
  //           </div>
  // `
  //   })

  //   const slider = document.querySelector('.menu__slider')
  //   slider.insertAdjacentHTML('beforeend', menuHTML.join('\n'))

  //   const slides = [...slider.querySelectorAll('.slide')]

  //   slides
  //     .slice(0, 3)
  //     .forEach((slide, i) => slide.classList.add(slideActiveClasses[i]))

  //   ////////////////////////////////////////////////////////////////////////

  //   let currentSlide = 1
  //   const changeSlide = ({ target }) => {
  //     const slide = target.classList.contains('.slide')
  //       ? target
  //       : target.closest('.slide')
  //     if (!slide || slide.classList.contains('curr')) return

  //     slider.removeEventListener('click', changeSlide)
  //     setTimeout(() => {
  //       slider.addEventListener('click', changeSlide)
  //       swipeAnimationRunning = false
  //     }, 800)

  //     if (slide.classList.contains('prev'))
  //       currentSlide =
  //         currentSlide - 1 > -1
  //           ? currentSlide - 1
  //           : (currentSlide = slides.length - 1)
  //     if (slide.classList.contains('next'))
  //       currentSlide =
  //         currentSlide + 1 < slides.length ? currentSlide + 1 : (currentSlide = 0)

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

  //   const nextSlide = currentSlide + 1 < slides.length ? currentSlide + 1 : 0
  //   const prevSlide =
  //     currentSlide - 1 > -1 ? currentSlide - 1 : slides.length - 1

  //   slides.forEach((el) => el.classList.remove('prev', 'next', 'curr'))

  //   slides[prevSlide].classList.add('prev')
  //   slides[nextSlide].classList.add('next')
  //   slide.classList.add('curr')
  // }

  // slider.addEventListener('click', changeSlide)

  // const menuContent = document.querySelector('.menu__content')
  const menuCategories = document.querySelector('.menu__categories')
  // const menuCategories = [...document.querySelectorAll('.menu__item')]
  const menuItemsContainer = document.querySelector('.menu__items')
  const menuItems = [...document.querySelector('.menu__items').children]

  const menuArray = [
    'starter',
    'main',
    'salad',
    'soup',
    'steak',
    'garnish',
    'breakfast',
    'desert',
  ]

  const menuChange = () => {
    const hash = window.location.hash.slice(1)
    if (menuArray.includes(hash)) {
      menuCategories.classList.add('hidden')
      setTimeout(() => {
        menuItemsContainer.classList.remove('hidden')
        document.querySelector(`.menu__item.${hash}`).classList.remove('hidden')
      }, 300)
    }
    if (hash === 'menu-items') {
      menuItemsContainer.classList.add('hidden')
      setTimeout(() => {
        menuItems.forEach((item) => {
          item.classList.add('hidden')
        })
        menuCategories.classList.remove('hidden')
      }, 300)
    }
  }

  window.addEventListener('hashchange', menuChange)

  // const menuBackButton = document.querySelector('.menu__items__back')
  // menuBackButton.addEventListener('click', (e) => {
  //   e.preventDefault()
  //   window.location.hash = '';
  // })

  // const animationWiggle = (el) => {
  //   el.style.transform = `rotate(${degrees}deg`
  // }

  // categories.forEach(category => category.addEventListener('mouseover', () => {
  // }))
  // categories.forEach(category => category.addEventListener('mouseout', () => {
  // }))

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
if (window.innerWidth > 900) {
  document.querySelector('.nav--mobile').remove()
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
} else {
  document.querySelector('.nav').remove()
  const navCheckbox = document.querySelector('.nav__checkbox')
  const navBg = document.querySelector('.nav__bg')
  const navBtns = document.querySelector('.nav__btn-box')

  navBtns.addEventListener('click', () => {
    navCheckbox.checked = false
  })

  navBg.addEventListener('click', () => {
    navCheckbox.checked = false
  })
}

///////////////////////////////////////////////////////////////
//////////////             ABOUT           ////////////////////
///////////////////////////////////////////////////////////////
class About {
  constructor() {
    this.slider = document.querySelector('.about__slider')
    this.slides = [...this.slider.querySelectorAll('.slide')]
    this.currentSlide = 0
    this.dotBox = document.querySelector('.about__slider--dot-box')

    this.aboutTitle = document.querySelector('h3.about__title')
    this.handLeft = document.querySelector('img.about__title--before')
    this.handRight = document.querySelector('img.about__title--after')
    this.desc = document.querySelector('.about__desc')

    this.changeSlide(this.currentSlide)
    this.slideInterval = this.createSliderAnimation()
    this.slideTimeout = false

    Array.from(this.dotBox.children).forEach((dot) => {
      const degrees = Math.floor(Math.random() * 360)
      dot.style.transform = `rotate(${degrees}deg`
    })

    this.dotBox.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('dots')) return
      this.changeSlide(target.dataset.slide)
      clearInterval(this.slideInterval)
      clearTimeout(this.slideTimeout)
      this.slideTimeout = this.createSliderTimeout()
    })

    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.handLeft.classList.add('hand-float-left')
        this.handRight.classList.add('hand-float-right')
      } else {
        this.handLeft.classList.remove('hand-float-left')
        this.handRight.classList.remove('hand-float-right')
      }
    }).observe(this.aboutTitle)

    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.desc.classList.add('fadein-left')
        this.slider.classList.add('fadein-right')
      }
    }).observe(this.desc)
  }

  changeSlide = (slide) => {
    this.currentSlide = +slide
    this.slides.forEach((slide) => slide.classList.remove('slide--active'))
    this.slides[slide].classList.add('slide--active')
    Array.from(this.dotBox.children).forEach((dot) =>
      dot.classList.remove('dot--active')
    )
    this.dotBox.children[slide].classList.add('dot--active')
  }

  createSliderAnimation = () => {
    return setInterval(() => {
      const nextSlide =
        this.currentSlide + 1 < this.slides.length ? this.currentSlide + 1 : 0
      this.changeSlide(nextSlide)
    }, 2000)
  }

  createSliderTimeout = () => {
    return setTimeout(() => {
      this.slideInterval = this.createSliderAnimation()
    }, 5000)
  }
}

const about = new About()

////////////////////////////////////////////////////////////////
class Events {
  constructor() {
    this.eventBox = document.querySelector('.events__box')
    this.cards = [...document.querySelector('.events__box').children]

    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.cards.forEach((card) => card.classList.add('zoom-in-animation'))
      }
    }).observe(this.eventBox)

    if (window.innerWidth < 900) {
      this.cards.forEach((card) =>
        card.addEventListener('click', (e) => {
          console.log(e.target.closest('.card').children)
          const cardSides = [...e.target.closest('.card').children]
          cardSides.forEach((side) => {
            side.classList.toggle('hover')
          })
        })
      )
    }
  }
}

const events = new Events()

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
