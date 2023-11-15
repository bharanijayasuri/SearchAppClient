import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DataObject } from '../DataObject';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'SearchApp Client';
  baseUrl = 'https://localhost:7206/api/Search/Search';
  keyword :string = '';
  queryUrl: string='';
  dataReturned : DataObject[]=[];
  showError: boolean = false;
  noResultsFound: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit(searchTerm: string) {
    this.showError = false;
    this.noResultsFound = false;
    this.dataReturned.length = 0;
    if(searchTerm.length == 0)
    {
      this.showError = true;
      return;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    //let queryParams = new HttpParams();
    // We have to append this way because HttParams objects are immutable ( can't be modified so we need a new one)
    //queryParams = queryParams.append('searchString', searchTerm);
    this.queryUrl = this.baseUrl+'?searchString='+searchTerm;
    console.log(searchTerm);
    this.http.post<DataObject[]>(this.queryUrl, httpOptions).subscribe(results => {
      this.dataReturned = results;
      if(this.dataReturned.length == 0)
      {
        this.noResultsFound = true;
      }
      console.log(this.dataReturned);
    });
  }
}

