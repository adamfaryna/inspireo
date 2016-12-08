import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Inspiration } from '../../model/inspiration';
import { environment } from '../../../environments/environment';

@Injectable()
export class InspirationService {

  constructor(@Inject(Http) private http: Http) {}

  private host = environment.apiHost;
  private port = environment.apiPort;
  private url = `${this.host}:${this.port}/api/inspiration`;

  getInspiration(): Observable<Inspiration> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleErrors);
  }

  private extractData(res: Response): any {
    let body = res.json();
    return body.data ? new Inspiration(body.data._id, body.data.content, body.data.source) : {};
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

export { Inspiration }
