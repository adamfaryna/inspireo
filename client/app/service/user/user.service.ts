import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


@Injectable()
export class UserService {
  constructor(@Inject(Http) private http: Http) {}

  private protocol = environment.protocol;
  private host = environment.apiHost;
  private port = environment.apiPort;
  private url = `${this.protocol}${this.host}${this.port}/api/user`;

  saveUser(name, phoneNumber) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, { name, phoneNumber }, options)
      .catch(this.handleErrors);
  }

  handleErrors(error: Response | any): Observable<string> {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

    } else {
      errMsg = error.message || error.toString();
    }

    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
