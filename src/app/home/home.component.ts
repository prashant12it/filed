import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PaymentState} from '../store/reducer/payment.reducer';
import {selectPayments} from '../store/selector/payment.selectors';
import {Payment} from '../payment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Allpayments: Observable<Payment[]>;
  dataAvailable: boolean;

  constructor(private store: Store<PaymentState>) {
    this.Allpayments = this.store.pipe(select(selectPayments));
    this.Allpayments.subscribe((responce) => {
      (responce.length > 0 ? this.dataAvailable = true : this.dataAvailable = false)
    });
  }

  ngOnInit(): void {
  }

}
