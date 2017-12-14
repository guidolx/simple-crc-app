import { UUID } from 'angular2-uuid';
import { CRCItem } from '../model/crcitem';
/** Represents a CRC Model which can have cards.**/
class CRCModel {

  private _width: number;
  private _height: number;
  private _uuid: string;
  private _title: string;
  private _created: Date;
  private _updated: Date;
  private _items: Array<CRCItem>;

  constructor(items?: Array<CRCItem>, uuid?: string) {
    this._items = items === undefined ? [] : items;
    this._uuid = uuid === undefined ? UUID.UUID() : uuid;
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public get uuid() {
    return this._uuid;
  }

  public get created() {
    return this._created;
  }

  public get title() {
    return this._title;
  }

  public get updated() {
    return this._updated;
  }

  public get items() {
    return this._items;
  }

  public set items(ar: Array<CRCItem>) {
    this._items = ar;
  }

  public add(item: CRCItem): void {
    this._items.push(item);
  }

  public set height(height: number) {
    this._height = height;
  }

  public set width(width: number) {
    this._width = width;
  }

  public set title(title: string) {
    this._title = title;
  }

  public update(item: CRCItem) {
    const index: number = this.items.indexOf(item);
    if (index > -1) {
      this._items[index] = item;
    }
  }

  public delete(items: CRCItem[]) {
    items.forEach((item) => {
      this._items.filter(obj => obj !== item);
    });
  }

  public updateUUID(){
    this._uuid = UUID.UUID();
  }


}

export { CRCModel };
