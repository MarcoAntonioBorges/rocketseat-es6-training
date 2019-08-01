import axios from 'axios'

// class Api {
//   static async getUserInfo(username) {
//     try {
//       const response = await axios.get(`https://api.github.com/users/${username}`)

//       console.log(response)
//     } catch (error) {
//       console.warn("Erro na API")
//     }

//   }
// }

// Api.getUserInfo('MarcoAntonioBorgessdsd')
// Funão delay aciona o .then após 1s
const delay = () => new Promise(resolve => setTimeout((resolve), 1000));
async function umPorSegundo() {
  console.log('1s');
  await delay()
  console.log('2s');
  await delay()
  console.log('3s');
  await delay()
}
umPorSegundo();

class Github {
  static async getRepositories(repo) {
    try {
      const response = await axios.get(`https://api.github.com/repos/${repo}`)

      console.log(response.data);
      
    } catch (error) {
      console.warn("Repositorio nao existe");
      
    }
  }
}
Github.getRepositories('MarcoAntonioBorges/lava-rapido');
Github.getRepositories('rocketseat/dslkvmskv');