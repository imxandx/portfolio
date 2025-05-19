document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');
    const prevBtn = document.getElementById('prev-button');
    const nextBtn = document.getElementById('next-button');
    let currentSlide = 0;

    // função para esconder todos os slides
    const hideAllSlides = () => {
        sliders.forEach(slide => slide.classList.remove('on'));
    };

    // função para mostrar o slide atual
    const showCurrentSlide = () => {
        sliders[currentSlide].classList.add('on');
    };

    // avançar slide
    const nextSlide = () => {
        hideAllSlides();
        currentSlide = (currentSlide + 1) % sliders.length;
        showCurrentSlide();
    };

    // voltar slide
    const prevSlide = () => {
        hideAllSlides();
        currentSlide = (currentSlide - 1 + sliders.length) % sliders.length;
        showCurrentSlide();
    };

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // iniciar com o primeiro slide visível
    showCurrentSlide();
});