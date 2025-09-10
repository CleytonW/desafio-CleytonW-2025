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
    let ordem = ordemAnimais.split(",");

    // REGRA DOS GATOS (super básica)
    // 1. Pega só os nomes dos gatos na ordem de adoção
    let nomesGatosNaOrdem = [];
    for (let i = 0; i < ordem.length; i++) {
      for (let j = 0; j < this.animais.length; j++) {
        if (
          this.animais[j].nome === ordem[i] &&
          this.animais[j].tipo === "gato"
        ) {
          nomesGatosNaOrdem.push(ordem[i]);
        }
      }
    }

    // 2. Cria uma lista para guardar gatos que vão para o abrigo
    let gatosAbrigo = [];

    // 3. Para cada par de gatos, compara os brinquedos
    for (let i = 0; i < nomesGatosNaOrdem.length; i++) {
      // pega o objeto do gato 1
      let gato1 = null;
      for (let a = 0; a < this.animais.length; a++) {
        if (this.animais[a].nome === nomesGatosNaOrdem[i]) {
          gato1 = this.animais[a];
        }
      }
      for (let j = i + 1; j < nomesGatosNaOrdem.length; j++) {
        // pega o objeto do gato 2
        let gato2 = null;
        for (let b = 0; b < this.animais.length; b++) {
          if (this.animais[b].nome === nomesGatosNaOrdem[j]) {
            gato2 = this.animais[b];
          }
        }
        // compara cada brinquedo do gato1 com cada brinquedo do gato2
        for (let k = 0; k < gato1.brinquedos.length; k++) {
          for (let l = 0; l < gato2.brinquedos.length; l++) {
            if (gato1.brinquedos[k] === gato2.brinquedos[l]) {
              // se achar brinquedo igual, coloca os dois gatos na lista do abrigo
              if (!gatosAbrigo.includes(gato1.nome)) {
                gatosAbrigo.push(gato1.nome);
              }
              if (!gatosAbrigo.includes(gato2.nome)) {
                gatosAbrigo.push(gato2.nome);
              }
            }
          }
        }
      }
    }
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

    if (gatosAbrigo.length > 0) {
      for (let i = 0; i < gatosAbrigo.length; i++) {
        resultado.push(gatosAbrigo[i] + " - abrigo");
      }

      let novaOrdem = [];
      for (let i = 0; i < ordem.length; i++) {
        if (!gatosAbrigo.includes(ordem[i])) {
          novaOrdem.push(ordem[i]);
        }
      }
      ordem = novaOrdem;
    }

    for (const animal of this.animais) {
      if (!ordem.includes(animal.nome)) continue;

      if (animal.nome === "Loco") {
        let totalAdotados = adocaoPessoa1 + adocaoPessoa2;
        if (totalAdotados === 0) {
          resultado.push(`${animal.nome} - abrigo`);
        } else {
          let pessoa1Tem = false;
          let pessoa2Tem = false;
          for (let i = 0; i < animal.brinquedos.length; i++) {
            if (lista1.includes(animal.brinquedos[i])) {
              pessoa1Tem = true;
            }
            if (lista2.includes(animal.brinquedos[i])) {
              pessoa2Tem = true;
            }
          }
          if (pessoa1Tem && adocaoPessoa1 < 3) {
            resultado.push(`${animal.nome} - pessoa 1`);
            adocaoPessoa1++;
          } else if (pessoa2Tem && adocaoPessoa2 < 3) {
            resultado.push(`${animal.nome} - pessoa 2`);
            adocaoPessoa2++;
          } else {
            resultado.push(`${animal.nome} - abrigo`);
          }
        }
        continue;
      }

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
      if (pessoa1TemBrinquedos && pessoa2TemBrinquedos) {
        resultado.push(`${animal.nome} - abrigo`);
      } else if (pessoa1TemBrinquedos) {
        resultado.push(`${animal.nome} - pessoa 1`);
        adocaoPessoa1++;
      } else if (pessoa2TemBrinquedos) {
        resultado.push(`${animal.nome} - pessoa 2`);
        adocaoPessoa2++;
      } else {
        resultado.push(`${animal.nome} - abrigo`);
      }
    }
    resultado.sort();
    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
