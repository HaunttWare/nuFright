import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserData } from "../../../client/src/store/user/user.action";
import { db } from "../../prisma/utils/db.server";
import { config } from "../../config";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails, photos } = profile;
      const email = emails ? emails[0].value : "";
      const photo = photos ? photos[0].value : "";
      try {
        const user = await db.user.upsert({
          where: { googleId: id },
          update: {},
          create: {
            googleId: id, 
            email,
            name: displayName,
            photo,
          },
        });
        return done(null, user);
      } catch (error: any) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: UserData, done) => {
  done(null, user)
});

export default passport;
