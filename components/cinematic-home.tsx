"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownIcon, ArrowUpRightIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";

const WHATSAPP_NUMBER = "5531988624168";
const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Coronel do Corte e gostaria de agendar um horário.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function BrandLogo({ large = false }: { large?: boolean }) {
  return (
    <Image
      className={`brand-logo${large ? " brand-logo--large" : ""}`}
      src="/images/logo-coronel.png"
      width={880}
      height={820}
      alt="Coronel do Corte"
      priority={large}
    />
  );
}

export function CinematicHome({ sections }: { sections: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const floatingActionCheck = useRef<() => void>(() => {});
  const introStarted = useRef(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButton.current?.focus();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const scope = root.current;
    const floatingAction = scope?.querySelector<HTMLElement>(".whatsapp-float");
    if (!scope || !floatingAction) return;

    const collisionTargets =
      "a:not(.whatsapp-float), button, .hero__title, .hero__copy, .hero__qualities-copy, .hero__photo-note, h2, h3, p, address";
    const updateCollision = () => {
      const actionRect = floatingAction.getBoundingClientRect();
      const blocked = Array.from(scope.querySelectorAll<HTMLElement>(collisionTargets)).some((target) => {
        const style = window.getComputedStyle(target);
        if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < 0.12) return false;
        const rect = target.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 &&
          rect.right > actionRect.left && rect.left < actionRect.right &&
          rect.bottom > actionRect.top && rect.top < actionRect.bottom;
      });

      floatingAction.classList.toggle("is-obscured", blocked);
    };

    floatingActionCheck.current = updateCollision;
    updateCollision();
    window.addEventListener("scroll", updateCollision, { passive: true });
    window.addEventListener("resize", updateCollision);

    return () => {
      floatingActionCheck.current = () => {};
      window.removeEventListener("scroll", updateCollision);
      window.removeEventListener("resize", updateCollision);
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scope = root.current;
    const intro = scope?.querySelector<HTMLElement>(".intro");

    if (!scope || !intro) {
      setIntroVisible(false);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set([".site-header", ".hero__eyebrow", ".hero__title", ".hero__copy", ".hero__actions", ".hero__foot", ".hero__image"], {
        autoAlpha: 1,
        y: 0,
      });
      setIntroVisible(false);
      return;
    }

    let frameId = 0;
    let disposed = false;
    let introFinished = false;
    let animationContext: gsap.Context | undefined;
    let responsiveMotion: gsap.MatchMedia | undefined;

    animationContext = gsap.context(() => {
      gsap.set(".intro__halo", { scale: 0.28, autoAlpha: 0 });
      gsap.set(".intro__mark", { autoAlpha: 0, scale: 0.88, y: 9 });
      gsap.set(".intro__descriptor", { autoAlpha: 0, y: 8 });
      gsap.set(".intro__rule", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".intro__grain", { autoAlpha: 0.08 });
      gsap.set(".site-header", { autoAlpha: 0, y: -14 });
      gsap.set(".hero__eyebrow", { autoAlpha: 0, y: 14 });
      gsap.set(".hero__title", { autoAlpha: 0, y: 24 });
      gsap.set(".hero__copy, .hero__actions, .hero__foot", { autoAlpha: 0, y: 15 });

      // React Strict Mode cancels this frame during its development-only
      // setup/cleanup probe, so only the committed setup starts the timeline.
      frameId = requestAnimationFrame(() => {
        if (disposed || introStarted.current) return;

        introStarted.current = true;
        const isMobile = window.matchMedia("(max-width: 640px)").matches;
        animationContext?.add(() => {
          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
              introFinished = true;
              if (!disposed) {
                floatingActionCheck.current();
                setIntroVisible(false);
              }
            },
          });
          if (isMobile) timeline.timeScale(1.12);

          timeline
            .fromTo(".intro__halo", { scale: 0.28, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8 })
            .fromTo(".intro__mark", { autoAlpha: 0, scale: 0.88, y: 9 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.65 }, "-=0.36")
            .fromTo(".intro__descriptor", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.2")
            .fromTo(".intro__rule", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, "-=0.08")
            .to(".intro__rule", { xPercent: 115, duration: 0.48, ease: "power2.in" }, "+=0.08")
            .to(intro, { autoAlpha: 0, duration: 0.52, ease: "power2.inOut" }, "-=0.1")
            .fromTo(".site-header", { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.28")
            .fromTo(".hero__eyebrow", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.2")
            .fromTo(".hero__title", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3")
            .fromTo(".hero__copy, .hero__actions, .hero__foot", { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.34");

          gsap.fromTo(
            ".hero__image",
            { scale: 1.06 },
            { scale: 1, duration: 1.8, ease: "power2.out", delay: 0.15 },
          );

          gsap.fromTo(
            ".intro__grain",
            { autoAlpha: 0.08 },
            { autoAlpha: 0.18, duration: 0.7, yoyo: true, repeat: 1, ease: "sine.inOut" },
          );

          responsiveMotion = gsap.matchMedia(scope);
          responsiveMotion.add(
            { isMobile: "(max-width: 640px)", isDesktop: "(min-width: 641px)" },
            ({ conditions }) => {
              const compact = Boolean(conditions?.isMobile);
              if (!compact) {
                gsap.to(".hero__image", {
                  yPercent: 7,
                  ease: "none",
                  scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.7 },
                });
              }

              gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((element) => {
                gsap.fromTo(
                  element,
                  { autoAlpha: 0, y: compact ? 14 : 26 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: compact ? 0.58 : 0.8,
                    ease: "power3.out",
                    scrollTrigger: { trigger: element, start: "top 84%", once: true },
                  },
                );
              });

              gsap.fromTo(
                ".monthly-section__glow",
                { autoAlpha: compact ? 0.55 : 0.48, scale: compact ? 0.98 : 0.94 },
                {
                  autoAlpha: compact ? 0.82 : 0.9,
                  scale: compact ? 1.02 : 1.04,
                  duration: compact ? 0.7 : undefined,
                  ease: compact ? "power2.out" : "none",
                  scrollTrigger: compact
                    ? { trigger: ".monthly-section", start: "top 82%", once: true }
                    : { trigger: ".monthly-section", start: "top bottom", end: "bottom top", scrub: 1 },
                },
              );

              if (!compact) {
                gsap.fromTo(
                  ".monthly-section__photo",
                  { scale: 1.06 },
                  {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: { trigger: ".monthly-section__visual", start: "top bottom", end: "bottom top", scrub: 1 },
                  },
                );
              }
            },
          );
        });
      });
    }, scope);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      if (!introFinished) introStarted.current = false;
      responsiveMotion?.revert();
      animationContext?.revert();
    };
  }, []);

  return (
    <main ref={root}>
      {introVisible && (
        <div className="intro" aria-hidden="true">
          <div className="intro__halo" />
          <div className="intro__grain" />
          <div className="intro__lockup">
            <div className="intro__mark"><BrandLogo large /></div>
            <span className="intro__rule" />
            <p className="intro__descriptor">RIBEIRÃO DAS NEVES · MG</p>
          </div>
        </div>
      )}

      <header className="site-header">
        <a className="site-header__brand" href="#inicio" aria-label="Coronel do Corte, início">
          <BrandLogo />
          <span className="site-header__name">CORONEL <span>DO</span> CORTE</span>
        </a>
        <button
          ref={menuButton}
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <nav id="primary-navigation" className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Navegação principal">
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
          <a href="#conceito" onClick={() => setMenuOpen(false)}>A barbearia</a>
          <a href="#mensal" onClick={() => setMenuOpen(false)}>Plano mensal</a>
          <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="#localizacao" onClick={() => setMenuOpen(false)}>Localização</a>
          <a href="https://www.instagram.com/coroneldocorte_/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}><InstagramIcon className="site-nav__instagram" />Instagram <ArrowUpRightIcon className="site-nav__arrow" /></a>
          <a className="site-nav__booking" href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Agendar horário <ArrowUpRightIcon className="site-nav__booking-icon" /></a>
        </nav>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero__image" role="img" aria-label="Barbeiro trabalhando em um corte masculino degradê" />
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="hero__eyebrow"><span /> RIBEIRÃO DAS NEVES · MG</p>
          <h1 className="hero__title" id="hero-title">SEU ESTILO.<br /><span className="hero__identity">SUA <em>IDENTIDADE.</em></span></h1>
          <p className="hero__copy">Mais que um corte, uma experiência.</p>
          <div className="hero__actions">
            <a className="button button--gold" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Agendar horário <ArrowUpRightIcon className="button__arrow" />
            </a>
            <a className="hero__secondary" href="#conceito">Conhecer a barbearia <ArrowDownIcon className="hero__secondary-icon" /></a>
          </div>
        </div>
        <div className="hero__foot">
          <span className="hero__qualities">
            <span className="hero__pin" />
            <span className="hero__qualities-copy">AVENIDA JOÃO LUIZ PINTO, 691 · RIBEIRÃO DAS NEVES – MG · CEP 32150-340</span>
          </span>
          <span className="hero__scroll">DESLIZE PARA EXPLORAR <ArrowDownIcon className="hero__scroll-icon" /></span>
          <a href="https://www.instagram.com/coroneldocorte_/" target="_blank" rel="noreferrer"><InstagramIcon className="hero__instagram-icon" />@CORONELDOCORTE_ <ArrowUpRightIcon className="hero__external-icon" /></a>
        </div>
        <p className="hero__photo-note">IMAGEM ILUSTRATIVA · UNSPLASH</p>
      </section>

      {sections}

      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Agendar pelo WhatsApp">
        <WhatsAppIcon className="whatsapp-float__icon" />
      </a>
    </main>
  );
}
