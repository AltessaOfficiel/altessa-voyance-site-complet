// --- Pré-remplir le champ "expert" via ?expert= ---
(function () {
  const params = new URLSearchParams(window.location.search);
  const expert = params.get("expert");
  const expertInput = document.querySelector("[name='expert']");

  if (expert && expertInput) {
    expertInput.value = expert;
  }
})();

// --- Afficher le champ "2e personne" pour le sentimental uniquement ---
(function () {
  const typeSelect = document.querySelector("[name='type']");
  const sentimentalBlock = document.querySelector(".sentimental-only");

  if (!typeSelect || !sentimentalBlock) return;

  function updateSentimentalVisibility() {
    // On ne déclenche QUE si la valeur est EXACTEMENT "sentimentale"
    sentimentalBlock.style.display =
      typeSelect.value === "sentimentale" ? "block" : "none";
  }

  typeSelect.addEventListener("change", updateSentimentalVisibility);
  updateSentimentalVisibility();
})();

// --- Gestion du bouton Paiement (Stripe) ---
(function () {
  const form = document.getElementById("voyance-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem("altessa_voyance_form", JSON.stringify(data));

    // URL Stripe à remplacer par ton vrai Checkout
    const stripeCheckoutUrl = "https://stripe.com";

    window.location.href = stripeCheckoutUrl;
  });
})();
