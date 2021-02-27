export class Grafico{
  _id: string;
  valor: string;
  mes: string;
  ano: string;
  user?: string;
  userName?: string;

  constructor(
    _id: string,
    valor: string,
    mes: string,
    ano: string,
    user?: string,
    userName?: string
  ){
    this._id = _id;
    this.valor = valor;
    this.mes = mes;
    this.ano = ano;
    this.user = user;
    this.userName = userName;
  }
}
