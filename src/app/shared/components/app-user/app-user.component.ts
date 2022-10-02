import { ChangeDetectionStrategy, Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppUserComponent implements OnInit {

  @Input() user:any;
  @Input() type = 'name';
  constructor() { }


  ngOnInit(): void {
  }

}
