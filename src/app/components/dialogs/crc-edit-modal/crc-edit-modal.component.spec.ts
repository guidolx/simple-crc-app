import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcEditModalComponent } from './crc-edit-modal.component';

describe('CrcEditModalComponent', () => {
  let component: CrcEditModalComponent;
  let fixture: ComponentFixture<CrcEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
