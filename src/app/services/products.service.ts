import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../model/products';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products :Products[]=[];
  prodSubject=new Subject<Products[]>();
  numberProductByPage:number =9;

  constructor(private http:HttpClient) {
  }

  emitProducts(){
    this.prodSubject.next(this.products);
  }

  getProductFromServer(){
    const url = `${environment.API+'products?API_KEY='+environment.API_KEY}` ;
    this.http.get(url)
    .subscribe((dataProduct: Result)=>{
      if(dataProduct.status == 200){
        this.products=dataProduct.result;
        console.log('Prod: ', this.products);
        this.emitProducts();
      }else{
        console.log('Erreur: ',dataProduct.message);
      }
    });
  }

  getProductById(id:number):Products{
    const product = this.products.find(element => element.idProduct == id);
    if(product){
      return product
    }else{
      return null;
    }
  }

getProductByPage(numberpage:number):Products[]{
  //Nombre total de page divisé par 6 le total à afficher
  const numberOfPage = this.products.length/this.numberProductByPage;
  console.log('Page: ', this.products);
  //On verifie que la page demandé est supérieur à 0 et inférieur au nombre total de page
  if(numberpage >0 || numberpage < numberOfPage ){
    const prodResult = this.products.slice(numberpage*this.numberProductByPage, (numberpage+1)*this.numberProductByPage );
    console.log('Prod cat:', prodResult);
    return prodResult;
  }
  return null;
}

}
