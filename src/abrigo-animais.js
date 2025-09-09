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

    const listaBrinquedos = [
      "BOLA",
      "RATO",
      "LASER",
      "CAIXA",
      "NOVELO",
      "SKATE",
    ];
    const nomesAnimais = [
      "Rex",
      "Mimi",
      "Fofo",
      "Zero",
      "Bola",
      "Bebe",
      "Loco",
    ];

    for (const brinquedo of lista1) {
      if (!listaBrinquedos.includes(brinquedo)) {
        return { erro: "Brinquedo inválido" };
      }
    }

    for (const brinquedo of lista2) {
      if (!listaBrinquedos.includes(brinquedo)) {
        return { erro: "Brinquedo inválido" };
      }
    }

    const brinquedosDuplicados1 = new Set(lista1);
    if (brinquedosDuplicados1.size !== lista1.length) {
      return { erro: "Brinquedo inválido" };
    }

    const brinquedosDuplicados2 = new Set(lista2);
    if (brinquedosDuplicados2.size !== lista2.length) {
      return { erro: "Brinquedo inválido" };
    }

    for (const animal of ordem) {
      if (!nomesAnimais.includes(animal)) {
        return { erro: "Animal inválido" };
      }
    }

    const animaisUnicos = new Set(ordem);
    if (animaisUnicos.size !== ordem.length) {
      return { erro: "Animal inválido" };
    }

    let resultado = [];

    let adocaoPessoa1 = 0;
    let adocaoPessoa2 = 0;

    for (const animal of this.animais) {
      if (!ordem.includes(animal.nome)) continue;

      const pessoa1TemBrinquedos = this.contemBrinquedosNaOrdem(
        lista1,
        animal.brinquedos
      );
      const pessoa2TemBrinquedos = this.contemBrinquedosNaOrdem(
        lista2,
        animal.brinquedos
      );

      const disponibilidadePessoa1 = pessoa1TemBrinquedos && adocaoPessoa1 < 3;
      const disponibilidadePessoa2 = pessoa2TemBrinquedos && adocaoPessoa2 < 3;
      if (
        animal.tipo === "gato" &&
        pessoa1TemBrinquedos &&
        pessoa2TemBrinquedos
      ) {
        resultado.push(`${animal.nome} - abrigo`);
      } else if (pessoa1TemBrinquedos) {
        resultado.push(`${animal.nome} - pessoa 1`);
      } else if (pessoa2TemBrinquedos) {
        resultado.push(`${animal.nome} - pessoa 2`);
      } else {
        resultado.push(`${animal.nome} - abrigo`);
      }
    }
    return { lista: resultado };
  }
}

const abrigo = new AbrigoAnimais();
console.log(abrigo.contemBrinquedosNaOrdem(["BOLA", "RATO"], ["BOLA", "RATO"]));
console.log(abrigo.contemBrinquedosNaOrdem(["RATO", "BOLA"], ["BOLA", "RATO"]));

export { AbrigoAnimais as AbrigoAnimais };
