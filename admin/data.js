const STORAGE_KEY = "calendarEvents";

const defaultEvents = [
  
];

function loadEvents() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (data) {
    return JSON.parse(data);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
  return defaultEvents;
}

let calendarList = loadEvents();

function saveEvents() {
  localStorage.setItem(
    "calendarEvents",
    JSON.stringify(calendarList)
  );
}

export const getEvents = () => {
  const data = localStorage.getItem("calendarEvents");

  return data ? JSON.parse(data) : [];
};

const getNextId = () =>
  Math.max(0, ...calendarList.map(e => e.id)) + 1;

export function createEvent(event) {
  calendarList.push({
    id: getNextId(),
    ...event,
  });

  saveEvents();
}

export function editEvent(id, updates) {
  calendarList = calendarList.map(item =>
    item.id === Number(id)
      ? { ...item, ...updates }
      : item
  );

  saveEvents();
}

export function deleteEvent(id) {
  calendarList = calendarList.filter(
    item => item.id !== Number(id)
  );

  saveEvents();
}