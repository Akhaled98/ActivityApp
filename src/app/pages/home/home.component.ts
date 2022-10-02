import { Component } from '@angular/core';
import { ActivityService } from 'src/app/shared/services/actvity.service';



@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  
  constructor(private _ActivityService:ActivityService) { }
  ngOnInit(): void {

  }
  
}
