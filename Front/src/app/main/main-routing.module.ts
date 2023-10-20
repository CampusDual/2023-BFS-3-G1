import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, PermissionsGuardService } from 'ontimize-web-ngx';

import { MainComponent } from './main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [PermissionsGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), data: { oPermission: { permissionId: 'home'}}},      
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'allergens', loadChildren: () => import('./allergens/allergens.module').then(m => m.AllergensModule) },
      { path: 'wholesaler-products', 
          loadChildren: () => import('./wholesaler-products/wholesaler-products.module').then(m => m.WholesalerProductsModule),
          data: { oPermission: { permissionId: 'wholesaler-products', restrictedPermissionsRedirect: '/main/home'}}},
      { path: 'wholesaler-stats', 
          loadChildren: () => import('./wholesaler-stats/wholesaler-stats.module').then(m => m.WholesalerStatsModule),
          data: { oPermission: { permissionId: 'wholesaler-stats', restrictedPermissionsRedirect: '/main/home'}}},
      { path: 'sectionfood', loadChildren: () => import('./sectionfood/sectionfood.module').then(m => m.SectionfoodModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
