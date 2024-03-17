
export const discordParams = () => {
    const params = new URLSearchParams();
    params.append('client_id', process.env.DISCORD_CLIENT_ID as string);
    params.append('redirect_uri', process.env.DISCORD_REDIRECT_URI as string);
    params.append('response_type', 'code');
    params.append('scope', 'identify email');
    return params;
};