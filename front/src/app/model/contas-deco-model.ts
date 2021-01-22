export class ContasDeco {
  _id: String;
  descricao: String;
  detalhe: String;
  valor: String;
  vencimento: String;
  parcela: String;
  status: String;

  constructor(
    _id: String,
    descricao: string,
    detalhe: string,
    valor: string,
    vencimento: string,
    parcela: string,
    status: string
  ) {
    this._id = _id;
    this.descricao = descricao;
    this.detalhe = detalhe;
    this.valor = valor;
    this.vencimento = vencimento;
    this.parcela = parcela;
    this.status = status;
  }
}
