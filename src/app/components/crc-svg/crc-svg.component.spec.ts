import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcSvgComponent } from './crc-svg.component';

describe('CrcSvgComponent', () => {
  let component: CrcSvgComponent;
  let fixture: ComponentFixture<CrcSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
