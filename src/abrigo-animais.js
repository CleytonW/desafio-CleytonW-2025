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

    let gatosTemConflito = false;

    // compara cada gato com os outros
    for (let i = 0; i < this.animais.length; i++) {
      if (this.animais[i].tipo !== "gato") continue;

      for (let j = i + 1; j < this.animais.length; j++) {
        if (this.animais[j].tipo !== "gato") continue;

        // compara os brinquedos de dois gatos
        for (let b1 of this.animais[i].brinquedos) {
          for (let b2 of this.animais[j].brinquedos) {
            if (b1 === b2) {
              gatosTemConflito = true;
            }
          }
        }
      }
    }

    // se houver conflito, manda todos os gatos da ordem pro abrigo
    if (gatosTemConflito) {
      for (let animal of this.animais) {
        if (animal.tipo === "gato" && ordem.includes(animal.nome)) {
          resultado.push(animal.nome + " - abrigo");
        }
      }

      // remove gatos da ordem
      ordem = ordem.filter((nome) => {
        for (let animal of this.animais) {
          if (animal.tipo === "gato" && animal.nome === nome) {
            return false;
          }
        }
        return true;
      });
    }

    for (const animal of this.animais) {
      if (!ordem.includes(animal.nome)) continue;

      if (animal.nome === "Loco") {
        const jaAdotou = adocaoPessoa1 > 0 || adocaoPessoa2 > 0;
        if (jaAdotou) {
          if (
            lista1.includes(animal.brinquedos[0]) ||
            lista1.includes(animal.brinquedos[1])
          ) {
            resultado.push(`${animal.nome} - pessoa 1`);
            adocaoPessoa1++;
          } else if (
            lista2.includes(animal.brinquedos[0]) ||
            lista2.includes(animal.brinquedos[1])
          ) {
            resultado.push(`${animal.nome} - pessoa 2`);
            adocaoPessoa2++;
          } else {
            resultado.push(`${animal.nome} - abrigo`);
          }
        } else {
          resultado.push(`${animal.nome} - abrigo`);
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
    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
