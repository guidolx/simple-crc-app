import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcGenericDialogComponent } from './crc-generic-dialog.component';

describe('GenericDialogComponent', () => {
  let component: CrcGenericDialogComponent;
  let fixture: ComponentFixture<CrcGenericDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcGenericDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcGenericDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
