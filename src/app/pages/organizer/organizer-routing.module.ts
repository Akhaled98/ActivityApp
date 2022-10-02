import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditOrganizerComponent } from './components/add-edit-organizer/add-edit-organizer.component';
import { ListOrganizerComponent } from './components/list-organizer/list-organizer.component';
import { OrganizerComponent } from './organizer.component';

const routes: Routes = [{ path: '', component: ListOrganizerComponent }, { path: 'addOrganizer', component: AddEditOrganizerComponent },
{ path: 'editOrganizer/:id', component: AddEditOrganizerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
