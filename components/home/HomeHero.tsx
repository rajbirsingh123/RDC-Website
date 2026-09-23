"use client";

import Link from "next/link";
import { useRef } from "react";
import { T, THtml } from "@/lib/i18n/T";
import { useHeroParallax, useHeroPointerMotion } from "@/hooks/useHeroMotion";
import { useHeroVideoAutoplay } from "@/hooks/useHeroVideoAutoplay";
import { HeroLogoStory } from "@/components/mortgages/HeroBlueprintScene";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useHeroParallax(heroRef);
  useHeroPointerMotion(heroRef);
  useHeroVideoAutoplay(videoRef);

  return (
    <section className="hero-section hero-section--video" ref={heroRef}>
      <video
        className="hero-bg-video"
        poster="/assets/hero-toronto-skyline-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        ref={videoRef}
      >
        <source src="/assets/hero-toronto-skyline.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="container-xl">
        <div className="row align-items-center g-5">
          <div className="col-lg-7 hero-copy">
            <h1>
              <THtml k="home_hero_title" html="Better Rates. Faster Approvals. <span>Real Results.</span>" />
            </h1>
            <p className="hero-lead">
              <T k="home_hero_lead">
                Royal Den Capital compares Canada&apos;s top lenders so you get the right mortgage, without the
                runaround for home buyers, renewals, refinancing, and business financing.
              </T>
            </p>
          </div>
          <div className="col-lg-5">
            <div className="hero-side">
              <h2 className="hero-side-heading">
                <T k="home_hero_why_rdc">Why RDC?</T>
              </h2>
              <div className="hero-points" aria-label="Royal Den Capital benefits">
                <span>
                  <i className="bi bi-check-circle-fill" /> <span><T k="home_hero_point1">25+ years of experience</T></span>
                </span>
                <span>
                  <i className="bi bi-check-circle-fill" /> <span><T k="home_hero_point2">Access to more lenders</T></span>
                </span>
                <span>
                  <i className="bi bi-check-circle-fill" /> <span><T k="home_hero_point3">Competitive rate options</T></span>
                </span>
                <span>
                  <i className="bi bi-check-circle-fill" /> <span><T k="home_hero_point4">Custom approval strategies</T></span>
                </span>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <Link className="btn btn-gold" href="/apply/">
                  <i className="bi bi-chat-dots-fill" /> <span><T k="common_nav_lets_talk">Let&apos;s Talk</T></span>
                </Link>
                <Link className="btn btn-gold" href="/mortgages/mortgage-renewal/">
                  <i className="bi bi-arrow-repeat" /> <span><T k="home_hero_renewing">I&apos;m renewing / refinancing</T></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeroLogoStory logoSrc="/assets/rdc-logo.png" />
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,32 C240,80 480,0 720,24 C960,48 1200,88 1440,40 L1440,80 L0,80 Z" fill="#f4f7fb" />
        </svg>
      </div>
    </section>
  );
}
