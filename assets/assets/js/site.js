// Récupération du paramètre ?expert= dans l'URL pour pré-remplir le formulaire
(function () {
  const params = new URLSearchParams(window.location.search);
  const expert = params.get("expert");
  const expertInput = document.getElementById("expert");
  if (expert && expertInput) {
    expertInput.value = expert;
  }
})();

// Afficher le champ "2e personne" uniquement pour le sentimental
(function () {
  const typeSelect = document.getElementById("type");
  const sentimentalBlock = document.querySelector(".sentimental-only");
  if (!typeSelect || !sentimentalBlock) return;

  function updateSentimentalVisibility() {
    if (typeSelect.value === "sentimentale") {
      sentimentalBlock.style.display = "block";
    } else {
      sentimentalBlock.style.display = "none";
    }
  }

  typeSelect.addEventListener("change", updateSentimentalVisibility);
  updateSentimentalVisibility();
})();

// Gestion du bouton "Payer et envoyer"
(function () {
  const form = document.getElementById("voyance-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Vérification de base
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Récupération des données du formulaire
    const data = Object.fromEntries(new FormData(form).entries());

    // Stockage local des infos en attendant que Stripe valide le paiement
    // Tu peux ensuite récupérer ces données après la redirection
    localStorage.setItem("altessa_voyance_form", JSON.stringify(data));

    // TODO : ici tu dois rediriger vers ton Checkout Stripe
    // Remplace l'URL ci-dessous par ton vrai lien de paiement ou ta page /create-checkout-session
    const stripeCheckoutUrl = "https://stripe.com"; // à remplacer par ta vraie URL Stripe

    window.location.href = stripeCheckoutUrl;
  });
})();
