const heroDynamic = document.querySelector(".hero-dynamic");
const heroPrefix = document.querySelector("[data-hero-heading-prefix]");
const heroSuffix = document.querySelector("[data-hero-heading-suffix]");
const heroLede = document.querySelector("[data-hero-lede]");
const heroMetaContainer = document.querySelector("[data-hero-meta]");
const serviceCards = document.querySelectorAll("[data-service-card]");
const processSteps = document.querySelectorAll("[data-process-step]");
const metricCards = document.querySelectorAll("[data-metric]");
const caseCards = document.querySelectorAll("[data-case-card]");
const ctaHeading = document.querySelector("[data-cta-heading]");
const ctaBody = document.querySelector("[data-cta-body]");
const ctaPrimaryAction = document.querySelector("[data-cta-action-primary]");
const ctaSecondaryAction = document.querySelector("[data-cta-action-secondary]");

const defaultLandingData = {
  hero: {
    headingPrefix: "Exclusive Brands & Models",
    headingSuffix: "Explore Our Most Advanced Robots at RoboCollective.ai",
    lede:
      "Buy robots for sale from trusted makers worldwide – delivered, professionally set up, and fully supported wherever you are. Explore industrial, service, and educational robots all in one place at RoboCollective.ai",
  },
  services: [
    {
      title: "Intelligent automation",
      description:
        "Design, launch, and monitor AI agents that augment your existing platforms without compromising compliance.",
    },
    {
      title: "Data storytelling",
      description:
        "Translate complex signals into narratives that keep product, marketing, and ops aligned on next steps.",
    },
    {
      title: "Operational UX",
      description:
        "Architect human-centered dashboards, notifications, and playbooks for faster alignment during critical launches.",
    },
  ],
  process: [
    {
      title: "Immersion",
      description:
        "We shadow your teams, catalog signals, and map outcomes before proposing workflows.",
    },
    {
      title: "System design",
      description:
        "Our architects build automation blueprints, integration fabrics, and measurement suites.",
    },
    {
      title: "Launch + learn",
      description:
        "We ship targeted experiences, monitor results, and evolve the systems with your team.",
    },
  ],
  metrics: [
    { value: "3.2x", description: "More runbooks automated within three months" },
    { value: "94%", description: "Stakeholder confidence after first sprint" },
    { value: "48", description: "Dashboards kept in sync with live AI insights" },
  ],
  cases: [
    {
      title: "Launch intelligence for a new AI product",
      body: "United product/ops teams around shared North Stars, built predictive routing for feedback, and launched a self-service control tower.",
      highlight: false,
    },
    {
      title: "Automation for global research",
      body: "Scaled collaboration across continents by automating status capture, knowledge transfer, and insights distribution.",
      highlight: true,
    },
    {
      title: "Operations pulse for fintech teams",
      body: "Crafted a resilient operating system that respects controls while enabling creative sprints across product squads.",
      highlight: false,
    },
  ],
  cta: {
    heading: "RoboCollective.ai is your strategic partner in AI-driven operations.",
    body: "Share your most strategic ambition, and we'll co-create a roadmap that combines automation, intelligence, and creative rigor.",
    primaryLabel: "Go to Shop",
    primaryUrl: "robocollective.ai/shop",
    secondaryLabel: "Contact Us",
    secondaryUrl: "Form",
  },
};

let heroPhrases = [];
let heroPhraseIndex = 0;

const setHeroDynamicWords = (words = []) => {
  const filtered = Array.isArray(words) ? words.filter(Boolean) : [];
  if (!filtered.length) {
    return;
  }
  heroPhrases = filtered;
  heroPhraseIndex = 0;
  if (heroDynamic) {
    heroDynamic.textContent = heroPhrases[0];
  }
};

const rotateHeroPhrase = () => {
  if (!heroDynamic || !heroPhrases.length) {
    return;
  }
  heroPhraseIndex = (heroPhraseIndex + 1) % heroPhrases.length;
  heroDynamic.textContent = heroPhrases[heroPhraseIndex];
};

const buildHeroMetaMarkup = (entries = []) =>
  entries
    .map((entry, index) => {
      const divider =
        index < entries.length - 1 ? '<div class="hero-meta-divider"></div>' : "";
      return `<span>${entry}</span>${divider}`;
    })
    .join("");

const applyLandingData = (landing = defaultLandingData) => {
  const hero = landing.hero || defaultLandingData.hero;
  if (heroPrefix && hero.headingPrefix) {
    heroPrefix.textContent = hero.headingPrefix;
  }
  if (heroSuffix && hero.headingSuffix) {
    heroSuffix.textContent = hero.headingSuffix;
  }
  if (heroLede && hero.lede) {
    heroLede.textContent = hero.lede;
  }

  const metaEntries =
    hero.meta?.length > 0 ? hero.meta : defaultLandingData.hero.meta;
  if (heroMetaContainer) {
    heroMetaContainer.innerHTML = buildHeroMetaMarkup(metaEntries);
  }

  const dynamicWords =
    hero.dynamicWords?.length > 0
      ? hero.dynamicWords
      : defaultLandingData.hero.dynamicWords;
  setHeroDynamicWords(dynamicWords);

  const services = landing.services ?? defaultLandingData.services;
  serviceCards.forEach((card, index) => {
    const payload = services[index] ?? defaultLandingData.services[index];
    if (!payload) {
      return;
    }
    const title = card.querySelector("h3");
    const description = card.querySelector("p");
    if (title && payload.title) {
      title.textContent = payload.title;
    }
    if (description && payload.description) {
      description.textContent = payload.description;
    }
  });

  const processData = landing.process ?? defaultLandingData.process;
  processSteps.forEach((step, index) => {
    const payload = processData[index] ?? defaultLandingData.process[index];
    if (!payload) {
      return;
    }
    const heading = step.querySelector("h3");
    const description = step.querySelector("p");
    if (heading && payload.title) {
      heading.textContent = payload.title;
    }
    if (description && payload.description) {
      description.textContent = payload.description;
    }
  });

  const metrics = landing.metrics ?? defaultLandingData.metrics;
  metricCards.forEach((card, index) => {
    const payload = metrics[index] ?? defaultLandingData.metrics[index];
    if (!payload) {
      return;
    }
    const value = card.querySelector("strong");
    const description = card.querySelector("p");
    if (value && payload.value) {
      value.textContent = payload.value;
    }
    if (description && payload.description) {
      description.textContent = payload.description;
    }
  });

  const cases = landing.cases ?? defaultLandingData.cases;
  caseCards.forEach((card, index) => {
    const payload = cases[index] ?? defaultLandingData.cases[index];
    if (!payload) {
      return;
    }
    const heading = card.querySelector("h3");
    const description = card.querySelector("p");
    if (heading && payload.title) {
      heading.textContent = payload.title;
    }
    if (description && payload.body) {
      description.textContent = payload.body;
    }
    if (payload.highlight) {
      card.classList.add("case-card--glow");
    } else {
      card.classList.remove("case-card--glow");
    }
  });

  const cta = landing.cta ?? defaultLandingData.cta;
  if (ctaHeading && cta.heading) {
    ctaHeading.textContent = cta.heading;
  }
  if (ctaBody && cta.body) {
    ctaBody.textContent = cta.body;
  }
  if (ctaPrimaryAction) {
    if (cta.primaryLabel) {
      ctaPrimaryAction.textContent = cta.primaryLabel;
    }
    if (cta.primaryUrl) {
      ctaPrimaryAction.setAttribute("href", cta.primaryUrl);
    }
  }
  if (ctaSecondaryAction) {
    if (cta.secondaryLabel) {
      ctaSecondaryAction.textContent = cta.secondaryLabel;
    }
    if (cta.secondaryUrl) {
      ctaSecondaryAction.setAttribute("href", cta.secondaryUrl);
    }
  }
};

applyLandingData(defaultLandingData);
setInterval(rotateHeroPhrase, 2800);

const STRAPI_URL = (window.STRAPI_URL || "http://localhost:1337").replace(
  /\/$/,
  ""
);

const normalizeLandingAttributes = (attributes = {}) => ({
  hero: {
    headingPrefix: attributes.heroHeadingPrefix,
    headingSuffix: attributes.heroHeadingSuffix,
    lede: attributes.heroLede,
    dynamicWords: (attributes.heroDynamicWords || [])
      .map((item) => item.word || item.name)
      .filter(Boolean),
    meta: (attributes.heroMeta || [])
      .map((item) => item.text)
      .filter(Boolean),
  },
  services: (attributes.services || []).map((item) => ({
    title: item.title,
    description: item.description,
  })),
  process: (attributes.processSteps || []).map((item) => ({
    title: item.title,
    description: item.description,
  })),
  metrics: (attributes.metrics || []).map((item) => ({
    value: item.value,
    description: item.description,
  })),
  cases: (attributes.caseStudies || []).map((item) => ({
    title: item.title,
    body: item.summary || item.body,
    highlight: item.highlight,
  })),
  cta: {
    heading: attributes.ctaHeading,
    body: attributes.ctaBody,
    primaryLabel: attributes.ctaPrimaryLabel,
    primaryUrl: attributes.ctaPrimaryUrl,
    secondaryLabel: attributes.ctaSecondaryLabel,
    secondaryUrl: attributes.ctaSecondaryUrl,
  },
});

const fetchLandingData = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/landing?populate=deep`);
    if (!response.ok) {
      throw new Error("Landing data request failed");
    }
    const payload = await response.json();
    const attributes = payload?.data?.attributes;
    if (attributes) {
      const normalized = normalizeLandingAttributes(attributes);
      applyLandingData(normalized);
    }
  } catch (error) {
    console.warn("Unable to fetch landing page content from Strapi", error);
  }
};

fetchLandingData();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((section) => {
  observer.observe(section);
});
