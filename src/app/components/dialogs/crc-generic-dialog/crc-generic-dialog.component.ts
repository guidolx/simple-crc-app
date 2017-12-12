import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { Button } from '../../../shared/helpers/button';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'crc-generic-dialog',
  templateUrl: './crc-generic-dialog.component.html',
  styleUrls: ['./crc-generic-dialog.component.css']
})
export class CrcGenericDialogComponent implements OnInit, OnChanges {

  @Input()
  focusId: string;

  @Input()
  display: boolean;

  @Input()
  title: string;

  @Input()
  buttons: Array<Button>

  @Output()
  private clickButton: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  private displayEvent: EventEmitter<string> = new EventEmitter<string>();

  private ESCAPE_KEYCODE: number = 27;

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "display" changed
    if (changes['display']) {
      
      this.display = changes['display'].currentValue;
      if (this.display) {
        this.displayEvent.emit('onDisplay');
        if (this.focusId !== undefined) {
          const elt = this._elementRef.nativeElement.querySelector(`#${this.focusId}`);
          setTimeout(() => { elt.focus() }, 100);
        }
      }
    }
  }



  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === this.ESCAPE_KEYCODE) {
      this.emitClick('close');
    }
  }

  public get isModalOpen(): boolean {
    return this.display;
  }

  public set isModalOpen(open: boolean) {
    this.display = open;
  }

  public emitClick(id: string) {
    this.clickButton.emit(id);
  }


}
