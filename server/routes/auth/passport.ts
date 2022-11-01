import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../../prisma/utils/db.server";
import { config } from "../../config";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
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

passport.serializeUser((user: any, done) => {
  done(null, user.id as string);
});

passport.deserializeUser(async (id: any, done) => {
  try {
    const user = await db.user.findUnique({
      where: { id: id},
    });
    done(null, user);
  } catch (error: any) {
    done(error);
  }
});

export default passport;
