import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  productForm: FormGroup;
  subscription: Subscription;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
      console.log('Updated executed');
    } else {
      this.productService.addProduct(this.productForm.value);
      console.log('add new executed');
    }
    this.onCancel();
    console.log(this.productForm.value);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let productTitle = '';
    let productPrice = '';
    let productDescription = '';
    let productImage = '';
    let productCategory = '';

    if (this.editMode) {
      this.product = this.productService.getProduct(this.id).subscribe();
      this.subscription = this.productService.productChanged.subscribe(
        (product: any) => {
          this.product = product;
          //this.isLoading= false;
        }
      );
      productTitle = this.product.title;
      productPrice = this.product.price;
      productDescription = this.product.description;
      productImage = this.product.image;
      productCategory = this.product.category;
    }

    this.productForm = new FormGroup({
      title: new FormControl(productTitle, Validators.required),
      price: new FormControl(productPrice, Validators.required),
      description: new FormControl(productDescription, Validators.required),
      image: new FormControl(productImage, Validators.required),
      category: new FormControl(productCategory, Validators.required),
    });
  }

  ngOnDestroy(): void {
    if(this.editMode){
      this.subscription.unsubscribe();
    }
  }
}
