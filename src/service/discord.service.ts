import { Request } from 'express';

export const validateDiscordUser = async (req: Request ) => {
  const code = req.query.code;
  const params = new URLSearchParams();
  let user;

  params.append('client_id', process.env.DISCORD_CLIENT_ID as string);
    params.append('client_secret', process.env.DISCORD_CLIENT_SECRET as string);
    params.append('grant_type', 'authorization_code');
    params.append('code', code as string);
    params.append('redirect_uri', process.env.DISCORD_REDIRECT_URI as string);

    try {
      const response = await fetch(`${process.env.DISCORD_ENDPOINT}/oauth2/token`, {
          method: 'POST',
          body: params,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept-Encoding': 'application/x-www-form-urlencoded'
          },
      });

      const data = await response.json();
      const { access_token, token_type } = data;

      //? Get user information
      const userResponse = await fetch(`${process.env.DISCORD_ENDPOINT}/users/@me`, {
          headers: {
              authorization: `${token_type} ${access_token}`
          }
      });

      //? Get guilds information
      const guildsResponse = await fetch(`${process.env.DISCORD_ENDPOINT}/users/@me/guilds`, {
          headers: {
              authorization: `${token_type} ${access_token}`
          }
      });

      //? Check if user is part of the guild
      user = await userResponse.json();
      const guilds = await guildsResponse.json();
      const isPartOfGuild = guilds.some((guild: any) => guild.id === process.env.DISCORD_SERVER_ID);

      return {
         user,
         isPartOfGuild
      };

  } catch (error) {
      console.log(error);
      return {
          error: true,
          code: 500,
          message: 'Error al autenticar el usuario de Discord.'
      };
      
  }
};