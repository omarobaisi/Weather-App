const formInput = document.querySelectorAll('.form-input');
const formPlaceholder = document.querySelectorAll('.form-placeholder');

formInput.forEach(input => {
    const placeholder = input.nextElementSibling

    if(input.value !== '') {
        placeholder.style.position = 'absolute';
        placeholder.style.top = '-20px';
        placeholder.style.fontSize = '15px';
    }

    input.addEventListener('focusin', () => {
        placeholder.style.position = 'absolute';
        placeholder.style.top = '-15px';
        placeholder.style.fontSize = '15px';
    })
    input.addEventListener('focusout', () => {
        if(input.value === '') {
            placeholder.style.position = 'absolute';
            placeholder.style.top = '-20px';
            placeholder.style.fontSize = '30px';
        }
    })
})