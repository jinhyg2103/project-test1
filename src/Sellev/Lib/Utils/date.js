/**
 * @providesModule DateUtilService
 */

import moment from 'moment';
import 'moment/locale/ko';

/*
* @params  {string} fmt
* @params  {timestamp} date
* @returns {string} date
*/
export const format = ( fmt, date ) => {
    moment.locale( 'ko' );
    switch (fmt) {
        case 'llll':
            return moment( date ).format('llll');
        case 'll':
            return moment( date ).format('ll');
        case 'LT':
            return moment( date ).format('LT');
        case 'fromNow':
            return moment( date ).fromNow();
        default:
            return moment( date ).format('llll');
    }
}

export const getCurrentTimeStamp = ( date ) => {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let photoDate = new Date(date);
    return new Date(photoDate.getTime() - tzoffset).toISOString();
}