import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { Product } from '../product';


export interface AppState extends fromRoot.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getProductFeatureState, productState => productState.showProductCode);
export const getCurrentProductId = createSelector(getProductFeatureState, productState => productState.currentProductId);
export const getProducts = createSelector(getProductFeatureState, productState => productState.products);
export const getError = createSelector(getProductFeatureState, productState => productState.error);
export const getCurrentProduct = createSelector(getProducts, getCurrentProductId, (products, currentProductId) => {
  if (currentProductId === 0) {
    return {
      id: 0,
      productName: '',
      productCode: 'New',
      description: '',
      starRating: 0
    };
  } else {
    return currentProductId ? products.find(p => p.id === currentProductId) : null;
  }
});
