<template >
    <form @submit.prevent="searchStore.getMovies(searchMovie)">
        <input 
        type="text" 
        class="search-input" 
        placeholder="Input movie" 
        v-model="searchMovie" />
    </form>
    <loader v-if="searchStore.loader"/>
    <div v-else>
      <Movie 
      v-for="movie of searchStore.movies" 
      :key="searchStore.id" 
      :movie="movie" 
      :is-search="true" />
    </div>
</template>

<script lang="ts" setup>
import Movie from './Movie.vue';
import Loader from './Loader.vue';
import { ref } from 'vue';
import { useSearchStore } from '../stores/SearchStore';

const searchMovie= ref('');
const searchStore: any = useSearchStore();



</script >


<style lang="css">
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>