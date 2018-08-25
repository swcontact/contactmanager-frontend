import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { catchError, map, tap, finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  public getConfig() {
    let url = `assets/config.json`;
    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  public getAllContacts(url) {
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getPage(url, page, size = 5) {
    return this.http.get(url + "/page/" + page + "/?size=" + size).pipe(catchError(this.handleError));
  }

  public getContact(url, id) {
    return this.http.get(url + "/" + id).pipe(catchError(this.handleError));
  }
  
  public deleteContact(url, id) {
    return this.http.delete(url + "/" + id).pipe(catchError(this.handleError));
  }

  public createContact(url, data) {
    //console.log(url);
    //console.log(data);
    const httpHeader = new HttpHeaders({'Content-Type': 'application/json'});
    const httpOptions = { headers: httpHeader };
    let result = this.http.post<any>(url, data, httpOptions).pipe(catchError(this.handleError));
    console.log(result);
    return result;
  }

  public updateContact(url, data) {
    //console.log(url);
    //console.log(data);
    const httpHeader = new HttpHeaders({'Content-Type': 'application/json'});
    const httpOptions = { headers: httpHeader };
    let result = this.http.put<any>(url, data, httpOptions).pipe(catchError(this.handleError));
    console.log(result);
    return result;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError( 'Something bad happened; please try again later.' );
  };

}
