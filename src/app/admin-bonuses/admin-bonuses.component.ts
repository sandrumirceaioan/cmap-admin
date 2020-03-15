import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminBonusesService } from './admin-bonuses.service';

@Component({
  selector: 'app-admin-bonuses',
  templateUrl: './admin-bonuses.component.html',
  styleUrls: ['./admin-bonuses.component.css']
})
export class AdminBonusesComponent implements OnInit {
  @ViewChild('myTable', { static: false }) table: any;
  @ViewChild('editButton', { static: true }) editButton: TemplateRef<any>;
  @ViewChild('deleteButton', { static: true }) deleteButton: any;
  @ViewChild('searchInput', { static: true }) searchInput: any;

  loading: boolean = false;
  bonuses: any;
  rows: any = [];
  columns: any = [];
  deleteConfirm: any = {};
  datePipe = {
    transform: (date) => {
      return moment(date).format('DD-MM-YYYY');
    }
  };

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    public adminBonusesService: AdminBonusesService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'bonusName', name: 'Bonus', sortable: true },
      { prop: 'bonusCasinoName', name: 'Casino', sortable: true },
      { prop: 'bonusType', name: 'Type', sortable: true },
      { prop: 'bonusStatus', name: 'Status', sortable: true },
      { prop: 'bonusCreated', name: 'Created', sortable: true, pipe: this.datePipe },
      { prop: 'edit', name: 'Edit', cellTemplate: this.editButton, sortable: false, width: 100 },
      { prop: 'delete', name: 'Delete', cellTemplate: this.deleteButton, sortable: false, width: 100 }
    ];
    this.bonuses = this.route.snapshot.data['bonuses'];
    console.log(this.bonuses);
    this.rows = this.bonuses.bonuses.data;
    this.adminBonusesService.page.count = this.bonuses.bonuses.count;
    this.adminBonusesService.page.skip = this.bonuses.bonuses.data.length;
    fromEvent(this.searchInput.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.adminBonusesService.page.search = value;
        this.reloadTable();
      });
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.adminBonusesService.page.offset = pageInfo.offset;
    this.reloadTable();
  }

  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    this.adminBonusesService.page.orderDir = sortInfo.sorts[0].dir;
    this.adminBonusesService.page.orderBy = sortInfo.sorts[0].prop;
    this.reloadTable();
  }

  reloadTable() {
    this.loading = true;
    this.adminBonusesService.getBonuses().subscribe(
      (result) => {
        this.adminBonusesService.page.count = result.count;
        this.adminBonusesService.page.skip = result.data.length;
        this.rows = result.data;
        this.loading = false;
      },
      (error) => {
        this.toastr.error(error);
      });
  }


  deleteBonus(row, confirm) {
    if (confirm === 'ask') {
      console.log(row);
      this.deleteConfirm[row._id] = true;
    } else {
      if (confirm) {
        this.adminBonusesService.deleteBonus(row._id).subscribe(
          (result) => {
            this.reloadTable();
            this.toastr.success(result.message);
          },
          (error) => {
            this.toastr.error(error);
          }
        );
        this.deleteConfirm[row._id] = false;
      } else {
        this.deleteConfirm[row._id] = false;
      }
    }
  }

  editBonus(row) {
    console.log(row);
    //this.router.navigate(['/bonuses', row._id]);
  }
}
