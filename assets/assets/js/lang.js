/* ============================================================
   🌐 Altessa Voyance — Système multilingue
   Langues : Français, Anglais, Espagnol, Portugais, Italien
   ------------------------------------------------------------
   Fonctionnement :
   - lit l'attribut data-i18n pour traduire les textes
   - sauvegarde la langue dans localStorage
   - applique la langue dès le chargement de la page
   ============================================================ */

const translations = {
  fr: {
    // --- NAV ---
    nav_home: "Accueil",
    nav_experts: "Experts",
    nav_tarifs: "Tarifs",
    nav_contact: "Contact",

    // --- BRAND ---
    brand_name: "Altessa",
    brand_sub: "Voyance",

    // --- TARIFS PAGE ---
    tarifs_title: "Altessa Voyance — Tarifs",
    tarifs_page_title: "Tarifs de voyance",
    tarifs_intro:
      "Choisissez votre type de voyance selon votre besoin.<br><strong>Réponse envoyée par e-mail après validation du paiement sécurisé.</strong>",

    tarif_question_title: "À la question",
    tarif_question_desc: "Une question précise, réponse directe et claire.",

    tarif_sentimental_title: "Voyance sentimentale",
    tarif_sentimental_desc:
      "Couple, amour, retrouvailles, liens présents et futurs.",

    tarif_pro_title: "Voyance professionnelle",
    tarif_pro_desc: "Carrière, travail, changement pro, évolution.",

    tarif_finance_title: "Voyance financière",
    tarif_finance_desc: "Finances, achats importants, stabilité et sécurité.",

    tarif_general_title: "Voyance générale",
    tarif_general_desc:
      "Bilan complet : sentimental, pro, finances et tendances à venir.",

    tarif_soin_title: "Soin énergétique",
    tarif_soin_desc:
      "Nettoyage énergétique, apaisement, réalignement intérieur.",

    btn_choose_expert: "Choisir mon expert",
    btn_ask_question: "Poser ma question",

    // --- FOOTER ---
    footer_text: "Altessa Voyance © — Voyance en ligne."
  },

  en: {
    nav_home: "Home",
    nav_experts: "Experts",
    nav_tarifs: "Prices",
    nav_contact: "Contact",

    brand_name: "Altessa",
    brand_sub: "Divination",

    tarifs_title: "Altessa Divination — Prices",
    tarifs_page_title: "Consultation Prices",
    tarifs_intro:
      "Choose the type of reading you need.<br><strong>Your answer will be sent by email after secure payment validation.</strong>",

    tarif_question_title: "One Question",
    tarif_question_desc: "A clear and direct answer to a specific question.",

    tarif_sentimental_title: "Love Reading",
    tarif_sentimental_desc:
      "Relationships, love, reconnection, present and future ties.",

    tarif_pro_title: "Career Reading",
    tarif_pro_desc: "Career, work direction, evolution.",

    tarif_finance_title: "Financial Reading",
    tarif_finance_desc: "Money matters, stability, important purchases.",

    tarif_general_title: "General Reading",
    tarif_general_desc:
      "Full overview: love, work, finances and upcoming energies.",

    tarif_soin_title: "Energy Healing",
    tarif_soin_desc: "Energetic cleansing, calm, inner realignment.",

    btn_choose_expert: "Choose my expert",
    btn_ask_question: "Ask my question",

    footer_text: "Altessa Divination © — Online clairvoyance."
  },

  es: {
    nav_home: "Inicio",
    nav_experts: "Expertos",
    nav_tarifs: "Tarifas",
    nav_contact: "Contacto",

    brand_name: "Altessa",
    brand_sub: "Videncia",

    tarifs_title: "Altessa Videncia — Tarifas",
    tarifs_page_title: "Tarifas de consulta",
    tarifs_intro:
      "Elija el tipo de consulta según su necesidad.<br><strong>Respuesta enviada por correo electrónico tras el pago seguro.</strong>",

    tarif_question_title: "Pregunta única",
    tarif_question_desc: "Una respuesta clara y directa a una pregunta.",

    tarif_sentimental_title: "Lectura sentimental",
    tarif_sentimental_desc:
      "Pareja, amor, reencuentros, vínculos presentes y futuros.",

    tarif_pro_title: "Lectura profesional",
    tarif_pro_desc: "Carrera, trabajo, cambio profesional, evolución.",

    tarif_finance_title: "Lectura financiera",
    tarif_finance_desc: "Finanzas, compras importantes, estabilidad.",

    tarif_general_title: "Lectura general",
    tarif_general_desc:
      "Visión completa: amor, trabajo, finanzas y energías futuras.",

    tarif_soin_title: "Sanación energética",
    tarif_soin_desc:
      "Limpieza energética, calma, realineamiento interior.",

    btn_choose_expert: "Elegir mi experto",
    btn_ask_question: "Hacer mi pregunta",

    footer_text: "Altessa Videncia © — Videncia en línea."
  },

  pt: {
    nav_home: "Início",
    nav_experts: "Especialistas",
    nav_tarifs: "Tarifas",
    nav_contact: "Contato",

    brand_name: "Altessa",
    brand_sub: "Vidência",

    tarifs_title: "Altessa Vidência — Tarifas",
    tarifs_page_title: "Tarifas de consulta",
    tarifs_intro:
      "Escolha o tipo de leitura conforme sua necessidade.<br><strong>Resposta enviada por e-mail após pagamento seguro.</strong>",

    tarif_question_title: "Pergunta única",
    tarif_question_desc: "Resposta direta e clara para sua pergunta.",

    tarif_sentimental_title: "Leitura amorosa",
    tarif_sentimental_desc:
      "Relacionamentos, amor, reconciliação, laços presentes e futuros.",

    tarif_pro_title: "Leitura profissional",
    tarif_pro_desc: "Carreira, trabalho, mudanças profissionais.",

    tarif_finance_title: "Leitura financeira",
    tarif_finance_desc: "Finanças, compras importantes, estabilidade.",

    tarif_general_title: "Leitura geral",
    tarif_general_desc:
      "Visão completa: amor, trabalho, finanças e tendências futuras.",

    tarif_soin_title: "Cura energética",
    tarif_soin_desc: "Limpeza energética, calma, realinhamento interior.",

    btn_choose_expert: "Escolher meu especialista",
    btn_ask_question: "Fazer minha pergunta",

    footer_text: "Altessa Vidência © — Vidência online."
  },

  it: {
    nav_home: "Home",
    nav_experts: "Esperti",
    nav_tarifs: "Tariffe",
    nav_contact: "Contatto",

    brand_name: "Altessa",
    brand_sub: "Veggenza",

    tarifs_title: "Altessa Veggenza — Tariffe",
    tarifs_page_title: "Tariffe di consulto",
    tarifs_intro:
      "Scegli il tipo di consulto di cui hai bisogno.<br><strong>Risposta inviata via email dopo il pagamento sicuro.</strong>",

    tarif_question_title: "Domanda singola",
    tarif_question_desc:
      "Risposta chiara e diretta alla tua domanda.",

    tarif_sentimental_title: "Lettura sentimentale",
    tarif_sentimental_desc:
      "Coppia, amore, ritorni, legami presenti e futuri.",

    tarif_pro_title: "Lettura professionale",
    tarif_pro_desc:
      "Carriera, lavoro, cambiamenti professionali.",

    tarif_finance_title: "Lettura finanziaria",
    tarif_finance_desc: "Finanze, acquisti importanti, stabilità.",

    tarif_general_title: "Lettura generale",
    tarif_general_desc:
      "Panoramica completa: amore, lavoro, finanze e tendenze future.",

    tarif_soin_title: "Guarigione energetica",
    tarif_soin_desc:
      "Pulizia energetica, calma, riallineamento interiore.",

    btn_choose_expert: "Scegli il mio esperto",
    btn_ask_question: "Fai la mia domanda",

    footer_text: "Altessa Veggenza © — Veggenza online."
  }
};

/* ============================================================
   FONCTIONS PRINCIPALES
   ============================================================ */

function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
}

function initLangSystem() {
  const saved = localStorage.getItem("lang");
  const defaultLang = saved || "fr";

  applyTranslations(defaultLang);

  const selector = document.getElementById("lang-switcher");
  if (selector) {
    selector.value = defaultLang;
    selector.addEventListener("change", (e) => {
      applyTranslations(e.target.value);
    });
  }
}

document.addEventListener("DOMContentLoaded", initLangSystem);
