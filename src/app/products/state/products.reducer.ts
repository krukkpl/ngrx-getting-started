import { ProductActions, ProductActionTypes } from './product.actions';
import { ProductState } from '.';


const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

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
      case ProductActionTypes.DeleteProductSuccess:
        return {
          ...state,
          products: [ ...state.products.filter(x => x.id !== action.productId)],
        };
      case ProductActionTypes.DeleteProductFail:
        return {
          ...state,
          error: action.errorMessage
        };
    default:
      return state;
  }
}
