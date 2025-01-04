import {cart, addToCart, calculateCartQuantity} from '../data/cart.js'; //".." represents the parent folder of the current folder
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

//Calculate cartquantity
updateCartQuantity();

//Generate and load the page:
let productsHTML = '';

products.forEach((product)=>{
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src ="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents/100)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity(productId, quantity){
  document.querySelector('.js-cart-quantity').innerText = calculateCartQuantity();
}

function displayAddedToCart(productId, addedToCartTimeout){
  //Display added to cart message:
  clearTimeout(addedToCartTimeout); //Remove any existing timeout
        
  const addedToCartImg = document.querySelector(`.js-added-to-cart-${productId}`)
  addedToCartImg .classList.add('added-to-cart-clicked');
  addedToCartTimeout = setTimeout(()=>{
    addedToCartImg .classList.remove('added-to-cart-clicked');
  },2000);
}

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    let addedToCartTimeout = 'No timeout set!'
    button.addEventListener('click', ()=>{ 
        const productId = button.dataset.productId;

        const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

        addToCart(productId, quantity);

        updateCartQuantity(productId, quantity);

        displayAddedToCart(productId, addedToCartTimeout);
    });
});
