import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import * as fromProduct from '../state/products.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<fromProduct.AppState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(fromProduct.getCurrentProduct), takeWhile(() => this.componentActive)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.store.dispatch(new productActions.Load());

    this.store.pipe(select(fromProduct.getProducts), takeWhile(() => this.componentActive)).subscribe(
      products => this.products = products
    );

    this.store.pipe(select(fromProduct.getShowProductCode), takeWhile(() => this.componentActive)).subscribe(
      showProductCode => {
        this.displayCode = showProductCode;
      }
    );

    this.store.pipe(select(fromProduct.getError), takeWhile(() => this.componentActive)).subscribe(
      error => {
        this.errorMessage = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
