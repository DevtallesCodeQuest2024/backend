import { Client, GatewayIntentBits } from 'discord.js';

export const validateUser = async () => {
    const client = new Client({

        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildMessages,
        ],
      });
    
      
      
      try {
        //LOGIN CLIENT
        await client.login(process.env.DISCORD_TOKEN);
        const guild = await client.guilds.fetch('1130900724499365958');
        if (!guild) {
          console.log('No guild found');
          return;
        }
        const members = await guild.members.fetch();
        return members;
      } catch (error) {
        console.log(error);
        return { error: true, message: 'Error al obtener miembros' };
      }
};