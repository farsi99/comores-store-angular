import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/model/products';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-quick-view',
  templateUrl: './modal-quick-view.component.html',
  styleUrls: ['./modal-quick-view.component.css']
})
export class ModalQuickViewComponent implements OnInit {

  @Input()  products:Products[];
   urlImage:string=`${environment.prefUrlImage}`;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }

  addCart(product:Products):void{
    this.cartService.addProductToCard(product);
  }
}
