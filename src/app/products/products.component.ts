import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor( private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
       this.dataStorageService.fetchProducts().subscribe()
  }

}
