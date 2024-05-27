import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {
  constructor(
    private user: UserService
  ){}

  userForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required]}),
    email: new FormControl('', { validators: [Validators.required, Validators.email]}),
    phone: new FormControl('', { validators: [Validators.required]}),
    address: new FormControl('', { validators: [Validators.required]})
  })
  submitted = false

  addUser(){
    this.submitted = true
    console.warn(this.userForm.value);
    
    if(this.userForm.valid){
      this.user.addUser(this.userForm.value as unknown as User)
      this.userForm.reset()
      this.submitted = false
      this.user.getUsers()
    }
  }
}
