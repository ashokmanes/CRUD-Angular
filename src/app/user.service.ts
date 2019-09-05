import {Injectable} from '@angular/core';


@Injectable({
    providedIn:'root'
})
export class UserService{
   
    private users:User[]=[
        {
          userId:11,
          userName:"Ashok1",
          email:"ashok1@gmail.com",
          phoneNumber:7894532456,
          status:"Active"  
        },
        {
            userId:12,
            userName:"Ashok2",
            email:"ashok2@gmail.com",
            phoneNumber:9875643456,
            status:"Inactive"  
          }
     ];


    submitData(user:User,editingStatus,editingIndxOfUser){
        if(editingStatus){
            this.users.splice(editingIndxOfUser,1,user); 
        }else{
            this.users.push(user);
        }
        return this.getAllUsers();
    }

    getAllUsers(){
        return this.users.slice();
    }

}


export interface User{
    userId:number,
    userName:string,
    email:string,
    phoneNumber:number,
    status:string
}