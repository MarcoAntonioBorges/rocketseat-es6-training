import api from './api'; //Importando o meu script de API

class App {
  constructor() {
    // Array de repositorios
    this.repositories = [];

    // Pegando os elementos
    this.formEl = document.getElementById('repo-form');
    this.inputEl = document.querySelector('input[name=repository]');
    this.listEl = document.getElementById('repo-list');

    //Chamando a funcao para escutar os eventos
    this.registerHandlers();
  }

  //Funcao que escuta/captura os eventos
  registerHandlers() {
    //Quando houver um evento de submit a funcao chama outra funcao para adicionar o repositorio
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  //Funcao assicrona para adicionar o repositorio na lista
  async addRepository(event) { //Captura o evento pelo parametro
    event.preventDefault();//Para o evento padrao

    const repoInput = this.inputEl.value;//Pega o valor do input
    
    //Realiza uma validacao
    if (repoInput.length === 0) {
      return;
    }

    //Chama funcao de Loading... Apenas para dar um parecer ao usuario
    this.setLoading();

    //Bloco try_catch
    try {
      //armazena o response da chamada da API, passando como parametro o repositorio para a busca
      const response = await api.get(`/repos/${repoInput}`);//Utilizando a tecnica de Async/Await e de Template String

      //Armazenando o conteudo que quero extrair do response da API
      const { name, description, html_url, owner: { avatar_url } } = response.data;//Utilizando uma tecnica de destruturacao de objeto

      //Adicionando o repositorio no meu Array de Repositorios
      this.repositories.push({//Utilizando a tecnica de short-object, o nome dos atributos sao os mesmos dos valores
        name,
        description,
        avatar_url,
        html_url
      });

      
      this.render();//Renderizando os novos dados para o usuario
    } catch (error) {//Bloco Catch => Captura o erro, repositorio inexistente
      console.log(error);
      alert('O Repositorio nao existe');//Mostra ao usuario que o repositorio buscado e inexistente
    }
    
    this.inputEl.value = ''; // Limpa o input
    this.setLoading(false); // Para o carregando, ou melhor tira a msg de carregando... para o usuario

  }

  render() {
    this.listEl.innerHTML = '';

    this.repositories.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);

      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name));

      let descEl = document.createElement('p');
      descEl.appendChild(document.createTextNode(repo.description));

      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');
      linkEl.appendChild(document.createTextNode('Acessar'));
      linkEl.setAttribute('href', repo.html_url);

      let listItemEl = document.createElement('li');
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);
    });
  }

  setLoading(loading=true){
    if(loading === true){
      let loadingEl = document.createElement('span');
      loadingEl.appendChild(document.createTextNode('Carregando...'));
      loadingEl.setAttribute('id', 'load');

      this.formEl.appendChild(loadingEl);
    }else{
      document.getElementById('load').remove();
    }
  }
}

new App();