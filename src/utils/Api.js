//C'est une classe utilitaire 
class Api {
    getPopularMovies() {
        return fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f2947db79ba6dcd75145575e794c7a15`)
        .then(res => res.json())
        .then(data => data.results);
    }

    getDiscoverMovies() {
        const url =`http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${TODAY}&primary_release_date.lte=${NEXT_WEEK}&api_key=f2947db79ba6dcd75145575e794c7a15`;
        console.log("Discover#url", url);
        fetch(url)
          .then(res => res.json())
          .then((data => data);
    }
}
export default new Api();