const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus();
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else {
            let range = elem.createTextRange();
            //объединение начала иа конца диапазона
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __';
        let i = 0;
        let def = matrix.replace(/\D/g, ''); 
        let val = this.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def; //нельзя удалить 7
        }

        this.value = matrix.replace(/./g, function (a) {            
            //перебор всех символов в матрице
            //возвращаем в зависимости от условий
            //либо кусочек маски, либо цифра, введенная пользователем
            return /[_\d]/.test(a) && (i < val.length) ? val.charAt(i++) : i >= val.length ? '' : a;
            
        })

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            } 
        }    
        else {  setCursorPosition(this.value.length, this)
            }        
    }


    let inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    })

}

export default mask;