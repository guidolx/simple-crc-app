import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcDeleteModalComponent } from './crc-delete-modal.component';

describe('CrcDeleteModalComponent', () => {
  let component: CrcDeleteModalComponent;
  let fixture: ComponentFixture<CrcDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
