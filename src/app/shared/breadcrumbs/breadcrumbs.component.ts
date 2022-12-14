import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  title?: string;
  titleSubs$?: Subscription;

  constructor(private router: Router) {
    this.titleSubs$ = this.getRouteArguments()
                        .subscribe(({title}) => {
                          this.title = title;
                          document.title = `Admin Pro - ${title}`;
                        });
  }
  ngOnDestroy(): void {
    this.titleSubs$?.unsubscribe();
  }

  getRouteArguments() {
    return this.router.events
            .pipe(
              filter((event: any) => event instanceof ActivationEnd),
              filter((event: ActivationEnd) => event.snapshot.firstChild === null),
              map((event: ActivationEnd) => event.snapshot.data)
            );
  }

}
