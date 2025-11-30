// --- Pré-remplir le champ "expert" via ?expert= ---
(function () {
  const params = new URLSearchParams(window.location.search);
  const expert = params.get("expert");
  const expertInput = document.querySelector("[name='expert']");

  if (expert && expertInput) {
    expertInput.value = decodeURIComponent(expert.replace(/\+/g, " "));
  }
})();

// --- Afficher automatiquement le champ sentimental ---
(function () {
  const typeSelect = document.querySelector("[name='type']");
  const sentimentalBlock = document.querySelector(".sentimental-only");

  if (!typeSelect || !sentimentalBlock) return;

  function updateSentimentalVisibility() {
    sentimentalBlock.style.display =
      typeSelect.value === "sentimentale" ? "block" : "none";
  }

  typeSelect.addEventListener("change", updateSentimentalVisibility);
  updateSentimentalVisibility();
})();

// --- Gestion du bouton Paiement (Stripe Checkout) ---
(function () {
  const form = document.getElementById("voyance-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Vérification HTML5
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Récupère toutes les données du formulaire
    const data = Object.fromEntries(new FormData(form).entries());

    // Sauvegarde temporaire (utile pour réafficher après paiement)
    localStorage.setItem("altessa_voyance_form", JSON.stringify(data));

    // 🔥 À remplacer par ton lien de paiement réel Stripe Checkout
    const stripeCheckoutUrl = "https://stripe.com";

    window.location.href = stripeCheckoutUrl;
  });
})();
