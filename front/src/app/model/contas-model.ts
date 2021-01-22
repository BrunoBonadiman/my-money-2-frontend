export class Contas {
  _id: String;
  descricao: String;
  valorTotal: String;
  vencimento: String;
  status: String;

  constructor(
    _id: String,
    descricao: string,
    valorTotal: string,
    vencimento: string,
    status: string
  ) {
    this._id = _id;
    this.descricao = descricao;
    this.valorTotal = valorTotal;
    this.vencimento = vencimento;
    this.status = status;
  }
}
