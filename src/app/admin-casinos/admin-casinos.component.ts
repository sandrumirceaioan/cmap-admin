import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { AdminCasinosService } from './admin-casinos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-casinos',
  templateUrl: './admin-casinos.component.html',
  styleUrls: ['./admin-casinos.component.scss']
})
export class AdminCasinosComponent implements OnInit {
  @ViewChild('myTable', { static: false }) table: any;
  @ViewChild('rowImage', { static: true }) rowImage: TemplateRef<any>;
  @ViewChild('editButton', { static: true }) editButton: TemplateRef<any>;
  @ViewChild('detailsButton', { static: true }) detailsButton: any;
  @ViewChild('searchInput', { static: true }) searchInput: any;

  loading: boolean = false;
  casinos: any;
  rows: any = [];
  columns: any = [];
  expanded: any = {};
  datePipe = {
    transform: (date) => {
      return moment(date).format('DD-MM-YYYY');
    }
  };

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    public adminCasinosService: AdminCasinosService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'casinoLogo', name: 'Logo', cellTemplate: this.rowImage, sortable: false, width: 50 },
      { prop: 'casinoName', name: 'Casino', sortable: true },
      { prop: 'casinoWebsiteUrl', name: 'Website', sortable: true },
      { prop: 'casinoCreated', name: 'Created', sortable: true, pipe: this.datePipe },
      { prop: 'casinoReputation', name: 'Reputation', sortable: true },
      { prop: 'casinoPublished', name: 'Published', sortable: true },
      { prop: 'edit', name: 'Edit', cellTemplate: this.editButton, sortable: false, width: 100 },
      { prop: 'details', name: 'Details', cellTemplate: this.detailsButton, sortable: false, width: 50 }
    ];
    this.casinos = this.route.snapshot.data['casinos'];
    console.log(this.casinos);
    this.rows = this.casinos.casinos.data;
    this.adminCasinosService.page.count = this.casinos.casinos.count;
    this.adminCasinosService.page.skip = this.casinos.casinos.data.length;
    fromEvent(this.searchInput.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.adminCasinosService.page.search = value;
        this.reloadTable();
      });
  }

  filterTable(status) {
    if (status === 'all') {
      this.adminCasinosService.page.filter.published = null;
      this.reloadTable();
    } else {
      this.adminCasinosService.page.filter.published = status;
      this.reloadTable();
    }
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.adminCasinosService.page.offset = pageInfo.offset;
    this.reloadTable();
  }

  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    this.adminCasinosService.page.orderDir = sortInfo.sorts[0].dir;
    this.adminCasinosService.page.orderBy = sortInfo.sorts[0].prop;
    this.reloadTable();
  }

  reloadTable() {
    this.loading = true;
    this.adminCasinosService.getCasinos().subscribe(
      (result) => {
        this.adminCasinosService.page.count = result.count;
        this.adminCasinosService.page.skip = result.data.length;
        this.rows = result.data;
        this.loading = false;
      },
      (error) => {
        this.toastr.error(error);
      });
  }


  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  editCasino(row) {
    this.router.navigate(['/casinos', row._id]);
  }

}
