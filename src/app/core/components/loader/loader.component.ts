import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from "../../services/loader.service";
import { distinctUntilChanged, Subscription } from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show: boolean = false;
  showSubscription: Subscription | undefined;

  constructor(
    private loaderService: LoaderService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.showSubscription = this.loaderService.getShowLoader().pipe(
      distinctUntilChanged()
    ).subscribe(value => {
      this.show = value;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.showSubscription) {
      this.showSubscription.unsubscribe();
    }
  }

}
