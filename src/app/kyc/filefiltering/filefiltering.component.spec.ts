import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilefilteringComponent } from './filefiltering.component';

describe('FilefilteringComponent', () => {
  let component: FilefilteringComponent;
  let fixture: ComponentFixture<FilefilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilefilteringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilefilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
