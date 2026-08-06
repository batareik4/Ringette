import {formatDateTime} from "./utils.js"


export const calendar_item_html = (data) => `
 <div 
    class="calendar-itm"
    data-id="${data.id}" 
    data-title="${data.title}"
    data-description="${data.description}"
    data-startDate="${data.startDate}"
    data-endDate="${data.endDate}"
    data-location="${data.location}"
    data-coordinatesLink="${data.coordinatesLink}"
    data-imageUrl="${data.imageUrl}"
    data-category="${data.category}"
   >
    <div class="calendar-itm-left">
     <img src="${data?.imageUrl}" alt="Kuva" class="calendar-itm-img"/>
     <span>id: ${data?.id} - ${data?.title} - Alkaa - ${new Date(data.startDate)?.toLocaleString("fi-FI")}  ${data.endDate && `- Loppuu: ${new Date(data.endDate)?.toLocaleString("fi-FI")}`}</span>
    </div>
    <div class="calendar-itm-right">
     <button class="open-dialog button-wrapper" data-content="edit">Muokkaa</button>
     <button class="open-dialog button-wrapper btn-delete" data-content="delete" >Poista</button>
    </div>
  </div>
`

export const edit_calnder_event_html = (data) => `
 <div class="dialog">
 
  <div class="dialog-inputs-list">
    <div class="column">
    <label for="">Kuva</label>
    <img src="${data?.imageurl}" alt="Kuva" class="calendar-itm-img"/>
    <input class="edit-imageurl" type="file" accept="image/png, image/jpeg"/ value="${data.imageurl}">
  </div>
  <div class="column">
    <label for="">Otsikko</label>
    <input class="edit-title" type="text" value="${data?.title}"/>
  </div>
  <div class="column">
    <label for="">Kuvaus</label>
    <textarea class="edit-description" type="text">${data?.description}</textarea>
  </div>
  <div class="column">
    <label for="">Osoite</label>
    <input class="edit-location" type="text" value="${data?.location}"/>
  </div>
  <div class="column">
    <label for="">Google maps Osoite</label>
    <input class="edit-coordinatesLink" type="text" value="${data?.coordinateslink}"/>
  </div>
  <div class="column">
    <label for="">Luokka</label>
    <input class="edit-category" type="text" value="${data?.category}"/>
  </div>

  <div class="column">
    <label for="">Milloin alkaa</label>
    <input class="edit-startDate" type="datetime-local" value="${formatDateTime(data?.startdate)}" />
  </div>
  <div class="column">
    <label for="">Milloin Loppuu</label>
    <input class="edit-endDate" type="datetime-local" value="${formatDateTime(data?.enddate)}" />
  </div>
  </div>
  
  <button class="button-wrapper dialog-btn" id="save-edit"> Tallenna </button>
  <button class="button-wrapper dialog-btn grey-bg" id="close-dialog">Sulje dialog</button>
 </div>
`

export const delete_calendar_event_html = (data) => `
 <div class="dialog">
   <div class="column">
     <span>ID: ${data.id}</span>
     <span>Otsikko: ${data.title}</span>
   </div>

   <button
      class="button-wrapper btn-delete dialog-btn"
      id="confirm-delete"
      data-id="${data.id}">
      Poista
   </button>

   <button class="button-wrapper dialog-btn grey-bg" id="close-dialog">
      Sulje dialog
   </button>
 </div>
`;

export const create_calendar_event_html = () => `
 <div class="dialog">

<div class="dialog-inputs-list">
    <div class="column">
    <label for="">Kuva</label>
    <img src="" alt="Kuva" class="calendar-itm-img" id="create-image">
    <input class="create-imageurl" type="file" accept="image/png, image/jpeg"/ value="">
  </div>
  <div class="column">
    <label for="">Otsikko <span class="required-dot">*</span></label>
    <input class="create-title" type="text" value=""/>
  </div>
  <div class="column">
    <label for="">Kuvaus <span class="required-dot">*</span></label>
    <textarea class="create-description" type="text"></textarea>
  </div>
  <div class="column">
    <label for="">Osoite</label>
    <input class="create-location" type="text" value=""/>
  </div>
  <div class="column">
    <label for="">Google maps Osoite</label>
    <input class="create-coordinatesLink" type="text" value=""/>
  </div>
  <div class="column">
    <label for="">Luokka <span class="required-dot">*</span></label>
    <input class="create-category" type="text" value=""/>
  </div>

  <div class="column">
    <label for="">Milloin alkaa <span class="required-dot">*</span></label>
    <input class="create-startDate" type="datetime-local" value="${formatDateTime()}" />
  </div>
  <div class="column">
    <label for="">Milloin Loppuu</label>
    <input class="create-endDate" type="datetime-local" value="${formatDateTime()}" />
  </div>
  </div>

  <button class="create-btn button-wrapper dialog-btn" id="create-event"> Luo </button>
  <button class="button-wrapper dialog-btn grey-bg" id="close-dialog">Sulje dialog</button>
 </div>
`