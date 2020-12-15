import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Payment} from '../payment';
import {addPayments} from '../store/actions/payment.actions';
import {PaymentState} from '../store/reducer/payment.reducer';
import {Observable} from 'rxjs';
import {selectPayments} from '../store/selector/payment.selectors';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent implements OnInit {
  TomorrowDate;
  getAllPayments: Observable<Payment[]>;
  totalDataCount: number = 0;
  previousDataCount: number = 0;
  success: boolean = false;
  failure: boolean = false;
  ValidationError: boolean = false;
  @ViewChild('paymentForm') paymentForm: NgForm;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<PaymentState>) {
    this.getAllPayments = this.store.pipe(select(selectPayments));
  }

  ngOnInit(): void {
    this.TomorrowDate = this.getYourDate('Tomorrow');
    this.getAllPayments.subscribe((responce) => {
      this.totalDataCount = responce.length;
    });
    this.previousDataCount = this.totalDataCount;
  }

  resetPaymentForm() {
    this.paymentForm.reset();
  }

  getYourDate(opt) {
    const today = new Date();
    const dd = (opt == 'Tomorrow' ? today.getDate() + 1 : today.getDate());
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    const finaldate = yyyy + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd);
    return finaldate;
  }

  cardPayment(ele: NgForm) {
    this.success = false;
    this.failure = false;
    this.ValidationError = false;
    if (this.paymentForm.valid && this.paymentForm.value.cardNumber.trim().length > 0 && this.paymentForm.value.cardHolder.trim().length > 0 && this.getYourDate('Today') < this.paymentForm.value.expirationDate.trim() && this.paymentForm.value.securityCode.trim().length === 3 && this.paymentForm.value.amount.trim()) {
      const payment = new Payment();
      payment.cardNumber = this.paymentForm.value.cardNumber.trim();
      payment.cardHolder = this.paymentForm.value.cardHolder.trim();
      payment.expirationDate = this.paymentForm.value.expirationDate.trim();
      payment.securityCode = this.paymentForm.value.securityCode.trim();
      payment.amount = this.paymentForm.value.amount.trim();

      this.store.dispatch(addPayments(payment));
      if (this.totalDataCount > this.previousDataCount) {
        this.success = true;
        this.previousDataCount = this.totalDataCount;
        this.resetPaymentForm();
        const thisvar = this;
        setTimeout(function () {
          thisvar.router.navigate(['/']);
        }, 2000);
      } else {
        this.failure = true;
      }
    } else {
      this.ValidationError = true;
    }
  }
}
