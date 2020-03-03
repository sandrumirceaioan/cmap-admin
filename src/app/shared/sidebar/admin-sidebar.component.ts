import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon:'home', class: '' },
    { path: '/casinos', title: 'Casinos', icon:'dice', class: '' },
    { path: '/bonuses', title: 'Bonuses', icon:'trophy', class: '' },
    { path: '/slots', title: 'Slots', icon:'grip-horizontal', class: '' },
    { path: '/affiliates', title: 'Affiliates', icon:'handshake', class: '' },
    { path: '/settings', title: 'Settings', icon:'cog', class: '' },
    { path: '/templates', title: 'Templates', icon:'align-center', class: '' }
];

@Component({
    selector: 'admin-sidebar',
    templateUrl: 'admin-sidebar.component.html',
    styleUrls: ['admin-sidebar.component.scss']
})

export class AdminSidebarComponent implements OnInit {
    public menuItems: any[];
    public showNav = false;
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
