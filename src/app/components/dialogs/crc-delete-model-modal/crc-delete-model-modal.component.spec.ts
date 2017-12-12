import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcDeleteModelModalComponent } from './crc-delete-model-modal.component';

describe('CrcDeleteModelModalComponent', () => {
  let component: CrcDeleteModelModalComponent;
  let fixture: ComponentFixture<CrcDeleteModelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcDeleteModelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcDeleteModelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
