/*! legal-kit v1.0 – banner cookie GDPR + footer legale + policy generate da config */
(function () {
  var C = window.LEGAL_CONFIG; if (!C) return;
  var SRC = (document.currentScript && document.currentScript.src) || "";
  var BASE = SRC.replace(/[^\/]*$/, "");   // cartella di legal-kit.js: da qui si caricano i font (self-host, nessuna richiesta a terzi)
  var KEY = "lk_consent_v1", CATS = ["analytics", "marketing", "preferences"];
  var A = C.azienda, P = C.privacy, T = C.theme;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); };

  /* ---------- Consenso ---------- */
  function read() { try { var v = JSON.parse(localStorage.getItem(KEY)); if (v && Date.now() < v.exp) return v; } catch (e) {} return null; }
  function save(choice) {
    var v = { c: choice, ts: Date.now(), exp: Date.now() + C.consentDurationDays * 864e5 };
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
    apply(choice);
  }
  function apply(c) {
    // Google Consent Mode v2
    if (window.gtag) gtag("consent", "update", {
      analytics_storage: c.analytics ? "granted" : "denied",
      ad_storage: c.marketing ? "granted" : "denied",
      ad_user_data: c.marketing ? "granted" : "denied",
      ad_personalization: c.marketing ? "granted" : "denied",
      functionality_storage: c.preferences ? "granted" : "denied",
      personalization_storage: c.preferences ? "granted" : "denied"
    });
    // Script bloccati: <script type="text/plain" data-cookie-category="analytics" [data-src=".."]>
    document.querySelectorAll('script[type="text/plain"][data-cookie-category]').forEach(function (s) {
      if (!c[s.dataset.cookieCategory] || s.dataset.done) return;
      var n = document.createElement("script");
      if (s.dataset.src) n.src = s.dataset.src; else n.text = s.text;
      s.dataset.done = 1; s.parentNode.insertBefore(n, s.nextSibling);
    });
    // Iframe bloccati (YouTube, Maps…): <iframe data-consent-src=".." data-cookie-category="marketing">
    document.querySelectorAll("iframe[data-consent-src]").forEach(function (f) {
      if (c[f.dataset.cookieCategory || "marketing"]) f.src = f.dataset.consentSrc;
    });
    document.dispatchEvent(new CustomEvent("lk:consent", { detail: c }));
  }

  /* ---------- UI ---------- */
  // Il tema viene dal design system DEL CLIENTE (C.theme). Se manca un valore, si usa un default neutro
  // e i font ereditati dalla pagina del cliente. Nessun colore o font di Sosia.
  var th = T || {};
  var V = {
    surface: th.surface || "#ffffff", raised: th.raised || th.surface || "#ffffff", ink: th.ink || "#1a1a1a", muted: th.muted || "#555555",
    line: th.line || "#dddddd", strong: th.strong || "#767676", brand: th.primary || "#111111", brandText: th.primaryText || th.primary || "#111111",
    onBrand: th.onPrimary || th.text || "#ffffff", soft: th.soft || "#f2f2f2", radius: th.radius || "12px", radiusLg: th.radiusLg || "16px", pill: th.radiusButton || "999px",
    fontBody: th.fontBody || "inherit", fontDisplay: th.fontDisplay || th.fontBody || "inherit", fontEditorial: th.fontEditorial || th.fontDisplay || th.fontBody || "inherit",
    shadow: th.shadow || "0 1px 2px rgba(0,0,0,.08),0 8px 24px rgba(0,0,0,.12)", lift: th.shadowLift || "0 2px 4px rgba(0,0,0,.12),0 16px 40px rgba(0,0,0,.18)"
  };
  var fonts = (th.fontFaces || []).map(function (f) { return "@font-face{font-family:'" + f.family + "';src:url('" + (/^(https?:)?\//.test(f.src) ? f.src : BASE + f.src) + "');font-weight:" + (f.weight || "400") + ";font-display:swap}"; }).join("");
  var css = fonts +
    ".lk-b,.lk-m,.lk-f,.lk-doc,.lk-w{--lk-surface:" + V.surface + ";--lk-raised:" + V.raised + ";--lk-ink:" + V.ink + ";--lk-muted:" + V.muted + ";--lk-line:" + V.line + ";--lk-strong:" + V.strong + ";--lk-brand:" + V.brand + ";--lk-brand-text:" + V.brandText + ";--lk-on-brand:" + V.onBrand + ";--lk-soft:" + V.soft + ";--lk-shadow:" + V.shadow + ";--lk-lift:" + V.lift + ";font-family:" + V.fontBody + ";color:var(--lk-ink)}" +
    ".lk-b{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;background:var(--lk-raised);border:1px solid var(--lk-line);border-radius:" + V.radiusLg + ";box-shadow:var(--lk-lift);padding:24px;font-size:15px;line-height:22px}" +
    ".lk-i{max-width:1100px;margin:auto;display:flex;gap:24px;flex-wrap:wrap;align-items:center;justify-content:space-between}" +
    ".lk-i p{margin:0;flex:1 1 380px}.lk-i a,.lk-doc a,.lk-m a{color:var(--lk-brand-text);text-decoration:underline}" +
    ".lk-t{font-family:" + V.fontDisplay + ";font-weight:700;font-size:18px;line-height:24px;margin:0 0 4px}" +
    ".lk-a{display:flex;gap:12px;flex-wrap:wrap}" +
    // Accetta e Rifiuta HANNO LO STESSO PESO VISIVO (obbligo Garante): entrambi pieni. Personalizza è il contorno.
    ".lk-btn{cursor:pointer;border:2px solid var(--lk-brand);background:var(--lk-brand);color:var(--lk-on-brand);padding:10px 22px;border-radius:" + V.pill + ";font:700 13px/16px " + V.fontBody + ";letter-spacing:.04em}" +
    ".lk-btn.o{background:transparent;color:var(--lk-brand-text);border-color:var(--lk-strong)}" +
    ".lk-btn:focus-visible,.lk-r input:focus-visible,.lk-f a:focus-visible,.lk-i a:focus-visible{outline:3px solid var(--lk-brand-text);outline-offset:3px}" +
    ".lk-ov{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px}" +
    ".lk-m{background:var(--lk-raised);border:1px solid var(--lk-line);max-width:560px;width:100%;max-height:90vh;overflow:auto;border-radius:" + V.radiusLg + ";box-shadow:var(--lk-lift);padding:32px;font-size:15px;line-height:22px}" +
    ".lk-m p{margin:0 0 12px;color:var(--lk-muted)}.lk-r{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px 0;border-top:1px solid var(--lk-line)}" +
    ".lk-r small{display:block;color:var(--lk-muted);font-size:14px;line-height:20px}.lk-r input{width:24px;height:24px;flex:none;accent-color:var(--lk-brand)}" +
    ".lk-f{background:var(--lk-surface);border-top:1px solid var(--lk-line);color:var(--lk-muted);font-size:14px;line-height:20px;padding:48px 24px;text-align:center}" +
    ".lk-f strong{font-family:" + V.fontDisplay + ";font-weight:700;font-size:18px;line-height:24px;color:var(--lk-ink)}" +
    ".lk-f a{color:var(--lk-brand-text);margin:0 12px;text-decoration:underline}.lk-f p{margin:4px 0}" +
    ".lk-w{background:var(--lk-ink);color:var(--lk-surface);font:700 13px/16px sans-serif;padding:12px;text-align:center;position:sticky;top:0;z-index:100001}" +
    ".lk-doc{background:var(--lk-surface);max-width:820px;margin:0 auto;padding:64px 24px;font-size:16px;line-height:24px}" +
    ".lk-doc h1{font-family:" + V.fontEditorial + ";font-weight:400;font-size:40px;line-height:44px;margin:0 0 16px}" +
    ".lk-doc h2{font-family:" + V.fontDisplay + ";font-weight:700;font-size:28px;line-height:32px;margin:48px 0 12px}" +
    ".lk-doc table{border-collapse:separate;border-spacing:0;width:100%;font-size:14px;line-height:20px;background:var(--lk-raised);border:1px solid var(--lk-line);border-radius:" + V.radius + ";overflow:hidden}" +
    ".lk-doc td,.lk-doc th{border-bottom:1px solid var(--lk-line);padding:12px;text-align:left;vertical-align:top}.lk-doc th{font-weight:700;background:var(--lk-soft)}" +
    ".lk-doc tr:last-child td{border-bottom:0}.lk-doc em{color:var(--lk-muted)}" +
    "@media(max-width:600px){.lk-b{left:8px;right:8px;bottom:8px;padding:16px}.lk-btn{flex:1 1 100%}.lk-doc h1{font-size:32px;line-height:36px}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  function el(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }
  var banner, modal;
  function closeAll() { if (banner) banner.remove(); if (modal) modal.remove(); banner = modal = null; }

  function showBanner() {
    closeAll();
    banner = el('<div class="lk-b" role="dialog" aria-label="Cookie"><div class="lk-i"><div><p class="lk-t">I tuoi cookie, la tua scelta.</p><p>Usiamo cookie tecnici necessari. Quelli di statistica e marketing, anche di terze parti, solo se acconsenti. Puoi accettare, rifiutare o scegliere. Dettagli nella <a href="' + C.paths.cookie + '">Cookie Policy</a> e nella <a href="' + C.paths.privacy + '">Privacy Policy</a>. Se non scegli, restano attivi solo i cookie necessari.</p></div><div class="lk-a"><button class="lk-btn o" data-a="rej">Rifiuta tutti</button><button class="lk-btn o" data-a="cus">Personalizza</button><button class="lk-btn" data-a="acc">Accetta tutti</button></div></div></div>');
    banner.addEventListener("click", function (e) {
      var a = e.target.dataset.a; if (!a) return;
      if (a === "acc") { save({ analytics: 1, marketing: 1, preferences: 1 }); closeAll(); }
      if (a === "rej") { save({ analytics: 0, marketing: 0, preferences: 0 }); closeAll(); }
      if (a === "cus") showModal();
    });
    document.body.appendChild(banner);
  }

  function showModal() {
    var cur = (read() || {}).c || {};
    var rows = [["necessary", "Necessari", "Indispensabili al funzionamento del sito. Sempre attivi.", 1],
      ["analytics", "Statistiche", "Misurano in modo aggregato l'uso del sito.", cur.analytics],
      ["marketing", "Marketing", "Annunci personalizzati e misurazione campagne.", cur.marketing],
      ["preferences", "Preferenze", "Ricordano le tue scelte (lingua, ecc.).", cur.preferences]];
    modal = el('<div class="lk-ov"><div class="lk-m" role="dialog" aria-modal="true"><h3 class="lk-t">Le tue preferenze sui cookie.</h3><p>Scegli quali categorie autorizzare. Puoi cambiare idea in ogni momento dal link «Gestisci cookie» nel footer.</p>' +
      rows.map(function (r) { return '<label class="lk-r"><span><strong>' + r[1] + '</strong><small>' + r[2] + '</small></span><input type="checkbox" data-k="' + r[0] + '"' + (r[3] ? " checked" : "") + (r[0] === "necessary" ? " disabled" : "") + "></label>"; }).join("") +
      '<div class="lk-a" style="margin-top:16px"><button class="lk-btn o" data-a="rej">Rifiuta tutti</button><button class="lk-btn o" data-a="sel">Salva scelte</button><button class="lk-btn" data-a="acc">Accetta tutti</button></div></div></div>');
    modal.addEventListener("click", function (e) {
      var a = e.target.dataset.a; if (!a) return;
      var c = { analytics: 0, marketing: 0, preferences: 0 };
      if (a === "acc") CATS.forEach(function (k) { c[k] = 1; });
      if (a === "sel") modal.querySelectorAll("input[data-k]").forEach(function (i) { if (CATS.indexOf(i.dataset.k) > -1) c[i.dataset.k] = i.checked ? 1 : 0; });
      save(c); closeAll();
    });
    document.body.appendChild(modal);
  }
  window.LegalKit = { openPreferences: showModal, getConsent: function () { return (read() || {}).c || null; } };

  /* ---------- Footer legale (su ogni pagina) ---------- */
  function footer() {
    if (document.querySelector(".lk-f")) return;
    var l = [];
    l.push("<strong>" + esc(A.ragioneSociale) + "</strong>");
    l.push("Sede: " + esc(A.sede));
    var f = ["P.IVA " + esc(A.piva)];
    if (A.codiceFiscale && A.codiceFiscale !== A.piva) f.push("C.F. " + esc(A.codiceFiscale));
    if (A.rea) f.push("REA " + esc(A.rea));
    if (A.registroImprese) f.push("Reg. Imprese di " + esc(A.registroImprese));
    if (A.capitaleSociale) f.push("Capitale sociale € " + esc(A.capitaleSociale));
    if (A.socioUnico) f.push("Socio unico");
    if (A.inLiquidazione) f.push("In liquidazione");
    l.push(f.join(" · "));
    var c = []; if (A.pec) c.push("PEC: " + esc(A.pec)); if (A.email) c.push(esc(A.email)); if (A.telefono) c.push("Tel. " + esc(A.telefono)); if (A.sdi) c.push("SDI: " + esc(A.sdi));
    if (c.length) l.push(c.join(" · "));
    var links = '<a href="' + C.paths.privacy + '">Privacy Policy</a><a href="' + C.paths.cookie + '">Cookie Policy</a>' +
      (C.extraLinks || []).map(function (x) { return '<a href="' + esc(x.href) + '">' + esc(x.label) + "</a>"; }).join("") +
      '<a href="#" data-lk-open>Gestisci cookie</a>';
    var ft = el('<footer class="lk-f">' + l.map(function (x) { return "<p>" + x + "</p>"; }).join("") + "<p>" + links + "</p><p>© " + new Date().getFullYear() + " " + esc(A.ragioneSociale) + " – Tutti i diritti riservati</p></footer>");
    document.body.appendChild(ft);
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-lk-open]"); if (t) { e.preventDefault(); showModal(); }
  });

  /* ---------- Pagine policy: <div id="legal-doc" data-doc="privacy|cookie"></div> ---------- */
  function renderDoc() {
    var host = document.getElementById("legal-doc"); if (!host) return;
    var d = host.dataset.doc, t = P.trattamenti, h = "";
    var tit = esc(A.ragioneSociale), sede = esc(A.sede);
    if (d === "privacy") {
      document.title = "Privacy Policy – " + A.ragioneSociale;
      h += "<h1>Informativa sulla privacy</h1><p><em>Ai sensi degli artt. 13-14 del Regolamento UE 2016/679 (GDPR). Ultimo aggiornamento: " + esc(P.ultimoAggiornamento) + "</em></p>";
      h += "<h2>1. Titolare del trattamento</h2><p>" + tit + ", " + sede + ", P.IVA " + esc(A.piva) + ", PEC " + esc(A.pec) + ", e-mail privacy: <a href='mailto:" + esc(P.emailPrivacy) + "'>" + esc(P.emailPrivacy) + "</a>." + (P.dpo ? " Responsabile della protezione dei dati (DPO): " + esc(P.dpo) + "." : "") + "</p>";
      h += "<h2>2. Dati trattati, finalità e basi giuridiche</h2><table><tr><th>Finalità</th><th>Dati</th><th>Base giuridica</th><th>Conservazione</th></tr>";
      h += "<tr><td>Navigazione e sicurezza del sito</td><td>IP, log tecnici</td><td>Legittimo interesse (art. 6.1.f)</td><td>Max 12 mesi</td></tr>";
      if (t.formContatto) h += "<tr><td>Rispondere alle richieste inviate tramite form</td><td>Nome, e-mail, telefono, messaggio</td><td>Misure precontrattuali / richiesta dell'interessato (art. 6.1.b)</td><td>Il tempo necessario a rispondere, poi max 24 mesi</td></tr>";
      if (t.newsletter) h += "<tr><td>Invio newsletter e comunicazioni commerciali</td><td>Nome, e-mail</td><td>Consenso (art. 6.1.a), revocabile in ogni momento</td><td>Fino a revoca</td></tr>";
      if (t.ecommerce) h += "<tr><td>Gestione ordini, pagamenti e spedizioni</td><td>Dati anagrafici, indirizzo, ordine</td><td>Contratto (art. 6.1.b) e obbligo di legge (art. 6.1.c)</td><td>10 anni (obblighi fiscali)</td></tr>";
      if (t.prenotazioni) h += "<tr><td>Gestione prenotazioni/appuntamenti</td><td>Dati anagrafici e di contatto</td><td>Contratto (art. 6.1.b)</td><td>Durata del rapporto + 24 mesi</td></tr>";
      h += "<tr><td>Cookie di statistica e marketing</td><td>Identificativi online</td><td>Consenso (art. 6.1.a)</td><td>Vedi <a href='" + C.paths.cookie + "'>Cookie Policy</a></td></tr></table>";
      h += "<h2>3. Natura del conferimento</h2><p>Il conferimento dei dati contrassegnati come obbligatori nei moduli è necessario per rispondere alla richiesta; in difetto non potremo dar seguito alla stessa.</p>";
      var X = C.tecnica || {}; var tec = [];
      if (X.datiForm) tec.push("Dati raccolti dai moduli: " + esc(X.datiForm) + ".");
      if (X.destinazioneDati) tec.push("Destinazione e conservazione: " + esc(X.destinazioneDati) + ".");
      if (X.toolForm) tec.push("Strumento per moduli/newsletter: " + esc(X.toolForm) + ".");
      if (X.hosting) tec.push("Hosting: " + esc(X.hosting) + (X.paeseServer ? " (server: " + esc(X.paeseServer) + ")" : "") + ".");
      if (X.pagamenti) tec.push("Pagamenti: " + esc(X.pagamenti) + ".");
      h += "<h2>4. Destinatari</h2>" + (tec.length ? "<p>" + tec.join(" ") + "</p>" : "") + "<p>I dati possono essere trattati da fornitori che agiscono come responsabili del trattamento (hosting, gestione sito, CRM, e-mail, consulenti IT e fiscali) e da autorità se previsto dalla legge. I dati non sono diffusi né venduti.</p>";
      h += "<h2>5. Trasferimenti extra-UE</h2><p>" + (P.trasferimentoExtraUE ? "Alcuni fornitori (es. Google, Meta) possono trattare dati in Paesi extra-UE, in particolare USA. Il trasferimento avviene sulla base della decisione di adeguatezza della Commissione UE (EU-US Data Privacy Framework) o di Clausole Contrattuali Standard." : "I dati non sono trasferiti fuori dallo Spazio Economico Europeo.") + "</p>";
      h += "<h2>6. Diritti dell'interessato</h2><p>Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità, opposizione al trattamento e revocare il consenso (senza pregiudicare la liceità del trattamento precedente) scrivendo a <a href='mailto:" + esc(P.emailPrivacy) + "'>" + esc(P.emailPrivacy) + "</a>. Hai diritto di proporre reclamo al Garante per la protezione dei dati personali (<a href='https://www.garanteprivacy.it'>garanteprivacy.it</a>).</p>";
      h += "<h2>7. Cookie</h2><p>Consulta la <a href='" + C.paths.cookie + "'>Cookie Policy</a>. Puoi modificare le scelte in ogni momento: <a href='#' data-lk-open>gestisci cookie</a>.</p>";
      h += "<h2>8. Minori</h2><p>Il sito non è rivolto a minori di 14 anni e non ne raccoglie consapevolmente i dati.</p>";
    }
    if (d === "cookie") {
      document.title = "Cookie Policy – " + A.ragioneSociale;
      h += "<h1>Cookie Policy</h1><p><em>Ultimo aggiornamento: " + esc(P.ultimoAggiornamento) + "</em></p>";
      h += "<p>Titolare: " + tit + ", " + sede + ". I cookie sono piccoli file di testo salvati sul tuo dispositivo. Questo sito usa cookie tecnici (sempre attivi) e, solo con il tuo consenso, cookie analitici e di marketing, anche di terze parti.</p>";
      h += "<h2>Cookie tecnici</h2><p>Necessari al funzionamento del sito e a memorizzare le tue scelte sui cookie (non richiedono consenso, art. 122 Codice Privacy).</p>";
      h += "<h2>Cookie soggetti a consenso</h2><table><tr><th>Servizio</th><th>Categoria</th><th>Fornitore</th><th>Finalità</th><th>Durata</th><th>Informativa</th></tr>" +
        C.servizi.map(function (s) { return "<tr><td>" + esc(s.nome) + "</td><td>" + esc(s.categoria) + "</td><td>" + esc(s.fornitore) + "</td><td>" + esc(s.finalita) + "</td><td>" + esc(s.durata) + "</td><td><a href='" + esc(s.privacyUrl) + "' rel='noopener'>link</a></td></tr>"; }).join("") + "</table>";
      h += "<h2>Gestire il consenso</h2><p><a href='#' data-lk-open>Apri le preferenze cookie</a> per modificare o revocare il consenso in qualsiasi momento. Il consenso è richiesto nuovamente dopo " + Math.round(C.consentDurationDays / 30) + " mesi. Puoi inoltre bloccare i cookie dalle impostazioni del browser (Chrome, Firefox, Safari, Edge).</p>";
      h += "<p>Per i diritti sui tuoi dati vedi la <a href='" + C.paths.privacy + "'>Privacy Policy</a>.</p>";
    }
    host.className = "lk-doc"; host.innerHTML = h;
  }

  function init() {
    if (/^0+$/.test(A.piva) || /NOME SRL|dominio\.it/.test(A.ragioneSociale + A.email + P.emailPrivacy)) {
      var w = el('<div class="lk-w">Dati di esempio nel file legal-config.js. Compila i dati del cliente prima di pubblicare</div>');
      document.body.insertBefore(w, document.body.firstChild);
    }
    footer(); renderDoc();
    var v = read();
    if (v) apply(v.c); else showBanner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
