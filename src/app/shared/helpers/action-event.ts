/**
Class which represents an event.
**/
export class ActionEvent {

  /** Action fired when a card needs to be edited. **/
  public static ACTION_EDIT_CARD: string = 'EDIT_CARD';

  /** Action fired when a card needs to be deleted. **/
  public static ACTION_DELETE_CARD: string = 'DELETE_CARD';

  /** the payload can be anything **/
  private _payload: any;

  /** identifies the type of the event **/
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
