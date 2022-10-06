require('dotenv').config();
import { stringify } from 'querystring';
import { db } from '../../prisma/utils/db.server';


const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  scope: ['profile'],
  state: true
},
async (accessToken: string, refreshToken: string, profile: { id: string, email: string, photos: string, name: string, googleId: any }, cb: Function) => {
  const user = await db.user.upsert({
    where: {googleId: profile.id},
    update: {},
    create: { googleId: profile.id, email: profile.email, avatar: profile.photos[0], name: profile.name }
  })
}))


