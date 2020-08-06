const modals = () => {
    let btnPressed = false;

    const giftMarginChangeonClose = () => {
        const gift = document.querySelector('.fixed-gift');
        if (gift) {
            let scroll = +calcScroll();
            const wr = +getComputedStyle(gift).right.replace(/[\D]/g,'');
            gift.style.right = `${wr-scroll}px`;
        }           
    };


    const giftMarginChangeonOpen = () => {
        const gift = document.querySelector('.fixed-gift');
        if (gift) {
            let scroll = +calcScroll();
            const wr = +getComputedStyle(gift).right.replace(/[\D]/g,'');
            gift.style.right = `${wr+scroll}px`;
        }           
    };
    
    const bindModal = (triggerSelector, modalSelector, closeSelector, destroy = false) => {
        const trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]'),
        scroll = calcScroll();
        

        

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn')
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                giftMarginChangeonOpen();
           
            });
        });

       

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            giftMarginChangeonClose ();  


        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal ) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
        
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                giftMarginChangeonClose ();  
            }
  
        });

    };

    const showModalByTime = (selector,time) => {
        setTimeout(()=> {
            let display;
            document.querySelectorAll('[data-modal]').forEach(item=> {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });
//если ни одно модальное окно не показывается
            if (!display) {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
            let scroll = +calcScroll();
            document.body.style.marginRight = `${scroll}px`;
            giftMarginChangeonOpen();         
            }            
        }, time);        
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

    function openByScroll (selector) {
        window.addEventListener('scroll', () => {
            // пользователь долистал до конца
            //window.pageYOffset -сколько уже пролистано
            //document.documentElement.clientHeight - сколько сейчас пользователь видит 
            //document.documentElement.scrollHeight - полная высота документа
            if ( !btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= 
                document.documentElement.scrollHeight)) {
                    //вызов вручную
                    document.querySelector(selector).click();
                }

        })

    }


    bindModal('.button-design', '.popup-design', '.popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-design .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-close', true);
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 60000);
};

export default modals;