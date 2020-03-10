const schedule = require('node-schedule');
const say = require('say');
 
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(1, 5);
rule.hour = 21;
rule.minute = 5;

schedule.scheduleJob(rule, () => {
  say.speak('Ich will pizza!', null, 0.75);
});