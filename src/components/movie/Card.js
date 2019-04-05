import React from "react";
import Placeholder from "../../Placeholder.png";


class Card extends React.Component{

    render(){
        console.log(this.props.movie);
        const imgPath = `https://image.tmdb.org/t/p/w200${this.props.movie.poster_path}`;
        // let image ="";
        // if(this.props.movie.poster_path === null){
        //     image = Placeholder
        // } else {
        //     image = imgPath
        // }
        //si le poster_path est null, alors il m'affiche Placeholder ou imgPath
        const image = this.props.movie.poster_path === null ? Placeholder : imgPath;
        return(  
            <div className =" offset-1 col-sm-10 col-md-6 col-lg-3">
                <div className="card mt-5" style={{width: "18rem"}}>
                    <img src={image}
                    className="card-img-top" alt="img card" 
                    onClick={() => {
                        if (typeof this.props.onClickCard !== 'undefined') {
                            this.props.onClickCard(this.props.movie.id)
                        }
                    }}
                    />
                    <div className="card-body">
                        <h5 className= "justify-content-center">{this.props.movie.title}</h5>
                        {/* <p className="card-text">{this.props.movie.overview}</p> */}
                    </div>
                </div>
            </div>
            );
        }
    }
            
            

export default Card;