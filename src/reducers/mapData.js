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

const mapGameProperties = game => ({
    id: parseInt(game.game.id, 10),
    location: game.location.name,
    date: game.fullDate.date,
    time: `${game.date.hours.replace(/^0+/, '')}:${game.date.minutes} ${game.date.tt}`,
    home: {
        id: parseInt(game.home.id, 10),
        name: game.home.name,
        points: typeof game.home.points === 'string' ? parseInt(game.home.points, 10) : null,
        district: game.home.district.name,
        helmet: mapHelmet(game.home.id),
    },
    away: {
        id: parseInt(game.away.id, 10),
        name: game.away.name,
        points: typeof game.away.points === 'string' ? parseInt(game.away.points, 10) : null,
        district: game.away.district.name,
        helmet: mapHelmet(game.away.id),
    },
});

export default (hash, unmappedGame) => {
    // if game isn't relevant to our current day of the week, or is not a game at all, bail
    if (filterData.isDistrict(unmappedGame) || !filterData.isInDateRange(unmappedGame)) return hash;

    const game = mapGameProperties(Object.assign({}, unmappedGame));

    // if no hash exists for this date, build one
    if (!hash[game.date]) {
        hash[game.date] = {
            date: game.date,
            districts: {}, 
        };
    }

    // if no hash exists for this district on this date, build one
    if (!hash[game.date].districts[game.home.district]) {
        hash[game.date].districts[game.home.district] = {
            district: game.home.district,
            games: [],
        };
    }

    // add game to district hash inside date hash
    hash[game.date].districts[game.home.district].games.push(game);

    return hash;
};