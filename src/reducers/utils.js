import mapData      from './mapData';
import sortData     from './sortData';

export const buildSAMap = days => {
    const saMap = {};
    days.forEach(day => {
        day.games.forEach(game => {
            if (!saMap[game.home.id] && game.home.district && game.home.district.indexOf('6A') !== -1 && game.home.district.indexOf('26') !== -1) {
                console.log(game.home.id, game.home.district, game.home.name);
                saMap[game.home.id] = game.home.name;
            }

            if (!saMap[game.away.id] && game.away.district && game.away.district.indexOf('6A') !== -1 && game.away.district.indexOf('26') !== -1) {
                console.log(game.away.id, game.away.district, game.away.name);
                saMap[game.away.id] = game.away.name;
            }
        });
    });
};

// Remove check for 6B etc!!!!

export const parseGames = games => sortData(games.reduce(mapData, {}));