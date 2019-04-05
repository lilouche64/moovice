import React from "react";
import Card from "./movie/Card";

class MyList extends React.Component{
    state = {
        movies: [],
        movieIds : this.getFromLocalStorage()
      };
    // single task promise returning a promise
    
    //solution promise.all 1
    componentDidMount(){
        console.log("MyList#localStorage", localStorage);
        console.log(">> MyList#componentDidMount");
        
        const fetchMovies = (movieId) => 
        fetch(`https://api.themoviedb.org/3/movie/`+ movieId +`?api_key=f2947db79ba6dcd75145575e794c7a15`)
        .then(res => res.json())
        .then(data => data);

        Promise.all(this.state.movieIds.map(movieId => fetchMovies(movieId)))
        .then((movies) => {
        // receives an array of responses

        this.setState({
            movies : movies
        })
        console.log("MyList#componentDidMount movies", movies);
        console.log("<< MyList#componentDidMount");
        });
    }

    //Solution promise.all 2
    // componentDidMount(){
    //     Promise.all(this.state.movieIds.map((id) =>{
    //         return fetch(`https://api.themoviedb.org/3/movie/`+ id +`?api_key=${config.API_KEY}`)
    //         .then(res => res.json())
    //         .then(data => data)
    //     })).then((movies)=> {
    //         this.setState({
    //             movies
    //         })
    //     })
    // }

    //la méthode getFromLocalStorage va retourner votre array d’ID préenregistré
    getFromLocalStorage(){
        console.log(">> MyList#getFromLocalStorage");
        const newMyList = JSON.parse(localStorage.getItem('my-list'));
        console.log("newmylist", newMyList);
        return newMyList;
        
        // console.log("MyList#getFromLocalStorage newMyList", newMyList);
        // console.log("<< MyList#getFromLocalStorage");
    };
    
    //----------------------------------------------------------------
    
    render (){
        return (
            <div>
               <div className="container-fluid">
                    <div className="row justify-content-center">
                        {/* .map est une methode qui a la meme fn que la boucle, ca sert a afficher le contenu de la boucle */}
                        {this.state.movies.map((movie, index)=> {
                            return (                          
                                <Card 
                                    key={index} {...movie}  //cette key est unique, elle evite d'avoir un warning et c'est pour une meilleure performence
                                    movie={movie}
                                />      
                            );
                        })}
                    </div>
                </div>
            </div>          
        );
    }
}
export default MyList;
        