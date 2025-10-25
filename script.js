const cities = {
    "New York": "America/New_York",
    "Japan": "Asia/Tokyo",
    "Europe": "Europe/Berlin",
    "Australia": "Australia/Sydney",
    "London": "Europe/London",
    "Lebanon": "Asia/Beirut"
};

function populateDropdowns() {
    const city1 = document.getElementById("city1");
    const city2 = document.getElementById("city2");
    Object.keys(cities).forEach(city => {
        let opt1 = document.createElement("option");
        let opt2 = document.createElement("option");
        opt1.value = city;
        opt1.textContent = city;
        opt2.value = city;
        opt2.textContent = city;
        city1.appendChild(opt1);
        city2.appendChild(opt2);
    });
    city1.selectedIndex = 0;
    city2.selectedIndex = 1;
}

function formatTime(dt) {
    return dt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
}

function updateTimes() {
    const city1 = document.getElementById("city1").value;
    const city2 = document.getElementById("city2").value;

    const now = new Date();
    const time1 = new Date(now.toLocaleString("en-US", {timeZone: cities[city1]}));
    const time2 = new Date(now.toLocaleString("en-US", {timeZone: cities[city2]}));

    document.getElementById("time1").textContent = `${city1}: ${formatTime(time1)}`;
    document.getElementById("time2").textContent = `${city2}: ${formatTime(time2)}`;

    // Calculate difference in hours
    const diffMs = time1 - time2;
    const diffHrs = Math.abs(diffMs) / (1000 * 60 * 60);
    let aheadOrBehind;
    if (diffMs > 0) {
        aheadOrBehind = `${city1} is ${diffHrs.toFixed(1)} hours ahead of ${city2}`;
    } else if (diffMs < 0) {
        aheadOrBehind = `${city1} is ${diffHrs.toFixed(1)} hours behind ${city2}`;
    } else {
        aheadOrBehind = "Both cities have the same time.";
    }
    document.getElementById("difference").textContent = aheadOrBehind;
}

window.onload = function() {
    populateDropdowns();
    updateTimes();
    document.getElementById("city1").addEventListener("change", updateTimes);
    document.getElementById("city2").addEventListener("change", updateTimes);
    // Optional: update every minute to reflect current time
    setInterval(updateTimes, 1000);
};
