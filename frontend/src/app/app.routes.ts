import { Routes } from '@angular/router';
import { PracticesComponent } from './shared/components/practices/practices.component';
import { RxjsComponent } from './shared/components/rxjs/rxjs.component';
import { SignalsComponent } from './shared/components/signals/signals.component';
import { NgrxComponent } from './shared/components/ngrx/ngrx.component';

export const routes: Routes = [
  { path: '', redirectTo: 'practices', pathMatch: 'full' },
  { path: 'practices', component: PracticesComponent },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'signals', component: SignalsComponent },
  { path: 'ngrx', component: NgrxComponent },
  { path: '**', redirectTo: 'practices' },
];
