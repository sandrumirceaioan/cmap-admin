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
  haveMetaDescription = false;

  selectedIntroDescription = null;
  selectedGamesDescription = null;
  selectedPaymentDescription = null;
  selectedPlatformDescription = null;
  selectedSecurityDescription = null;
  selectedFeedbackDescription = null;
  previewSelected: any;

  usedPlaceholders = [
    "casinoName",
    "casinoUrl",
    "casinoPlayUrl",
    "casinoWebsiteUrl",
    "casinoScore",
    "casinoReputation",
    "casinoLanguages",
    "casinoLiveChat",
    "casinoContact",
    "casinoOwner",
    "casinoEstablished",
    "casinoWithdrawalLimit",
    "casinoLicensingAuthorities",
    "casinoBonusesUrl",
    "casinoRestrictedCountries",
    "casinoType",
    "casinoAffiliateProgram",
    "casinoRtp",
    "casinoCurrencies",
    "casinoSoftwareProviders",
    "casinoDepositMethods",
    "casinoWithdrawalMethods",
    "casinoWithdrawalTimes",
    "casinoStatus"
  ];

  description: any = {
    intro: '',
    games: '',
    payment: '',
    platform: '',
    security: ''
  };

  descriptionList: any = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    public adminCasinosService: AdminCasinosService
  ) { }

  ngOnInit() {
    this.casino = this.route.snapshot.data['casino'].casino;
    this.descriptionList = this.route.snapshot.data['casino'].templates;
    this.updateUrl();
    if (this.casino.casinoMetaDescription && this.casino.casinoMetaDescription != '') {
      this.haveMetaDescription = true;
    }
  }

  setDescription(index, section) {
    if (index == null) return false;
    this.description[section] = this.descriptionList[section][index].template;
  }

  generateDescription() {
    let mergedDescription = '';
    for (var property in this.description) {
      mergedDescription = mergedDescription.concat(this.description[property]);
    }

    for (let i = 0, l = this.usedPlaceholders.length; i < l; i++) {
      let replaceValue = '';
      if (this.usedPlaceholders[i] === 'casinoSoftwareProviders') {
        replaceValue = _.pluck(_.first(this.casino.casinoSoftwareProviders, 10), 'name').join(', ');
      } else if (this.usedPlaceholders[i] === 'casinoRestrictedCountries') {
        replaceValue = _.pluck(_.first(this.casino.casinoRestrictedCountries, 10), 'name').join(', ');
      } else if (this.usedPlaceholders[i] === 'casinoDepositMethods') {
        replaceValue = _.pluck(_.first(this.casino.casinoDepositMethods, 10), 'name').join(', ');
      } else if (this.usedPlaceholders[i] === 'casinoWithdrawalMethods') {
        replaceValue = _.pluck(_.first(this.casino.casinoWithdrawalMethods, 10), 'name').join(', ');
      } else {
        replaceValue = this.casino[this.usedPlaceholders[i]];
      }

      // bold replaced placeholders
      var find = this.usedPlaceholders[i];
      var re = new RegExp(find, 'g');
      mergedDescription = mergedDescription.replace(re, '<b>' + replaceValue + '</b>');
    }

    this.previewSelected = mergedDescription;
  }

  setReputation(score) {
    if (!score) return '';
    this.casino.casinoReputation = this.adminCasinosService.getReputation(parseFloat(score));
  }

  updateCasino(draft) {
    if (draft) {
      this.casino['casinoDraft'] = true;
      this.casino['casinoPublished'] = false;
    }
    if (!draft) this.casino['casinoPublished'] = true;
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

  generateMetaDescription(description) {
    if (this.haveMetaDescription) {
      const regex = /(<([^>]+)>)/ig;
      this.casino['casinoMetaDescription'] = description.replace(regex, "");
    } else {
      this.casino['casinoMetaDescription'] = null;
    }
  }


}
