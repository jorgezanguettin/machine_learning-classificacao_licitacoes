import {  Injectable} from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url = "https://api-tcc-agro-licitacoes.herokuapp.com"

  constructor(private http: HttpClient) {}

  // LICITACOES METHODS

  get_all_licitacoes() {
    return this.http.get(`${this.base_url}/licitacoes/all`);
  };

  get_one_licitacao(id) {
    return this.http.post(`${this.base_url}/licitacoes/one`, {
      'id': id
    })
  };

  get_all_licitacao_categoria(categoria) {
    return this.http.post(`${this.base_url}/licitacoes/categoria`, {
      'categoria': categoria
    })
  };

    // USUARIOS METHODS

  cadastrar(formData) {
    return this.http.post(`${this.base_url}/usuarios/cadastrar`, formData)
  };

  login(formData) {
    return this.http.post(`${this.base_url}/usuarios/login`, formData)
  };

  trocar_senha(formData) {
    return this.http.post(`${this.base_url}/usuarios/alterarsenha`, formData)
  };

  deletar_conta(formData) {
    return this.http.post(`${this.base_url}/usuarios/deletar`, formData)
  };

    // ESTATISTICAS METHODS
  
    get_all_estatisticas() {
      return this.http.get(`${this.base_url}/estatisticas/all`);
    };
  
    cadastrar_sugestao(formData) {
      return this.http.post(`${this.base_url}/estatisticas/sugestoes`, formData )
    };

}