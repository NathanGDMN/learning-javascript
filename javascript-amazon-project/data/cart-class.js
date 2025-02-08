//This file is the cart-oop.js file converted from using a function to generate objects to using a class to generate objects

class Cart {
    cartItems = undefined;
    #localStorageKey = undefined;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))
    
        if (!this.cartItems){ //If the line above sets cart to null (there was no cart in local storage):
            this.cartItems = [{ 
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }]
        }
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId, quantity){
        //Check if item is already in cart:
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if (cartItem.productId === productId){
                matchingItem = cartItem;
            }
        });
      
        if(matchingItem){  //If the cart already has the selected product in it
            matchingItem.quantity += quantity;
        }else{
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: '1'
            });
        }
    
        this.saveToStorage();
    }

    removeFromCart(productId){
        const newCart = [];
    
        this.cartItems.forEach((cartItem)=>{
            if (cartItem.productId != productId){
                newCart.push(cartItem);
            }
        });
    
        this.cartItems = newCart;
    
        this.saveToStorage();
    }

    calculateCartQuantity(){
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem)=>{
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }
    
    updateQuantity(productId, newQuantity){
        //Find item in cart:
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if (cartItem.productId == productId){
                matchingItem = cartItem;
            }
        });
    
        matchingItem.quantity = newQuantity;
    
        this.saveToStorage();
    }
    
    updateDeliveryOption(productId, deliveryOptionId){
        //Find item in cart:
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if (cartItem.productId == productId){
                matchingItem = cartItem;
            }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
    }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);
