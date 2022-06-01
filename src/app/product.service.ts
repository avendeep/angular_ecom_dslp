import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "./product.model";

@Injectable({providedIn:'root'})
export class ProductService{
   productsChanged = new Subject<Product[]>();

    private products: Product[] = [];

    constructor(){}


    setProducts(products: Product[]){
        this.products = products;
        this.productsChanged.next(this.products.slice())
        console.log(`from product-service ${this.products}`)
    }

    getProducts(){
        return this.products.slice();//returning copy of products array
    }
}