import filterData   from './filterData';
import mapHelmet    from './mapHelmet';

/*************************************************
 * This module maps each game to a workable format using mapGameProperties,
 * For the sake of this comment, lets name the resulting object 'GameProperties'.
 * The module then builds a tree of games that looks like:
 * {
 *      date: String,
 *      districts: {
 *          district: String,
 *          games: Array<GameProperties>,
 *      },
 * }
 * This tree will be used for sorting the data before rendering.
 *************************************************/

const monthMap = {
    '01': 'Jan.',
    '02': 'Feb.',
    '03': 'Mar.',
    '04': 'Apr.',
    '05': 'May',
    '06': 'Jun.',
    '07': 'Jul.',
    '08': 'Aug.',
    '09': 'Sep.',
    '10': 'Oct.',
    '11': 'Nov.',
    '12': 'Dec.',
};

const getMonth = num => monthMap[num];

const mapGameProperties = game => ({
    id: game.game.id,
    location: game.location.name,
    date: `${game.date.weekday}. ${getMonth(game.date.month)} ${game.date.date}`,
    fullDate: game.fullDate.date,
    time: `${game.date.hours.replace(/^0+/, '')}:${game.date.minutes}${game.date.tt}`,
    home: {
        id: game.home.id,
        name: game.home.name,
        points: game.home.points,
        district: game.home.district.name,
        helmet: mapHelmet(game.home.id),
    },
    away: {
        id: game.away.id,
        name: game.away.name,
        points: game.away.points,
        district: game.away.district.name,
        helmet: mapHelmet(game.away.id),
    },
});

export default (hash, unmappedGame) => {
    // if game isn't relevant to our current day of the week, or is not a game at all, bail
    if (filterData.isDistrict(unmappedGame) || !filterData.isInDateRange(unmappedGame)) return hash;

    const game = mapGameProperties(Object.assign({}, unmappedGame));
    
    // if no hash exists for this date, build one
    if (!hash[game.fullDate]) {
        hash[game.fullDate] = {
            date: game.fullDate,
            districts: {}, 
        };
    }

    // if no hash exists for this district on this date, build one
    if (!hash[game.fullDate].districts[game.home.district]) {
        hash[game.fullDate].districts[game.home.district] = {
            district: game.home.district,
            games: [],
        };
    }

    // add game to district hash inside date hash
    hash[game.fullDate].districts[game.home.district].games.push(game);

    return hash;
};