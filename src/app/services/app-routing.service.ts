import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppRoutingService {
  constructor(private router: Router, private _route: ActivatedRoute) {}

  public getRouteTitle(): string {
    return this.getRouteData('title');
  }

  private getRouteData(data: string): any {
    const root = this.router.routerState.snapshot.root.children[0].routeConfig
      .children[0].data[data];
    return root;
  }

  private lastChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    if (route.firstChild) {
      return this.lastChild(route.firstChild);
    } else {
      return route;
    }
  }
}
