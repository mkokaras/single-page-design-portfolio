import "./style.scss";

const slider = document.querySelector(".slider");
const initialSlides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".btn-slide--left");
const btnRight = document.querySelector(".btn-slide--right");
let currSlide = 2;

const bp = 768;

const dist = `${Math.round(
  (slider.clientWidth - initialSlides[0].clientWidth) / 2
)}px`;

const appendCloneSlides = function () {
  for (let i = 0; i < initialSlides.length; i++) {
    slider.append(initialSlides[i].cloneNode(true));
  }
};

const deletePrependClones = function (slides) {
  slides.forEach((slide, index) => {
    if (index < initialSlides.length) {
      slide.remove();
    }
  });
};

const deleteAppendClones = function (slides) {
  slides.forEach((slide, index) => {
    if (index >= slides.length - initialSlides.length) {
      slide.remove();
    }
  });
};

const prependCloneSlides = function () {
  for (let i = initialSlides.length - 1; i >= 0; i--) {
    slider.prepend(initialSlides[i].cloneNode(true));
  }
};

const calcSlides = function (currSlide, slides) {
  const gap = document.documentElement.clientWidth > bp ? 3 : 1.5;

  slides.forEach((slide, index) => {
    // Base case for non - edge slides

    if (currSlide === index) {
      slide.style.transform = `translateX(${dist})`;
      // slide.style.marginLeft = dist;
    }

    if (currSlide > index) {
      const mult = currSlide - index;

      slide.style.transform = `translateX(calc(${dist} - ${mult * 100}% - ${
        mult * gap
      }rem))`;

      // slide.style.marginLeft = dist;
    }

    if (currSlide < index) {
      const mult = index - currSlide;

      slide.style.transform = `translateX(calc(${dist} + ${mult * 100}% + ${
        mult * gap
      }rem))`;

      // slide.style.marginLeft = dist;
    }
  });
};

const initCarousel = function () {
  appendCloneSlides();
  prependCloneSlides();

  let slides = document.querySelectorAll(".slide");

  calcSlides(currSlide, slides);
};

btnLeft.addEventListener("click", () => {
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
});

btnRight.addEventListener("click", () => {
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
});

initCarousel();
