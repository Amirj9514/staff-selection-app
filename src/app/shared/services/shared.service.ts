import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  sharedData = new BehaviorSubject({});

  constructor(private httpClient: HttpClient) {}

  /** to get data this.sharedService.getData().subscribe((data: any) => {}) **/
  public getData() {
    let storedData = localStorage.getItem('sharedData@LeagueApps');
    this.sharedData.next(JSON.parse(storedData || '{}'));
    return this.sharedData.asObservable();
  }

  /** to insert data this.sharedService.insertData({ key: 'name', val: response.data }) **/
  public insertData(data: any) {
    this.sharedData.next({
      ...this.sharedData.getValue(),
      [data.key]: data.val,
    });
    localStorage.setItem(
      'sharedData@LeagueApps',
      JSON.stringify(this.sharedData.value)
    );
  }

  /** Get Request **/
  public sendGetRequest(target: string): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.apiUrl + target);
  }

  /** Get Request  with auth  Token **/

  public sendGetRequest2(target: string, token: any): Observable<any[]> {
    var headers_object = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<any>(environment.apiUrl + target, httpOptions);
  }

  /** Post Request **/
  public sendPostRequest(target: string, data: any): Observable<any[]> {
    return this.httpClient.post<any[]>(environment.apiUrl + target, data);
  }

  /** Post Request with token auth **/
  public sendPostRequest2(
    target: string,
    token: any,
    data: any
  ): Observable<any[]> {
    var headers_object = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.post<any>(
      environment.apiUrl + target,
      data,
      httpOptions
    );
  }

  /** Put Request **/
  public sendPutRequest(target: string, data: any): Observable<any[]> {
    return this.httpClient.put<any[]>(environment.apiUrl + target, data);
  }

  /** Patch Request **/
  public sendPatchRequest(target: string, data: any): Observable<any[]> {
    return this.httpClient.patch<any[]>(environment.apiUrl + target, data);
  }

  /** Delete Request **/
  public sendDeleteRequest(target: string): Observable<any[]> {
    return this.httpClient.delete<any[]>(environment.apiUrl + target);
  }
}
