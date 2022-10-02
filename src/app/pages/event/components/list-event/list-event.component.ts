import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from 'src/app/shared/services/actvity.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListEventComponent implements OnInit {
  activities: any = []
  token: any
  constructor(private _ActivityService: ActivityService,
    private _KeycloakService: KeycloakService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private _Router: Router) {
    this.token = this._KeycloakService.getToken();
  }
  ngOnInit(): void {
    this.getActivity();
  }
  getActivity() {
    this._ActivityService.getEvent().subscribe((res) => {
      // res.uid !== null
      // res.type === 'Domain'
      const data = res.entries;
      for (let i = 0; i < data.length; i++) {
        this.activities.push({
          id: data[i].uid,
          title: data[i].title,
          startDate: data[i].properties['activity:startDate'],
          endDate: data[i].properties['activity:endDate'],
          category: data[i].properties['activity:categorization'],
          cover: data[i].properties['activity:coverPicture']?.data,
          altcover: '../../../../../assets/pexels-maria-loznevaya-13684561.jpg',

        });
      }
      this.cdr.detectChanges();
    },(error: any) => {
      throw new Error(error);
    })
  }

  deleteEvent(event: any) {
    this._ActivityService.deleteEvent(event).subscribe((res)=>{
      this.activities = [];
      this.getActivity();
      this.toastr.success('Deleted Success');
      this.cdr.detectChanges();
    },(error:any)=>{
      throw error;
    })
  }
  updateEvent(event: any) {
    this._Router.navigate(['/event/editEvent/' + event.id])
  }
  viewEvent(event:any){
    this._Router.navigate(['/event/viewEvent/' + event.id])
  }
}
