  import * as Promise from 'promise';
  import { Injectable } from '@angular/core';
  import { Http } from '@angular/http';

  @Injectable()
export class BundleSvc {
  constructor(public http: Http, public global: Global) {

}
}
