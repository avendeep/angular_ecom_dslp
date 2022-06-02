import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit,OnDestroy {
  isLoading:boolean= true;
  product:any;
  id: number;
  subscription:Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.product = this.productService.getProduct(this.id).subscribe()
      }
    )

    this.subscription = this.productService.productChanged.subscribe(
      (product: any) => {
        this.product = product;
        this.isLoading= false;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
