class Carousel {
    constructor(el) {
        this.el = el;
        this.currentIndex = 0;
        this.slidesTranslate = 0;
        this.defaultSlidesTranslate = 0;
        this.initElements();
        this.initCarousel();
        this.listenEvents();
        this.delay = false;
        this.transition = 350;
    }

    initElements() {
        this.elements = {
            prev: this.el.querySelector('[data-prev]'),
            next: this.el.querySelector('[data-next]'),
            slides: this.el.querySelector('.slides'),
        };
    }

    initCarousel() {
        this.initSlides();
    }

    initSlides() {
        const slides = this.el.querySelectorAll('.slide');
        let slidesTranslate = 0;
        this.currentIndex = slides.length;

        slides.forEach((item, index) => {
            slidesTranslate += this.getSlideWidth(item);
            this.elements.slides.appendChild(item.cloneNode(true));
            this.elements.slides.prepend(slides[slides.length - index - 1].cloneNode(true));
        });

        this.slidesTranslate = slidesTranslate;
        this.defaultSlidesTranslate = slidesTranslate;
        this.elements.slides.style.transform = `translateX(-${slidesTranslate}px)`;
        this.slides = this.el.querySelectorAll('.slide');
    }

    listenEvents() {
        this.elements.prev.addEventListener('click', () => {
            if (!this.delay) {
                this.elements.slides.style.transition = `${this.transition}ms`;

                this.slidesTranslate -= this.getSlideWidth(this.slides[this.currentIndex - 1]);
                this.elements.slides.style.transform = `translateX(-${this.slidesTranslate}px)`;
                this.currentIndex--;

                if (this.currentIndex === 0) {
                    this.delay = true;
                    setTimeout(() => {
                        this.elements.slides.style.transition = 'none';
                        this.slidesTranslate = this.defaultSlidesTranslate;
                        this.elements.slides.style.transform = `translateX(-${this.slidesTranslate}px)`;
                        this.currentIndex = this.slides.length / 3;
                        this.delay = false;
                    }, this.transition);
                }
            }
        });

        this.elements.next.addEventListener('click', () => {
            if (!this.delay) {
                this.elements.slides.style.transition = `${this.transition}ms`;

                this.slidesTranslate += this.getSlideWidth(this.slides[this.currentIndex]);
                this.elements.slides.style.transform = `translateX(-${this.slidesTranslate}px)`;
                this.currentIndex++;

                if (this.currentIndex === (this.slides.length / 3) * 2) {
                    this.delay = true;
                    setTimeout(() => {
                        this.elements.slides.style.transition = 'none';
                        this.slidesTranslate = this.defaultSlidesTranslate;
                        this.elements.slides.style.transform = `translateX(-${this.slidesTranslate}px)`;
                        this.currentIndex = this.slides.length / 3;
                        this.delay = false;
                    }, this.transition);
                }
            }
        });
    }

    getSlideWidth(slide) {
        const style = window.getComputedStyle(slide);
        const slideInnerSize = slide.getBoundingClientRect();
        return slideInnerSize.width
            + parseInt(style.marginLeft, 10)
            + parseInt(style.marginRight, 10);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel(document.querySelector('.carousel'));
    console.dir(carousel);
});