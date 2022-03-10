window.addEventListener('DOMContentLoaded', () => {
  const cardsParent = document.querySelectorAll('.products__cards'),
    likeWrappers = document.querySelectorAll('.like__wrapper'),
    productCards = document.querySelectorAll('.card'),
    slidesWrapper = document.querySelector('.slider__wrapper'),
    slidesField = document.querySelector('.slider__inner'),
    slides = document.querySelectorAll('.slider__content'),
    width = window.getComputedStyle(slidesWrapper).width,
    prev = document.querySelector('.slider__prev-arrow'),
    next = document.querySelector('.slider__next-arrow'),
    slidesCounter = document.querySelectorAll('.slider__count');

  //Card
  cardsParent.forEach((parent) => {
    productCards.forEach((card) => {
      card.classList.remove('card_active');

      parent.addEventListener('mouseover', (e) => {
        const target = e.target;

        if (target && target.classList.contains('card')) {
          if (target === card) {
            card.classList.add('card_active');
          }
        }

        if (target === parent) {
          card.classList.remove('card_active');
        }
      });
    });

    parent.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.classList[0] === 'like__wrapper') {
        likeWrappers.forEach((item) => {
          if (target === item) {
            item.classList.toggle('wrapper_active');
            const like = item.children;

            if (like.item(0).classList.contains('like')) {
              like.item(0).classList.remove('like');
              like.item(0).classList.add('liked');
            } else {
              like.item(0).classList.remove('liked');
              like.item(0).classList.add('like');
            }
          }
        });
      }
    });
  });

  //Slider
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';

  let offset = 0;
  let slideIndex = 1;

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  function currentSlide() {
    slidesCounter[slideIndex - 1].removeAttribute('src');
    slidesCounter[slideIndex - 1].setAttribute('src', '/icons/slider/active-slider-counter.png');
  }
  currentSlide();

  next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slidesCounter[slideIndex - 1]) {
      slidesCounter.forEach(count => {
        count.removeAttribute('src');
        count.setAttribute('src', '/icons/slider/slider-counter.png');
      });
      slidesCounter[slideIndex - 1].removeAttribute('src');
      slidesCounter[slideIndex - 1].setAttribute('src', '/icons/slider/active-slider-counter.png');
    }
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    
    if (slidesCounter[slideIndex - 1]) {
      slidesCounter.forEach(count => {
        count.removeAttribute('src');
        count.setAttribute('src', '/icons/slider/slider-counter.png');
      });
      slidesCounter[slideIndex - 1].removeAttribute('src');
      slidesCounter[slideIndex - 1].setAttribute('src', '/icons/slider/active-slider-counter.png');
    }
  });
});
