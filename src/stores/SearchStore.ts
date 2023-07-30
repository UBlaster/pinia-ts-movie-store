import { defineStore } from 'pinia';
import { useMovieStore } from './MovieStore';
import { ref } from 'vue';
import axios from 'axios';


const url: string = "https://api.themoviedb.org/3/search/movie?api_key=118c9b75e76bedaf862e8ed1de56f164&query=";


// export const useSearchStore =  defineStore('searchStore',{
//     state: () => ({
//         movies:[],
//         loader: false,
//     }),
//     actions: {
//         async getMovies(search:string) {
//             try {
//                 this.loader = true;
//                 const response = await axios.get(`${url}${search}`);
//                 this.movies = response.data.results;
//                 this.loader = false;
//             } catch (error) {
//                 console.error(error);
//             }
//         },
//         addToUserMovies(object: any) {
//             const movieStore = useMovieStore();
//             movieStore.movies.push({...object, isWatched:false });
//             movieStore.activeTab = 1;
//         }
//     }
// })

export const useSearchStore =  defineStore('searchStore', () => {
    const loader = ref(false);
    const movies = ref ([]);

    const getMovies = async(search:string) => {
        try {
            loader.value = true;
            const response = await axios.get(`${url}${search}`);
            movies.value = response.data.results;
            loader.value = false;
        } catch(error) {
            console.error(error);
        }
    }
    const addToUserMovies = (object: any) => {
        const movieStore = useMovieStore();
        movieStore.movies.push({...object, isWatched:false });
        movieStore.activeTab = 1;
    }


    return {
        getMovies,
        addToUserMovies,
        loader,
        movies
    }
})