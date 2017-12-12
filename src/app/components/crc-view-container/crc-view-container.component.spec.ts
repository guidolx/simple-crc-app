import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcViewContainerComponent } from './crc-view-container.component';

describe('CrcViewContainerComponent', () => {
  let component: CrcViewContainerComponent;
  let fixture: ComponentFixture<CrcViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
