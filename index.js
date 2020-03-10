const schedule = require('node-schedule');
const say = require('say');
const moment = require('moment');
const fetch = require('node-fetch');

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(1, 5);
rule.hour = 11;
rule.minute = 17;

schedule.scheduleJob(rule, async() => {
    const today = moment().format('DD/MM/YYYY');
    const menuItems = await getMenu(today);
    const food = isThereBurger(menuItems) ? 'burger' : 'pizza';
    say.speak(`Ich will ${food}!`, null, 0.75);
});

async function getMenu(date) {
    return fetch(`https://gastronomy-app.basf.com/cafeteria/services/MenuData?cafeteriaId=CAF1&date=${date}&language=en`).then((response) => {
        return response.json();
    });
}

function isThereBurger(menuItems) {
    return menuItems.some(item => item.dishName.toLowerCase().includes('burger'));
}
