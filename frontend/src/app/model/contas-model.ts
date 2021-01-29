export class Contas {
  _id: String;
  descricao: String;
  valorTotal: String;
  vencimento: String;
  status: String;
  user?: string;
  userName?: string;

  constructor(
    _id: String,
    descricao: string,
    valorTotal: string,
    vencimento: string,
    status: string,
    user?: string,
    userName?: string
  ) {
    this._id = _id;
    this.descricao = descricao;
    this.valorTotal = valorTotal;
    this.vencimento = vencimento;
    this.status = status;
    this.user = user;
    this.userName = userName;
  }
}
