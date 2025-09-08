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
      pessoa1, pessoa2 
    };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
