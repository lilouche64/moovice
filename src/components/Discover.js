import React from "react";
import moment from "moment";
import Card from "./movie/Card";
// import Api from '../utils/Api';


class Discover extends React.Component{

    constructor(props){
        super(props);
        
        this.state ={
            movies : [],    
        }
        this.onClickDiscover = this.onClickDiscover.bind(this);
    }
//--------------------------------------------------------------
    componentDidMount() {
        console.log(">> Discover#componentDidMount");

        const TODAY = moment().format('YYYY-MM-DD');
        const NEXT_WEEK = moment().add(7, 'days').format('YYYY-MM-DD');
        console.log("today", TODAY);
        console.log("NEXTWEEK", NEXT_WEEK);

       let url=`http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${TODAY}&primary_release_date.lte=${NEXT_WEEK}&api_key=f2947db79ba6dcd75145575e794c7a15`;
        console.log("Discover#url", url);
        fetch(url)
          .then(res => res.json())
          .then((data) => {
            console.log("Discover#componentDidMount data", data);

            this.setState({
                movies : data.results
            });
            console.log("this.state.movies", this.state.movies);
          });
        console.log("<< Discover#componentDidMount");
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

    onClickDiscover(movieId) {
        console.log(">> Discover#onClickDiscover");
        console.log('Discover#onClickDiscover movieId', movieId);

        //cette ligne appelle la fn suivante
        this.saveToLocalStorage(movieId);

        console.log("<< Discover#onClickCard");        
    }

//--------------------------------------------------------------
    saveToLocalStorage(movieId) {
        console.log('>> Discover#saveToLocalStorage');
        console.log('Discover#saveToLocalStorage movieId', movieId);
        
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
        console.log("Discover#localStorage", localStorage);
        console.log('<< Discover#saveToLocalStorage');

    }
    
//---------------------------------------------------------------
    render (){ 
        //Cette condtion s'applique s'il n'y a pas de films chargés
        const {movies} = this.state;
        if(movies.length === 0) {
            return (
                <div>
                    <h1>This week</h1>
                    <p>Loading...</p>
                </div>
            );
        }
      
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {this.state.movies.map((movie, index)=> {
                        return (                          
                            <Card 
                                onClickCard={this.onClickDiscover} 
                                key={index} {...movie}
                                movie={movie}
                            />      
                        );
                    })}
                </div>
            </div>
        );
    }
}
export default Discover;