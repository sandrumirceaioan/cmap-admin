import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  currentPage: any;
  breadcrumbs: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subscribeNavigationEnd(this.route.root);
  }

  ngOnInit() {

  }

  logout() {
    localStorage.removeItem('cboTokenA');
    this.router.navigate(['/login']);
  }

  subscribeNavigationEnd(current) {
    this.router
      .events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => {
          let route = current.firstChild;
          let child = route;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
              route = child;
            } else {
              child = null;
            }
          }
          return route;
        }),
        mergeMap(route => route.data))
      .subscribe(data => {
        this.currentPage = data;
      })

  }

}
