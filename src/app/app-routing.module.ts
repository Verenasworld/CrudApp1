import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { UserComponent } from './user/user/user.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserGuard } from './user/user.guard';
import { UserdetailGuard } from './user/userdetail.guard';
import { UserAuthGuard } from './user/user-auth.guard';
import { ModalAComponent } from './modal/modal-a/modal-a.component';
import { UserFormComponent } from './user/user-form/user-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path         : 'home', component: HomeComponent,
    canDeactivate: [ UserAuthGuard ]
  },
  {
    path       : 'user', component: UserComponent,
    canActivate: [ UserAuthGuard ],
    resolve    : {
      userlist: UserGuard
    },
    data       : {
      header     : 'Mitarbeiter',
      subheader  : 'netTrek',
      description: 'Lorem ipsum voluptatum.'
    }
  },
  {
    path       : 'user/:id', component: UserDetailsComponent,
    canActivate: [ UserAuthGuard ],
    resolve    : {
      user: UserdetailGuard
    }
  },
  {
    path: 'addUser', component: UserFormComponent, outlet: 'modal'
  },
  {
    path   : 'editUser/:id', component: UserFormComponent, outlet: 'modal',
    resolve: {
      user: UserdetailGuard
    }
  },
  {
    path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
    // path: 'contact', loadChildren: './contact-reactive/contact.module#ContactModule'
  },
  { path: 'dash', loadChildren: () => import('./dash/dash.module').then(m => m.DashModule) },
  { path: 'modalA', component: ModalAComponent, outlet: 'modal' },
  { path: '**', component: NotFoundComponent }
];

@NgModule ( {
  imports: [ RouterModule.forRoot ( routes, {
    useHash           : false, anchorScrolling: 'enabled',
    preloadingStrategy: PreloadAllModules/*, enableTracing: true*/
  } )
  ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
