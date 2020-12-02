import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthProcessService } from './services/auth-sync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    public authProcessService: AuthProcessService
  ) {}

  ngOnInit(): void {
    this.authProcessService.listenToUserEvents();
    this.router.navigate([`pages/dashboard`]);
  }
}
