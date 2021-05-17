let monthDayNumbers = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let birthYear = 1988;
let birthMonth = 5;
let birthDay = 2;
let currentDay = new Date().getDate();
let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();

let birthDayTable = {
    "day": birthDay,
    "month": birthMonth,
    "year": birthYear
}
let currentDayTable = {
    "day": currentDay,
    "month": currentMonth,
    "year": currentYear
}
console.log("--------------------");
console.log("My birthday date");
console.table(birthDayTable);
console.log("--------------------");
console.log("Today's date");
console.table(currentDayTable);
console.log("--------------------");


let totalDayNumber = 0;
function calculateDays() {

    //number of days from birth year
    totalDayNumber += monthDayNumbers[birthMonth - 1] - birthDay;
    for (let i = birthMonth + 1; i <= 12; i++) {
        totalDayNumber += monthDayNumbers[i - 1];
        if ((birthYear % 4 === 0) && (i === 2)) {
            totalDayNumber++;
        }
    }
    //number of days between the year of birth and year of today
    for (let y = birthYear + 1; y < currentYear; y++) {
        if (y % 4 === 0) {
            totalDayNumber++;
        }
        for (let m = 0; m < 12; m++) {
            totalDayNumber += monthDayNumbers[m];
        }
    }
    //number of days from today's year
    totalDayNumber += currentDay;
    for (let i = currentMonth - 1; i >= 1; i--) {
        totalDayNumber += monthDayNumbers[i - 1];
        if ((currentYear % 4 === 0) && (i === 2)) {
            totalDayNumber++;
        }
    }
    //log total date
    console.log("Number of days between today and my birthday:");
    console.log(`${totalDayNumber} days`);
    console.log("--------------------");

}
calculateDays();

//alternative solution
function calculateDaysAlt() {
    let myBirthDay = new Date("1988-05-02");
    let today = new Date();
    //calculate time difference  
    let time_difference = today.getTime() - myBirthDay.getTime();
    //calculate days difference by dividing total milliseconds in a day  
    let days_difference = Math.round(time_difference / (1000 * 60 * 60 * 24));
    //log total date
    console.log("Alternative Solution")
    console.log("Number of days between today and my birthday:");
    console.log(`${days_difference} days`);
    console.log("--------------------");

}
calculateDaysAlt();

