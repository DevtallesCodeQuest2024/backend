import { connect, sync } from './connection';

export const initDatabase = async () => {
    await connect();
    await sync();
}