const scrolling = (upSelector, up) => {
    let upElem = document.querySelector(upSelector);

    if (up) {
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 1650) {
                upElem.classList.add('animated', 'fadeIn');
                upElem.classList.remove('fadeOut');

            } else {
                upElem.classList.add('fadeOut');
                upElem.classList.remove('fadeIn');
            }
        });
    }

    const element = document.documentElement;
    const body = document.body;

    const calcScroll = () => {
        if (upElem.tagName !== 'A') upElem = upElem.children[0];

        upElem.addEventListener('click', function (event) {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            if (this.hash !== '') {
                event.preventDefault();
                let hashElement = document.querySelector(this.hash);
                let hashElementTop = 0;
                while (hashElement.offsetParent) {
                    hashElementTop += hashElement.offsetTop;
                    hashElement = hashElement.offsetParent;
                }

                hashElementTop = Math.round(hashElementTop);
                smoothScroll(scrollTop, hashElementTop, this.hash); //расстояние от верха страницы, верх страницы, ссылка

            }

        })
    }


    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1;
        let prevScrollTop;
        let speed;

        if (to > from) {
            speed = 30;
        } else {
            speed = -30;
        }
        let move = setInterval(function () {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);
            if (
                prevScrollTop === scrollTop ||
                (to > from && scrollTop >= to) ||
                (to < from && scrollTop <= to)
            ) {
                clearInterval(move);
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);

            } else {
                body.scrollTop += speed;
                element.scrollTop += speed;
                prevScrollTop = screenTop;
            }

        }, timeInterval);
    };
    calcScroll();
}

export default scrolling;