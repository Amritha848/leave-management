import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
export interface DateInfo {
  email: string;
  joiningDate: string;
  employeeName: string;
  status: string;
  mobileNo: string;
  role: string;
  departmentName: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  basicUrl='http://106.51.114.114:8082';



  constructor( 
    private http:HttpClient
  ) { }
  
  loginNew(payload: any) {
    console.log(payload)
    let url  = this.basicUrl + '/api/v1/login';
    return this.http.post(url, payload);
  }
  registerNew(payload: any) {
    console.log(payload)
    let url  = this.basicUrl + '/api/v1/signup';
    return this.http.post(url, payload);  
  }
  
  
  
  sendOTP(payload:any){
    let url = this.basicUrl + '/api/v1/sendOtp';
    
    return this.http.post(url, {mobileNo: payload.no});
  }
  verifyOTP(payload:any){
    let url = this.basicUrl + '/api/v1/verifyOtp';
    
    return this.http.post(url, {enterOtp: payload.no});
  }
  reset(payload: any) {
    const url = this.basicUrl + '/api/v1/update';
    const body = {
      password: payload.newpassword,
      confirmPassword: payload.confirmpassword
    };
    return this.http.put(url, body);
  }
  
  sendOtp(payload:any){
    let url = this.basicUrl + '/api/v2/sendOtp';
    return this.http.post(url, {toEmail: payload.email},);
  }
  verifyOtp(payload:any){
    let url = this.basicUrl + '/api/v2/verifyOtp';
    

    return this.http.post(url, {enterOtp: payload.no});
  }
  leave(payload: any) {
   
    let url = this.basicUrl + '/api/v4/apply';

    const body = {
      fromDate: payload.fromDate,
      toDate: payload.toDate,
      reason: payload.reason,
      type: payload.type
    };

    const token = payload.token; // Extract the token from the payload
    console.log('Token extracted:', token); // Log the token

    if (!token) {
      throw new Error('Token is missing in the payload');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, body, { headers })
  }
  logout(token:any){
    let url = this.basicUrl + '/api/v1/logout';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get(url,{ headers })
  }
  dashboard(mtoken: string): Observable<DateInfo[]> {
    return this.http.get<DateInfo[]>(this.basicUrl + '/api/v1/get/employees', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${mtoken}`
      })
    });
  }
  manager(){
    let url = this.basicUrl + '/api/v1/roles/manager'
    return this.http.get(url)
  }
  leavetype(token:any){
    let url = this.basicUrl + '/api/v1/sick/casual/privilege'
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get(url,{ headers })


  }
}


