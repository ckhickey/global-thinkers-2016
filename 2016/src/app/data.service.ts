import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DataService {
  private data : Object;
  private url = 'app/data/';

  private colorSet = {
    'the-decision-makers': {
      'full': '#CADDDF',
      'half': '#dae8e9'
    },
    'the-challengers': {
      'full': '#C0C6D9',
      'half': '#d7dae7'
    },
    'the-innovators': {
      'full': '#D3D2C2',
      'half': '#e2e1d8'
    },
    'the-artists': {
      'full': '#D5AEAD',
      'half': '#e5cfce'
    },
    'the-advocates': {
      'full': '#EFC7A7',
      'half': '#f2dfd0'
    },
    'the-chroniclers': {
      'full': '#ACD6EA',
      'half': '#d2e7f1'
    },
    'the-moguls': {
      'full': '#E7C5D5',
      'half': '#eedbe4'
    },
    'the-stewards': {
      'full': '#ECDF7A',
      'half': '#f0ebc9'
    },
    'the-healers': {
      'full': '#b4d2ac',
      'half': '#d3e5cf'
    }
  }


  constructor(private http : Http) {

  }

  getData( key : String ) : Observable<any> {
    const queryParam = this.getCachebustQueryParam();
    const path = `${this.url}${key}.json${queryParam}`;
    return this.http.get(path)
      .map((res:Response) => res.json() )
      .catch((error: any) => Observable.throw(error || 'Server Error' ));
  }

  getColors( slug : string ){
    return this.colorSet[slug];
  }

  /**
   * Helper to grab cachebuster param for JSON data
   * requests
   */
  protected getCachebustQueryParam(): string {
    const versionHashKey = 'CURRENT_VERSION_HASH';
    return (typeof window === 'object' && window[versionHashKey])
      ? `?${window[versionHashKey]}`
      : '';
  }

}
