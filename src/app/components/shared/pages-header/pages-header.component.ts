import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppRoutingService } from '../../../services/app-routing.service';

@Component({
  selector: 'app-pages-header',
  templateUrl: './pages-header.component.html',
  styleUrls: ['./pages-header.component.scss'],
})
export class PagesHeaderComponent implements OnInit, OnDestroy {
  title: string = '';
  routerEvents: any;

  constructor(
    private router: Router,
    public appRoutingService: AppRoutingService
  ) {}

  ngOnInit(): void {
    this.title = this.appRoutingService.getRouteTitle();

    console.log(this.title);

    this.routerEvents = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.title = this.appRoutingService.getRouteTitle();
      });
  }

  ngOnDestroy() {
    this.routerEvents.unsubscribe();
  }
}
