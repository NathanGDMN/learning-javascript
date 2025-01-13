import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from '../../data/cart.js';


describe('test suite: renderOrderSummary', ()=>{
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    
    beforeEach(()=>{ //This runs before each of the tests
        spyOn(localStorage, 'setItem'); //When clicking a delete link, it calls the function removesFromCart(), which updates the cart in localStorage (with setItem)-- we do not want the results of our tests to saved so we mock this function so it does nothing.
        
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-checkout-header"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `; //Create a divs to place the 'rendered' order summary into for testing--in tests.html

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{ 
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        }); //Replace any instance of localStorage.getItem, to return the default cart from cart.js
        loadFromStorage(); //Calls 'localStorage.getItem' and sets the 'cart' variable to equal the result

        renderOrderSummary(); //Render the cart
    });

    it('displays the cart', ()=>{ //Check if the contents of the generated html is correct
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2); //Check if two items were created (matching the number of items in the default cart we rendered)
        
        //Check if the correct quantity for each item was rendered
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML=''; //Remove the html we rendered so it doesnt appear on the test page (test.html)
    });

    it('removes a product', ()=>{ //Check if the remove from cart button on the render products works correctly
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1); //Check if only one cart item is remaining
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null); //Check to make sure the deleted item no longer exists
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null); //Check to make sure the not deleted item still exists
        
        //Check if the cart variable was updated correctly:
        expect(cart.length).toEqual(1) //Should only have one item remaining
        expect(cart[0].productId).toEqual(productId2); //It should be the second product remaining

        document.querySelector('.js-test-container').innerHTML=''; //Remove the html we rendered so it doesnt appear on the test page (test.html)
    });
});