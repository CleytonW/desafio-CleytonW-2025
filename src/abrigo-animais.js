class AbrigoAnimais {
  constructor() {
    this.animais = [
      { nome: "Rex", tipo: "cão", brinquedos: ["BOLA", "RATO"] },
      { nome: "Mimi", tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      { nome: "Fofo", tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      { nome: "Zero", tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      { nome: "Bola", tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      { nome: "Bebe", tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      { nome: "Loco", tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    ];
  }

  contemBrinquedosNaOrdem(listaBrinquedosPessoa, brinquedosFavoritos) {
    let procurarBrinquedoFavorito = 0;
    for (let i = 0; i < listaBrinquedosPessoa.length; i++) {
      if (
        listaBrinquedosPessoa[i] ===
        brinquedosFavoritos[procurarBrinquedoFavorito]
      ) {
        procurarBrinquedoFavorito = procurarBrinquedoFavorito + 1;
      }
      if (procurarBrinquedoFavorito === brinquedosFavoritos.length) {
        return true;
      }
    }
    return false;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const lista1 = brinquedosPessoa1.split(",");
    const lista2 = brinquedosPessoa2.split(",");
    const ordem = ordemAnimais.split(",");

    const pessoa1 = [];
    const pessoa2 = [];

    for (const animal of this.animais) {
      for (const brinquedo of animal.brinquedos) {
        if (lista1.includes(brinquedo) && !pessoa1.includes(animal.nome)) {
          pessoa1.push(animal.nome);
        }
        if (lista2.includes(brinquedo) && !pessoa2.includes(animal.nome)) {
          pessoa2.push(animal.nome);
        }
      }
    }
    return {
      pessoa1,
      pessoa2,
    };
  }
}

const abrigo = new AbrigoAnimais();
console.log(abrigo.contemBrinquedosNaOrdem(["BOLA", "RATO"], ["BOLA", "RATO"]));
console.log(abrigo.contemBrinquedosNaOrdem(["RATO", "BOLA"], ["BOLA", "RATO"]));

export { AbrigoAnimais as AbrigoAnimais };
