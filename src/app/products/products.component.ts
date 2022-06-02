import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { DataStorageService } from '../shared/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit,OnDestroy {
  isLoading:boolean=true;
  products: Product[]=[];
  productsSliced:Product[]= [];
  private subscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private productService: ProductService,
    private route:ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchProducts().subscribe();

    this.subscription = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
        this.productsSliced = this.products.slice(0,6)
        this.isLoading= false;
      }
    );
  }

  OnPageChange(event :PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.products.length){
      endIndex = this.products.length;
    } 
    this.productsSliced = this.products.slice(startIndex,endIndex);
  }

  onEditProduct(id:number){
    this.router.navigate([`${id}/edit`],{relativeTo:this.route})
    console.log(id)
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
