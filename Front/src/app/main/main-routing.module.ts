import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

export const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'sectionfood', loadChildren: () => import('./sectionfood/sectionfood.module').then(m => m.SectionfoodModule) },
      { path: 'admon-products', loadChildren: () => import('./admon-products/admon-products.module').then(m => m.AdmonProductsModule),
      data: { oPermission: { permissionId: 'admin-products', restrictedPermissionsRedirect: '/main/home'}} },
      { path: 'admon-categories', loadChildren: () => import('./admon-categories/admon-categories.module').then(m => m.AdmonCategoriesModule),
      data: { oPermission: { permissionId: 'admin-categories', restrictedPermissionsRedirect: '/main/home'}} },
      { path: 'wholesaler-products', 
      loadChildren: () => import('./wholesaler-products/wholesaler-products.module').then(m => m.WholesalerProductsModule),
      data: { oPermission: { permissionId: 'wholesaler-products', restrictedPermissionsRedirect: '/main/home'}}},
      { path: 'wholesaler-stats', 
      loadChildren: () => import('./wholesaler-stats/wholesaler-stats.module').then(m => m.WholesalerStatsModule),
      data: { oPermission: { permissionId: 'wholesaler-stats', restrictedPermissionsRedirect: '/main/home'}}},
      { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
      { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: 'shoppingcart', loadChildren:()=> import('./shoppingcart/shoppingcart.module').then(m => m.ShoppingcartModule)},
      { path: 'sales', loadChildren:()=> import('./sales/sales.module').then(m => m.SalesModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
