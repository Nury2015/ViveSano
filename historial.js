const recetas = [
  {
    nombre: "Pollo con arroz",
    imagen: "https://static-centrallecheraasturiana.pro.centrallecheraasturiana.es/uploads/2017/02/PC-pollo-esparragos.jpg"
  },
  {
    nombre: "Ensalada fitness",
    imagen: "https://www.infobae.com/resizer/v2/4M46ZNWACZDRTMLCC53BJRCH6U.jpg?auth=48d72c67ad7e2bf50a6c4e0e69bfeb83dfe0bb6b01042ae1a01cb6ecd1b504a0&smart=true&width=992&height=556&quality=85"
  },
   {
    nombre: "Ensalada fitness",
    imagen: "https://www.infobae.com/resizer/v2/4M46ZNWACZDRTMLCC53BJRCH6U.jpg?auth=48d72c67ad7e2bf50a6c4e0e69bfeb83dfe0bb6b01042ae1a01cb6ecd1b504a0&smart=true&width=992&height=556&quality=85"
  },
   {
    nombre: "Ensalada fitness",
    imagen: "https://www.infobae.com/resizer/v2/4M46ZNWACZDRTMLCC53BJRCH6U.jpg?auth=48d72c67ad7e2bf50a6c4e0e69bfeb83dfe0bb6b01042ae1a01cb6ecd1b504a0&smart=true&width=992&height=556&quality=85"
  }
];

const ingredientes = ["Pollo", "Aguacate", "Arroz", "Huevo"];

// RECETAS
const contenedor = document.getElementById("recetasGuardadas");

recetas.forEach(receta => {
  contenedor.innerHTML += `
    <div class="receta">
      <img src="${receta.imagen}">
      <p>${receta.nombre}</p>
    </div>
  `;
});

// PROGRESO
document.getElementById("totalRecetas").textContent = recetas.length;
document.getElementById("recetasHechas").textContent = 1;

// INGREDIENTES
const contIng = document.getElementById("ingredientesFav");

ingredientes.forEach(ing => {
  contIng.innerHTML += `<span class="tag">${ing}</span>`;
});