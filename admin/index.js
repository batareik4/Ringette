import {
  calendar_item_html,
  edit_calnder_event_html,
  delete_calendar_event_html,
  create_calendar_event_html,
} from "./templates.js";


import {
  getEvents,
  createEvent,
  editEvent,
  deleteEvent,
} from "./data.js";

const calendarList = document.getElementById("calendar-list");
const dialog = document.getElementById("dialog");

let currentEditId = null;

/* ---------------- Render ---------------- */

export function renderCalendar() {
  const events = getEvents();

  calendarList.innerHTML = events.length
    ? events.map(calendar_item_html).join("")
    : "Ei ole kalenterissa mitään.";
}

/* ---------------- Dialog ---------------- */

function openDialog(html) {
  dialog.innerHTML = html;
  dialog.style.display = "flex";

  dialog.querySelector("#close-dialog")
    ?.addEventListener("click", closeDialog);
}

export function closeDialog() {
  dialog.style.display = "none";
}

/* ---------------- Helpers ---------------- */

function createImageUrl(input, callback) {
  const file = input.files[0];

  if (!file) {
    callback(null);
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    callback(reader.result);
  };

  reader.readAsDataURL(file);
}

function setupImagePreview() {
  const input = dialog.querySelector(".create-imageurl");
  const preview = dialog.querySelector("#create-image");

  if (!input || !preview) return;

  input.addEventListener("change", () => {
    const file = input.files[0];

    if (file) {
      preview.src = URL.createObjectURL(file);
    }
  });
}

/* ---------------- Create ---------------- */

function openCreateDialog() {
  openDialog(create_calendar_event_html());

  setupImagePreview();

  dialog
   .querySelector(".create-btn")
   .addEventListener("click", () => {

     const imageInput = dialog.querySelector(".create-imageurl");

     const eventData = {
       title: dialog.querySelector(".create-title").value,
       description: dialog.querySelector(".create-description").value,
       location: dialog.querySelector(".create-location").value,
       coordinatesLink: dialog.querySelector(".create-coordinatesLink").value,
       category: dialog.querySelector(".create-category").value,
       startDate: dialog.querySelector(".create-startDate").value,
       endDate: dialog.querySelector(".create-endDate").value,
     };


     createImageUrl(imageInput, (image) => {

       eventData.imageUrl = image;

       createEvent(eventData);

       renderCalendar();
       closeDialog();

     });

  });
}

/* ---------------- Edit ---------------- */

function openEditDialog(data) {
  currentEditId = Number(data.id);

  openDialog(edit_calnder_event_html(data));

  dialog
    .querySelector("#save-edit")
    .addEventListener("click", () => {
      const imageInput =
        dialog.querySelector(".edit-imageurl");
    
      createImageUrl(imageInput, (image) => {
      
        editEvent(currentEditId, {
          title: dialog.querySelector(".edit-title").value,
          description: dialog.querySelector(
            ".edit-description"
          ).value,
          location: dialog.querySelector(".edit-location")
            .value,
          coordinatesLink: dialog.querySelector(
            ".edit-coordinatesLink"
          ).value,
          category: dialog.querySelector(".edit-category")
            .value,
          startDate: dialog.querySelector(
            ".edit-startDate"
          ).value,
          endDate: dialog.querySelector(".edit-endDate")
            .value,
          imageUrl: image || data.imageUrl,
        });
      
        renderCalendar();
        closeDialog();
      
      });
    });
}

/* ---------------- Delete ---------------- */

function openDeleteDialog(data) {
  openDialog(delete_calendar_event_html(data));

  dialog
    .querySelector("#confirm-delete")
    .addEventListener("click", () => {
      deleteEvent(data.id);

      renderCalendar();
      closeDialog();
    });
}

/* ---------------- Events ---------------- */

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".open-dialog");

  if (!btn) return;

  const item = btn.closest(".calendar-itm");

  switch (btn.dataset.content) {
    case "add":
      openCreateDialog();
      break;

    case "edit":
      openEditDialog(item.dataset);
      break;

    case "delete":
      openDeleteDialog(item.dataset);
      break;
  }
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    closeDialog();
  }
});

/* ---------------- Init ---------------- */

renderCalendar();