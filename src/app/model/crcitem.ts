import { UUID } from 'angular2-uuid';
/** Represents a card in a CRC Model **/
export class CRCItem {

  public static CONTROLLER:string = 'controller';

  public static ENTITY:string = 'entity';

  public static BOUNDARY:string = 'boundary';

  private _name: string;
  private _uuid: string;
  private _responsibilities: Array<string> = [];
  private _collaborators: Array<string> = [];
  private _posX: number = 0;
  private _posY: number = 0;
  private _type:string;

  constructor(public name?: string) {
    this._name = name;
  }

  public get uuid(): string {
    return this._uuid;
  }

  public initUuid(): void {
    this._uuid = UUID.UUID();
  }


  public set collaborators(collaborators: Array<string>) {
    this._collaborators = collaborators;
  }

  public get collaborators(): Array<string> {
    return this._collaborators;
  }


  public set responsibilities(responsibilities: Array<string>) {
    this._responsibilities = responsibilities;
  }

  /**
   * Get the responsibilities of this CRC.
   * @returns {Array<string>}
   */
  public get responsibilities(): Array<string> {
    return this._responsibilities;
  }

  public get posX() {
    return this._posX;
  }

  public set posX(val: number) {
    this._posX = val;
  }

  public get posY(){
    return this._posY;
  }

  public set posY(val:number){
    this._posY = val;
  }

  public get type(){
    return this._type;
  }

  public set type(type:string){
    this._type = type;
  }


}
