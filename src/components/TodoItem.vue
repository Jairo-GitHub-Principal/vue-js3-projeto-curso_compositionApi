<template>
   <div class="bg-gray-300 rounded-sm">
      <div
        class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0"
      >
        <div class="flex items-center justify-center mr-2">
          <!-- botão para marcar a tarefa como completada ou não-->
          <button 
          :class="{
                  'text-gray-400':!isCompleted,
                  'text-green-600':isCompleted
            }" 
            @click="onCheckClick"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </button>
        </div>

        <div class="w-full">
          
          <input
            type="text"
            placeholder="Digite a sua tarefa"
            v-model="title"
            class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3"

            @keyup.enter="onTitleChange"
          />
        </div>

        <div class="ml-auto flex items-center justify-center">

          <!-- botão para excluir uma tarefa-->
          <button class="focus:outline-none"
            @click="onDelete"
          >
            <svg
              class="ml-3 h-4 w-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- na tag abaixo os codigos formam o icone da lixeiira do botão delete para excluiir as todos-->
              <path
                        d="M19 7L18.1327 19.1425C18.0579 
                        20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 
                        19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 
                        3 9 3.44772 9 4V7M4 7H20"
                        
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        props:{
            todo:{
                type:Object,
                default:()=>({}),
            }
        },
        data() {
          return {
            title:this.todo.title,
            isCompleted: this.todo.completed
          }
        },
        methods:{
           onTitleChange(){  // aqui temos o metodo update, que vai receber os dados digitados pelo usuario , e enviar para nossa store, para que os mesmos sejam percistidos no nosso DB
             // aqui o valor atual na imput, é passado como parametro, e é add na const newTiitle, e é atribuido como novo valor da propriedade title da nossa "todos"

            if(!this.title){
              return;
            }
            this.updateTodo()
           
            console.log(this.title)
          },

          updateTodo(){
            const payload ={ // objeto que contem que tem todas as propriedade da todo, que sera atualizada
              id:this.todo.id,
              data:{
                title:this.title,
                completed: this.isCompleted

              }
            }
            this.$store.dispatch('updateTodo',payload) // cahma o metod  updateTodo, no arquiivo index da nossa store e passa pra ele o objeto payload, que tem os novos dados para ser percistiidos , no DB e atualiiza a base de dados existentes, 
          },
          onCheckClick(){
            this.isCompleted = !this.isCompleted
            this.updateTodo()
          },

          // delete

          onDelete(){
            this.$store.dispatch('deleteTodo', this.todo.id)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>