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

      console.log("Usuario profile: ", profile);
      UserModel.findOne({ where: { discordId: profile.id } })
        .then((user) => {
          if (user) return user;

          if (!isMember) {
            throw {
              message: "El usuario no es miembro de la comunidad de devtalles",
              discordUsername: profile.username
            };
          }
          return UserModel.create({
            firstName: "",
            lastName: "",
            discordUsername: profile.username,
            discordId: profile.id,
            email: profile.email ?? "",
            role: "guest",
            isActive: true
          });
        })
        .then((user) => done(null, user))
        .catch((error) => done(error));
    }
  )
);
