import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../model/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit,OnDestroy {

  products:Products[]=[];
  prodSub: Subscription;
  pages = [];

  constructor(private prodService:ProductsService) {
  }

  ngOnInit(): void {
    this.prodSub= this.prodService.prodSubject
    .subscribe((data)=>{
      this.products = data;
      console.log('Shop Prod:', data);
      if(data){
        console.log('Produit shop:', data);
        const totpage = Math.round(data.length/this.prodService.numberProductByPage);
        for(let i=0; i < totpage; i++){
          this.pages.push(i);
        }
      }
     // this.products = data;
     this.products = this.prodService.getProductByPage(0);
    });
    //On fait une émission
    this.prodService.emitProducts();
  }

  ngOnDestroy():void{
    this.prodSub.unsubscribe();
  }
}
