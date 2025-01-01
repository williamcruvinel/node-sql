// Define uma classe customizada para representar erros HTTP
export class HttpError extends Error{
  status: number // Propriedade para armazenar o código de status HTTP do erro

  // Construtor da classe que recebe o código de status e uma mensagem de erro
  constructor(status: number, message: string){
    super(message) // Chama o construtor da classe base 'Error', passando a mensagem de erro
    this.status = status // Atribui o código de status HTTP à propriedade 'status' da instância
  }
}