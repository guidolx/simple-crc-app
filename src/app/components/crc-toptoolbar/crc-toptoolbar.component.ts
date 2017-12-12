import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CardService } from '../../shared/card.service';
import { ConfigService } from '../../shared/config.service';
import { CRCItem } from '../../model/crcitem';


@Component({
  selector: 'crc-toptoolbar',
  templateUrl: './crc-toptoolbar.component.html',
  styleUrls: ['./crc-toptoolbar.component.css']
})
export class CrcToptoolbarComponent implements OnInit {
  @Output()
  createCard: EventEmitter<string> = new EventEmitter<string>();

  private _sizes: Array<string>;

  private _selectedSize: string;

  private _propagateSizeEvent: boolean;

  private _crcProperties:FormGroup;

  constructor(private cardService: CardService, private configService:ConfigService) {
    this._sizes = configService.modelSizes;
    this._selectedSize = this._sizes[0];
  }

  ngOnInit() {
    this.cardService.getObservableItems().subscribe(
      (model) => {
        const size: string = `${model.width} x ${model.height}`;
        this._propagateSizeEvent = this._selectedSize !== size;

        this.updateSize(size);
      }
    );

    this._crcProperties = new FormGroup({
      selectedSize:new FormControl('')
    });

  }

  public addCard(): void {
    this.createCard.emit('createCard');
  }


  public updateSize(event: any) {
    this.selectedSize = event;
    const values = this._selectedSize.split("x");
    let width: number = parseInt(values[0].trim());
    let height: number = parseInt(values[1].trim());

    if (this._propagateSizeEvent) {
      this.cardService.size(width, height);
    }
  }

  public changeSize(event: any): void {

    this._propagateSizeEvent = this._selectedSize !== event;
    //this.selectedSize = event;
    this.updateSize(event);
  }

  public get sizes() {
    return this._sizes;
  }

  public get selectedSize() {
    return this._selectedSize;
  }

  public set selectedSize(size: string) {
    const index = this._sizes.indexOf(size);
    if (index > -1) {
      this._selectedSize = this._sizes[index];
    }
  }

  public get crcProperties(){
    return this._crcProperties;
  }

  public set crcProperties(form:FormGroup){
    this._crcProperties = form;
  }

}
