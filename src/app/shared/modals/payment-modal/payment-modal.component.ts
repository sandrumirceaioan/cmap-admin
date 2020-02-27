import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { AdminSettingsService } from '../../../admin-settings/admin-settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {

  event: EventEmitter<any> = new EventEmitter();
  title: string;
  button: string;
  closeBtnName: string;
  data: any;
  formChange: Subscription;
  submit: boolean = false;
  paymentForm: any;
  paymentMethodLogo = new FormControl('');

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public adminSettingsService: AdminSettingsService
  ) { }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      paymentMethodName: [this.data.paymentMethodName, Validators.required],
      paymentMethodWebsite: [this.data.paymentMethodWebsite, Validators.required],
      paymentMethodLogo: [null, Validators.required]
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.paymentForm.get('paymentMethodLogo').setValue(file);
    }
  }

  confirm() {
    const formData = new FormData();
    formData.append('_id', this.data._id);
    formData.append('paymentMethodLogo', this.paymentForm.get('paymentMethodLogo').value);
    formData.append('paymentMethodName', this.paymentForm.get('paymentMethodName').value);
    formData.append('paymentMethodWebsite', this.paymentForm.get('paymentMethodWebsite').value);
    this.adminSettingsService.updatePayment(formData).subscribe(
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
