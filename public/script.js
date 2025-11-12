//DATOS  DE PRUEBA

const videojuegos = [
  {
    id: 1,
    nombre: "Elden Ring",
    descripcion: "Acción · RPG · PC / PS5 / Xbox",
    rating: 4.8,
    imagen:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png"
  },
  {
    id: 2,
    nombre: "god of war",
    descripcion: "Acción · Aventura · PS4 / PS5",
    rating: 4.9,
    imagen:"https://images.igdb.com/igdb/image/upload/t_cover_big/co6a5r.png"
  },
  {
    id: 3,
    nombre: "The Legend of Zelda",
    descripcion: "Aventura · Mundo abierto · Switch",
    rating: 4.7,
    imagen:"https://images.igdb.com/igdb/image/upload/t_cover_big/co48qj.png"
  },  
  {
    id: 4,
    nombre: "fortnite",
    descripcion: "Battle Royale · Multiplataforma",
    rating: 4.3,
    imagen:"https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5d.png"
  },  
];

// función para pintar las cards
function renderizarVideojuegos(lista) {
  const grid = document.querySelector('#grid');
  
  if (!grid) {
    console.error('Error: No se encontró el elemento con id="grid" en el HTML');
    return;
  }
  
  grid.innerHTML = ''; // Limpiar el grid antes de renderizar
  lista.forEach((juego) => {
    const card = document.createElement("article");
    card.className = "bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 flex flex-col";

    card.innerHTML = `
      <img
        src="${juego.imagen}" 
        alt="${juego.nombre}"
        class="h-40 w-full object-cover"
      />
      <div class="p-4 flex flex-col gap-2 flex-1">
        <h3 class="text-lg font-semibold text-slate-900">${juego.nombre}</h3>
        <p class="text-slate-500 flex-1">${juego.descripcion}</p>
        <div class="mt-4 flex items-center justify-between">
          <button class="text-blue-600 hover:underline">Ver detalle</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ESPERAR A QUE EL DOM CARGUE COMPLETAMENTE
document.addEventListener('DOMContentLoaded', () => {
  renderizarVideojuegos(videojuegos);
});



