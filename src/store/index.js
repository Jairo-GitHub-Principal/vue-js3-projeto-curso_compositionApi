import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    todos:[]
  },
  mutations: {
    storeTodos(state,payload){
      state.todos=payload
    },
    storeTodo(state,payload){ // obs essa logica poderia estar dentro do update, que ainda faria sentido
      const index = state.todos.findIndex(todo=>todo.id===payload.id)
      if(index >=0){ // se o elemento do indice existir , sera atualizado com as novas informações contidas em payload
        state.todos.splice(index,1,payload) //O método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
      }else{ // se não: caso não haja nenhuma informação cadastrada para o indice(index), sera feito um push, e as novas informações dara origem a um novo cadastro
        state.todos.push(payload)
      }
      console.log(index);
      //state.todos.push(payload)
    },

    deleteTodo(state,id){
      const index = state.todos.findIndex(todo=>todo.id === id)
      if(index >=0){
        state.todos.splice(index,1)
      }
    }
  },
  actions: { // a action 

    // recuperar os dados
    getTodos({commit}){
      
      return new Promise((resolve)=>{ // codigo função promise() usado para implementar o delay o mesmo sera retornado pelo resolve, a mesma não é necessario para o funcionamento do get do ajax

        setTimeout(()=> { // a função settimeout aqui esta sendo usada para criar um atraso(delay) no carregamento do  contudo do get() do ajax,  a mesma não é necessario para o funcionamento do get do ajax
          // abaiixo temos o codigo do ajax
        return axios.get("http://localhost:3000/todos")
        .then((response) => {
          commit("storeTodos", response.data);
          resolve()
        })
        // abaixo temos o codigo que vai finalizar o loading
      },2000)   

      }) 
      
    },

    // add dados
    addTodo({commit},data){ // o data é os dados
        return axios.post('http://localhost:3000/todos',data) // aqui fazemos o envio dos dados para nosso database
        .then((response) =>{commit('storeTodo',response.data) // aqui retornamos a lista dos dados atualizados, ou seja , retorna a lista de dados junto com o dado que acabou de ser inserido no database
        })
    },

    // atualizar dados Update
    updateTodo({commit},{id,data}){
      return axios.put(`http://localhost:3000/todos/${id}`,data) // chamada ajax, com a url, onde sera persistidos os dados, o id do dado que sera atualiizado, e o valor dos dados cujo mesmo passara a ser o valor atual
          .then((response)=>{ // resposta
          commit('storeTodo',response.data) // commit chama o metodo storeTodo e passa os dados de resposta "response.data" para o metodo storeTodo
          })
    },

    deleteTodo({commit},id){
      return axios.delete(`http://localhost:3000/todos/${id}`) // chamada ajax, com a url, onde sera persistidos os dados, o id do dado que sera atualiizado, e o valor dos dados cujo mesmo passara a ser o valor atual
          .then(()=>{ // resposta
          commit('deleteTodo',id) // commit chama o metodo storeTodo e passa os dados de resposta "response.data" para o metodo storeTodo
          })
    }

  },
  
  getters: {
  },
  modules: {
  }
})
