import {defineStore} from 'pinia';
import { ref, computed, watch } from 'vue';

interface Movie {
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    isWatched: boolean;
}


// export const useMovieStore = defineStore('MovieStore', {
//     state: ()=> ({
//         movies: [] as Movie[],
//             activeTab: 2,
//     }),
//     getters: {
//         watchedMovies(): Movie[] {
//             return this.movies.filter(el => el.isWatched);      
//         },
//         totalCountMovies(): number {
//             return this.movies.length;
//         },
//         countFiltredMovies(): number {
//             return this.movies.filter(el => el.isWatched).length
//         }
//     },
//     actions: {
//         setActiveTab(id: number) {
//             this.activeTab = id;
//         },
//         toggleWatched(id: number) {
//             const idx = this.movies.findIndex(el => el.id === id);
//             this.movies[idx].isWatched = !this.movies[idx].isWatched;
//         },
//         deleteMovie(id: number) {
//             this.movies = this.movies.filter(el => el.id !== id)
//         }
//     }
// });

export const useMovieStore = defineStore('MovieStore', () => {
    const movies = ref([] as Movie[]) 
    const activeTab = ref(2);


    const moviesOnLocalStorage = localStorage.getItem('movies')
    if (moviesOnLocalStorage) {
        movies.value = JSON.parse(moviesOnLocalStorage)._value
    }


    const watchedMovies = computed(() => {
        return movies.value.filter(el => el.isWatched);
    });

    const totalCountMovies = computed(() => {
        return movies.value.length;
    });

    const countFiltredMovies = computed(() => {
        return movies.value.filter(el => el.isWatched).length
    });

    const setActiveTab = (id: number) => {
        activeTab.value = id;
    };

    const toggleWatched = (id: number) => {
        const idx = movies.value.findIndex(el => el.id === id);
        movies.value[idx].isWatched = !movies.value[idx].isWatched;
    };

    const deleteMovie = (id: number) => {
        movies.value = movies.value.filter(el => el.id !== id)
    };

    watch(() => movies, (state) => {
        localStorage.setItem('movies', JSON.stringify(state))
    }, {deep: true})


    return {
        movies,
        activeTab,
        setActiveTab,
        toggleWatched,
        deleteMovie,
        watchedMovies,
        totalCountMovies,
        countFiltredMovies
    }
});