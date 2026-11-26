const address = "Avenida João Luiz Pinto, 691, Ribeirão das Neves - MG, CEP 32150-340";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const whatsappUrl = "https://wa.me/5531988624168";
const instagramUrl = "https://www.instagram.com/coroneldocorte_/";

const openingHours = [
  { day: "Segunda-feira", hours: "09h às 19h" },
  { day: "Terça-feira", hours: "09h às 19h" },
  { day: "Quarta-feira", hours: "09h às 19h" },
  { day: "Quinta-feira", hours: "09h às 19h" },
  { day: "Sexta-feira", hours: "09h às 19h" },
  { day: "Sábado", hours: "09h às 20h" },
  { day: "Domingo", hours: "Fechado", closed: true },
];

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

export function LocationSection() {
  return (
    <section className="location-section" id="localizacao" aria-labelledby="location-title">
      <div className="location-section__inner">
        <div className="location-card location-card--address scroll-reveal">
          <p className="section-kicker"><span /> ENCONTRE A CORONEL</p>
          <h2 className="location-card__title" id="location-title">VISITE A<br /><em>CORONEL.</em></h2>

          <div className="location-card__address">
            <span className="location-card__icon"><LocationPinIcon /></span>
            <address>
              Avenida João Luiz Pinto, 691<br />
              Ribeirão das Neves - MG<br />
              CEP 32150-340
            </address>
          </div>

          <a className="location-card__map-button" href={mapsUrl} target="_blank" rel="noreferrer">
            COMO CHEGAR <span aria-hidden="true">↗</span>
          </a>

          <div className="location-card__contacts" aria-label="Canais de contato">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <span>WHATSAPP</span>
              <strong>(31) 98862-4168</strong>
              <i aria-hidden="true">↗</i>
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              <span>INSTAGRAM</span>
              <strong>@coroneldocorte_</strong>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </div>

        <div className="location-card location-card--hours scroll-reveal">
          <p className="section-kicker"><span /> HORÁRIO DE FUNCIONAMENTO</p>
          <h3 className="location-card__hours-title">Quando nos<br /><em>encontrar.</em></h3>
          <span className="location-card__hours-icon"><ClockIcon /></span>
          <ul className="opening-hours">
            {openingHours.map(({ day, hours, closed }) => (
              <li className={closed ? "is-closed" : undefined} key={day}>
                <span>{day}</span>
                <strong>{hours}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
