// Classe Atrativo
class Atrativo {
  constructor(nome, localizacao) {
    this.nome = nome;
    this.localizacao = localizacao;
  }
}

// Classe Destino
class Destino {
  constructor(nome, foto, descricao, localizacao, atrativos) {
    this.nome = nome;
    this.foto = foto;
    this.descricao = descricao;
    this.localizacao = localizacao;
    this.atrativos = atrativos.map(atrativo => new Atrativo(atrativo.nome, atrativo.localizacao));
  }
}

// Função para listar pontos turísticos
async function listar_pontos_turisticos(event, pontos_turisticos = null) {
  const wrapper = document.getElementById("wrapper");
  const pontos_turisticos_json = pontos_turisticos ? pontos_turisticos : await (await fetch("src/files/pontos_turisticos.json")).json();
  wrapper.innerHTML = "";

  const destinos = pontos_turisticos_json.map(p => new Destino(p.nome, p.foto, p.descricao, p.localizacao, p.atrativo));

  destinos.forEach(destino => {
    const div_ponto_turistico = document.createElement("div");
    const img_ponto_turistico = document.createElement("img");
    const div_conteudo_ponto_turistico = document.createElement("div");
    const nome_ponto_turistico = document.createElement("p");
    const descricao_ponto_turistico = document.createElement("p");
    const atrativos_ponto_turistico_label = document.createElement("p");
    const href_local_turistico = document.createElement("a");
    const img_local_turistico = document.createElement("img");
    const div_nome_localizacao = document.createElement("div");
    const atrativos_ponto_turistico = document.createElement("ul");

    div_ponto_turistico.className = "ponto_turistico";
    img_ponto_turistico.src = destino.foto;
    img_ponto_turistico.className = "img_ponto_turistico";
    div_conteudo_ponto_turistico.className = "conteudo_ponto_turistico";
    nome_ponto_turistico.className = "nome_ponto_turistico";
    nome_ponto_turistico.textContent = destino.nome;
    descricao_ponto_turistico.className = "descricao_ponto_turistico";
    descricao_ponto_turistico.textContent = destino.descricao;

    img_local_turistico.src = "src/assets/images/localizacao.svg";
    href_local_turistico.href = destino.localizacao;
    href_local_turistico.appendChild(img_local_turistico);
    href_local_turistico.appendChild(nome_ponto_turistico);
    href_local_turistico.className = "div_nome_localizacao";

    div_nome_localizacao.className = "div_nome_localizacao";
    div_nome_localizacao.appendChild(href_local_turistico);

    div_conteudo_ponto_turistico.appendChild(div_nome_localizacao);
    div_conteudo_ponto_turistico.appendChild(descricao_ponto_turistico);

    atrativos_ponto_turistico_label.textContent = "Locais recomendados:";
    atrativos_ponto_turistico.className = "atrativos_ponto_turistico";
    atrativos_ponto_turistico.appendChild(atrativos_ponto_turistico_label);

    destino.atrativos.forEach(atrativo => {
      const atrativo_ponto_turistico_li = document.createElement("li");
      const href_atrativo_ponto_turistico = document.createElement("a");
      href_atrativo_ponto_turistico.href = atrativo.localizacao;
      href_atrativo_ponto_turistico.textContent = atrativo.nome;
      atrativo_ponto_turistico_li.appendChild(href_atrativo_ponto_turistico);
      atrativos_ponto_turistico.appendChild(atrativo_ponto_turistico_li);
    });

    div_ponto_turistico.appendChild(img_ponto_turistico);
    div_ponto_turistico.appendChild(div_conteudo_ponto_turistico);
    div_ponto_turistico.appendChild(atrativos_ponto_turistico);
    wrapper.appendChild(div_ponto_turistico);
  });
}

// Função de busca
async function search_pontos_turisticos() {
  const lista_search = [];
  const input = document.getElementById("barra__pesquisa").value.toLowerCase();
  const pontos_turisticos_json = await (await fetch("src/files/pontos_turisticos.json")).json();

  for (const item of pontos_turisticos_json) {
    if (item.nome.toLowerCase().includes(input)) {
      lista_search.push(item);
    }
  }
  listar_pontos_turisticos(null, lista_search);
}

// Inicializa a lista de pontos turísticos e o mapa ao carregar a página
window.onload = async function() {
  await listar_pontos_turisticos();

  var map = L.map('map').setView([-4.8676, -43.3675], 7);  // Ajustado o nível de zoom para mostrar todos os pontos

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
  }).addTo(map);
  
  //marcador para Caxias
  L.marker([-4.8676, -43.3675]).addTo(map)
      .bindPopup('Caxias')
      .openPopup();
  
  //marcador para Carolina
  L.marker([-7.3275, -47.4673]).addTo(map)
      .bindPopup('Carolina');
  
  //marcador para Alcântara
  L.marker([-2.4027, -44.4211]).addTo(map)
      .bindPopup('Alcântara');
};
