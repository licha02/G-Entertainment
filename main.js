// =========================
// Eventos dinámicos desde Google Sheets
// =========================

// URL del CSV publicado de tu Google Sheet
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYXaBnWUdr0ez_s_zpNTaE_1BWxeqS0B9HsuWC3UceY3Ng59bRUupMWbXvtZ8cSljn-s6HXF_JdmPx/pub?output=csv"; // ⚠️ reemplazar con tu URL de CSV

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("eventos-container");
  if (!container) return;
  container.innerHTML = "";

  // Construir la ruta de la imagen según lo que venga en el CSV
  function buildImgSrc(raw) {
    if (!raw) return "/img/img-eventos/default.jpg"; // fallback opcional
    const s = raw.trim();
    // Si empieza con http(s) o con / (ruta absoluta), usar tal cual
    if (/^(https?:\/\/|\/)/i.test(s)) return s;
    // Si es solo un filename, asumir carpeta img/img-eventos
    return `/img/img-eventos/${encodeURI(s)}`;
  }

  // Parsear el CSV con PapaParse
  Papa.parse(sheetURL, {
    download: true,
    header: false,
    skipEmptyLines: true,
    complete: function (results) {
      const rows = results.data.slice(1); // saltear encabezado si existe

      rows.forEach((cols) => {
        if (!cols[0] || !cols[1]) return; // imagen y título son mínimos

        const imgSrc = buildImgSrc(cols[0]);
        const title = (cols[1] || "").trim();
        const datetime = `${(cols[2] || "").trim()} ${(cols[3] || "").trim()}`.trim();
        const direccion = (cols[4] || "").trim().replace(/^"|"$/g, "");

        const cardHTML = `
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 event-card">
              <img src="${imgSrc}" class="card-img-top event-img" alt="${title}">
              <div class="card-body text-center">
                <h5 class="card-title event-title">${title}</h5>
                <p class="card-text event-datetime">${datetime}</p>
                <p class="card-text event-location">${direccion}</p>
              </div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", cardHTML);
      });
    },
    error: function (err) {
      console.error("Error al cargar la hoja:", err);
    },
  });
});
