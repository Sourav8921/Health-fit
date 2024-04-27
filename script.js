let access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JNUjUiLCJzdWIiOiJCV0NQN1oiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd3JlcyB3bG9jIiwiZXhwIjoxNzA3ODIxNzA0LCJpYXQiOjE3MDUyMjk3MDR9.f6H0rSl2Bu8_nImhx4a7CxS39n3ThJmDF2lDYIXXoxU';

// window.onload = fetchData;

function fetchData(){
    fetchStep()
    fetchCalories()
    fetchSleep()
    fetchDistance()
    fetchStepsChart()
    fetchCaloriesChart()
    fetchSleepChart()
    fetchDistanceChart()
}

// dashboard section
async function fetchStep() {
    try {
        let response = await fetch('https://api.fitbit.com/1/user/-/activities/date/today.json', {
            method: 'GET',
            headers: { 'Authorization': "Bearer " + access_token }
        })
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        let stepData = await response.json();
        let totalSteps = stepData.summary.steps;
        let stepsValue = document.getElementById("stepsValue");
        stepsValue.innerHTML = totalSteps;
        document.getElementById('steps-goals-p').textContent = totalSteps;

    }
    catch (error) {
        console.log(error);
    }
}
async function fetchCalories() {
    try {
        let response = await fetch('https://api.fitbit.com/1/user/-/activities/date/today.json', {
            method: 'GET',
            headers: { 'Authorization': "Bearer " + access_token }
        })
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        let caloriesData = await response.json();
        let totalCalories = caloriesData.summary.caloriesOut;
        let caloriesValue = document.getElementById("caloriesValue");
        caloriesValue.innerHTML = totalCalories;
        document.getElementById('calorie-goals-p').textContent = totalCalories;

    }
    catch (error) {
        console.log(error);
    }
}
async function fetchSleep() {
    try {
        let response = await fetch('https://api.fitbit.com/1/user/-/sleep/date/today.json', {
            method: 'GET',
            headers: { 'Authorization': "Bearer " + access_token }
        })
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        let sleepData = await response.json();
        let totalSleep = sleepData.summary.totalMinutesAsleep;;
        let sleepValue = document.getElementById("sleepValue");
        sleepValue.innerHTML = `${(totalSleep / 60).toFixed(1)} hours`;
        document.getElementById('sleep-goals-p').textContent = (totalSleep / 60).toFixed(1);
    }
    catch (error) {
        console.log(error);
    }
}
async function fetchDistance() {
    try {
        let response = await fetch('https://api.fitbit.com/1/user/-/activities/date/today.json', {
            method: 'GET',
            headers: { 'Authorization': "Bearer " + access_token }
        })
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        let distanceData = await response.json();
        let totalDistance = distanceData.summary.distances[0].distance;;
        let distanceValue = document.getElementById("distanceValue");
        distanceValue.innerHTML = `${totalDistance} km`;
        document.getElementById('distance-goals-p').textContent = totalDistance;
    }
    catch (error) {
        console.log(error);
    }
}

// download activities data
async function fetchDownload() {
    try {
        let response = await fetch('https://api.fitbit.com/1/user/-/activities/date/today.json', {
            method: 'GET',
            headers: { 'Authorization': "Bearer " + access_token }
        })
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        let data = await response.json();
        const formattedData = JSON.stringify(data, null, 2);
        downloadData(formattedData, 'activities/date/today.txt');

    }
    catch (error) {
        console.log(error);
    }
}

function downloadData(data, fileName) {
    let link = document.getElementById('link');
    const blob = new Blob([data], { type: 'application/txt' });
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
}

// chart section

async function fetchStepsChart() {
    try {
        let response = await fetch('https://api.fitbit.com/1/user/-/activities/steps/date/today/7d.json', {
            method: 'GET',
            headers: { 'Authorization': "Bearer " + access_token }
        })
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        let stepsData = await response.json();
        dates = stepsData['activities-steps'].map(function (elem) {
            return elem.dateTime;
        })

        steps = stepsData['activities-steps'].map(function (elem) {
            return elem.value;
        })

        const ctx1 = document.getElementById('stepsChart');

        Chart.defaults.color = 'black';
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Steps',
                    data: steps,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    },
                }
            }
        });

    }
    catch (error) {
        console.log(error);
    }
}
async function fetchCaloriesChart() {
    try {
        let response = await fetch('https://api.fitbit.com/1/user/-/activities/calories/date/today/7d.json', {
            method: 'GET',
            headers: { 'Authorization': "Bearer " + access_token }
        })
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        let caloriesData = await response.json();
        dates = caloriesData['activities-calories'].map(function (elem) {
            return elem.dateTime;
        })

        calories = caloriesData['activities-calories'].map(function (elem) {
            return elem.value;
        })

        const ctx2 = document.getElementById('caloriesChart');
        Chart.defaults.color = 'black';
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Calories',
                    data: calories,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }
    catch (error) {
        console.log(error);
    }
}
async function fetchSleepChart() {
    try {
        let response = await fetch('https://api.fitbit.com/1.2/user/-/sleep/date/2024-01-14/2024-01-20.json', {
            method: 'GET',
            headers: { 'Authorization': "Bearer " + access_token }
        })
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        let sleepData = await response.json();
        dates = sleepData.sleep.map(function (elem) {
            return elem.dateOfSleep;
        })

        sleep = sleepData.sleep.map(function (elem) {
            return (elem.duration) / 3600000;
        })

        const ctx3 = document.getElementById('sleepChart');
        Chart.defaults.color = 'black';
        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Sleep',
                    data: sleep,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }
    catch (error) {
        console.log(error);
    }
}

async function fetchDistanceChart() {
    try {
        let response = await fetch('https://api.fitbit.com/1/user/-/activities/distance/date/today/7d.json', {
            method: 'GET',
            headers: { 'Authorization': "Bearer " + access_token }
        })
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        let distanceData = await response.json();
        dates = distanceData['activities-distance'].map(function (elem) {
            return elem.dateTime;
        })

        distances = distanceData['activities-distance'].map(function (elem) {
            return elem.value;
        })

        const ctx4 = document.getElementById('distanceChart');
        Chart.defaults.color = 'black';
        new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Distance',
                    data: distances,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }
    catch (error) {
        console.log(error);
    }
}

// progress bar 
let number = document.getElementById('number');
let counter = 0;
setInterval(() => {
    if (counter == 65) {
        clearInterval
    } else {
        counter += 1;
        number.innerHTML = counter + "%";
    }

}, 28);

let number1 = document.getElementById('number1');
let counter1 = 0;
setInterval(() => {
    if (counter1 == 85) {
        clearInterval
    } else {
        counter1 += 1;
        number1.innerHTML = counter1 + "%";
    }

}, 28);

let number2 = document.getElementById('number2');
let counter2 = 0;
setInterval(() => {
    if (counter2 == 55) {
        clearInterval
    } else {
        counter2 += 1;
        number2.innerHTML = counter2 + "%";
    }

}, 28);

let number3 = document.getElementById('number3');
let counter3 = 0;
setInterval(() => {
    if (counter3 == 70) {
        clearInterval
    } else {
        counter3 += 1;
        number3.innerHTML = counter3 + "%";
    }

}, 28);

// end


function setCaloriesGoal() {
    let caloriesGoalValue = document.getElementById('caloriesGoalInput').value;
    let caloriesGoalDisplay = document.getElementById('caloriesGoalDisplay');
    caloriesGoalDisplay.innerHTML = `${caloriesGoalValue} calories out per day`;
}

function setSleepGoal() {
    let sleepGoalValue = document.getElementById('sleepGoalInput').value;
    let sleepGoalDisplay = document.getElementById('sleepGoalDisplay');
    sleepGoalDisplay.innerHTML = `${sleepGoalValue} hours of sleep per day`;
}

function setDistanceGoal() {
    let distanceGoalValue = document.getElementById('distanceGoalInput').value;
    let distanceGoalDisplay = document.getElementById('distanceGoalDisplay');
    distanceGoalDisplay.innerHTML = `${distanceGoalValue} km per day`;
}

async function setStepGoal() {
    let stepsGoalValue = document.getElementById('stepsGoalInput').value;
    try {
        let response = await fetch(`https://api.fitbit.com/1/user/-/activities/goals/daily.json?type=steps&value=${stepsGoalValue}`, {
            method: 'POST',
            headers: { 'Authorization': "Bearer " + access_token }
        })
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        let stepData = await response.json();
        let updatedStepGoal = stepData.goals.steps;
        let stepGoalDisplay = document.getElementById('stepGoalDisplay');
        stepGoalDisplay.innerHTML = `Goal : ${updatedStepGoal}`;

    }
    catch (error) {
        console.log(error);
    }
}
