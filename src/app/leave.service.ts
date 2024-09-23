import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

interface Leave {
  leaveId: string;
  fromDate: string;
  toDate: string;
  reason: string;
  type: string;
  status:string;
  appliedDate:string;
  userId: string;
  employeeName:string;
  sickLeavesCount: number;
  casualLeavesCount: number;
  message:string
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  public top: BehaviorSubject<any> = new BehaviorSubject<any>('')

  private Url = 'http://106.51.114.114:8082'; // Your actual API URL

  constructor(private http: HttpClient) {}

  getLeaves(userId: string, token: string): Observable<Leave[]> {
    let url = this.Url + '/api/v4/get'
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Leave[]>(url, { headers:headers, params:params });
  }
  status(leaveId:string , status:string, token:string , message:string){
    let url = this.Url + '/api/v4/leave/status';
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    const body = {
      leaveId:leaveId,
      status:status,
      message:message
    }
    return this.http.put(url,body,{ headers })
  }
  dashboard(token:string){
    let url =this.Url + '/api/v1/get/employees'
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url,{ headers})
  }
  leave(token:string): Observable<Leave[]>{
    let url = this.Url + '/api/v4/leave/status/pending'
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Leave[]>(url,{ headers})

  }
  approve(token:string){
    let url = this.Url + '/api/v4/leave/status/approved/declined'
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url,{ headers})
  }
  filtername(name:string , token:string){
    let url = this.Url +  "/api/v1/search"
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('name', name);
    return this.http.get(url, { headers:headers, params:params });

  }
  filteremail(email:string , token:string){
    let url =this.Url +  "/api/v1/search"
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('email', email);
    return this.http.get(url, { headers:headers, params:params });

  }
  filterdepartmentName(departmentName:string , token:string){
    let url =this.Url +  "/api/v1/search"
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('departmentName',departmentName);
    return this.http.get(url, { headers:headers, params:params });

  }
}
