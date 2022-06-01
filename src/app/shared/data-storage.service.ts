import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private productService: ProductService) {}

  fetchProducts() {//request is being subcribed in the calling function itself
    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      map((products) => {//using map() observable if in case we need to modify incoming data
        return products.map((product) => {//default js map() function
          return {
            ...product,
          };
        });
      }),
      tap((products) => {
        console.log(`From data-service=> ${products}`);
        this.productService.setProducts(products)
      })
    );
  }
}
