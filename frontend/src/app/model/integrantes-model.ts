export class Integrantes{
  _id: string;
  integrante1: string;
  integrante2: string;
  integrante3: string;
  integrante4: string;
  user?: string;
  userName?: string;

  constructor(
    _id: string,
    integrante1: string,
    integrante2: string,
    integrante3: string,
    integrante4: string,
    user?: string,
    userName?: string
  ){
    this._id = _id;
    this.integrante1 = integrante1;
    this.integrante2 = integrante2;
    this.integrante3 = integrante3;
    this.integrante4 = integrante4;
    this.user = user;
    this.userName = userName;
  }
}
