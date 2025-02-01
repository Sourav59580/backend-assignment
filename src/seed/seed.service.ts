import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.schema';
import { TVShow } from '../models/tvshow.schema';
import { Movie } from '../models/movie.schema';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(TVShow.name) private tvShowModel: Model<TVShow>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) {}

  async onModuleInit() {
    await this.seedDatabase();
  }

  async seedDatabase() {
    try {
      this.logger.log('Seeding the database...');

      // Clear existing data (optional)
      await this.userModel.deleteMany({});
      await this.tvShowModel.deleteMany({});
      await this.movieModel.deleteMany({});

      // Create mock data
      try {
        await this.userModel.create([
          {
            username: 'user1',
            email: 'user1@example.com',
            password: 'password1',
            preferences: {
              favoriteGenres: ['Action', 'Drama'],
              dislikedGenres: ['Romance'],
            },
          },
          {
            username: 'user2',
            email: 'user2@example.com',
            password: 'password2',
            preferences: {
              favoriteGenres: ['Action', 'Comedy'],
              dislikedGenres: ['Horror'],
            },
          },
          {
            username: 'user3',
            email: 'user3@example.com',
            password: 'password3',
            preferences: {
              favoriteGenres: ['Drama', 'Romance'],
              dislikedGenres: ['SciFi'],
            },
          },
          {
            username: 'user4',
            email: 'user4@example.com',
            password: 'password4',
            preferences: {
              favoriteGenres: ['SciFi', 'Fantasy'],
              dislikedGenres: ['Romance'],
            },
          },
          {
            username: 'user5',
            email: 'user5@example.com',
            password: 'password5',
            preferences: {
              favoriteGenres: ['Animation', 'Adventure'],
              dislikedGenres: ['Romance'],
            },
          },
          {
            username: 'user6',
            email: 'user6@example.com',
            password: 'password6',
            preferences: {
              favoriteGenres: ['Crime', 'Thriller'],
              dislikedGenres: ['Comedy'],
            },
          },
        ]);
      } catch (error) {
        console.log('Error seeding user data');
      }

      try {
        await this.tvShowModel.create([
          {
            title: 'Breaking Bad',
            description:
              'A high school chemistry teacher turned methamphetamine producer partners with a former student to create a lucrative meth lab.',
            genres: ['Crime', 'Drama', 'Thriller'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Pilot',
                releaseDate: '2008-01-20T00:00:00Z',
                director: 'Vince Gilligan',
                actors: ['Bryan Cranston', 'Aaron Paul'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: "Cat's in the Bag...",
                releaseDate: '2008-01-27T00:00:00Z',
                director: 'Adam Bernstein',
                actors: ['Bryan Cranston', 'Aaron Paul'],
              },
            ],
          },
          {
            title: 'Game of Thrones',
            description:
              'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
            genres: ['Action', 'Adventure', 'Drama'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Winter Is Coming',
                releaseDate: '2011-04-17T00:00:00Z',
                director: 'Tim Van Patten',
                actors: ['Emilia Clarke', 'Peter Dinklage'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'The Kingsroad',
                releaseDate: '2011-04-24T00:00:00Z',
                director: 'Tim Van Patten',
                actors: ['Emilia Clarke', 'Peter Dinklage'],
              },
            ],
          },
          {
            title: 'Stranger Things',
            description:
              'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
            genres: ['Drama', 'Fantasy', 'Horror'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Chapter One: The Vanishing of Will Byers',
                releaseDate: '2016-07-15T00:00:00Z',
                director: 'The Duffer Brothers',
                actors: ['Winona Ryder', 'David Harbour'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'Chapter Two: The Weirdo on Maple Street',
                releaseDate: '2016-07-15T00:00:00Z',
                director: 'The Duffer Brothers',
                actors: ['Winona Ryder', 'David Harbour'],
              },
            ],
          },
          {
            title: 'The Office',
            description:
              'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
            genres: ['Comedy'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Pilot',
                releaseDate: '2005-03-24T00:00:00Z',
                director: 'Ken Kwapis',
                actors: ['Steve Carell', 'Rainn Wilson'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'Diversity Day',
                releaseDate: '2005-03-29T00:00:00Z',
                director: 'Ken Whittingham',
                actors: ['Steve Carell', 'Rainn Wilson'],
              },
            ],
          },
          {
            title: 'Friends',
            description:
              'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
            genres: ['Comedy', 'Romance'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'The One Where Monica Gets a Roommate',
                releaseDate: '1994-09-22T00:00:00Z',
                director: 'James Burrows',
                actors: ['Jennifer Aniston', 'Courteney Cox'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'The One with the Sonogram at the End',
                releaseDate: '1994-09-29T00:00:00Z',
                director: 'James Burrows',
                actors: ['Jennifer Aniston', 'Courteney Cox'],
              },
            ],
          },
          {
            title: 'The Mandalorian',
            description:
              'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
            genres: ['Action', 'Adventure', 'Fantasy'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Chapter 1: The Mandalorian',
                releaseDate: '2019-11-12T00:00:00Z',
                director: 'Dave Filoni',
                actors: ['Pedro Pascal', 'Carl Weathers'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'Chapter 2: The Child',
                releaseDate: '2019-11-15T00:00:00Z',
                director: 'Rick Famuyiwa',
                actors: ['Pedro Pascal', 'Carl Weathers'],
              },
            ],
          },
          {
            title: 'The Simpsons',
            description:
              'The satiric adventures of a working-class family in the misfit city of Springfield.',
            genres: ['Animation', 'Comedy'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Simpsons Roasting on an Open Fire',
                releaseDate: '1989-12-17T00:00:00Z',
                director: 'David Silverman',
                actors: ['Dan Castellaneta', 'Nancy Cartwright'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'Bart the Genius',
                releaseDate: '1990-01-14T00:00:00Z',
                director: 'David Silverman',
                actors: ['Dan Castellaneta', 'Nancy Cartwright'],
              },
            ],
          },
          {
            title: 'Sherlock',
            description:
              'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.',
            genres: ['Crime', 'Drama', 'Mystery'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'A Study in Pink',
                releaseDate: '2010-07-25T00:00:00Z',
                director: 'Paul McGuigan',
                actors: ['Benedict Cumberbatch', 'Martin Freeman'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'The Blind Banker',
                releaseDate: '2010-08-01T00:00:00Z',
                director: 'Paul McGuigan',
                actors: ['Benedict Cumberbatch', 'Martin Freeman'],
              },
            ],
          },
        ]);
      } catch (error) {
        console.log('Error seeding TV shows');
      }

      try {
        await this.movieModel.create([
          {
            title: 'Inception',
            description:
              'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
            genres: ['Action', 'Adventure', 'Sci-Fi'],
            releaseDate: '2010-07-16T00:00:00Z',
            director: 'Christopher Nolan',
            actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
          },
          {
            title: 'Titanic',
            description:
              'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
            genres: ['Drama', 'Romance'],
            releaseDate: '1997-12-19T00:00:00Z',
            director: 'James Cameron',
            actors: ['Leonardo DiCaprio', 'Kate Winslet'],
          },
          {
            title: 'The Matrix',
            description:
              'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
            genres: ['Action', 'Sci-Fi'],
            releaseDate: '1999-03-31T00:00:00Z',
            director: 'The Wachowskis',
            actors: ['Keanu Reeves', 'Laurence Fishburne'],
          },
          {
            title: 'The Dark Knight',
            description:
              'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
            genres: ['Action', 'Crime', 'Drama'],
            releaseDate: '2008-07-18T00:00:00Z',
            director: 'Christopher Nolan',
            actors: ['Christian Bale', 'Heath Ledger'],
          },
          {
            title: 'The Lion King',
            description:
              'A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.',
            genres: ['Animation', 'Adventure', 'Drama'],
            releaseDate: '1994-06-15T00:00:00Z',
            director: 'Roger Allers',
            actors: ['Matthew Broderick', 'Jeremy Irons'],
          },
          {
            title: 'The Avengers',
            description:
              'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from subjugating the Earth.',
            genres: ['Action', 'Adventure', 'Sci-Fi'],
            releaseDate: '2012-05-04T00:00:00Z',
            director: 'Joss Whedon',
            actors: ['Robert Downey Jr.', 'Chris Evans'],
          },
          {
            title: 'Avatar',
            description:
              'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
            genres: ['Action', 'Adventure', 'Fantasy'],
            releaseDate: '2009-12-18T00:00:00Z',
            director: 'James Cameron',
            actors: ['Sam Worthington', 'Zoe Saldana'],
          },
          {
            title: 'Jurassic Park',
            description:
              'During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.',
            genres: ['Adventure', 'Sci-Fi', 'Thriller'],
            releaseDate: '1993-06-11T00:00:00Z',
            director: 'Steven Spielberg',
            actors: ['Sam Neill', 'Laura Dern'],
          },
        ]);
      } catch (error) {
        console.log('Error seeding movie data');
      }

      this.logger.log('Database seeding completed.');
    } catch (error) {
      this.logger.error('Error seeding the database', error.stack);
    }
  }
}
