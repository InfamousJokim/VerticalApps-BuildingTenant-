import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
      path: 'dashboard', 
      children: [{
        path: '', 
        loadChildren: () => import("../pages/dashboard/dashboard.module").then(m => m.DashboardPageModule)
      }]
    },
    {
      path: 'deliveryrecord', 
      children: [{
        path: '', 
        loadChildren: () => import("../pages/deliveryrecord/deliveryrecord.module").then(m => m.DeliveryrecordPageModule)
      }]
    }, 
    {
      path: 'camera', 
      children: [{
        path: '', 
        loadChildren: () => import("../pages/camera/camera.module").then(m => m.CameraPageModule)
      }]
    }, {
      path: 'notification', 
      children: [{
        path: '', 
        loadChildren: () => import("../pages/notification/notification.module").then(m => m.NotificationPageModule)
      }]
    },
    {
      path: 'setting', 
      children: [{
        path: '', 
        loadChildren: () => import("../pages/setting/setting.module").then(m => m.SettingPageModule)
      }]
    },
    {
      path: '', 
      redirectTo: '/login',
      pathMatch: 'full'
    }

  ]
  },
  {
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
