import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventService, IEvent } from '../event.service';
import { debounceTime } from 'rxjs/operators';
import { HttpBackend } from '@angular/common/http';
import { balancePreviousStylesIntoKeyframes } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.less']
})

export class EventListComponent implements OnInit {
  constructor(
    private eventService: EventService
  ) {}
  searchForm = new FormGroup({
    query: new FormControl('')
  });
  events: IEvent[];

  query = '';

  ngOnInit() {
    this.getEvents();
    //debounceTime(350): Wait for 350 secs. if there is no changes
    this.searchForm.controls.query.valueChanges.pipe(debounceTime(350)).subscribe(
      (value) => {
        console.log(value);
        this.query = value;
        this.getEvents();
      }
    )
  }
  /* 
  callback getEventsForCurrentUser from evenService and subscribe to whatever comes 
  back. Assuming array of events.
  Note: Went to back end and got list of values. Using structural Directive *ngFor
  loop over the value and print to console the first one. 
  */
  getEvents() {
    this.eventService.getEventsForCurrentUser(this.query).subscribe(
      (events) => {
        console.log(events);
        this.events = events;
      }
    );
  }
}