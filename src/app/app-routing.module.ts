import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { KeycloakGuard } from './keycloak.guard';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [KeycloakGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [KeycloakGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [KeycloakGuard]
  },
  {
    path: 'event',
    canActivate: [KeycloakGuard],
    loadChildren: () => import('../app/pages/event/event.module').then(m => m.EventModule)
  },
  {
    path: 'organizer',
    canActivate: [KeycloakGuard],
    loadChildren: () => import('../app/pages/organizer/organizer.module').then(m => m.OrganizerModule)
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [KeycloakGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [KeycloakGuard]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [KeycloakGuard]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [KeycloakGuard]
  },
  { path: 'organizer', loadChildren: () => import('./pages/organizer/organizer.module').then(m => m.OrganizerModule) },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent
  ]
})
export class AppRoutingModule { }
