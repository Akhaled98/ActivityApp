import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { AppInfoService } from 'src/app/shared/services';
import { ActivityService } from 'src/app/shared/services/actvity.service';
import { OrganizersService } from 'src/app/shared/services/organizers.service';

@Component({
  selector: 'app-list-organizer',
  templateUrl: './list-organizer.component.html',
  styleUrls: ['./list-organizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOrganizerComponent implements OnInit {

  organizers: any = []
  token: any
  tableConfig: any;
  loading = false;
  displayedColumns: string[] = ['title', 'emails', 'addresses', 'organizationActivity', 'phones', 'website', 'actions'];
  dataSource: any;
  currentLang:any;
  constructor(private _OrganizersService: OrganizersService,
    private _KeycloakService: KeycloakService,
    private _Router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private _AppInfoService:AppInfoService) {
    this.token = this._KeycloakService.getToken();
    this._AppInfoService.currentLang.subscribe((res)=>{
      this.currentLang = localStorage.getItem('lang');
    })
  }
  ngOnInit(): void {
    this.getAllOrganizer();
    this.loading = true;
  }
  getAllOrganizer() {
    this._OrganizersService.getOrganizers().subscribe((res) => {
      const data = res.entries;
      for (let i = 0; i < data.length; i++) {
        this.organizers.push({
          id: data[i].uid,
          title: data[i].title,
          name: data[i].properties['organizer:name'],
          // for(let i=0; i < data[i].properties['organizer:emails'].length;i++){
          // }
          emails: data[i].properties['organizer:emails'],
          addresses: data[i].properties['organizer:addresses'],
          organizationActivity: data[i].properties['organizer:organizationActivity'],
          phones: data[i].properties['organizer:phones'],
          website: data[i].properties['organizer:website'],
        });
      }
      this.dataSource = this.organizers;
      this.cdr.detectChanges();
    }, (error) => {
      throw new Error(error);
    })
  }

  deleteOrganizer(event: any) {
    this._OrganizersService.deleteOrganize(event).subscribe((res) => {
      this.organizers = [];
      this.toastr.success('Deleted Success');
      this.getAllOrganizer();
      this.cdr.detectChanges();
    }, (error: any) => {
      throw error;
    })
  }
  updateOrganizer(event: any) {
    this._Router.navigate(['/organizer/editOrganizer/' + event.id])
  }
}
