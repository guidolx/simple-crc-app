import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcCreateModelModalComponent } from './crc-create-model-modal.component';

describe('CrcCreateModelModalComponent', () => {
  let component: CrcCreateModelModalComponent;
  let fixture: ComponentFixture<CrcCreateModelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcCreateModelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcCreateModelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
