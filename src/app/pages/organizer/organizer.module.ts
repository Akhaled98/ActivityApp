import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { ListOrganizerComponent } from './components/list-organizer/list-organizer.component';
import { EventRoutingModule } from '../event/event-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { AddEditOrganizerComponent } from './components/add-edit-organizer/add-edit-organizer.component';

@NgModule({
  declarations: [
    OrganizerComponent,
    ListOrganizerComponent,
    AddEditOrganizerComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    CommonModule,
    EventRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatMenuModule,
    TranslateModule.forChild()
  ]
})
export class OrganizerModule { }
