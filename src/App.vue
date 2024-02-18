<template>
  <!--content-->
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <!--TodoSpinner-->
      <TodoSpinner v-if="loading" />

      <div v-else>
        <!--Todoform -->
        <TodoForm />

        <!-- Todo items  se "todos for > = mostra o conteudo das todos"-->
        <TodoItems v-if="$store.state.todos.length" />

        <!-- Todo empty se "todos for  = 0  mostra o conteudo de todoEmpyt" -->
        <TodoEmpty v-else />
      </div>
    </div>
  </div>
  <!--/ Content -->
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoSpinner from "./components/TodoSpinner.vue";
import TodoItems from "./components/TodoItems.vue";
import TodoEmpty from "./components/TodoEmpty.vue";
import { ref } from 'vue';
import{useStore}from 'vuex';

export default {
  name: "App",
  components: {
    TodoSpinner,
    TodoForm,
    TodoItems,
    TodoEmpty,
  },

  setup(){
    const loading = ref(false);
    const store = useStore()

    loading.value=true // faz o sinal de carregamento do loading aparacer
    store.dispatch('getTodos').finally(()=>{  // aqui fazemos o dispatch  da action obs.: la no store, usamos store direto aqui temos que usar $store com o $ na frete da declaração
      loading.value = false // faz o sinal de carregamento do loading sumir e aparece então o conteudo que deve ser exiibido
    }) 
   
    console.log('fim settimeout')
    /** 
     * O Dispatch é um método simples do Store, que tem como responsabilidade
     *  enviar a Action ao Reducer. Sua sintaxe é extremamente simples, chamamos
     *  o método . dispatch() e passamos por parâmetro a Action a ser enviada.
     */

      return{
        loading,
      }
  } 
};
</script>