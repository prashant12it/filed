import {Action, createReducer, on} from '@ngrx/store';
import {Payment} from '../../payment';
import * as PaymentActions from '../actions/payment.actions';


export const paymentFeatureKey = 'payment';

export interface PaymentState {
  payments: Payment[];
}

export const initialState: PaymentState = {
  payments: []
};


export const paymentReducer = createReducer(
  initialState,
  on(PaymentActions.addPayments,
    (state: PaymentState, {payment}) =>
      ({
        ...state,
        payments: [...state.payments, payment]
      }))
);

export function reducer(state: PaymentState | undefined, action: Action): any {
  return paymentReducer(state, action);
}
