import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions,
    private productService: ProductService) {
  }

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
      map((products: Product[]) => new productActions.LoadSuccess(products)),
      catchError(error => of(new productActions.LoadFail(error)))
    ))
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    mergeMap((action: productActions.UpdateProduct) => this.productService.updateProduct(action.product).pipe(
      map((product: Product) => new productActions.UpdateProductSuccess(product)),
      catchError(error => of(new productActions.UpdateProductFail(error)))
    ))
  );

  @Effect()
  addProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.AddProduct),
    mergeMap((action: productActions.AddProduct) => this.productService.addProduct(action.product).pipe(
      map((product: Product) => new productActions.AddProductSuccess(product)),
      catchError(error => of(new productActions.AddProductFail(error)))
    ))
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    mergeMap((action: productActions.DeleteProduct) => this.productService.deleteProduct(action.productId).pipe(
      map(() => new productActions.DeleteProductSuccess(action.productId)),
      catchError(error => of(new productActions.DeleteProductFail(error)))
    ))
  );
}
