const burgerBtn = document.querySelector('.burger_button');
const burgerCont = document.querySelector('.burger_cont');
const closeBM = document.getElementById('close');
const mainPhoto = document.querySelector('#main_photo img');
const mainPhotoBtn = document.querySelector('#main_photo');
const miniPhotos = document.querySelectorAll('.small_item');
const lightboxCont = document.querySelector('.lightbox_container');
const closeLB = document.querySelector('.lb_close');
const miniPhotosLB = document.querySelectorAll('#small-lightbox img');
const mainPhotoLB = document.querySelector('.lightbox_main-photo img');
const nextLB = document.querySelector('.lb_next');
const prevLB = document.querySelector('.lb_prev');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const number = document.querySelector('.number');
const itemsNum = document.querySelector('.items_num');
const buttonAddItem = document.querySelector('.button');
const cartIcon = document.querySelector('.cart_icon');
const cartBlock = document.querySelector('.cart_block');
const cartContent = document.querySelector('.cart__content');
const cartItemInfo = document.querySelector('.cart__content-info');
const previous = document.getElementById('previous');
const next = document.getElementById('next');


// Burger menu
burgerBtn.addEventListener('click', () => {
    burgerCont.style.display = 'block';
})
closeBM.addEventListener('click', () => {
    burgerCont.style.display = 'none';
})

// Site menu item does not reload the page
document.querySelectorAll('.navi a').forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
  });

// Photo thumbnail becomes large
miniPhotos.forEach(image => {
    image.addEventListener('click', () => {
        let source = image.src.replace('-thumbnail', '');
        mainPhoto.src = source;
    })
})

// Open lightbox

const openLightbox = (e) => {
  if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
    lightboxCont.classList.add('active');
  }
};

const mediaQuery = window.matchMedia('(min-width: 769px)');

function handleScreenChange(e) {
  if (e.matches) {
    mainPhotoBtn.addEventListener('click', openLightbox);
    mainPhotoBtn.addEventListener('keyup', openLightbox);
  } else {
    mainPhotoBtn.removeEventListener('click', openLightbox);
    mainPhotoBtn.removeEventListener('keyup', openLightbox);
  }
}

handleScreenChange(mediaQuery);
mediaQuery.addEventListener('change', handleScreenChange);


// Close lightbox
closeLB.addEventListener('click', () => {
    lightboxCont.classList.remove('active');
})

const images = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
  ];
  
  let currentIndex = 0;
  
  function updateImage(index) {
    mainPhotoLB.src = images[index];
    miniPhotosLB.forEach(thumb => thumb.classList.remove('active'));
    miniPhotosLB[index].classList.add('active');
  }
  
  document.querySelector('.lb_next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
  });
  
  document.querySelector('.lb_prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex);
  });

  miniPhotosLB.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      currentIndex = index;
      updateImage(index);
    });
  });

// When width less 768px
let currentInd = 0;
function updateIm(index) {
    mainPhoto.src = images[index];
  }
  
  next.addEventListener('click', () => {
    currentInd = (currentInd + 1) % images.length;
    updateIm(currentInd);
  });
  
  previous.addEventListener('click', () => {
    currentInd = (currentInd - 1 + images.length) % images.length;
    updateIm(currentInd);
  });

// Add one item
plus.addEventListener('click', addItem);
function addItem() {
    number.textContent = +number.textContent + 1; 
}
// Subtract one item
minus.addEventListener('click', minusItem);
function minusItem() {
    let value = number.textContent
    if(value < 2) {
        value = 1;
        number.style.color = 'red';
        setTimeout(() => number.style.color = '', 1000);
    } else {
        number.textContent = +value - 1;
    }
}
// Add item to cart

buttonAddItem.addEventListener('click', () => addToCart())

function addToCart() {
    if(cartContent.children.length === 0 && +number.textContent > 0) {

        itemsNum.style.display = 'block';
        itemsNum.textContent = +number.textContent;

        let value = `
        <div class="cart__content-info">
            <img src="./images/image-product-1-thumbnail.jpg" alt="Item in cart" class="img_cart">
            <div class="cart__content-description">
            <p>Fall Limited Edition Sneakers</p>
            <span class="cart-price">$125.00</span> x
            <span class="cart-quantity">${number.textContent}</span>
            <span class="cart-sum"></span>
            </div>
            <button type="button" class="cart_delete-item" aria-label="Delete item from cart">
            <img src="./images/icon-delete.svg" alt="" aria-hidden="true">
            </button>
          </div>
          <button type="button" class="button_cart">Checkout</button>`
          cartContent.insertAdjacentHTML('afterbegin', value);
          updateCart();
    } else {
        const cartQuantity = document.querySelector('.cart-quantity');
        cartQuantity.textContent = +cartQuantity.textContent + +number.textContent;
        itemsNum.textContent = cartQuantity.textContent;
        updateCart();
    }
}

function updateCart() {
    const cartPrice = document.querySelector('.cart-price');
    const cartQuantity = document.querySelector('.cart-quantity');
    const cartSum = document.querySelector('.cart-sum');

    const price = Number(cartPrice.textContent.slice(1));
    const quantity = +cartQuantity.textContent;

    cartSum.textContent = '$' + (price * quantity).toFixed(2);
    number.textContent = 1;
}

// Open cart
cartIcon.addEventListener('click', () => cartBlock.classList.toggle('active'))

cartContent.addEventListener('click', (e) => {
    if (e.target.closest('.cart_delete-item')) {
        deleteElement();
    }   
});
// Delete item from cart
function deleteElement() {
    const cartQuantity = document.querySelector('.cart-quantity');
    if (!cartQuantity) return;

    if (+cartQuantity.textContent > 1) {
        const newQuantity = +cartQuantity.textContent - 1;
        cartQuantity.textContent = newQuantity;
        itemsNum.textContent = newQuantity;
        updateCart();
    } else {
        cartContent.innerHTML = '';
        itemsNum.textContent = 0;
        itemsNum.style.display = 'none';
        cartContent.innerHTML = '<p class="empty">Your cart is empty.</p>';
    }
}

