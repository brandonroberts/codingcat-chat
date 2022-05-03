import { Appwrite } from 'appwrite';

export const api = new Appwrite();
api.setEndpoint('https://api.sideproject.live/v1');
api.setProject('codingcat');
