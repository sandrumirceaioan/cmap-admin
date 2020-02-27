import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { AdminSettingsService } from '../../../admin-settings/admin-settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: ['./provider-modal.component.scss']
})
export class ProviderModalComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();
  title: string;
  button: string;
  closeBtnName: string;
  data: any;
  formChange: Subscription;
  submit: boolean = false;
  providerForm: any;
  providerLogo = new FormControl('');
 
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public adminSettingsService: AdminSettingsService
    ) { }
 
  ngOnInit() {
    this.providerForm = this.fb.group({
      providerName: [this.data.providerName, Validators.required],
      providerWebsite: [this.data.providerWebsite, Validators.required],
      providerLogo: [null, Validators.required]
    });
  }

    onFileChange(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.providerForm.get('providerLogo').setValue(file);
      }
    }

  confirm() {
    const formData = new FormData();
    formData.append('_id', this.data._id);
    formData.append('providerLogo', this.providerForm.get('providerLogo').value);
    formData.append('providerName', this.providerForm.get('providerName').value);
    formData.append('providerWebsite', this.providerForm.get('providerWebsite').value);
    this.adminSettingsService.updateProvider(formData).subscribe(
      (result) => {
        this.event.emit(result.data);
        this.toastr.success(result.message);
        this.bsModalRef.hide();
      },
      (error) => {
        this.toastr.error(error.message);
      }
    )
  }

}
