/* shared UI behaviour */

/* ---- mobile nav ---- */
const burger = document.getElementById("burger");
if (burger) {
  burger.addEventListener("click", () => document.getElementById("nav").classList.toggle("open"));
}

/* ---- highlight today's opening hours + open/closed pill ---- */
(function () {
  const table = document.getElementById("hours");
  const now = new Date();
  const day = now.getDay();
  if (table) {
    const row = table.querySelector('tr[data-day="' + day + '"]');
    if (row) row.classList.add("today");
  }
  const pill = document.getElementById("openNow");
  if (pill) {
    const mins = now.getHours() * 60 + now.getMinutes();
    let open = false, closes = "18:00";
    if (day >= 1 && day <= 5) { open = mins >= 480 && mins < 1080; }
    else if (day === 6) { open = mins >= 510 && mins < 780; closes = "13:00"; }
    pill.innerHTML = open
      ? '<i></i> Open today until ' + closes
      : '<i style="background:#D33F2C;box-shadow:0 0 0 3px rgba(211,63,44,.2)"></i> Closed now — leave us a WhatsApp';
    if (!open) pill.style.color = "#F0705C";
  }
})();

/* ---- reveal on scroll ---- */
(function () {
  const items = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window)) {
    items.forEach(i => i.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(i => io.observe(i));
})();

/* ---- car card markup, shared by home + listing ---- */
function carCard(c) {
  const enquire = "Hi, I'm interested in the " + c.year + " " + c.make + " " + c.model + " " + c.trim + " at " + money(c.price) + ".";
  return `
  <article class="car${c.sold ? " sold" : ""}">
    <a class="shot" href="car.html?id=${c.id}">
      <img src="assets/img/${c.photos[0]}" alt="${c.year} ${c.make} ${c.model} ${c.trim}" loading="lazy">
      <span class="price-tag">${money(c.price)}</span>
      <span class="shot-count">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="15" rx="2"/><circle cx="12" cy="12" r="3.5"/></svg>
        ${c.photos.length}
      </span>
      ${c.sold ? '<span class="sold-band"><b>Sold</b></span>' : ""}
    </a>
    <div class="body">
      <h3><a href="car.html?id=${c.id}">${c.make} ${c.model}</a></h3>
      <div class="trim">${c.trim} · ${c.year}</div>
      <div class="spec-chips">
        <span>${miles(c.mileage)}</span>
        <span>${c.engine}</span>
        <span>${c.gearbox}</span>
        <span>${c.fuel}</span>
      </div>
      <div class="mot">MOT until <b>${c.mot}</b> · ${c.history}</div>
      <div class="acts">
        ${c.sold
          ? `<a class="btn btn--ghost btn--block" href="cars.html">See similar stock</a>`
          : `<a class="btn" href="tel:01632960118">Enquire / Call</a>
             <a class="btn btn--wa" href="https://wa.me/447700900118?text=${encodeURIComponent(enquire)}" target="_blank" rel="noopener">
               <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.9-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3.1-1.3-5.1-4.4-5.3-4.6-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5l1 2.4c.1.2.1.4 0 .6l-.4.5-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2.2 1c.3.2.5.2.5.4.1.1.1.6-.1 1.3Z"/></svg>
               WhatsApp
             </a>`}
      </div>
    </div>
  </article>`;
}
