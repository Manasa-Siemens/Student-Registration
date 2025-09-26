import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCount } from './student-count';

describe('StudentCount', () => {
  let component: StudentCount;
  let fixture: ComponentFixture<StudentCount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentCount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
