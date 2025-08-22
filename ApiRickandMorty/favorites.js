document.addEventListener("DOMContentLoaded", () => {
  protectRoute();

  const container = document.getElementById("favoritesContainer");
  const user = sessionStorage.getItem("loggedInUser");
  const favoritesKey = `favorites_${user}`;
  const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

  if (favorites.length === 0) {
    container.innerHTML = "<p>No tienes personajes favoritos aún.</p>";
    return;
  }

  Promise.all(
    favorites.map(id =>
      fetch(`https://rickandmortyapi.com/api/character/${id}`).then(res => res.json())
    )
  ).then(personajes => {
    container.innerHTML = "";
    personajes.forEach(p => {
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h2>${p.name}</h2>
        <button>Eliminar</button>
      `;

      card.querySelector("button").addEventListener("click", () => {
        const updatedFavorites = favorites.filter(id => id !== p.id);
        localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
        location.reload();
      });

      container.appendChild(card);
    });
  });
});
