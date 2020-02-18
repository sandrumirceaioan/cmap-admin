import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AdminCasinosService } from '../admin-casinos/admin-casinos.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProviderInsertModalComponent } from '../shared/modals/provider-insert-modal/provider-insert-modal.component';
import { PaymentInsertModalComponent } from '../shared/modals/payment-insert-modal/payment-insert-modal.component';
import { ToastrService } from 'ngx-toastr';
import { CountryInsertModalComponent } from '../shared/modals/country-insert-modal/country-insert-modal.component';
import * as _ from 'underscore';

@Component({
  selector: 'app-admin-casino',
  templateUrl: './admin-casino.component.html',
  styleUrls: ['./admin-casino.component.scss']
})
export class AdminCasinoComponent implements OnInit {
  casino: any = {};
  providers: any[] = [];
  selectedCountry: any;
  public Editor = ClassicEditor;
  config = {
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'numberedList', 'bulletedList', 'blockquote', 'undo', 'redo'],
    placeholder: 'Type the content here!'
  };
  bsModalRefProvider: BsModalRef;
  bsModalRefPayment: BsModalRef;
  bsModalRefCountry: BsModalRef;

  updatePaymentButton = false;

  selectedIntroDescription = null;
  selectedGamesDescription = null;
  selectedPaymentDescription = null;
  selectedPlatformDescription = null;
  selectedSecurityDescription = null;
  selectedFeedbackDescription = null;
  previewSelected: any;

  usedPlaceholders = [
    "casinoName",
    "casinoReputation",
    "casinoType",
    "casinoOwner",
    "casinoEstablished",
    "casinoLicensingAuthorities",
    "casinoSoftwareProviders"
  ];

  description: any = {
    intro: '',
    games: '',
    payment: '',
    platform: '',
    security: ''
  };

  descriptionList: any = {
    intro: [
      {
        index: 0,
        name: 'First',
        template: '<p>casinoName is part of the casinoOwner, and it is the main casino of this prominent gaming company. They offer an amazing range of online slot games from providers such as casinoSoftwareProviders. Their games are all available in both casinoType formats, so they are allowing players to enjoy their time on the casino with mobile devices or desktop units.</p>'
      }
    ],
    games: [
      {
        index: 0,
        name: 'First',
        template: '<h4>Providers and Games</h4><p>casinoSoftwareProviders are some of casinoName best software providers.</p><p>Among the games offered you can find popular titles such as [...].</p>'
      }
    ],
    payment: [
      {
        index: 0,
        name: 'First',
        template: `
        <h4>Deposit and Withdrawal</h4>
        <p>Unfortunately, there are some country restrictions here which includes but is not limited to residents from the United States of America. The casino will not accept players from jurisdictions where online gambling is illegal, and it is the players responsibility to check this before attempting to open an account. A list of restricted/allowed countries can be found under ‘more casino details’.</p>`
      }
    ],
    platform: [
      {
        index: 0,
        name: 'First',
        template: `
        <h4>Platform and Contact</h4>
        <p>Those who prefer gaming on the go for even more convenience can still play at the casino using their smartphone and tablet devices. Games are optimized to use anytime, anywhere and can be reached through a compatible mobile browser.</p>`
      }
    ],
    security: [
      {
        index: 0,
        name: 'First',
        template: `<h4>Security and Fairness</h4>
        <p>When it comes to security the casino uses a high level of secure connection which is verified by Comodo Limited. This ensure players personal and financial transactions are always kept secure and encrypted.</p>
        <p>They also use a random number generator, so members can play with confidence knowing the games have fair and random outcomes.</p>`
      }
    ]
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private adminCasinosService: AdminCasinosService
  ) { }

  ngOnInit() {
    this.casino = this.route.snapshot.data['casino'].casino;
    this.updateUrl();
    console.log(this.casino);
  }

  setDescription(index, section) {
    if (index == null) return false;
    console.log(index, section);
    this.description[section] = this.descriptionList[section][index].template;
    this.previewSelected = this.descriptionList[section][index].template;
  }

  generateDescription() {
    console.log(this.description);
    let mergedDescription = '';
    for (var property in this.description) {
      mergedDescription = mergedDescription.concat(this.description[property]);
    }

    for (let i = 0, l = this.usedPlaceholders.length; i < l; i++) {
      let replaceValue = '';
      if (this.usedPlaceholders[i] === 'casinoSoftwareProviders') {
        replaceValue = _.pluck(_.first(this.casino.casinoSoftwareProviders, 10), 'name').join(', ');
      } else {
        replaceValue = this.casino[this.usedPlaceholders[i]];
      }

      // // bold replaced placeholders
      // var find = this.usedPlaceholders[i];
      // var re = new RegExp(find, 'g');
      // mergedDescription = mergedDescription.replace(re, '<b>' + replaceValue + '</b>');
    }

    this.casino.casinoFullDescription = mergedDescription;
  }

  setReputation(score) {
    if (!score) return '';
    this.casino.casinoReputation = this.adminCasinosService.getReputation(parseFloat(score));
  }

  updateCasino(draft) {
    if (draft) this.casino['casinoDraft'] = true;
    if (!draft) this.casino['casinoPublished'] = true;
    console.log(this.casino);
    this.adminCasinosService.updateCasino(this.casino._id, this.casino).subscribe(
      (result) => {
        this.casino = result.data;
        this.toastr.success(result.message);
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  addSpecs(arr) {
    this.casino.casinoSpecs[arr].push("");
  }

  removeSpecs(arr, index) {
    this.casino.casinoSpecs[arr].splice(index, 1);
  }

  addWithdrawalTimes() {
    this.casino.casinoWithdrawalTimes.push({ type: '', duration: '' });
  }

  removeWithdrawalTimes(index) {
    this.casino.casinoWithdrawalTimes.splice(index, 1);
  }

  addWithdrawalMethods() {
    this.casino.casinoWithdrawalMethods.push({ name: '', url: '' });
  }

  removeWithdrawalMethods(index) {
    this.casino.casinoWithdrawalMethods.splice(index, 1);
  }

  addDepositMethods() {
    this.casino.casinoDepositMethods.push({ name: '', url: '' });
  }

  removeDepositMethods(index) {
    this.casino.casinoDepositMethods.splice(index, 1);
  }

  removeCountries(index) {
    this.casino.casinoRestrictedCountries.splice(index, 1);
  }

  insertProviderModal() {
    const initialState = {
      title: 'Select Software Provider',
      button: 'Insert'
    };
    this.bsModalRefProvider = this.modalService.show(ProviderInsertModalComponent, { initialState });
    this.bsModalRefProvider.content.event.subscribe(data => {
      this.casino.casinoSoftwareProviders.push({
        name: data.providerName,
        website: data.providerWebsite,
        logo: data.providerLogo
      });
    });

  }

  insertPaymentModal(list) {
    let title = list == 'casinoDepositMethods' ? 'Select Deposit Methods' : 'Select Withdrawal Methods';
    const initialState = {
      title: title,
      button: 'Insert'
    };
    this.bsModalRefPayment = this.modalService.show(PaymentInsertModalComponent, { initialState });
    this.bsModalRefPayment.content.event.subscribe(data => {
      this.casino[list].push({
        name: data.paymentMethodName,
        logo: data.paymentMethodLogo
      });
    });
  }

  insertCountriesModal() {
    const initialState = {
      title: 'Select Countries',
      button: 'Insert'
    };
    this.bsModalRefCountry = this.modalService.show(CountryInsertModalComponent, { initialState });
    this.bsModalRefCountry.content.event.subscribe(data => {
      this.casino.casinoRestrictedCountries.push({
        name: data.countryName,
        code: data.countryCode
      });
    });
  }

  removeSoftwareProviders(index) {
    this.casino.casinoSoftwareProviders.splice(index, 1);
  }

  updatePaymentMethodsData() {
    this.updatePaymentButton = false;
    this.adminCasinosService.updatePaymentMethodsData({
      deposit: this.casino.casinoDepositMethods,
      withdrawal: this.casino.casinoWithdrawalMethods
    }).subscribe(
      (result) => {
        if (
          this.casino.casinoDepositMethods.length !== result.data.deposit.length ||
          this.casino.casinoWithdrawalMethods.length !== result.data.withdrawal.length ||
          result.data.notFound.length > 0
        ) {
          console.log(result);
          this.toastr.error('Check payment methods!');
        } else {
          this.casino.casinoDepositMethods = result.data.deposit;
          this.casino.casinoWithdrawalMethods = result.data.withdrawal;
          this.toastr.success(result.message);
          this.updatePaymentButton = true;
        }
      }, (error) => {
        this.toastr.error(error.message);
      }
    );
  }

  updatePaymentMethods() {
    this.adminCasinosService.updateCasino(this.casino._id, {
      casinoDepositMethods: this.casino.casinoDepositMethods,
      casinoWithdrawalMethods: this.casino.casinoWithdrawalMethods
    }).subscribe(
      (result) => {
        this.toastr.success(result.message);
        this.updatePaymentButton = false;
      }, (error) => {
        this.toastr.error(error.message);
      }
    );
  }

  updateUrl() {
    if (!this.casino.casinoUrlCustom) {
      let url = this.casino.casinoName.replace(/[^a-zA-Z0-9]+/g, "-").replace(/\?/g, '');
      this.casino.casinoUrl = url.toLowerCase();
    }
  }



}
