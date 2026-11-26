import Image from "next/image";
import { serviceCategories } from "@/data/services";

const WHATSAPP_NUMBER = "5531988624168";
const MONTHLY_MESSAGE =
  "Olá! Vim pelo site da Coronel do Corte e gostaria de saber mais sobre o plano mensal.";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 2 17.7L.5 23.5l6-1.6a11.8 11.8 0 0 0 14-18.4ZM12 21a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.5.9.9-3.4-.2-.4A9.8 9.8 0 1 1 12 21Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2c-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2.1-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5H7.4c-.3 0-.6.1-.9.4-1 1-1.4 2.2-.8 3.7 1.5 3.8 4.3 6.2 8.3 7.5 2.2.7 3.7.6 5-.1.7-.5 1.2-1.5 1.4-2.1.2-.6.2-1.1.1-1.2s-.3-.3-.6-.4Z" />
    </svg>
  );
}

function AppointmentLink({ serviceName }: { serviceName: string }) {
  const message = `Olá! Gostaria de agendar o serviço de ${serviceName} na Coronel do Corte.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a className="service-item__book" href={url} target="_blank" rel="noreferrer">
      Agendar pelo WhatsApp <WhatsAppIcon />
    </a>
  );
}

export function CommercialSections() {
  const monthlyUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MONTHLY_MESSAGE)}`;

  return (
    <>
      <section className="monthly-section" id="mensal" aria-labelledby="monthly-title">
        <div className="monthly-section__glow" aria-hidden="true" />
        <div className="monthly-section__inner">
          <div className="monthly-section__visual scroll-reveal">
            <Image
              className="monthly-section__photo"
              src="/images/monthly-barbershop.webp"
              alt="Imagem ilustrativa do interior de uma barbearia"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="monthly-section__visual-shade" />
            <div className="monthly-section__visual-caption">
              <span className="monthly-section__caption-line" />
              <span>UM RITUAL, SEMPRE EM DIA</span>
            </div>
            <span className="monthly-section__photo-credit">IMAGEM ILUSTRATIVA · UNSPLASH</span>
          </div>

          <div className="monthly-section__content scroll-reveal">
            <p className="section-kicker"><span /> EXCLUSIVO CORONEL</p>
            <h2 className="monthly-section__title" id="monthly-title">SEU ESTILO<br />NÃO TIRA <em>FÉRIAS.</em></h2>
            <p className="monthly-section__intro">Tenha seu visual sempre em dia com o plano mensal exclusivo Coronel.</p>

            <div className="monthly-card">
              <div className="monthly-card__topline">
                <span>PLANO</span>
                <span className="monthly-card__ornament" aria-hidden="true">✳</span>
                <span>01 / CORONEL</span>
              </div>
              <h3 className="monthly-card__name">Mensal Coronel</h3>
              <p className="monthly-card__price"><span>R$</span> 150<sup>,00</sup><small> / mês</small></p>
              <div className="monthly-card__divider" />
              <div className="monthly-card__benefit">
                <span className="monthly-card__benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.2 4.2L19.5 6.8" /><circle cx="12" cy="12" r="9.2" /></svg>
                </span>
                <span><strong>Cortes ilimitados</strong><small>De segunda a sexta-feira</small></span>
              </div>
              <a className="monthly-card__button" href={monthlyUrl} target="_blank" rel="noreferrer">
                QUERO MEU MENSAL <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="servicos" aria-labelledby="services-title">
        <div className="services-section__heading scroll-reveal">
          <p className="section-kicker"><span /> O QUE FAZEMOS</p>
          <h2 id="services-title">NOSSOS <em>SERVIÇOS</em></h2>
          <p>Precisão em cada detalhe. Qualidade em cada experiência.</p>
        </div>

        <div className="services-section__categories">
          {serviceCategories.map((category, index) => (
            <article className="service-category scroll-reveal" id={`servicos-${category.id}`} key={category.id}>
              <div className="service-category__heading">
                <span className="service-category__index">0{index + 1}</span>
                <h3>{category.name}</h3>
                <span className="service-category__rule" />
                <span className="service-category__mark" aria-hidden="true">✳</span>
              </div>

              {category.services.length ? (
                <ul className="service-category__list">
                  {category.services.map((service) => (
                    <li className="service-item" key={service.id}>
                      <div className="service-item__details">
                        <h4>{service.name}</h4>
                      </div>
                      <p className="service-item__price">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(service.price)}
                      </p>
                      <AppointmentLink serviceName={service.name} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
