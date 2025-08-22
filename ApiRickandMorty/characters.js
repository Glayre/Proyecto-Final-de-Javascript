document.addEventListener("DOMContentLoaded", () => {
  protectRoute();

  const loader = document.getElementById("loader");
  const container = document.getElementById("charactersContainer");
  const user = sessionStorage.getItem("loggedInUser");
  const favoritesKey = `favorites_${user}`;
  const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

  loader.style.display = "block";
  container.style.display = "none";

  fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none";
      container.style.display = "flex";
      container.innerHTML = "";

      data.results.forEach((personaje, i) => {
        const card = document.createElement("div");
        card.className = "character-card";
        card.innerHTML = `
          <img src="${personaje.image}" alt="${personaje.name}" />
          <h2>${personaje.name}</h2>
          <button>${favorites.includes(personaje.id) ? "★ Favorito" : "☆ Marcar"}</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
          const index = favorites.indexOf(personaje.id);
          if (index > -1) favorites.splice(index, 1);
          else favorites.push(personaje.id);
          localStorage.setItem(favoritesKey, JSON.stringify(favorites));
          location.reload();
        });

        container.appendChild(card);

        // GSAP Animation
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          delay: i * 0.1,
          ease: "power2.out"
        });
      });
    });
});
