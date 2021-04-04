import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[];
  cartData = { len:0, cost:0 }

  constructor() {
    this.initCart();
  }

  initCart():void{
    if(typeof(localStorage)!=="undefined"){
      const cart = JSON.parse(localStorage.getItem('cart'));
      const cartData = JSON.parse(localStorage.getItem('cartData'));
      this.cart = cart ? cart: [];
      this.cartData = cartData? cartData: { len:0, cost:0 };
    }else{
      this.cart = [];
      this.cartData={ len:0, cost:0 };
    }
  }

  updateDataCart(){
    let len=0;
    let cost=0;
    this.cart.forEach( element =>{
      len += element.number;
      cost += element.product.price*element.number;
    });
    this.cartData.len = len;
    this.cartData.cost = cost;
    //On stocke les données dans le navigateur
    if(typeof(localStorage) !== "undefined"){
      localStorage.setItem('cart',JSON.stringify(this.cart));
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
    }
  }

  //Ajouter un produit au panier
  addProductToCard(newproduct:Products):void{
    //Si le produit existe
    const checkedProduct = this.cart.find(element => element.product == newproduct);
    if(checkedProduct){
      checkedProduct.number++;
    }else{
      //on ajoute le produit dans le panier
      const newProductToAdd = {
        number: 1,
        product: newproduct
      };
      this.cart.push(newProductToAdd);
    }
    //Mettre à jour le panier
    this.updateDataCart();

  }

//suppression d'un produit
  deleteFromCart(productTodelete:Products):void{
    const indexProduct = this.cart.findIndex(element => element.product == productTodelete);
    if(indexProduct!==-1){
      if(this.cart[indexProduct].number >1){
        this.cart[indexProduct].number--;
      }else{
        this.cart.splice(indexProduct,1);
      }
    }
    this.updateDataCart();
  }

  removeElementOfCart(index:number):void{
    this.cart.splice(index,1);
    this.updateDataCart();
  }

}
