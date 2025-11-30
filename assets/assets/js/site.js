// Pré-remplissage du champ "expert" via ?expert=
(function () {
  const params = new URLSearchParams(window.location.search);
  const expert = params.get("expert");
  const expertInput = document.querySelector("[name='expert']");

  if (expert && expertInput) {
    expertInput.value = expert;
  }
})();

// Afficher le champ "2e personne" uniquement pour le sentimental
(function () {
  const typeSelect = document.querySelector("[name='type']");
  const sentimentalBlock = document.querySelector(".sentimental-only");

  if (!typeSelect || !sentimentalBlock) return;

  function updateSentimentalVisibility() {
    sentimentalBlock.style.display =
      typeSelect.value.includes("sentimental") ? "block" : "none";
  }

  typeSelect.addEventListener("change", updateSentimentalVisibility);
  updateSentimentalVisibility();
})();

// Gestion du bouton Paiement (Stripe)
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

    // URL Stripe
    const stripeCheckoutUrl = "https://stripe.com"; // À remplacer

    window.location.href = stripeCheckoutUrl;
  });
})();
