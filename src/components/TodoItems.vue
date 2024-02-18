<template>
  <div class="space-y-2">
    <TodoItem   v-for="todos in $store.state.todos" 
                :key="todos.id"
                :todo="todos"/>
    
    

    
  </div>
  <!--/ Todo items -->
</template>

<script>
import TodoItem from './TodoItem.vue';
export default {
components:{TodoItem}
   
};
</script>

<style lang="scss" scoped>
</style>