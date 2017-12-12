export class ActionEvent {

  public static ACTION_EDIT_CARD: string = 'EDIT_CARD';
  public static ACTION_DELETE_CARD: string = 'DELETE_CARD';

  private _payload: any;
  private _type: string;

  constructor(type?: string, payload?: any) {
    this._type = type;
    this._payload = payload
  }

  public get payload() {
    return this._payload;
  }

  public set payload(payload: any) {
    this._payload = payload;
  }

  public get type() {
    return this._type;
  }

  public set type(type: string) {
    this._type = type;
  }
}

//export default { ActionEvent };
