import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState extends fromRoot.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  currentProductId: number,
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  currentProductId: null,
  products: []
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getProductFeatureState, productState => productState.showProductCode);
export const getCurrentProduct = createSelector(getProductFeatureState, productState => productState.currentProduct);
export const getCurrentProductId = createSelector(getProductFeatureState, productState => productState.currentProductId);
export const getProducts = createSelector(getProductFeatureState, productState => productState.products);
export const getCurrentProductById = createSelector(getProducts, getCurrentProductId, (products, currentProductId) => {
  return products.find(p => p.id === currentProductId);
});

export function reducer(state: ProductState = initialState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload
      };

    default:
      return state;
  }
}
