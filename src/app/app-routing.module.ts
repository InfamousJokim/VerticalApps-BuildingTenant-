import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'requestdelivery',
    loadChildren: () => import('./pages/odeliveryform/requestdelivery/requestdelivery.module').then( m => m.RequestdeliveryPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/odeliveryform/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./pages/odeliveryform/confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },
  {
    path: 'odeliveryform',
    loadChildren: () => import('./pages/odeliveryform/odeliveryform.module').then( m => m.OdeliveryformPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path:'unassign_cart/change_datetime', 
    loadChildren: ()=> import ('./pages/update-cart-delivery-datetime/update-cart-delivery-datetime.module').then( m => m.UpdateCartDeliveryDatetimeModule)
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
