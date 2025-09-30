document.addEventListener("DOMContentLoaded", function () {
  const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYXaBnWUdr0ez_s_zpNTaE_1BWxeqS0B9HsuWC3UceY3Ng59bRUupMWbXvtZ8cSljn-s6HXF_JdmPx/pub?output=csv";

  const container = document.getElementById("eventos-container");
  container.innerHTML = "";

  Papa.parse(sheetURL, {
    download: true,
    header: false,
    skipEmptyLines: true,
    complete: function(results) {
      const rows = results.data.slice(1); // Saltar encabezados

      rows.forEach((cols) => {
        if (!cols[0] || !cols[1]) return;

        // Limpiar solo comillas externas de la dirección (columna 4)
        const direccion = cols[4] ? cols[4].trim().replace(/^"|"$/g, '') : '';

        const cardHTML = `
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 event-card">
              <img src="${cols[0].trim()}" class="card-img-top event-img" alt="Evento">
              <div class="card-body text-center">
                <h5 class="card-title event-title">${cols[1].trim()}</h5>
                <p class="card-text event-datetime">${cols[2].trim()} ${cols[3].trim()}</p>
                <p class="card-text event-location">${direccion}</p>
              </div>
            </div>
          </div>
        `;

        container.insertAdjacentHTML("beforeend", cardHTML);
      });
    },
    error: function(err) {
      console.error("Error al cargar la hoja:", err);
    }
  });
});
