import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { CRCItem } from "../../model/crcitem";
import { ActionEvent } from "../../shared/helpers/action-event";
import { ConfigService } from '../../shared/config.service';

@Component({
  selector: '[crc-svg]',
  templateUrl: './crc-svg.component.html',
  styleUrls: ['./crc-svg.component.css']
})
export class CrcSvgComponent implements OnInit {

  private _currentRX: number = 0;
  private _currentRY: number = 0;

  private _currentCX: number = 0;
  private _currentCY: number = 0;

  private _titleX: number = 15;
  private _titleY: number = 20;

  private _height:number = 0;

  private _bodyHeight:number = 0;

  @Input() item: CRCItem;

  @Output() actionEvent:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  private clicked: boolean = false;

  private clickX: number = 0;
  private clickY: number = 0;

  private lastMoveX: number = 0;
  private lastMoveY: number = 0;

  constructor(private elRef: ElementRef,private configService:ConfigService) {
    this._height = configService.cardHeight;
    this._bodyHeight = configService.cardHeight - 35;
  }

  ngOnInit() {
    this.lastMoveY = this.posY;
    this.lastMoveX = this.posX;
  }


  public get titleX() {
    return this._titleX;
  }

  public set titleX(x: number) {
    this._titleX = x;
  }

  public get titleY() {
    return this._titleY;
  }

  public set titleY(y: number) {
    this._titleY = y;
  }

  public get posX(): number {
    return this.item.posX;
  }

  public get posY(): number {
    return this.item.posY;
  }

  public get name() {
    return `${this.item.name}`;
  }

  public get id(){
    return `${this.item.uuid}`;
  }

  public get height(){
    return this._height;
  }

  public get bodyHeight(){
    return this._bodyHeight;
  }

  public set height(h:number){
    this._height = h;
  }

  public set bodyHeight(bh:number){
    this._bodyHeight = bh;
  }

  public move(event: MouseEvent) {
    if (this.clicked) {
      this.item.posX = this.lastMoveX + (event.clientX - this.clickX);
      this.item.posY = this.lastMoveY + (event.clientY - this.clickY);
    }
  }

  public endMove(event: MouseEvent) {
    this.clicked = false;
    this.lastMoveX = this.item.posX;
    this.lastMoveY = this.item.posY;
  }

  public mouseDown(event: MouseEvent) {
    this.clicked = true;
    this.clickX = event.clientX;
    this.clickY = event.clientY;
    // SVG 1.2 doesn't support the z-index property.
    // layout is based on document order
    // hence I append the current clicked element to the parent
    // will be the last element and be painted above the other elements.
    this.elRef.nativeElement.parentElement.appendChild(this.elRef.nativeElement);
  }


  public editCard():void{
    const a = new ActionEvent(ActionEvent.ACTION_EDIT_CARD, this.item);
    this.actionEvent.emit(a);
  }

  public deleteCard():void{
    const a = new ActionEvent(ActionEvent.ACTION_DELETE_CARD, this.item);
    this.actionEvent.emit(a);
  }

  public get responsibilitiesTspan():Array<any> {
    return this.makeTspans(this.item.responsibilities,this.configService.xOffsetCompartmentLeft);
  }

  public get collaboratorsTspan():Array<any> {
    return this.makeTspans(this.item.collaborators,this.configService.xOffsetCompartmentRight);
  }

  private makeTspans(items:Array<String>, offsetX:number):Array<any>{
    const maxChars = 20;
    const maxWidth = this.configService.lineMaxWidth;
    const lineHeight = this.configService.lineHeight;
    const wrapLineHeight = this.configService.lineWrapHeight;
    let currentX = offsetX;
    let currentY = this.configService.yOffsetCompartment;
    let tspans: Array<any> = [];

    // tspan = {x:0,y:0,t:'text',w:0}

    if (items == null || items.length == 0) {
      return tspans;
    }
    for (let index = 0; index < items.length; index++) {
      let words = items[index].split(/[\s]/);
      let tspan = { x: currentX, y: currentY, t: '• ', w: (this.configService.lowerCaseWidth * 2) };

      for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
        for ( let charIndex = 0;charIndex < words[wordIndex].length; charIndex++) {
          let c:string = words[wordIndex].charAt(charIndex);
          let cw:number = this.getCharWidth(c);
          if (tspan.w + cw >= maxWidth ) {
            if(tspan.t.charAt(tspan.t.length - 1) != ' ' && charIndex > 0 && charIndex + 1 < words[wordIndex].length){
              tspan.t += '-';
            }
            tspans.push(tspan);
            currentY += wrapLineHeight;
            tspan = { x: currentX + 7, y: currentY, t: '', w:0 };
          }
          tspan.w += cw;
          tspan.t += c;
        }
        if(wordIndex + 1 < words.length && tspan.w < maxWidth){
          tspan.t += ' ';
          tspan.w += this.configService.lowerCaseWidth;
        }
      }
      if (tspan.t.length > 0){
        tspans.push(tspan);
      }
      currentY += lineHeight;
    }
    if(currentY > this.height){
      this.height = currentY;
      this.bodyHeight = this.height - 35;
    }

    return tspans;
  }

  private getCharWidth(s:string){
    return s === s.toUpperCase() ? this.configService.upperCaseWidth : this.configService.lowerCaseWidth;
  }

  public isBoundary():boolean{
    return this.item.type === CRCItem.BOUNDARY;
  }

  public isController():boolean {
    return this.item.type === CRCItem.CONTROLLER;
  }

  public isEntity():boolean {
    return this.item.type == null || this.item.type == CRCItem.ENTITY;
  }

  public get cardClasses(){
    return {'crc-rectangle':true, 'crc-orange':this.isBoundary(), 'crc-yellow':this.isEntity(), 'crc-silver':this.isController()};
  }



}
