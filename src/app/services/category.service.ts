import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[];
  categorySubject = new Subject<Category[]>();

  constructor(private http: HttpClient) {
    this.getCategoryFromServer();
  }

  emitCategories():void{
    this.categorySubject.next(this.categories);
  }

  getCategoryFromServer():void{
    const url = `${environment.API + 'category?API_KEY=' + environment.API_KEY}`;
    this.http.get(url).subscribe(
      (response:Result)=>{
      if(response.status == 200){
        this.categories = response.result;
        console.log('caty:', this.categories);
        this.emitCategories();
      }else{
        console.log(response.message);
      }
    });
  }



}
