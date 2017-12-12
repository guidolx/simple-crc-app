import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcOpenModelModalComponent } from './crc-open-model-modal.component';

describe('CrcOpenModelModalComponent', () => {
  let component: CrcOpenModelModalComponent;
  let fixture: ComponentFixture<CrcOpenModelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcOpenModelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcOpenModelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
