import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { ListEventComponent } from './components/list-event/list-event.component';
import { AddEditEventComponent } from './components/add-edit-event/add-edit-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';
import { DxScrollViewModule } from 'devextreme-angular';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppUserComponent } from 'src/app/shared/components/app-user/app-user.component';
import { EventAttatchmentsComponent } from './components/event-attatchments/event-attatchments.component';
@NgModule({
  declarations: [
    EventComponent,
    ListEventComponent,
    AddEditEventComponent,
    ViewEventComponent,
    EventAttatchmentsComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    DxScrollViewModule,
    MatProgressBarModule,
  ],
})
export class EventModule { }
