import Image from "next/image";

const highlights = [
  "Cortes modernos",
  "Barba alinhada",
  "Ambiente premium",
  "Atendimento de qualidade",
];

export function ExperienceSection() {
  return (
    <section className="experience-section" id="conceito" aria-labelledby="experience-title">
      <div className="experience-section__inner">
        <figure className="experience-section__visual scroll-reveal">
          <Image
            className="experience-section__image"
            src="/images/experience-barbershop.webp"
            alt="Fotografia ilustrativa de uma barbearia com cadeiras de barbeiro"
            fill
            sizes="(max-width: 700px) 100vw, 52vw"
          />
          <span className="experience-section__image-shade" aria-hidden="true" />
          <figcaption className="experience-section__caption">
            <span /> IMAGEM ILUSTRATIVA · UNSPLASH
          </figcaption>
          <span className="experience-section__visual-index" aria-hidden="true">01 <i /> 04</span>
        </figure>

        <div className="experience-section__content scroll-reveal">
          <p className="section-kicker"><span /> A EXPERIÊNCIA CORONEL</p>
          <h2 className="experience-section__title" id="experience-title">
            MAIS QUE UMA<br />BARBEARIA.<br /><em>UMA EXPERIÊNCIA.</em>
          </h2>
          <p className="experience-section__copy">
            Na Coronel do Corte, estilo e personalidade caminham juntos. Cada detalhe importa para entregar uma experiência que valoriza sua melhor versão.
          </p>

          <ul className="experience-section__highlights" aria-label="Destaques da experiência Coronel">
            {highlights.map((highlight, index) => (
              <li key={highlight}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
