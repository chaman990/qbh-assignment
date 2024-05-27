import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { User } from '../models/users.model';
import { HttpClient } from '@angular/common/http';
import { config } from './constants';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  constructor(
    private readonly http: HttpClient
  ) { }
  private apiUrl = config.apiUrl;

  public getUsers(){
    return this.http.get(`${this.apiUrl}/user`)
    .pipe(
      take(1)
    ).subscribe((user) => {
      console.warn({user});
      this.users.next([...user as User[]])
    })
  }
  public addUser(user: User){
    this.http.post(`${this.apiUrl}/user`, user).pipe(
      take(1)
    ).subscribe((user) => {
      console.warn(user);
      this.users.next([...this.users.value, user as User])
    })
  }

  public deleteUser(id: number){
    this.http.delete(`${this.apiUrl}/user/${id}`).pipe(
      take(1)
    ).subscribe((user) => {
      console.warn(user);
      this.users.next([...this.users.value?.filter((user) => {
        return user?.id !== id
      })])
    })
  }

  public updateUser(edituser: User , id: number){
    this.http.put(`${this.apiUrl}/user/${id}`, edituser).pipe(
      take(1)
    ).subscribe((user) => {
      this.users.next([...this.users.value?.map((user) => {
        if(user.id === id) return {...edituser}
        return user
      })])
    })
  }
}
