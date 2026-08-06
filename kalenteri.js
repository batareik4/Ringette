import {getEvents} from "./admin/data.js"


function addEvent(tapahtuma, list) {
    let nextId = list.length > 0 ? list[list.length - 1].id + 1 : 0
    tapahtuma.id = nextId;
    list.push(tapahtuma)
}


const calendarList = document.getElementById("calendar");

export function showCalendar(list) {
 const events = getEvents();

    // Sort events by start date (oldest first)
    events.sort((a, b) => {
      if (!a.startDate) return 1;
      if (!b.startDate) return -1;

      return new Date(b.startDate) - new Date(a.startDate);
    });

    calendarList.innerHTML = events.length
        ? events.map((arrElement) => ` <div id="calendar-event">
              <img class="event-image" src="${arrElement.imageUrl}" alt="${arrElement.title}" />
              <div class="event-date">${new Date(arrElement?.startDate)?.toLocaleString("fi-FI")} ${arrElement?.endDate && `- ${new Date(arrElement?.endDate)?.toLocaleString("fi-FI")} `}</div>
              <hr>
              <h4>${arrElement.title} (${arrElement.category})</h4>
              <hr>
              <hr>
              <div>${arrElement.description}</div>
              <hr>
              <a class="event-coordinates" href="${arrElement.coordinatesLink}" target="_blank" rel="noopener">${arrElement.location}</a>
        </div>`).join("") : "Ei ole kalenterissa mitään.";
}

window.addEventListener("DOMContentLoaded", () => {
    showCalendar();
});