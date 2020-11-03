import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  public buscarTodos(url: string) {
    return this.http.get(url);
  }

  public buscarPorId(url: string){
    return this.http.get(`${url}`)
  }
}
