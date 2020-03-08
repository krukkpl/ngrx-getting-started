import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

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

export function reducer(state: ProductState = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.showProductCode
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.product }
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      };
    default:
      return state;
  }
}
