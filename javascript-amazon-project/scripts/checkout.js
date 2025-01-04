import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

//Calculate number of items in cart for the checkout header:
function updateCartQuantity(){
    document.querySelector('.js-checkout-header').innerText = `${calculateCartQuantity()} items`;
}
updateCartQuantity();

//Display items in the cart:
let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    
    let matchingProduct;
    products.forEach((product)=>{
        if (product.id === productId){
            matchingProduct = product;
        }
    });

    console.log(matchingProduct);

    cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Wednesday, June 15
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>

                <div class="delivery-option">
                    <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                            FREE Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio" checked="" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                            $4.99 - Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            $9.99 - Shipping
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
});

console.log(cartSummaryHTML);

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

//Make 'Delete' links interactive:
document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        console.log(`Deleting: ${productId}`);

        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();

        updateCartQuantity();
    });
});

//Make 'Update' links interactive:
document.querySelectorAll('.js-update-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        console.log(`Updating: ${productId}`);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add("is-editing-quantity");
    });
});

//Make 'Save' links interactive:
function saveNewQuantity(productId){
    console.log(`Saving: ${productId}`);

    const input = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    if (input<0 || input>=100){
        console.log("Inputed quantity number not valid")
        return
    }

    updateQuantity(productId, input);

    updateCartQuantity();
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = input

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove("is-editing-quantity");
}

document.querySelectorAll('.js-save-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        saveNewQuantity(productId);
    });
});

//Make 'quantity-input' interactive
document.querySelectorAll('.quantity-input').forEach((input)=>{
    input.addEventListener('keydown', (event)=>{
        if (event.key === 'Enter'){
            const productId = input.dataset.productId;
            saveNewQuantity(productId);
        }
    })
})