import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { AdminSettingsService } from '../../../admin-settings/admin-settings.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Input() label: string;
  @Input() data: string;
  @Input() property: string;
  @ViewChild('searchInput', { static: true }) searchInput: any;
  @Output() onSelect = new EventEmitter();
  list: any[] = [];
  showList: boolean = false;

  constructor(
    private adminSettingsService: AdminSettingsService
  ) { }

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        if (value) {
          this.showList = true;
          this.adminSettingsService.search(this.data, value).subscribe(
            (result) => {
              this.list = result;
            });
        } else {
          this.list = [];
        }
      });
  }

  onSelectItem(item) {
    this.onSelect.emit(item);
    this.searchInput.nativeElement.value = null;
    this.showList = false;
    this.list = []
  }

  clear() {
    this.searchInput.nativeElement.value = null;
    this.list = [];
  }

}


