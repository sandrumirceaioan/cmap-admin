import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { AdminSettingsService } from '../../../admin-settings/admin-settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-country-insert-modal',
  templateUrl: './country-insert-modal.component.html',
  styleUrls: ['./country-insert-modal.component.scss']
})
export class CountryInsertModalComponent implements OnInit {

  event: EventEmitter<any> = new EventEmitter();
  title: string;
  button: string;
  closeBtnName: string;
  selected: any = null;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private adminSettingsService: AdminSettingsService
  ) { }

  ngOnInit() {

  }

  selectedCountry(event) {
    this.selected = event;
  }

  confirm() {
    this.event.emit(this.selected);
    this.bsModalRef.hide();
  }


}
