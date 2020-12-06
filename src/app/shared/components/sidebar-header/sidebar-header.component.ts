import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthProcessService } from '../../../services/auth-sync.service';
import { Router } from '@angular/router';
import { User } from '@firebase/auth-types';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss'],
})
export class SidebarHeaderComponent implements OnInit, OnDestroy {
  userSuscription: Subscription;
  displayName: string;
  photoURL: string;
  constructor(
    private _authService: AuthProcessService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSuscription = this._authService.user$.pipe(map((res: User) => { return {displayName: res.displayName, photoURL: res.photoURL}})).subscribe((data: any) => {
      this.displayName = data.displayName;
      this.photoURL = data.photoURL;
    });
  }

  ngOnDestroy() {
    this.userSuscription.unsubscribe();
  }

  signOut() {
    this._authService.signOut();
  }
}
