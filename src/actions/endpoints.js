// api endpoints

const currYear = () => new Date().getFullYear();

export const GET_CURRENT_SEASON = `http://houston-tpweb.newsengin.com/web/gateway.php?tpl=JSON_Schedule&Season=${currYear()}&Market=11&Sport=1&contentType=json&site=default`;