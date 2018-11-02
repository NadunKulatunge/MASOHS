export const THEME_COLOUR = '#009688';

/**
 * CHAT 
 */
export const CHAT_INITIAL_MESSAGE_COUNT = 20;
export const CHAT_LOAD_MORE_MESSAGE_COUNT = 10;
export const CHAT_MAX_FILE_SIZE = 5000000; //bytes
export const CHAT_IMAGE_FILE_TYPES = ['jpg', 'jpeg', 'bmp', 'gif', 'png'];
export const CHAT_IMAGE_QUALITY = 0.3; // 0.1 - MIN , 1- MAX

/**
 * Image Upload Quality
 */
export const IMAGE_UPLOAD_QUALITY = 0.9;

/*
HOW TO USE

METHOD 1 :
    import * as appConst from './app/constants/Constants.js';
    backgroundColor: appConst.THEME_COLOUR,

METHOD 2
    import { THEME_COLOUR } from 'path/to/fileWithConstants';
    backgroundColor: THEME_COLOUR,

*/