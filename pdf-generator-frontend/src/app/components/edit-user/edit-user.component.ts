import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements AfterViewInit {
  constructor(
    private user: UserService,
    private cdref: ChangeDetectorRef
  ){}

  ngAfterViewInit(): void {
    console.warn(this.editUser);
    
    this.userForm.setValue({
      name: this.editUser.name,
      email: this.editUser.email,
      address: this.editUser.address,
      phone: String(this.editUser.phone),
    })
    this.userForm.markAllAsTouched()
    this.cdref.detectChanges()
  }

  @Input() editUser !: User
  @Output()  updateUserSuccess = new EventEmitter<boolean>();

  userForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required]}),
    email: new FormControl('', { validators: [Validators.required, Validators.email]}),
    phone: new FormControl('', { validators: [Validators.required]}),
    address: new FormControl('', { validators: [Validators.required]})
  })

  updateUser(){
    console.warn(this.userForm.value);
    
    if(this.userForm.valid){
      this.user.updateUser({
        id: this.editUser.id,
        name: this.userForm.value.name as string,
        email: this.userForm.value.email as string,
        phone: this.userForm.value.phone as string,
        address: this.userForm.value.address as string,
      }, this.editUser?.id)
      this.updateUserSuccess.emit(true)
      this.user.getUsers()
    }
  }

}
