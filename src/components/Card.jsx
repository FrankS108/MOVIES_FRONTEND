import React from 'react'
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

export const Card = ({movie}) => {
  const navigate = useNavigate();
  function more(){
    navigate(`/${movie.title}/${movie.imdbid}`);
  }
  
  return (
    <div className="movie__card">
        <img className='movie__picture' src={movie.imageurl} alt="" />
        <div className="card__information">
            <p className="movie__title">{movie.title}</p>
            <div className="movie__detail">
                <p className="movie__year">{movie.released}</p>
                {/* Añadir map para poner todas los generos */}
                {movie.genre.map((element, index) => (
                    <p key={index} className="movie__genre">{element}</p>    
                ))}
            </div>    
            <Rating
                name='size-large'
                value={(movie.rate) ?? 0}
                readOnly
                size="large"
                emptyIcon={<StarIcon style={{ opacity: 0.55, color: 'white'}} fontSize="inherit" />}
                sx={{fontSize: "2.5rem", margin: "1rem 0"}}
              />
            <p className="movie__description">{movie.synopsis}</p>
            <input type='submit' value='Ver más' className="movie__link" onClick={more}/>
        </div>
    </div>
  )
}
