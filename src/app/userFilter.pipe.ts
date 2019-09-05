import {Pipe, PipeTransform} from '@angular/core';

import {User} from './user.service';

@Pipe({
    name:'userFilter',
    pure:false
})
export class UserFilterPipe implements PipeTransform{

    transform(userList:User[],parameterTofilter?:string,value?:string):User[]{
        let filteredUsers:User[] = [];
        
        if(parameterTofilter=="userName" && value){
            value = value.toLowerCase();
        }
        if(value){
            for(let user of userList){
                if(user[parameterTofilter].toString().toLowerCase().startsWith(value)){
                    filteredUsers.push(user);
                }
            }
            return filteredUsers;
        }
        
        return userList;
    }
}