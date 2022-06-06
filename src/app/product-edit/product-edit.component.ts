import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  isLoading = true;
  id: number;
  editMode: boolean = false;
  productForm: FormGroup;
  product: object;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode==false) {
        this.isLoading = false;
      }
      console.log('editMode ' + this.editMode + ' Id: ' + this.id);
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
  }

  onCancel() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  private initForm() {
    let productPrice = '';
    let productDescription = '';
    let productTitle = '';
    let productImage = '';
    let productCategory = '';

    if (this.editMode) {
      this.productService.getProduct(this.id).subscribe((response) => {
        if (response != false) {
          this.isLoading = false;
        }
        console.log(response);
        this.productForm = new FormGroup({
          title: new FormControl(response.title, Validators.required),
          price: new FormControl(response.price, Validators.required),
          image: new FormControl(response.image, Validators.required),
          description: new FormControl(
            response.description,
            Validators.required
          ),
          category: new FormControl(response.category, Validators.required),
        });
      });
    }

    this.productForm = new FormGroup({
      title: new FormControl(productTitle, Validators.required),
      price: new FormControl(productPrice, Validators.required),
      image: new FormControl(productImage, Validators.required),
      description: new FormControl(productDescription, Validators.required),
      category: new FormControl(productCategory, Validators.required),
    });
  }

}
