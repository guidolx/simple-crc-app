import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private _defaultModelTitle: string = 'My CRC Model';
  private _defaultModelWidth: number = 800;
  private _defaultModelHeight: number = 600;
  private _modelSizes: Array<string> = ["800 x 600", "1024 x 768", "1920 x 1080"];
  private _defaultHorizontalIndentTitle:number = 15;
  private _defaultVerticalIndentTitle:number = 20;
  private _defaultLineHeight:number = 12;
  private _defaultLineWrapHeight:number = 10;
  private _defaultLineMaxWidth:number = 125;
  private _defaultXOffsetResponsibilities:number = 5;
  private _defaultXOffsetCollaborators = 130;
  private _defaultVerticalIndentResColl = 45;
  private _defaultLowerCaseWidth = 4.5;
  private _defaultUpperCaseWidth = 5.5;
  private _defaultCardHeight = 179;

  public get yOffsetCompartment(){
    return this._defaultVerticalIndentResColl;
  }

  public get xOffsetCompartmentLeft(){
    return this._defaultXOffsetResponsibilities;
  }

  public get xOffsetCompartmentRight(){
    return this._defaultXOffsetCollaborators;
  }

  public get lineMaxWidth(){
    return this._defaultLineMaxWidth;
  }

  public get lineHeight(){
    return this._defaultLineHeight;
  }

  public get lineWrapHeight(){
    return this._defaultLineWrapHeight;
  }


  public get defaultModelTitle() {
    return this._defaultModelTitle;
  }

  public get defaultModelWidth() {
    return this._defaultModelWidth;
  }

  public get defaultModelHeight() {
    return this._defaultModelHeight;
  }

  public get modelSizes() {
    return this._modelSizes;
  }

  public get lowerCaseWidth(){
    return this._defaultLowerCaseWidth;
  }

  public get upperCaseWidth(){
    return this._defaultUpperCaseWidth;
  }

  public get cardHeight(){
    return this._defaultCardHeight;
  }


}
