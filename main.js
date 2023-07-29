import "./style.scss";

const BREAKPOINT = 768;

const slider = document.querySelector(".slider");
const initialSlides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".btn-slide--left");
const btnRight = document.querySelector(".btn-slide--right");

let currSlide = 2;

// Calc remaining space (screen - img width) to center the slide.

const dist = `${Math.round(
  (slider.clientWidth - initialSlides[0].clientWidth) / 2
)}px`;

//Clear DOM functions

const appendCloneSlides = function () {
  for (let i = 0; i < initialSlides.length; i++) {
    slider.append(initialSlides[i].cloneNode(true));
  }
};

const prependCloneSlides = function () {
  for (let i = initialSlides.length - 1; i >= 0; i--) {
    slider.prepend(initialSlides[i].cloneNode(true));
  }
};

const deleteAppendClones = function (slides) {
  slides.forEach((slide, index) => {
    if (index >= slides.length - initialSlides.length) {
      slide.remove();
    }
  });
};

const deletePrependClones = function (slides) {
  slides.forEach((slide, index) => {
    if (index < initialSlides.length) {
      slide.remove();
    }
  });
};

// Note: gap must be multiplied in order to have correct spacing.

const calcSlides = function (currSlide, slides) {
  // Calc gap based on width.

  const gap = document.documentElement.clientWidth > BREAKPOINT ? 3 : 1.5;

  slides.forEach((slide, index) => {
    // If its current, just center it

    if (currSlide === index) {
      slide.style.transform = `translateX(${dist})`;
    }

    // If its next slide, shift based on currSlide, center it, and add gap.

    if (currSlide > index) {
      const mult = currSlide - index;

      slide.style.transform = `translateX(calc(${dist} - ${mult * 100}% - ${
        mult * gap
      }rem))`;
    }

    // If its prev slide, shift based on currSlide, center it, and add gap.

    if (currSlide < index) {
      const mult = index - currSlide;

      slide.style.transform = `translateX(calc(${dist} + ${mult * 100}% + ${
        mult * gap
      }rem))`;
    }
  });
};

// Init carousel by adding clone nodes.

const initCarousel = function () {
  appendCloneSlides();
  prependCloneSlides();

  let slides = document.querySelectorAll(".slide");

  calcSlides(currSlide, slides);
};

// Go to prev slide.
// if currSlide is 3, add clone (if its 1 the transition is not smooth)
// recalc currSlide (since new nodes added and removed)

const goToPrevious = () => {
  currSlide--;

  let slides = document.querySelectorAll(".slide");

  if (currSlide === 3) {
    prependCloneSlides();

    deleteAppendClones(slides);

    slides = document.querySelectorAll(".slide");

    currSlide += initialSlides.length;

    calcSlides(currSlide, slides);

    return;
  }

  calcSlides(currSlide, slides);
};

// Go to next slide.
// if currSlide is length - 3, add clone (if its lenght - 1 the transition is not smooth)
// recalc currSlide (since new nodes added and removed)
const goToNext = () => {
  currSlide++;

  let slides = document.querySelectorAll(".slide");

  if (currSlide === slides.length - 3) {
    appendCloneSlides();

    deletePrependClones(slides);

    slides = document.querySelectorAll(".slide");

    currSlide -= initialSlides.length;

    calcSlides(currSlide, slides);

    return;
  }

  calcSlides(currSlide, slides);
};

btnLeft.addEventListener("click", goToPrevious);

btnRight.addEventListener("click", goToNext);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    goToPrevious();
  }
  if (event.key === "ArrowRight") {
    goToNext();
  }
});

initCarousel();
