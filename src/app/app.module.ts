import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TagInputModule } from 'ngx-chips';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ColorPickerModule } from 'ngx-color-picker';
import { ToastrModule } from 'ngx-toastr';

import { CharCount } from './shared/pipes/charCount.pipe';
import { SafeStylePipe } from './shared/pipes/safeStyle.pipe';

import { AppComponent } from './app.component';

import { AdminHeaderComponent } from './shared/header/admin-header.component';
import { AdminFooterComponent } from './shared/footer/admin-footer.component';
import { AdminSidebarComponent } from './shared/sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCasinosComponent } from './admin-casinos/admin-casinos.component';
import { AdminSlotsComponent } from './admin-slots/admin-slots.component';
import { AdminBonusesComponent } from './admin-bonuses/admin-bonuses.component';
import { AdminAffiliatesComponent } from './admin-affiliates/admin-affiliates.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminDashboardResolve } from './admin-dashboard/admin-dashboard.resolve';
import { AdminCasinosResolve } from './admin-casinos/admin-casinos.resolve';
import { AdminCasinoComponent } from './admin-casino/admin-casino.component';
import { AdminCasinoResolve } from './admin-casino/admin-casino.resolve';
import { AdminSettingsResolve } from './admin-settings/admin-settings.resolve';
import { ProviderModalComponent } from './shared/modals/provider-modal/provider-modal.component';
import { AutocompleteComponent } from './shared/components/autocomplete/autocomplete.component';
import { PaymentModalComponent } from './shared/modals/payment-modal/payment-modal.component';
import { ProviderInsertModalComponent } from './shared/modals/provider-insert-modal/provider-insert-modal.component';
import { PaymentInsertModalComponent } from './shared/modals/payment-insert-modal/payment-insert-modal.component';
import { CountryInsertModalComponent } from './shared/modals/country-insert-modal/country-insert-modal.component';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminTemplatesComponent } from './admin-templates/admin-templates.component';
import { AdminTemplatesResolve } from './admin-templates/admin-templates.resolve';
import { TemplateModalComponent } from './shared/modals/template-modal/template-modal.component';

TagInputModule.withDefaults({

});

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    NotFoundComponent,
    CharCount,
    SafeStylePipe,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    AdminCasinosComponent,
    AdminSlotsComponent,
    AdminBonusesComponent,
    AdminAffiliatesComponent,
    AdminSettingsComponent,
    AdminCasinoComponent,
    AutocompleteComponent,
    ProviderModalComponent,
    ProviderInsertModalComponent,
    PaymentModalComponent,
    PaymentInsertModalComponent,
    CountryInsertModalComponent,
    AdminTemplatesComponent,
    TemplateModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxDatatableModule,
    TagInputModule,
    CKEditorModule,
    MDBBootstrapModule.forRoot(),
    UiSwitchModule.forRoot({
      switchColor: '#ffffff',
      defaultBgColor: '#a8b7bf',
      defaultBoColor : '#ffffff'
    }),
    ToastrModule.forRoot({
      enableHtml: true,
      timeOut: 4000,
      positionClass: 'toast-top-right'
    }),
    ModalModule.forRoot(),
    ColorPickerModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: RequestInterceptor,
      multi: true 
    },
    AuthGuard,
    AdminDashboardResolve,
    AdminCasinosResolve,
    AdminCasinoResolve,
    AdminSettingsResolve,
    AdminTemplatesResolve
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProviderModalComponent,
    ProviderInsertModalComponent,
    PaymentModalComponent,
    PaymentInsertModalComponent,
    CountryInsertModalComponent,
    TemplateModalComponent
  ]
})
export class AppModule { }
