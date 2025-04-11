document.querySelectorAll('.navi a').forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
  });

const burgerBtn = document.querySelector('.burger_button');
const burgerCont = document.querySelector('.burger_cont');
const closeBtn = document.getElementById('close');

burgerBtn.addEventListener('click', () => {
    burgerCont.style.display = 'block';
})
closeBtn.addEventListener('click', () => {
    burgerCont.style.display = 'none';
})