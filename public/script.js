//local data de videojuegos si la API no funciona
const videojuegosLocales = [
  {
    title :"Elden Ring",
    thumb: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png",
    normalPrice: "-",
    salePrice: "-",
    savings:null,
  },
  {
    title :"need for speed",
    thumb: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6a5r.png",
    normalPrice: "-",
    salePrice: "-",
    savings:null,
  },
];

//Selecciones del DOM - DENTRO DE DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#grid-videojuegos');
  const estadoCarga = document.querySelector('#estado-carga');
  const estadoError = document.querySelector('#estado-error');
  const inputBusqueda = document.querySelector(
    "input[placeholder='Buscar videojuegos...']"
  );

  //Funcion para pintar los cards
  function renderVideojuegos(lista) {
    grid.innerHTML = '';//limpiar el grid antes de renderizar
    lista.forEach((juego) => {
      //ajusta los nombres de las propiedades
      const titulo = juego.title || juego.externall || "juego";
      const thumb = juego.thumb || juego.gameID || juego.thumbnail || "";
      //precio y ahorro con fallbacks
      const normal = juego.normalPrice ?? "-";
      const oferta = juego.salePrice ?? juego.cheapest ?? "-";
      //ahorro redondeado si existe o null si no existe
      const ahorro = juego.savings ? Math.round(juego.savings) : null;

      // Creamos el html de cada card
      const card = document.createElement('article');
      card.className = 'bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 flex flex-col';

      //Insertamos el contenido de las card
      card.innerHTML = `
        <img
            src="${thumb}"
            alt="${titulo}"
            class="w-full h-48 object-cover">
        <div class="p-4 flex flex-col gap-2 flex-1">
            <h3 class="text-lg font-semibold text-slate-900">${titulo}</h3>
            <p class="text-xs text-slate-600">
            Precio : ${
              normal && normal !== "-" ? `<s>$${normal}</s>` : "-"
            }
            ${
              oferta && oferta !== "-"
               ? `<span class="font-semibold text-slate-900">$${oferta}</span>`
                : ""
            }
            ${ahorro ? ` . Ahorro ${ahorro}%` : ""}
            </p>
            <button class="mt-4 w-full px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800">
                Ver detalle
            </button>
        </div>
      `;
      // Agregamos la card al grid
      grid.appendChild(card);
    });
  }

  //ASYNC significa que la funcion maneja operaciones asincronas
  async function cargarVideojuegosInicial() {
    estadoCarga.classList.remove('hidden');
    estadoError.classList.add('hidden');

    try {
      const url = "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=20";
      const resp = await fetch(url); //espera la respuesta de la API
      if (!resp.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const data = await resp.json(); //espera la conversion a JSON
      //Esto los guarda en la cache
      window._juegosCache = data;
      renderVideojuegos(data);
    } catch (e) {
      console.error("Error al cargar CheapShark", e);
      estadoError.classList.remove("hidden");
      renderVideojuegos(videojuegosLocales);
    } finally {
      estadoCarga.classList.add("hidden");
    }
  }

  cargarVideojuegosInicial();
});








