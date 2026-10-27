/* Dati legali di CF Detailing. Fonte: scheda compilata (visura del 24/10/2023, da riconfermare con il titolare). */
window.LEGAL_CONFIG = {
  lang: "it",
  azienda: {
    ragioneSociale: "Claudio Farano, impresa individuale (CF Detailing)",
    sede: "Via Giovan Battista Gambaro 26, 28066 Galliate (NO)",
    piva: "02698970031",
    codiceFiscale: "",
    rea: "NO-306227",
    capitaleSociale: "",
    registroImprese: "Monte Rosa Laghi Alto Piemonte",
    pec: "cfdetailing@legalmail.it",
    email: "",
    telefono: "",
    sdi: "",
    socioUnico: false,
    inLiquidazione: false
  },
  privacy: {
    emailPrivacy: "cfdetailing@legalmail.it",
    dpo: "",
    ultimoAggiornamento: "27/10/2026",
    trattamenti: { formContatto: false, newsletter: false, ecommerce: false, prenotazioni: true },
    trasferimentoExtraUE: true
  },
  tecnica: {
    datiForm: "nome, telefono, email, marca e modello dell'auto, trattamenti scelti",
    destinazioneDati: "Cal.com (gestione delle prenotazioni) e calendario del titolare",
    toolForm: "Cal.com",
    hosting: "GitHub Pages (GitHub, Inc.)",
    paeseServer: "Stati Uniti",
    pagamenti: ""
  },
  servizi: [
    { nome: "Cal.com", categoria: "necessary", fornitore: "Cal.com, Inc. (USA)", durata: "nessun cookie; i dati della prenotazione restano nel calendario", finalita: "Mostrare le disponibilità e registrare le prenotazioni richieste dal visitatore", privacyUrl: "https://cal.com/privacy" },
    { nome: "Google Maps", categoria: "preferences", fornitore: "Google Ireland Ltd", durata: "secondo la policy di Google", finalita: "Mappa dello studio, caricata solo dopo il clic su «Mostra la mappa»", privacyUrl: "https://policies.google.com/privacy" }
  ],
  extraLinks: [],
  paths: { privacy: "/privacy.html", cookie: "/cookie.html" },
  theme: {
    primary: "#5cb8f2", primaryText: "#5cb8f2", onPrimary: "#000000",
    surface: "#0b0c0e", raised: "#17191d", ink: "#f5f5f3", muted: "#a6a9b0",
    line: "#2a2d33", strong: "#6b7079", soft: "#17191d",
    fontBody: "'Barlow', system-ui, sans-serif", fontDisplay: "'Bebas Neue', Impact, sans-serif", fontEditorial: "'Barlow', system-ui, sans-serif",
    fontFaces: [
      { family: "Barlow", src: "/fonts/Barlow-Regular.ttf", weight: "400" },
      { family: "Barlow", src: "/fonts/Barlow-SemiBold.ttf", weight: "600" },
      { family: "Bebas Neue", src: "/fonts/BebasNeue-Regular.ttf", weight: "400" }
    ],
    radius: "4px", radiusLg: "8px", radiusButton: "2px"
  },
  consentDurationDays: 180
};
