import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';
import { act } from '@ngrx/effects';

export interface AppState extends fromRoot.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

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
        currentProductId: action.product.id
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.products,
        error: ''
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.errorMessage
      };
    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products.map(item => item.id === action.product.id ? action.product : item);
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.product.id,
        error: ''
      };
    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.errorMessage
      };
    case ProductActionTypes.AddProductSuccess:
      return {
        ...state,
        products: [ ...state.products, action.product],
        currentProductId: action.product.id,
        error: ''
      };
    case ProductActionTypes.AddProductFail:
      return {
        ...state,
        error: action.errorMessage
      };
    default:
      return state;
  }
}
