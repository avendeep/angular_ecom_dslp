import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchProducts() {
    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      map((products) => {
        return products.map((product) => {
          return {
            ...product,
          };
        });
      }),
      tap((products) => {
        console.log(products);
      })
    );
  }
}
