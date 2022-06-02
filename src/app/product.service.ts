import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject, tap } from "rxjs";
import { Product } from "./product.model";

@Injectable({providedIn:'root'})
export class ProductService{
   productsChanged = new Subject<Product[]>();
   productChanged = new Subject<any>()

    private products: Product[] = [];
    private product:object;

    constructor(private http: HttpClient){}


    setProducts(products: Product[]){
        this.products = products;
        this.productsChanged.next(this.products.slice())//trigering emitter
        //console.log(`from product-service ${this.products}`)
    }

    getProducts(){
        return this.products.slice();//returning copy of products array
    }

    getProduct(id:number){
        return this.http.get<any>(`https://fakestoreapi.com/products/${id}`).pipe(
            tap((product) => {
              console.log(`single product-service=> ${product.title}`);
              this.product = product
              this.productChanged.next(this.product)
            })
          );
    }
}