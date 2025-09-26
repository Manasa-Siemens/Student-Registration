import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentList } from './features/students/student-list/student-list';
import { StudentForm } from './features/students/student-form/student-form';
import { StudentCount } from './features/students/student-count/student-count';

const routes: Routes = [
   { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentList },           // View students
  { path: 'students/new', component: StudentForm},       // Add new
  { path: 'students/:id/edit', component: StudentForm },
   {path:'students/count',component:StudentCount}   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
