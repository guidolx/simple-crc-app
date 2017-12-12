import { Injectable } from '@angular/core';
import { CRCModel } from '../model/crcmodel';
import { CRCItem } from '../model/crcitem';

@Injectable()
export class LocalStorageService {

  constructor() { }

  public getAllModels(): Array<CRCModel> {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      values.push(this.parse(localStorage.getItem(keys[i])));
    }
    return values;
  }

  public save(model: CRCModel): void {
    localStorage.setItem(model.uuid, JSON.stringify(model));
  }

  public delete(model: CRCModel):void {
    localStorage.removeItem(model.uuid);
  }

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

  public parse(data: string): CRCModel {
    let c: CRCModel = new CRCModel();
    Object.assign(c, JSON.parse(data));
    return c;
  }

}
