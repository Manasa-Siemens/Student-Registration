import { Component, OnInit } from '@angular/core';
import {Store,select} from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../core/services/studentservice';   //  service
import { StudentModel } from '../../../core/models/studentmodel'; // interface
import { increment } from '../../../core/counter/counter.action';

@Component({
  selector: 'app-student-form',
  standalone: false,
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.css']   
})
export class StudentForm implements OnInit {
  count$;
  title = 'Student Registration System';
  idToEdit?: string | number;
  loading = false;

  form: FormGroup;   // type added

  constructor(
    private fb: FormBuilder,
    private svc: StudentService,   
    private route: ActivatedRoute,
    private router: Router,
     private store: Store<{ count: number }>
  ) {
    //  initialize form here
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', Validators.required],
      course: ['', Validators.required]
    });
    this.count$ = this.store.pipe(select('count'));
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idToEdit = idParam;
      this.loading = true;
      this.svc.get(this.idToEdit).subscribe({
        next: (s) => {
          this.form.patchValue(s);
          this.loading = false;
        },
        error: () => (this.loading = false)
      });
    }
  }


  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: StudentModel = this.form.getRawValue() as StudentModel;

    if (this.idToEdit) {
      this.svc.update(this.idToEdit, payload).subscribe(() => {
        this.router.navigate(['/students']);
      });
    } else {
      this.svc.create(payload).subscribe(() => {
        this.store.dispatch(increment())
        this.router.navigate(['/students']);
      });
    }
  }
  cancel(): void {
    this.router.navigate(['/students']);
  }
}
