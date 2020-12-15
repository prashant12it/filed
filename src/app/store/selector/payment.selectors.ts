import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromPayment from '../reducer/payment.reducer';

export const selectPaymentState = createFeatureSelector<fromPayment.PaymentState>(
  fromPayment.paymentFeatureKey
);
export const selectPayments = createSelector(
  selectPaymentState,
  (state: fromPayment.PaymentState) => state.payments
);
