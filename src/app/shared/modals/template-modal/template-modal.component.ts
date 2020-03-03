import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { AdminTemplatesService } from '../../../admin-templates/admin-templates.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-template-modal',
  templateUrl: './template-modal.component.html',
  styleUrls: ['./template-modal.component.scss']
})
export class TemplateModalComponent implements OnInit {

  event: EventEmitter<any> = new EventEmitter();
  title: string;
  button: string;
  closeBtnName: string;
  data: any;
  tamplateForm: any;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public adminTemplatesService: AdminTemplatesService
  ) { }

  ngOnInit() {
    this.tamplateForm = this.fb.group({
      templateType: [(this.data) ? this.data.templateType : null, Validators.required],
      templateName: [(this.data) ? this.data.templateName : null, Validators.required],
      templateContent: [(this.data) ? this.data.templateContent : null, Validators.required]
    });
  }

  confirm() {
    if (!this.data &&
      this.tamplateForm.controls.templateType.value &&
      this.tamplateForm.controls.templateName.value &&
      this.tamplateForm.controls.templateContent.value) {
      this.adminTemplatesService.addTemplate(this.tamplateForm.value).subscribe(
        (result) => {
          this.event.emit(result.data);
          this.toastr.success(result.message);
          this.bsModalRef.hide();
        },
        (error) => {
          this.toastr.error(error.message);
        }
      );
    } else if (this.data &&
      this.tamplateForm.controls.templateType.value &&
      this.tamplateForm.controls.templateName.value &&
      this.tamplateForm.controls.templateContent.value) {
      this.adminTemplatesService.updateTemplate(this.data._id, this.tamplateForm.value).subscribe(
        (result) => {
          this.event.emit(result.data);
          this.toastr.success(result.message);
          this.bsModalRef.hide();
        },
        (error) => {
          this.toastr.error(error.message);
        }
      );
    } else {
      this.toastr.error('All fields required!');
    }
  }

}
