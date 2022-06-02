import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog'

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { DataStorageService } from '../shared/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

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
    private router: Router,
    public dialog: MatDialog
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

  openDialog(id:number,title:string){
    let dialogRef = this.dialog.open(DialogComponent,{data:{name:title}})
    dialogRef.afterClosed().subscribe(res =>{
      console.log(`Delete result: ${res}`)
      if(res == true){
        this.productService.deleteProduct(id)
      }
    })
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
