import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { UserModel } from "../model/user/user.model";

// Configuración de Passport
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ["identify", "email", "guilds", "guilds.join"]
    },
    (accessToken, refreshToken, profile, done) => {
      const guilds = profile.guilds;
      const serverId = process.env.DISCORD_SERVER_ID;
      const isMember = guilds?.some((guild) => guild.id === serverId);

      if (isMember) {
        console.log("El usuario está en el servidor de Discord: ", profile);

        UserModel.create({
          firstName: "",
          lastName: "",
          discordUsername: profile.username,
          email: profile.email ?? "",
          role: "guest",
          isActive: true
        })
          .then((user) => done(null, user))
          .catch((error) => done(error));
      } else {
        console.log("El usuario no está en el servidor de Discord.");
        done(new Error("El usuario no está en el servidor de Discord"));
      }
    }
  )
);
