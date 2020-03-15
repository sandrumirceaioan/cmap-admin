import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDashboardResolve } from './admin-dashboard/admin-dashboard.resolve';
import { AdminCasinosComponent } from './admin-casinos/admin-casinos.component';
import { AdminCasinosResolve } from './admin-casinos/admin-casinos.resolve';
import { AdminCasinoComponent } from './admin-casino/admin-casino.component';
import { AdminCasinoResolve } from './admin-casino/admin-casino.resolve';
import { AdminBonusesComponent } from './admin-bonuses/admin-bonuses.component';
import { AdminSlotsComponent } from './admin-slots/admin-slots.component';
import { AdminAffiliatesComponent } from './admin-affiliates/admin-affiliates.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminSettingsResolve } from './admin-settings/admin-settings.resolve';
import { AdminTemplatesComponent } from './admin-templates/admin-templates.component';
import { AdminTemplatesResolve } from './admin-templates/admin-templates.resolve';
import { AdminBonusesResolve } from './admin-bonuses/admin-bonuses.resolve';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Admin' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        data: { breadcrumb: 'Dashboard' },
        resolve: {
          dashboard: AdminDashboardResolve
        }
      },
      {
        path: 'casinos',
        component: AdminCasinosComponent,
        data: { breadcrumb: 'Casinos' },
        resolve: {
          casinos: AdminCasinosResolve
        }
      },
      {
        path: 'casinos/:id',
        component: AdminCasinoComponent,
        data: { breadcrumb: 'Casino' },
        resolve: {
          casino: AdminCasinoResolve
        }
      },
      {
        path: 'bonuses',
        component: AdminBonusesComponent,
        data: { breadcrumb: 'Bonuses' },
        resolve: {
          bonuses: AdminBonusesResolve
        }
      },
      {
        path: 'slots',
        component: AdminSlotsComponent,
        data: { breadcrumb: 'Slots' }
        // resolve: {
        //   dashboard: DashboardResolve
        // }
      },
      {
        path: 'affiliates',
        component: AdminAffiliatesComponent,
        data: { breadcrumb: 'Affiliates' }
        // resolve: {
        //   dashboard: DashboardResolve
        // }
      },
      {
        path: 'settings',
        component: AdminSettingsComponent,
        data: { breadcrumb: 'Settings' },
        resolve: {
          settings: AdminSettingsResolve
        }
      },
      {
        path: 'templates',
        component: AdminTemplatesComponent,
        data: { breadcrumb: 'Templates' },
        resolve: {
          settings: AdminTemplatesResolve
        }
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
