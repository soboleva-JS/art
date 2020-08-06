const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1;
    let paused = false; //флаг остановки слайдера 
    const items = document.querySelectorAll(slides);
    

    function showSlides (n) {
        if (n>items.length) {
            slideIndex =1 ;
        }

        if (n<1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        items[slideIndex-1].style.display = 'block';

    }

    showSlides(slideIndex);
    
    function plusSlides(n) {
        showSlides(slideIndex += n)
    }

    try {
        const prevBtn = document.querySelector(prev);
        const nextBtn = document.querySelector(next);

        nextBtn.addEventListener('click', ()=> {
            plusSlides(1);
            items[slideIndex-1].classList.remove('fadeInRight');
            items[slideIndex-1].classList.add('fadeInLeft');
        });
        prevBtn.addEventListener('click', ()=> {
            plusSlides(-1);
            items[slideIndex-1].classList.remove('fadeInLeft');
            items[slideIndex-1].classList.add('fadeInRight');
        })

    } catch(e){}

    function activateAnimation () {
        if (dir === 'vertical') {
            paused = setInterval(function(){
                plusSlides(1);
                items[slideIndex-1].classList.add('fadeInDown');
               
            },3000);
    
        } else {
            paused = setInterval(function(){
                plusSlides(1);
                items[slideIndex-1].classList.add('fadeInLeft');
               
            },3000);
    
        }

    };
    activateAnimation();
    //очистка интервала при наведеннии мыши
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
    
  

};
export default sliders;