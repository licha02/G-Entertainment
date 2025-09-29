function limpiarTexto(texto) {
  return texto.replace(/^"|"$/g, '').trim();
}

document.addEventListener("DOMContentLoaded", function () {
  const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYXaBnWUdr0ez_s_zpNTaE_1BWxeqS0B9HsuWC3UceY3Ng59bRUupMWbXvtZ8cSljn-s6HXF_JdmPx/pub?output=csv";

  fetch(sheetURL)
    .then((response) => response.text())
    .then((data) => {
      const rows = data.split("\n").slice(1);
      const cards = document.querySelectorAll("#eventos-container .event-card");

      rows.slice(0, 4).forEach((row, i) => {
        const cols = row.split(",").map(limpiarTexto);

        if (cols[0] && cols[1]) {
          const img = cards[i].querySelector(".event-img");
          const title = cards[i].querySelector(".event-title");
          const datetime = cards[i].querySelector(".event-datetime");
          const location = cards[i].querySelector(".event-location");

          img.src = cols[0];
          title.textContent = cols[1];
          datetime.textContent = `${cols[2]} ${cols[3]}`;
          location.textContent = cols[4];

          cards[i].parentElement.style.display = "block";
        } else {
          cards[i].parentElement.style.display = "none";
        }
      });
    })
    .catch((error) => console.error("Error al cargar la hoja:", error));
});
