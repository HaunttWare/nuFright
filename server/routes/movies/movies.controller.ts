import express, { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';
import { config } from '../../config';
import axios from 'axios';



let type = 'movie';

// let genresFromMovieDb = [
//   {
//     "id": 28,
//     "name": "Action"
//   },
//   {
//     "id": 12,
//     "name": "Adventure"
//   },
//   {
//     "id": 16,
//     "name": "Animation"
//   },
//   {
//     "id": 35,
//     "name": "Comedy"
//   },
//   {
//     "id": 80,
//     "name": "Crime"
//   },
//   {
//     "id": 99,
//     "name": "Documentary"
//   },
//   {
//     "id": 18,
//     "name": "Drama"
//   },
//   {
//     "id": 10751,
//     "name": "Family"
//   },
//   {
//     "id": 14,
//     "name": "Fantasy"
//   },
//   {
//     "id": 36,
//     "name": "History"
//   },
//   {
//     "id": 27,
//     "name": "Horror"
//   },
//   {
//     "id": 10402,
//     "name": "Music"
//   },
//   {
//     "id": 9648,
//     "name": "Mystery"
//   },
//   {
//     "id": 10749,
//     "name": "Romance"
//   },
//   {
//     "id": 878,
//     "name": "Science Fiction"
//   },
//   {
//     "id": 10770,
//     "name": "TV Movie"
//   },
//   {
//     "id": 53,
//     "name": "Thriller"
//   },
//   {
//     "id": 10752,
//     "name": "War"
//   },
//   {
//     "id": 37,
//     "name": "Western"
//   }
// ];

// const getMoviesFromAPI = (req: Request, res: Response) => {
//   let urls = [
//     `https://api.themoviedb.org/3/discover/movie?api_key=${config.MOVIEDB_API_KEY}&with_genres=27&page=1`,
//     `https://api.themoviedb.org/3/discover/movie?api_key=${config.MOVIEDB_API_KEY}&with_genres=27&page=2`,
//     `https://api.themoviedb.org/3/discover/movie?api_key=${config.MOVIEDB_API_KEY}&with_genres=27&page=3`,
//     `https://api.themoviedb.org/3/discover/movie?api_key=${config.MOVIEDB_API_KEY}&with_genres=27&page=4`
//   ];
//   const apiReq = urls.map((url) => {
//     return axios.get(url)
    
//   })
  
//   return Promise.all(apiReq)
//     .then((results) => {
//       const allMovies = results.map(({ data }) => {
//         return data.results.flat(); 
//       }).flat();
      

//       const dbMovies = allMovies.map((movie: any) => {
//         // helper function to find the genres by id
//         let matchedGenres = movie.genre_ids.map((id: number) => {
//           for (let i = 0; i < genresFromMovieDb.length; i++) {
//             if (genresFromMovieDb[i].id === id) {
//               return genresFromMovieDb[i].name;
//             }
//           }
//         }).join(',');
        
//         let movieObj = {
//           title: movie.title,
//           description: movie.overview,
//           genres: matchedGenres,
//           type: 'movie',
//           images: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
//         }
//         return movieObj;
//       })
//       return Promise.all(dbMovies.map((element) => {
//         return db.cinema.createMany({ 
//           data: element
//         })
//       }))

//     })
//     .then((data) => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     })
  
// };

const getHorrorMovies = (req: Request, res: Response) => {
  db.cinema.findMany({
    include: {
      likedBy: true,
      savedBy: true,
    }
  })
    .then((moviesData) => {
      const filteredMovies = moviesData.filter((cinemaData) => {
        return cinemaData.type !== 'show'
      })
      res.status(200).send(filteredMovies);
    }) 
    .catch((err) => {
      console.error('error in getHorrorMovies, in controller', err);
      res.sendStatus(500);
    })
};

const likeAMovie = (req: Request, res: Response) => {
    const { userId, cinemaId, isLiked } = req.body;
  db.likes.create({
    data: {
      userId,
      cinemaId,
      isLiked,
    }
  })
  .then((data) => {
    console.log(data);
    res.status(200).send(data);
  }) 
  .catch((err) => {
    console.error(err);
    res.sendStatus(500)
  })
}

const unLikeMovie = (req: Request, res: Response) => {
  const { id, movieId } = req.body;
  db.likes.delete({
    where: {
      id
    },
      // where: {
      //   movieId,
      // }
    }
  )
  .then((data) => {
    console.log(data);
    res.status(202).send(data);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  })
}


export {
  getHorrorMovies,
  // getMoviesFromAPI,
  likeAMovie,
  unLikeMovie,
}