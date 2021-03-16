import { Subject } from "rxjs";
import { User } from "../models/User.model";

export class UserService {
    private users : User[] = [new User( 
        'user1','user1','user1@email.com','jus d\'orange', ['coder','boire du café']
    )];
    userSubject = new Subject<User[]>()

    emitUser(){
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User){
        this.users.push(user);
        this.emitUser();
    }
}