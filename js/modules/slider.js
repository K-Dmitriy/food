function addZero(number) {
    return number < 10 ? '0' + number : number;
}

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const offerSlider = document.querySelector(container),
          numTotalSlide = offerSlider.querySelector(totalCounter),
          numCurrentSlide = offerSlider.querySelector(currentCounter),
          offerSlides = offerSlider.querySelectorAll(slide),
          offerSliderBtnPrev = offerSlider.querySelector(prevArrow),
          offerSliderBtnNext = offerSlider.querySelector(nextArrow),
          offerSlidesWrap = offerSlider.querySelector(wrapper),
          slideWidth = parseInt(window.getComputedStyle(offerSlidesWrap).width),
          sliderField = document.createElement('div'),
          indicators = document.createElement('ol'),
          dot = document.createElement('li');
    let slideIndex = 1,
        sliderOffset = 0;

    // function changeSlide(n = 0) {
    //     hideElements(offerSlides);
    //     showElement(offerSlides, slideIndex + n - 1);
    //     numCurrentSlide.textContent = addZero(slideIndex += n);
    // }

    // changeSlide();

    // numTotalSlide.textContent = addZero(offerSlides.length);

    // offerSliderBtnNext.addEventListener('click', () => {
    //     if (slideIndex === offerSlides.length) {
    //         slideIndex = 0;
    //     }

    //     changeSlide(1);
    // });

    // offerSliderBtnPrev.addEventListener('click', () => {
    //     if (slideIndex === 1) {
    //         slideIndex = offerSlides.length + 1;
    //     }

    //     changeSlide(-1);
    // });

    //slider dots
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    dot.classList.add('dot');
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    
    offerSlidesWrap.style.position = 'relative';
    offerSlidesWrap.append(indicators);

    offerSlides.forEach(slide => {
        slide.style.width = slideWidth + 'px';
        sliderField.append(slide);
        indicators.append(dot.cloneNode());
    });

    offerSlidesWrap.style.overflow = 'hidden';
    offerSlidesWrap.append(sliderField);

    const dots = offerSlidesWrap.querySelectorAll('.dot');
    dots[0].style.opacity = 1;

    function changeActiveDot(index) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[index].style.opacity = 1;
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            changeActiveDot(i);
            sliderField.style.transform = `translateX(-${sliderOffset = slideWidth * i}px)`;
            numCurrentSlide.textContent = addZero(slideIndex = i + 1);
        });
    });

    //carousel
    sliderField.classList.add(field);
    sliderField.style.display = 'flex';
    sliderField.style.width = 100 * offerSlides.length + '%';
    sliderField.style.transition = '0.5s all';

    offerSliderBtnNext.addEventListener('click', () => {
        numCurrentSlide.textContent = addZero(slideIndex += 1);

        if (sliderOffset === slideWidth * (offerSlides.length - 1)) {
            sliderOffset = 0;
            numCurrentSlide.textContent = addZero(slideIndex = 1);
        } else {
            sliderOffset += slideWidth;
        }

        sliderField.style.transform = `translateX(-${sliderOffset}px)`;
        changeActiveDot(slideIndex - 1);
    });

    offerSliderBtnPrev.addEventListener('click', () => {
        numCurrentSlide.textContent = addZero(slideIndex -= 1);

        if (sliderOffset === 0) {
            sliderOffset = slideWidth * (offerSlides.length - 1);
            numCurrentSlide.textContent = addZero(slideIndex = offerSlides.length);
        } else {
            sliderOffset -= slideWidth;
        }

        sliderField.style.transform = `translateX(-${sliderOffset}px)`;
        changeActiveDot(slideIndex - 1);
    });

    numTotalSlide.textContent = addZero(offerSlides.length);
    numCurrentSlide.textContent = addZero(slideIndex);
}

export default slider;
export { addZero };