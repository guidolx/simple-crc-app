import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcLefttoolbarComponent } from './crc-lefttoolbar.component';

describe('CrcLefttoolbarComponent', () => {
  let component: CrcLefttoolbarComponent;
  let fixture: ComponentFixture<CrcLefttoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcLefttoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcLefttoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
