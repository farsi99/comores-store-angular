import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/model/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  @Input() products: Products[]=[];
  @Input() isPaginate :boolean =true;
  prodSub: Subscription;
  urlImage:string=`${environment.prefUrlImage}`;
  currentPage:number=0;
  pages = [0,1,2,3,4,5,6,7,8];


  constructor(private prodService:ProductsService,private cartService:CartService) {
    console.log('Product page: ', this.products);
  }

  ngOnInit(): void {

  }

  addToCart(product:Products):void{
    this.cartService.addProductToCard(product);
  }

  deleteFromCart(product:Products):void{
    this.cartService.deleteFromCart(product);
  }

  changePage(numberPage:number):void{
    this.products = this.prodService.getProductByPage(numberPage);
    if(this.products){
      this.currentPage = numberPage;
    }
  }

  nextPage():void{
    const newCurentPage = this.currentPage+1;
    const prod = this.prodService.getProductByPage(newCurentPage);
    if(prod){
      this.products = prod;
      this.currentPage = newCurentPage;
    }
  }

  prevPage():void{
    const newCurentPage = this.currentPage-1;
    const prod = this.prodService.getProductByPage(newCurentPage);
    if(prod){
      this.products = prod;
      this.currentPage = newCurentPage;
    }
  }

}
