import { Component, Inject } from '@angular/core';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-tel-input-form',
  templateUrl: './tel-input-form.component.html',
  styleUrls: ['./tel-input-form.component.css'],
  host: { class: 'content-block' }
})
export class TelInputFormComponent {

  constructor(@Inject(UserService) private userService: UserService) { }

  submitted: boolean = false;

  model: {tel: string} = {
    tel: ''
  };

  submit() {
    this.submitted = true;
    this.userService.saveUser('Adam', '+44 07404717700');
  }
}
