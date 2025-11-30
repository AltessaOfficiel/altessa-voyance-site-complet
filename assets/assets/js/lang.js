// === SYSTEME MULTILINGUE ALTESSA ===

// Charger les traductions
async function loadTranslations(lang) {
  try {
    const res = await fetch(`assets/lang/${lang}.json`);
    return await res.json();
  } catch (e) {
    console.error("Erreur chargement traductions :", e);
  }
}

// Appliquer les traductions au DOM
function applyTranslations(dict) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerHTML = dict[key];
  });
}

// Déterminer la langue par défaut
function getDefaultLang() {
  return localStorage.getItem("lang") || "fr";
}

// Changer de langue
async function setLanguage(lang) {
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
  localStorage.setItem("lang", lang);
}

// Sélecteur de langue
document.addEventListener("DOMContentLoaded", async () => {
  const switcher = document.getElementById("lang-switcher");
  const lang = getDefaultLang();

  // charger traduction initiale
  await setLanguage(lang);

  // mettre le selecteur sur la bonne langue
  if (switcher) switcher.value = lang;

  // changement de langue via dropdown
  if (switcher) {
    switcher.addEventListener("change", e => {
      setLanguage(e.target.value);
    });
  }
});
