import { Injectable } from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {TOKEN_NAME, USERNAME} from "./auth.constant";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {User} from "../model/User";
import {Observable} from "rxjs/Observable";
import {RegisterUser} from "../model/RegisterUser";
import {tap} from "rxjs/operators";
import {GameSession} from "../model/GameSession";

@Injectable()
export class AppDataService {
  private springURL = "http://localhost:8080/api/private";
  public http;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getUser(username): Observable<User> {
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });


    return this.http.get(this.springURL + "/users/username/" + sessionStorage.getItem(USERNAME), {headers}).map((resp: Response) => new User().fromJSON(resp));

  }

  getGameSessions(){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    let gameSessions: GameSession[] = [];
    //return this.http.get(this.springURL + "/temp/gamesessions", {headers}).map((resp: Response) => new GameSession('', '','','','','','','').fromJSON(resp));
    return this.http.get(this.springURL + "/temp/gamesessions", {headers}).map((resp) => {

      console.log(resp[0]);

      resp.forEach(gameSession => {
        let session = new GameSession('', '','','','','','','').fromJSON(gameSession);
        gameSessions.push(session);
      });
      return gameSessions;

    });
  }

  createGameSession(gameSesion: GameSession){
    console.log(gameSesion);
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    return this.http.post(this.springURL + "/sessions", gameSesion, {headers:headers}).map((resp: Response) => console.log(resp));
  }

  uploadProfileImage(username, imageFile){
    console.log(imageFile);
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME),
      'Content-Type': 'multipart/form-data'
    });
    //'Content-Type': 'multipart/form-data'

    // let formdata = new FormData();
    // formdata.append("File", imageFile);
    // console.log(formdata);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', this.springURL + "/users/" + username + "/uploadImage");
    xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem(TOKEN_NAME));
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.withCredentials = true;
    xhr.send(imageFile);


    // this.http.post(this.springURL + "/users/" + username + "/uploadImage", imageFile, {headers}).subscribe(
    //     (data) => console.log(data),
    //     (error) => console.log(error)
    // )

    // this.http.post(this.springURL + "/users/" + username + "/uploadImage", imageFile, {headers}).subscribe(
    //   (data) => console.log(data),
    //   (error) => console.log(error)
    // )
  }

  updateUser(user:RegisterUser){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

   //map((resp: Response) => new User().fromJSON(resp));

    return this.http.put(this.springURL + "/users/" + user.username, user, {headers:headers}).map((resp: Response) => new User().fromJSON(resp));
  }

  doUploadFile(file: File) {
    let formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem(TOKEN_NAME));

    this.http.post(this.springURL + "/");

    // this.http.post(${this.localUrl + this.baseURL}, formData, {headers})
    //   .map(res => res)
    //   .subscribe(
    //     data => console.log('success'),
    //     error => console.log(error)
    //   )
  }
}

