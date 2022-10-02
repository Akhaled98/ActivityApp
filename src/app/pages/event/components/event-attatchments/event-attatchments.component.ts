import { ChangeDetectionStrategy,ChangeDetectorRef, Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/shared/services/actvity.service';

@Component({
  selector: 'app-event-attatchments',
  templateUrl: './event-attatchments.component.html',
  styleUrls: ['./event-attatchments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventAttatchmentsComponent implements OnInit {
  @Input() eventId: any;
  @Output() finishLoading = new EventEmitter<{ action: any }>();
  EventAttatches: any = []

  constructor(
    private _ActivityService: ActivityService,
    private cdr: ChangeDetectorRef,
    private _Router: Router,) { }

  ngOnInit(): void {
    if(this.eventId != null && this.eventId != undefined){
      this.getEventAttatches();
    }
  }

  getEventAttatches() {
    this._ActivityService.getEventAttatchmentById(this.eventId).subscribe((res) => {
      const data = res.entries;
      data.filter((item: any) => {
        this.EventAttatches.push({
          path: item.path,
        })
      })
      this.finishLoading.emit({ action: this.EventAttatches });
      this.cdr.detectChanges();
    }, (error: any) => {
      throw new Error(error);
    })
  }

}
