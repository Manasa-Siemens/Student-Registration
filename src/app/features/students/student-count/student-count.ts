import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-student-count',
  standalone: false,
  templateUrl: './student-count.html',
  styleUrl: './student-count.css'
})
export class StudentCount {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = this.store.pipe(select('count'));
  }
}
