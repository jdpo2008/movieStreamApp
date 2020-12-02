import { Component, OnInit } from '@angular/core';
import { AuthProcessService } from '../../../services/auth-sync.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss'],
})
export class SidebarHeaderComponent implements OnInit {
  constructor(
    private _authService: AuthProcessService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signOut() {
    this._authService.signOut();
  }
}
