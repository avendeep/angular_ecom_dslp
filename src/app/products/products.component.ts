import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit,OnDestroy {
  isLoading:boolean=true;
  products: Product[];
  private subscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchProducts().subscribe();

    this.subscription = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
        this.isLoading= false;
      }
    );
    
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
