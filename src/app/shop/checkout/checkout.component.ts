import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

cart: Cart[];
cartData;

  constructor(private cartService:CartService, private orderService:OrdersService, private userService:UsersService) {
    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;

  }

  ngOnInit(): void {
  }

  createOrder(){
    const user = this.userService.user;
    const cart = this.cartService.cart;

    this.orderService.creatOrder(user, cart)
    .then((data)=>{
      console.log('Commande créer avec succès !');
    }).catch((error)=>{
      console.log(error);
    })
  }

}
