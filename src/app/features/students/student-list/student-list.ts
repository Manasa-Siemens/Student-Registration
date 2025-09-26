import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../core/services/studentservice';
import { StudentModel } from '../../../core/models/studentmodel';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setcount,decrement } from '../../../core/counter/counter.action';


@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList implements OnInit{
  students: StudentModel[] = [];
  loading = false;

  constructor(private svc: StudentService, private router: Router,private store: Store<{ count: number }>) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.svc.list().subscribe({
      next: (data) => {
        this.students = data;
        this.store.dispatch(setcount({ value: data.length })); // sync store count
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  addNew(): void {
    this.router.navigate(['/students/new']);
  }

  edit(id?: number): void {
    if (id) this.router.navigate(['/students', id, 'edit']);
  }

  delete(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this student?')) {
      this.svc.delete(id).subscribe(() => {
      this.store.dispatch(decrement()); // update immediately
      this.fetch(); // optional: refresh list
    });
    }
  }
}
