

// CRIADORES DO APP:
// RENATO PRANDINI & GUILHERME RODRIGUES PRADO

// COLABORADORES NA PARTE DE PAGINAÇÃO:
// CARLOS EDUARDO ARTIOLI & LEONARDO FELIPE DA SILVA


import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listaPokemons: any = [];
  public url = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0';
  public pagina = 1;
  public totalPaginas = 105;
  public next: string;
  public previous: string;

  constructor(private pokeService: PokemonService) { }

  ionViewWillEnter() {
    this.buscarTodos(1);
  }

  public buscarTodos(pagina: number) {
    if (pagina <= 0) {
      pagina = 1;
    }
    this.pagina = pagina;

    this.pokeService.buscarTodos(this.url).subscribe(dados => {
      this.listaPokemons = [];
      this.next = dados['next'];
      this.previous = dados['previous'];
      let listaApi = dados['results'];
      for (let item of listaApi) {
        this.pokeService.buscarPorId(item.url).subscribe(dadosPokemon => {
          this.listaPokemons.push(dadosPokemon);
        });
      }
    });
  }

  public nextPage() {
    this.url = this.next;
    this.buscarTodos(this.pagina + 1);
  }

  public previousPage() {
    this.url = this.previous;
    this.buscarTodos(this.pagina - 1);
  }


}
