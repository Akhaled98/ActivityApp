import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/shared/services/actvity.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewEventComponent implements OnInit {
  id: any;
  token: any;
  eventData: any
  showSpinner: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _ActivityService: ActivityService,
    private cdr: ChangeDetectorRef,
    private _Router: Router,
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getActivityById();
  }

  getActivityById() {
    if (this.id != null) {
      this.showSpinner = true;
      this._ActivityService.getEventById(this.id).subscribe((res) => {
        const data = res.properties;
        this.eventData = {
          id: res.uid,
          title: data['dc:title'],
          creator: data['dc:creator'],
          description: data['dc:description'],
          categorization: data['activity:categorization'],
          organizers: data['activity:organizers'],
          locations: data['activity:locations'].city,
          startDate: moment(data['activity:startDate']).format('yyy-MM-DD'),
          endDate: moment(data['activity:endDate']).format('yyy-MM-DD'),
          createdDate: moment(data['dc:created']).format('yyy-MM-DD'),
          timeFrom: data['activity:timeFrom'],
          timeTo: data['activity:timeTo'],
          category: data['activity:categorization'],
          cover: data['activity:coverPicture']?.data,
        };
        this.cdr.detectChanges();
      }, (error: any) => {
        throw new Error(error);
      })
    }
  }
  finishGettingMedia(attatches: any) {
    this.showSpinner = false;
  }
  ShowOrganizers() { }
  goToList() {
    this._Router.navigate(['/event'])
  }
}
