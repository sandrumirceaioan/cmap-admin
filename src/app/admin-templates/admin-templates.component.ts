import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminTemplatesService } from './admin-templates.service';
import { ActivatedRoute } from '@angular/router';
import { TemplateModalComponent } from '../shared/modals/template-modal/template-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-templates',
  templateUrl: './admin-templates.component.html',
  styleUrls: ['./admin-templates.component.scss']
})
export class AdminTemplatesComponent implements OnInit {

  @ViewChild('myTemplatesTable', { static: false }) table: any;
  @ViewChild('searchTemplates', { static: true }) searchCountries: any;
  @ViewChild('templateEditButton', { static: true }) templateEditButton: any;

  bsModalRef: BsModalRef;
  templates: any;

  rows: any = [];
  columns: any = [];

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
    public adminTemplatesService: AdminTemplatesService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'templateName', name: 'Name', sortable: true },
      { prop: 'templateType', name: 'Type', sortable: true },
      { prop: 'templateContent', name: 'Content', sortable: true },
      { prop: 'templateEdit', name: 'Edit', cellTemplate: this.templateEditButton, sortable: false, width: 50 }
    ];

    this.templates = this.route.snapshot.data['settings'];
    this.rows = this.templates.templates;
    this.temp = [...this.templates.templates];
    console.log(this.templates);
  }

  openTemplateModal(row) {
    const initialState = {
      data: row,
      title: row ? 'Edit ' + row.templateName : 'Add template',
      button: row ? 'update' : 'add'
    };
    this.bsModalRef = this.modalService.show(TemplateModalComponent, { initialState, backdrop: 'static', keyboard: false });
    this.bsModalRef.content.event.subscribe(data => {
      if (row) {
        row.templateName = data.templateName;
        row.templateType = data.templateType;
        row.templateContent = data.templateContent;
      } else {
        this.rows = [...this.rows, data];
      }
    });
  }

  updateFilterTemplates(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.templateName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
