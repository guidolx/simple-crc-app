import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcToptoolbarComponent } from './crc-toptoolbar.component';


describe('ToptoolbarComponent', () => {
  let component: CrcToptoolbarComponent;
  let fixture: ComponentFixture<CrcToptoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcToptoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcToptoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
