import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesContentComponent } from './layout/pages-content/pages-content.component';
import { FullContentComponent } from './layout/full-content/full-content.component';
import { AuthGuard } from './guards/auth.guard';
//import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesContentComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'main',
    component: FullContentComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'error',
        loadChildren: () =>
          import('./main/error400/error400.module').then(
            (m) => m.Error400Module
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'pages/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'main/error/error-400',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
