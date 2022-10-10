import express, {Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';
import { config } from '../../config';
import axios from 'axios';


let type = 'show';
let genresFromShowDb = [
  {
    "id": 10759,
    "name": "Action & Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 10762,
    "name": "Kids"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10763,
    "name": "News"
  },
  {
    "id": 10764,
    "name": "Reality"
  },
  {
    "id": 10765,
    "name": "Sci-Fi & Fantasy"
  },
  {
    "id": 10766,
    "name": "Soap"
  },
  {
    "id": 10767,
    "name": "Talk"
  },
  {
    "id": 10768,
    "name": "War & Politics"
  },
  {
    "id": 37,
    "name": "Western"
  }
];

const getShowsFromAPI = (req: Request, res: Response) => {
  let urls = [
    `https://api.themoviedb.org/3/discover/tv?api_key=${config.MOVIEDB_API_KEY}&with_genres=9648&page=1`,
    `https://api.themoviedb.org/3/discover/tv?api_key=${config.MOVIEDB_API_KEY}&with_genres=9648&page=2`,
    `https://api.themoviedb.org/3/discover/tv?api_key=${config.MOVIEDB_API_KEY}&with_genres=9648&page=3`
  ];

  const apiReq = urls.map((url) => {
    return axios.get(url);
  })

  return Promise.all(apiReq)
    .then((results) => {
      const allShows = results.map(({ data }) => {
        return data.results.flat();
      }).flat();

      const dbShows = allShows.map((show) => {
        let matchedGenres = show.genre_ids.map((id: number) => {
          for (let i = 0; i < genresFromShowDb.length; i++) {
            if (genresFromShowDb[i].id === id) {
              return genresFromShowDb[i].name;
            }
          }
        }).join(',');

        let showObj = {
          title: show.name,
          description: show.overview,
          genres: matchedGenres,
          type: 'show',
          images: `http://image.tmdb.org/t/p/w500/${show.poster_path}`
        }
        return showObj;
      })
      return Promise.all(dbShows.map((element) => {
        return db.cinema.createMany({
          data: element
        });
      }));

    })
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getHorrorShows = (req: Request, res: Response) => {
  db.cinema.findMany({})
    .then((showsData) => {
      res.status(200).send(showsData);
    })
    .catch((err) => {
      console.error('error in the getHorrorShows, in controller', err);
      res.sendStatus(500);
    });
};

export {
  getHorrorShows,
  getShowsFromAPI,
}