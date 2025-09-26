import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentModel } from '../models/studentmodel';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  list(): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(this.baseUrl);
  }

  get(id: string | number): Observable<StudentModel> {
    return this.http.get<StudentModel>(`${this.baseUrl}/${id}`);
  }

  create(data: StudentModel): Observable<StudentModel> {
    return this.http.post<StudentModel>(this.baseUrl, data);
  }

  update(id: string | number, data: StudentModel): Observable<StudentModel> {
    return this.http.put<StudentModel>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
