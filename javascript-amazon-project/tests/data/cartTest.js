import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', ()=>{
    it('adds an existing product to the cart', ()=>{
        spyOn(localStorage, 'setItem');
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        }); //Replace any instance of localStorage.getItem, to return a cart with a single item
        loadFromStorage();//Calls 'localStorage.getItem' and sets the 'cart' variable to equal the result
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1); //Attempt to add an existing product
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2); //Check if the quantity increased
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        }); //Replace any instance of localStorage.getItem with 'return []' in addToCart()
        // console.log(localStorage.getItem('cart'));
        
        loadFromStorage(); //Calls 'localStorage.getItem' and sets the 'cart' variable to equal the result

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});