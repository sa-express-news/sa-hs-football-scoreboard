import mapData      from './mapData';
import sortData     from './sortData';

export const parseGames = games => sortData(games.reduce(mapData, {}));
