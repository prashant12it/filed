import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CardPaymentComponent} from './card-payment/card-payment.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


const routes: Routes = [{path: '', component: HomeComponent},
  {path: 'card-payment', component: CardPaymentComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
