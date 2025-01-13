import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary(){
    //Display items in the cart:
    let cartSummaryHTML = '';

    cart.forEach((cartItem)=>{
        //Find matching product object:
        const productId = cartItem.productId;
        
        const matchingProduct = getProduct(productId);

        //Calculate primary delivery date:
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const deliveryDateString = calculateDeliveryDate(deliveryOption);

        //Generate html container of each cartItem:
        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${deliveryDateString}
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
                    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                        Update
                        </span>
                        <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                        <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                        Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
            </div>
        </div>
        `;
    });

    //Generate delivery options:
    function deliveryOptionsHTML(matchingProduct, cartItem){
        let html = '';

        deliveryOptions.forEach((deliveryOption)=>{
            const dateString = calculateDeliveryDate(deliveryOption);

            const priceString = deliveryOption.priceCents === 0 //Using ternary operators here:
            ? 'FREE' //? represents if true
            : `$${formatCurrency(deliveryOption.priceCents)} -`; //: represents if false

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId; //Make sure checked delivery option matches the ones saved in cart

            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
            `;
        });

        return html;
    }

    // Place html in its place:
    // console.log(cartSummaryHTML);
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    //Make 'Delete' links interactive:
    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;
            console.log(`Deleting: ${productId}`);

            removeFromCart(productId);
            
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
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
    }

    document.querySelectorAll('.js-save-link').forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;
            saveNewQuantity(productId);
            
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
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

    //Make 'delivery-options' interactive
    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click', ()=>{
            const {productId, deliveryOptionId} = element.dataset
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
