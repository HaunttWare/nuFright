// import { userInfo } from "os";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
async function(accessToken: string, refreshToken: string, profile: { id: string, email: string, photos: string, name: string, googleId: string }, cb: Function) {
  const user: Function = await prisma.user.upsert({
    where: {googleId: profile.id},
    update: {},
    create: { googleId: profile.id, email: profile.email, avatar: profile.photos[0], name: profile.name }
  })
}))

