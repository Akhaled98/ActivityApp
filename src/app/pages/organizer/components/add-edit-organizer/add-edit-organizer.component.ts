import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from 'src/app/shared/services/actvity.service';
import { OrganizersService } from 'src/app/shared/services/organizers.service';

@Component({
  selector: 'app-add-edit-organizer',
  templateUrl: './add-edit-organizer.component.html',
  styleUrls: ['./add-edit-organizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditOrganizerComponent implements OnInit {

  id: any;
  token: any;
  organizerForm: any
  organizers: any = []
  editMode: boolean = false

  constructor(private activatedRoute: ActivatedRoute,
    private _OrganizersService: OrganizersService,
    private _ActivityService: ActivityService,
    private _KeycloakService: KeycloakService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private _Router: Router,
    private _formBuilder: FormBuilder) {
    this.token = this._KeycloakService.getToken();
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.initForm();
    this.getOrganizeById();
  }
  initForm() {
    this.organizerForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      email: [null, [Validators.required]],
      email_label: [null, [Validators.required]],
      address: [null, [Validators.required]],
      address_label: [null, [Validators.required]],
      organizationActivity: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      phone_label: [null, [Validators.required]],
      website: [null, [Validators.required]],
    });
  }
  getOrganizeById() {
    if (this.id != null) {
      this.editMode = true;
      this._OrganizersService.getOrganizerById(this.id).subscribe((res) => {
        const data = res.properties;
        this.organizerForm.patchValue({
          id: res.uid,
          name: data['organizer:name'],
          description: data['dc:description'],
          email: data['organizer:emails'][0].emailAddress,
          email_label: data['organizer:emails'][0].label,
          address: data['organizer:addresses'][0].address,
          address_label: data['organizer:addresses'][0].label,
          phone: data['organizer:phones'][0].phoneNumber,
          phone_label: data['organizer:phones'][0].label,
          organizationActivity: data['organizer:organizationActivity'],
          website: data['organizer:website'],
        });
        this.cdr.detectChanges();
      }, (error: any) => {
        throw new Error(error);
      })
    }
  }
  submitOrganizerForm(submitactiveForm: FormGroup) {
    if (this.editMode == false) {
      const organizer = this.mapData(submitactiveForm.value);
      this._OrganizersService.AddOrganizer(organizer).subscribe((res) => {
        this.toastr.success('Added Success');
        this._Router.navigate(['/organizer']);
      }, (error) => {
        throw error;
      })
    } else {
      const organizer = this.mapData(submitactiveForm.value);
      this._OrganizersService.updateOrganizer(organizer,this.id).subscribe((res) => {
        this.toastr.success('Updated Success');
        this._Router.navigate(['/organizer']);
      }, (error) => {
        throw error;
      })
    }
  }
  mapData(obj: any) {
    return {
      "organizer:name": obj.name,
      "organizer:title": obj.name,
      'organizer:emails': [{
        'label': obj.email_label,
        'emailAddress': obj.email
      }
      ],
      'organizer:addresses': [{
        'label': obj.address_label,
        'address': obj.address
      }
      ],
      'organizer:phones': [{
        'label': obj.phone_label,
        'emailAddress': obj.phone
      }
      ],
      "organizer:organizationActivity": obj.organizationActivity,
      "organizer:website": obj.website,
    }
  }

}
