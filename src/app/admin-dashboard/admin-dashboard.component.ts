import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-dashboard',
    templateUrl: 'admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {
    dashboard: any;

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit(){
        this.dashboard = this.route.snapshot.data['dashboard'];
    }
}