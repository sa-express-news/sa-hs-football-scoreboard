import moment from 'moment';

import schoolHash from './schoolHash';

const setDateRange = (today, step) => {
    const start = moment().startOf('day');
    const end   = moment().endOf('day');
    
    start.date(today.date() + step); // Thurs
    end.date(today.date() + step + 3); // Sun

    return { start, end };
};

const isInDateRange = () => {
    const today     = moment().startOf('day');
    const dayOfWeek = today.day() === 0 ? -3 : today.day();
    const dateRange = setDateRange(today, 4 - dayOfWeek);

    return game => {
        const gameDay = moment(game.fullDate.date, 'YYYY-MM-DD');
        return !(gameDay < dateRange.start) && !(gameDay > dateRange.end);
    }
};

const isSASchool = id => !!schoolHash[id];

const isSAGame = game => isSASchool(game.home.id) || isSASchool(game.away.id); 

export default {
    isSAGame,
    isInDateRange: isInDateRange(),
}