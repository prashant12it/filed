import { createAction, props } from '@ngrx/store';
import {Payment} from '../../payment';

export const loadPayments = createAction(
  '[Payment] Load Payments'
);
export const addPayments = createAction(
  '[Payment] Add Payments',
  (payment: Payment) => ({payment})
);




