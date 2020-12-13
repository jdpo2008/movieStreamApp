import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { AuthProvider } from '../../enums';
import { AuthProcessService } from '../../services/auth-sync.service';

@Component({
  selector: 'app-auth-providers',
  templateUrl: './auth-providers.component.html',
  styleUrls: ['./auth-providers.component.scss']
})
export class AuthProvidersComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef, private _authService: AuthProcessService) { }

  ngOnInit(): void {
  }

  googleLogin() {
    this.cd.markForCheck();
    this._authService.signInWith(AuthProvider.Google).finally(() => this.cd.markForCheck());
  }

  facebookLogin() {
    this.cd.markForCheck();
    this._authService.signInWith(AuthProvider.Facebook).finally(() => this.cd.markForCheck());
  }

  twitterLogin() {
    this.cd.markForCheck();
    this._authService.signInWith(AuthProvider.Twitter).finally(() => this.cd.markForCheck());
  }

}
