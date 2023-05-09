import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  // DEFINE API
 apiURL = 'http://localhost:3000';
 constructor(private http: HttpClient) { }
  // HTTP OPTION
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'}),
  }

  //GETALL
  getEmployees():Observable<Employee>{
    return this.http
    .get<Employee>(this.apiURL + '/employees')
    .pipe(retry(1),catchError(this.handleError));
  }

  //GETById
  getEmployee(id: any): Observable<Employee>{
    return this.http
    .get<Employee>(this.apiURL+'/employees/'+ id)
    .pipe(retry(1),catchError(this.handleError));
  }

  //CREATE
  createEmployee(employee: any): Observable<Employee>{
    return this.http
    .post<Employee>(
      this.apiURL+'/employees',
      JSON.stringify(employee),
      this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));
  }

  //PUT
  updateEmployee(id: any, employee: any): Observable<Employee> {
    return this.http
      .put<Employee>(
        this.apiURL + '/employees/' + id,
        JSON.stringify(employee),
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  //DELETE
  deleteEmployee(id: any) {
    return this.http
      .delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }


  // ERRORS
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}