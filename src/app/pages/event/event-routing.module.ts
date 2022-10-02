import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditEventComponent } from './components/add-edit-event/add-edit-event.component';
import { ListEventComponent } from './components/list-event/list-event.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { EventComponent } from './event.component';

const routes: Routes = [{ path: '', component: ListEventComponent },
{ path: 'addEvent', component: AddEditEventComponent },
{ path: 'editEvent/:id', component: AddEditEventComponent },{ path: 'viewEvent/:id', component: ViewEventComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
