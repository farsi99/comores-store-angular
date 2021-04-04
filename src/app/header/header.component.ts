import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../model/cart';
import { Category } from '../model/category';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cart:Cart[]=[];
  cartData;
  categories:Category[];
  categorySub : Subscription;
  isAuth:boolean = false;

  constructor(private cartService: CartService, private categoryService: CategoryService, private userService:UsersService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;
    this.isAuth = this.userService.isAuth;
     this.categorySub = this.categoryService.categorySubject.subscribe((data:Category[])=>{
       this.categories = data;
     });
     this.categoryService.emitCategories();

  }

  logout():void{
    this.userService.logout();
    this.isAuth = this.userService.isAuth;
  }

  ngOnDestroy():void{
    this.categorySub.unsubscribe();
  }
}
