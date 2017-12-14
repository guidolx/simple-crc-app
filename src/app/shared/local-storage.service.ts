import { Injectable } from '@angular/core';
import { CRCModel } from '../model/crcmodel';
import { CRCItem } from '../model/crcitem';
/**
Service which wraps the html5 localstorage object and provides methods to save
and retrieve CRC model data.
**/
@Injectable()
export class LocalStorageService {

  constructor() { }

  /**
  Returns all models parsed as JSON items in an array.
  CRC Cards are ignored.
  **/
  public getAllModels(): Array<CRCModel> {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      values.push(this.parse(localStorage.getItem(keys[i])));
    }
    return values;
  }

  /** Save a model. The uuid of the model will serve as a key and
  the data stored as a json string **/
  public save(model: CRCModel): void {
    localStorage.setItem(model.uuid, JSON.stringify(model));
  }

  /** Delete a model from the local storage **/
  public delete(model: CRCModel):void {
    localStorage.removeItem(model.uuid);
  }

  /** Save a json  **/
  public saveJson(data: string): CRCModel {
    if (data == null || data.length == 0) {
      return null;
    }
    let m: CRCModel = this.parse(data);
    m.updateUUID();
    localStorage.setItem(m.uuid, JSON.stringify(m));
    m = this.load(m.uuid);
    return m;
  }

  /** Load the model with the given uuid. **/
  public load(uuid: string): CRCModel {
    const m = localStorage.getItem(uuid);
    if (m !== undefined) {
      let c: CRCModel = new CRCModel();
      let o = JSON.parse(m);
      Object.assign(c, o);
      if (c.items != null) {
        let ar: Array<CRCItem> = new Array();

        c.items.forEach((item) => {
          let i = new CRCItem();
          Object.assign(i, item);

          ar.push(i);
        });
        c.items = ar;
      }
      return c;
    }
    return undefined;
  }

  /** Parse the json data an return a CRCModel instance **/
  public parse(data: string): CRCModel {
    let c: CRCModel = new CRCModel();
    Object.assign(c, JSON.parse(data));
    return c;
  }

}
