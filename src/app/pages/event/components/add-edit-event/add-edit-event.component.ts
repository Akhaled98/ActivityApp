import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { OrganizersService } from 'src/app/shared/services/organizers.service';
import { ActivityService } from 'src/app/shared/services/actvity.service';
@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditEventComponent implements OnInit {
  id: any;
  token: any;
  activeForm: any
  organizers: any = []
  editMode: boolean = false
  coverPicture: any
  constructor(private activatedRoute: ActivatedRoute,
    private _OrganizersService: OrganizersService,
    private _ActivityService: ActivityService,
    private _KeycloakService: KeycloakService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private _Router: Router,
    private _formBuilder: FormBuilder,
  ) {
    this.token = this._KeycloakService.getToken();
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.initForm();
    this.getAllOrganizer();
    this.getActivityById();
  }
  initForm() {
    this.activeForm = this._formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      categorization: [null, [Validators.required]],
      organizers: [null, [Validators.required]],
      locations: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      timeFrom: [null],
      timeTo: [null],
      coverPicture: [null]
    });
  }
  getActivityById() {
    if (this.id != null) {
      this.editMode = true;
      this._ActivityService.getEventById(this.id).subscribe((res) => {
        const data = res.properties;
        this.activeForm.patchValue({
          id: res.uid,
          title: data['dc:title'],
          description: data['dc:description'],
          categorization: data['activity:categorization'],
          organizers: data['activity:organizers'],
          locations: data['activity:locations'].city,
          startDate: moment(data['activity:startDate']).format('yyy-MM-DD'),
          endDate: moment(data['activity:endDate']).format('yyy-MM-DD'),
          timeFrom: data['activity:timeFrom'],
          timeTo: data['activity:timeTo'],
          category: data['activity:categorization'],
          cover: data['activity:coverPicture']?.data,
        });
        this.cdr.detectChanges();
      }, (error: any) => {
        throw new Error(error);
      })
    }
  }
  getAllOrganizer() {
    this._OrganizersService.getOrganizers().subscribe((res) => {
      const data = res.entries;
      for (let i = 0; i < data.length; i++) {
        this.organizers.push({
          id: data[i].uid,
          title: data[i].title,
        });
      }
      this.cdr.detectChanges();
    }, (error) => {
      throw new Error(error);
    })
  }
  submitactiveForm(submitactiveForm: FormGroup) {
    if (this.editMode == false) {
      const activity = this.mapData(submitactiveForm.value);
      this._ActivityService.addEvent(activity).subscribe((res) => {
        this.toastr.success('Added Success');
        this._Router.navigate(['/event']);
      }, (error) => {
        throw error;
      })
    } else {
      const activity = this.mapData(submitactiveForm.value);
      this._ActivityService.updateEvent(activity).subscribe((res) => {
        this.toastr.success('Updated Success');
        this._Router.navigate(['/event']);
      }, (err) => {
        throw err;
      })
    }
  }
  mapData(obj: any) {
    return {
      "dc:title": obj.title,
      "dc:description": obj.description,
      "activity:categorization": obj.categorization,
      "activity:organizers": obj.organizers,
      "activity:locations": {
        "city": obj.locations,
        "geographicLocation": ""
      },
      "activity:startDate": obj.startDate,
      "activity:endDate": obj.endDate,
      "activity:timeFrom": obj.timeFrom,
      "activity:timeTo": obj.timeTo,
      "activity:coverPicture": {
        "upload-batch": this.coverPicture['upload-batch'],
        "upload-fileId": this.coverPicture['upload-fileId']
      }
    }
  }
  onAttachFileChange(event: any): void {
    this.activeForm.controls['coverPicture'].setValue(event.target.files[0]);
    const cover = this.activeForm.controls['coverPicture'].setValue(
      event.target.files[0]
    );
    this._ActivityService.uploadCover(cover).subscribe((res: any) => {
      this.coverPicture = res.blob;
    });
  }
}
