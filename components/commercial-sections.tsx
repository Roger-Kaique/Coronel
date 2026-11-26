import Image from "next/image";
import { serviceCategories } from "@/data/services";
import { ArrowUpRightIcon, SparkleIcon, WhatsAppIcon } from "@/components/icons";

const WHATSAPP_NUMBER = "5531988624168";
const MONTHLY_MESSAGE =
  "Olá! Vim pelo site da Coronel do Corte e gostaria de saber mais sobre o plano mensal.";

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
                <SparkleIcon className="monthly-card__ornament" />
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
                QUERO MEU MENSAL <ArrowUpRightIcon className="monthly-card__arrow" />
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
                <SparkleIcon className="service-category__mark" />
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
