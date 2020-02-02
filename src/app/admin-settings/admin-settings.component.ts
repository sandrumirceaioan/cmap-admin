import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AdminSettingsService } from './admin-settings.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProviderModalComponent } from '../shared/modals/provider-modal/provider-modal.component';
import { PaymentModalComponent } from '../shared/modals/payment-modal/payment-modal.component';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  @ViewChild('myCountriesTable', { static: false }) table: any;
  @ViewChild('myProvidersTable', { static: false }) table1: any;
  @ViewChild('myPaymentsTable', { static: false }) table2: any;

  @ViewChild('searchCountries', { static: true }) searchCountries: any;
  @ViewChild('searchProviders', { static: true }) searchProviders: any;
  @ViewChild('searchPayments', { static: true }) searchPayments: any;

  @ViewChild('countryImage', { static: true }) countryImage: TemplateRef<any>;
  @ViewChild('providerImage', { static: true }) providerImage: TemplateRef<any>;
  @ViewChild('paymentImage', { static: true }) paymentImage: TemplateRef<any>;

  @ViewChild('providerEditButton', { static: true }) providerEditButton: any;
  @ViewChild('paymentEditButton', { static: true }) paymentEditButton: any;

  bsModalRef: BsModalRef;
  settings: any;

  rows: any = [];
  columns: any = [];

  rows1: any = [];
  columns1: any = [];

  rows2: any = [];
  columns2: any = [];

  expanded: any = {};
  datePipe = {
    transform: (date) => {
      return moment(date).format('DD-MM-YYYY');
    }
  };
  temp = [];
  temp1 = [];
  temp2 = [];

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private adminSettingsService: AdminSettingsService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'countryFlag', name:'Flag', cellTemplate: this.countryImage, sortable: false, width: 50 },
      { prop: 'countryName', name:'Name', sortable: true },
      { prop: 'countryCode', name:'Code', sortable: true }
    ];
    this.columns1 = [
      { prop: 'providerLogo', name:'Logo', cellTemplate: this.providerImage, sortable: false, width: 50 },
      { prop: 'providerName', name:'Name', sortable: true },
      { prop: 'providerWebsite', name:'Url', sortable: true },
      { prop: 'providerEdit', name: 'Edit', cellTemplate: this.providerEditButton, sortable: false, width: 50 }
    ];
    this.columns2 = [
      { prop: 'paymentMethodLogo', name:'Logo', cellTemplate: this.paymentImage, sortable: false, width: 50 },
      { prop: 'paymentMethodName', name:'Name', sortable: true },
      { prop: 'paymentMethodWebsite', name:'Url', sortable: true },
      { prop: 'paymentEdit', name: 'Edit', cellTemplate: this.paymentEditButton, sortable: false, width: 50 }
    ];
    this.settings = this.route.snapshot.data['settings'];
    this.rows = this.settings.countries;
    this.rows1 = this.settings.providers;
    this.rows2 = this.settings.payments;
    this.temp = [...this.settings.countries];
    this.temp1 = [...this.settings.providers];
    this.temp2 = [...this.settings.payments];
    console.log(this.settings);
  }

  openProviderModal(row) {
    const initialState = {
      data: row,
      title: 'Edit ' + row.providerName,
      button: 'update'
    };
    this.bsModalRef = this.modalService.show(ProviderModalComponent, {initialState});
    this.bsModalRef.content.event.subscribe(data => {
      row.providerName = data.providerName;
      row.providerWebsite = data.providerWebsite;
      row.providerLogo = data.providerLogo;
    });
  }

  openPaymentModal(row) {
    const initialState = {
      data: row,
      title: 'Edit ' + row.paymentMethodName,
      button: 'update'
    };
    this.bsModalRef = this.modalService.show(PaymentModalComponent, {initialState});
    this.bsModalRef.content.event.subscribe(data => {
      row.paymentMethodName = data.paymentMethodName;
      row.paymentMethodWebsite = data.paymentMethodWebsite;
      row.paymentMethodLogo = data.paymentMethodLogo;
    });
  }

  updateFilterCountries(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.countryName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateFilterProviders(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp1.filter(function(d) {
      return d.providerName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows1 = temp;
    // Whenever the filter changes, always go back to the first page
    this.table1.offset = 0;
  }

  updateFilterPayments(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp2 = this.temp2.filter(function(d) {
      return d.paymentMethodName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows2 = temp2;
    // Whenever the filter changes, always go back to the first page
    this.table2.offset = 0;
  }

}
