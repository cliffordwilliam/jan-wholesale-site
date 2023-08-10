function carouselInit(targetId, autoplay) {
  // connects button signals and handle images sliding
  // takes obj id and autoplay bool

  // get the container and buttons
  const slideContainer = targetId.querySelector(".slide-container");
  const nextButton = targetId.querySelector(".next-btn");
  const prevButton = targetId.querySelector(".prev-btn");

  // set the total slide and index counter
  const totalSlide = slideContainer.childElementCount;
  let index = 0;

  // if guard no input during sliding (works for multiple carousels)
  let isSliding = false;

  // attach the button signals
  nextButton.addEventListener("click", onNextButtonPress);
  prevButton.addEventListener("click", onPrevButtonPress);

  // next button press func
  function onNextButtonPress() {
    // no input during sliding
    if (isSliding === true) {
      return;
    }

    // no input
    isSliding = true;

    // stop timer
    if (autoplay === true) {
      stopAutoplay();
    }

    // get the currentSlide, update index, then get the nextSlide
    const currentSlide = slideContainer.children[index];
    index = (index + 1) % totalSlide;
    const nextSlide = slideContainer.children[index];

    // move current from mid to left, show next and move from right to mid
    currentSlide.classList.add("mid-left");
    nextSlide.classList.add("left-mid");
    nextSlide.classList.add("show");

    // after anim
    function onSlideAnimationEnd() {
      // detach signal
      currentSlide.removeEventListener("animationend", onSlideAnimationEnd);

      // remove anim
      currentSlide.classList.remove("mid-left");
      nextSlide.classList.remove("left-mid");

      // hide current
      currentSlide.classList.remove("show");

      // can input
      isSliding = false;

      // start timer
      if (autoplay === true) {
        startAutoplay();
      }
    }

    // attach anim signal to current
    currentSlide.addEventListener("animationend", onSlideAnimationEnd);
  }

  function onPrevButtonPress() {
    // no input during sliding
    if (isSliding === true) {
      return;
    }

    // no input
    isSliding = true;

    // stop timer
    if (autoplay === true) {
      stopAutoplay();
    }

    // get the currentSlide, update index, then get the nextSlide
    const currentSlide = slideContainer.children[index];
    index = (index + totalSlide - 1) % totalSlide;
    const nextSlide = slideContainer.children[index];

    // move current from mid to right, show next and move from right to mid
    currentSlide.classList.add("mid-right");
    nextSlide.classList.add("right-mid");
    nextSlide.classList.add("show");

    // after anim
    function onSlideAnimationEnd() {
      // detach signal
      currentSlide.removeEventListener("animationend", onSlideAnimationEnd);

      // remove anim
      currentSlide.classList.remove("mid-right");
      nextSlide.classList.remove("right-mid");

      // hide current
      currentSlide.classList.remove("show");

      // can input
      isSliding = false;

      // start timer
      if (autoplay === true) {
        startAutoplay();
      }
    }

    // attach anim signal to current
    currentSlide.addEventListener("animationend", onSlideAnimationEnd);
  }

  // store the autoplay interval ID
  let autoplayInterval;

  function stopAutoplay() {
    // clear the existing autoplay interval
    clearInterval(autoplayInterval);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      onNextButtonPress();
    }, 3000);
  }

  if (autoplay === true) {
    startAutoplay();
  }
}

carouselInit(document.querySelector("#carousel-1"), (autoplay = true));
carouselInit(document.querySelector("#carousel-2"), (autoplay = true));
