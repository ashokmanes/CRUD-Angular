import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService,User} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private fb:FormBuilder,private userService:UserService){
    this.userData = this.userService.getAllUsers();
  }

  editingIndx = null;
  editingOn = false;
  userData:User[] = [];

  parameterTofilter = "userId";
  searchValue = "";
  private userIDSet = new Set([11,12]);

  userForm = this.fb.group({
    userId:['', [Validators.required,isUserIdTaken.bind(this)]],
    userName: ['', Validators.required],
    email: ['',[Validators.required,Validators.email]],
    phoneNumber: ['',Validators.pattern('[789][0-9]{9}')],
    status: [''],
  });


  onSubmit(){
    
    this.userData = this.userService.submitData(this.userForm.value,this.editingOn,this.editingIndx);
    if(this.editingOn){
      this.editingOn = !this.editingOn;
    }
    this.userIDSet.add(+this.userForm.value.userId);
    this.userForm.reset();
  }

  removeUser(user,indexOfUser){
      this.userData.splice(indexOfUser,1); 
      this.userIDSet.delete(+user.userId);
  }

  editUser(user,indexOfUser){
    this.editingIndx = indexOfUser;
    this.editingOn = true;
    this.userIDSet.delete(+user.userId);
    this.userForm.setValue(user);
  }

  getField(fieldName){
    return this.userForm.get(fieldName);
  }

}




function isUserIdTaken(control:FormControl){
  if((this.userIDSet.has(+control.value)) && !this.editingOn){
    return {userIDExists:true};
  }
  return null;
}
