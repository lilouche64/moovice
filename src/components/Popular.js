import React from "react";
import Card from "./movie/Card";
// import Api from '../utils/Api';


class Popular extends React.Component{

    constructor(props){
        super(props);
        
        this.state ={
            movies : [],
            currentPage : 1
        }
        this.onClickCard = this.onClickCard.bind(this);
    }
//--------------------------------------------------------------
    componentDidMount() {
        console.log(">> Popular#componentDidMount");
        const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f2947db79ba6dcd75145575e794c7a15`;
        console.log("popular#url", url);
        fetch(url)
          .then(res => res.json())
          .then((data) => {
            console.log("Popular#componentDidMount data", data);

            this.setState({
                movies : data.results
            });
            console.log("this.state.movies", this.state.movies);
          });
        console.log("<< Popular#componentDidMount");
    }

     // ADVANCED
    // componentDidMount() {
    //   Api.getPopularMovies()
    //     .then(movies => {
    //       this.setState({
    //         movies
    //       })
    //     })
    // }
 //-------------------------------------------------------------     

    onClickCard(movieId) {
        console.log(">> Popular#onClickCard");
        console.log('Popular#onClickCard movieId', movieId);
        this.setState({
            currentPage : this.state.currentPage + 2
        });

        //cette ligne appelle la fn suivante
        this.saveToLocalStorage(movieId);

        console.log("Popular#onClickCard currentPage", this.state.currentPage);
        console.log("<< Popular#onClickCard");        
    }

//--------------------------------------------------------------
    saveToLocalStorage(movieId) {
        console.log('>> Popular#saveToLocalStorage');
        console.log('Popular#saveToLocalStorage movieId', movieId);
        
        //la méthode getFromLocalStorage va retourner un array d’ID préenregistré
        const storageStr = localStorage.getItem('my-list');
        let myList = [];
        //Si ma liste est vide, je rajoute les films preferes
        if (storageStr !== null) {
        //myList est un arr, tandis que storageStr est un string, il faut donc le parse
        myList = JSON.parse(storageStr);
        }

        //UN film ne se rajoutera a list que si l'Id n'existe pas deja dans myList
        if (myList.includes(movieId) === false) {
        myList.push(movieId);
        }  
        //il faut transformer les elements de localStorage en string   
        localStorage.setItem('my-list', JSON.stringify(myList));
        console.log("localStorage", localStorage);
        console.log('>> Popular#saveToLocalStorage');

    }
    
//---------------------------------------------------------------
    render (){ 
//         if(this.state.movies.length === 0){
//             return (
//                 <p>Loading</p>
//             );
//         }
//         const movie1 = this.state.movies[0];
//         const movie2 = this.state.movies[1];

//         return (
//             <div>
//             <p>Hello</p>
//             <Card movie={movie1} onClickCard={this.onClickCard} />
//             <Card movie={movie2} onClickCard={this.onClickCard} />

//             </div>
//    )

        //Cette condtion s'applique s'il n'y a pas de films chargés

        const {movies, currentPage} = this.state;
        if(movies.length === 0) {
            return (
                <div>
                    <h1>Popular</h1>
                    <p>Loading...</p>
                </div>
            );
        }

        //Si on parcours tout le tableau et qu'on arrive a la fin, un message sera retourné
        if ((currentPage - 1) * 2 >= movies.length) {
            return (
              <p>All movies have been selected</p>
            );
          }

        let displayMovies = this.state.movies.slice(this.state.currentPage, this.state.currentPage + 2);
        console.log('Popular#render displayMovies', displayMovies);
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                <h1>The popular movies</h1>
                    {/* .map est une methode qui a la meme fn que la boucle, ca sert a afficher le contenu de la boucle */}
                    {displayMovies.map((movie, index)=> {
                        return (                          
                            <Card 
                                onClickCard={this.onClickCard} 
                                key={index} {...movie}  //cette key est unique, elle evite d'avoir un warning et c'est pour une meilleure performence
                                movie={movie}
                            />      
                        );
                    })}
                </div>
            </div>
        );
    }
}
export default Popular;