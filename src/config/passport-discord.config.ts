import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email']
}, (accessToken, refreshToken, profile, done) => {
    // Aquí puedes buscar al usuario en tu base de datos o crearlo si no existe
    // y luego llamar a done con el usuario.
    console.log("XX Discord ", profile);
    done(null, profile);
}));