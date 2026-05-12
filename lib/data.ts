export type Status = 'incoming' | 'current' | 'past'
export type StatusColor = 'green' | 'blue'

export interface Metric { v: string; l: string }

export interface Experience {
  slug: string; index: string; company: string; role: string; period: string
  location: string; tag: string; tagColor: string; status: Status
  headline: string; bullets: string[]; metrics: Metric[]; skills: string[]
  accentColor: string; liveUrl?: string
}

export interface ProjectDetail { title: string; body: string }
export interface Project {
  slug: string; index: string; title: string; company: string; type: string
  status: string; statusColor: StatusColor; description: string
  detail: ProjectDetail[]; metrics: Metric[]; tech: string[]
  accentColor: string; liveUrl?: string
  chartData?: Array<{ m: string; s: number; b: number }>
}

export const experience: Experience[] = [
  {
    slug: "state-street", index: "01",
    company: "State Street Global Advisors",
    role: "Investment Management Co-op",
    period: "Jul 2026 – Dec 2026", location: "Boston, MA",
    tag: "Asset Management", tagColor: "blue", status: "incoming",
    headline: "Joining one of the world's largest asset managers to support the Chief Investment Strategist team.",
    bullets: [
      "Supporting the Chief Investment Strategist team across macro research and investment communications at a firm managing $4.4 trillion in assets.",
      "State Street Global Advisors created the world's first ETF (SPY) in 1993 and is the third-largest asset manager globally.",
    ],
    metrics: [{ v: "$4.4T", l: "AUM" }, { v: "Jul 2026", l: "Start Date" }, { v: "Boston, MA", l: "Location" }],
    skills: ["Investment Management", "Macro Research", "CIS Team"],
    accentColor: "#2563EB",
  },
  {
    slug: "glacier-capital", index: "02",
    company: "Glacier Capital Systems",
    role: "Quantitative Software Engineer",
    period: "Jan 2026 – Present", location: "Remote",
    tag: "Proprietary Trading", tagColor: "dark", status: "current",
    headline: "Sole engineer for a live options trading firm. Built the full research stack from market scanner to real-time alert dashboard.",
    bullets: [
      "Built the complete Python research stack: market scanner, multi-factor scoring engine, options chain analyzer, volatility surface model, regime detector, news sentiment parser, and position sizer covering 20+ instruments.",
      "Designed a two-component strategy engine: short-dated premium-collection trades (0–10 DTE, ~10% OTM) and longer-dated directional positions (20–90 DTE, delta 0.30–0.60) with hard risk gates at the position-sizer level.",
      "Replaced a brittle macOS cron + email pipeline with a real-time Next.js 15 dashboard (Supabase Realtime + Python worker on Fly.io) that rescans every 5 minutes during market hours.",
    ],
    metrics: [{ v: "20+", l: "Instruments" }, { v: "5 min", l: "Rescan Cadence" }, { v: "Live", l: "Production" }],
    skills: ["Python", "Black-Scholes", "Volatility Surface", "Next.js 15", "Supabase Realtime", "Fly.io", "YAML"],
    accentColor: "#0F172A",
  },
  {
    slug: "closebooks", index: "03",
    company: "CloseBooks",
    role: "Founder & Full-Stack Engineer",
    period: "2024 – Present", location: "Boston, MA",
    tag: "AI SaaS — Founder", tagColor: "green", status: "current",
    headline: "Founded and built an AI-powered bookkeeping automation platform for CPA firms — solo, from zero to production.",
    bullets: [
      "Built multi-tenant Next.js 14 / Supabase (PostgreSQL + Row Level Security) application with Stripe-billed three-tier subscription pricing as sole engineer.",
      "Engineered an LLM pipeline using the Anthropic Claude API that auto-maps bank statement line items (CSV and PDF) to a client's chart of accounts, reducing manual reconciliation to flagged exceptions only.",
      "Active partnership conversations with a bookkeeping firm in Canton, MA after ICP-targeted outreach and live product demos to Boston-area CPA firms.",
    ],
    metrics: [{ v: "Solo", l: "Built" }, { v: "LLM", l: "Categorization" }, { v: "3-tier", l: "Stripe Billing" }],
    skills: ["Next.js 14", "TypeScript", "Supabase", "Anthropic API", "Stripe", "Vercel"],
    accentColor: "#16A34A",
    liveUrl: "https://closebooks-app.vercel.app",
  },
  {
    slug: "bcs-bank", index: "04",
    company: "BCS Bank — Investment Banking",
    role: "Investment Banking Analyst Intern",
    period: "Jul – Aug 2023", location: "Moscow, Russia",
    tag: "Investment Banking", tagColor: "purple", status: "past",
    headline: "Covered energy, metals, and banking sectors. Built equity research models and wrote daily market briefings on OFZ bonds and MOEX.",
    bullets: [
      "Covered Russian energy (Lukoil, Novatek, Tatneft) and metals (Severstal, Mechel) sectors — built DCF, comparable company, and sensitivity models supporting client-facing equity research.",
      "Wrote daily market briefings on OFZ government bond movements, oil and gas equity flows, and MOEX activity, translating Bank of Russia policy into desk-relevant macro takeaways.",
    ],
    metrics: [{ v: "6", l: "Companies Covered" }, { v: "Daily", l: "Market Briefings" }, { v: "DCF", l: "Models Built" }],
    skills: ["DCF Modeling", "Equity Research", "OFZ Bonds", "MOEX Analysis", "Macro"],
    accentColor: "#7C3AED",
  },
  {
    slug: "monito", index: "05",
    company: "Monito — Young Enterprise UK",
    role: "Co-Founder & Financial Director",
    period: "Sep 2022 – Sep 2023", location: "Bromsgrove, UK",
    tag: "Entrepreneurship", tagColor: "amber", status: "past",
    headline: "Co-founded a student venture that won UK National Company of the Year and reached the European Finals.",
    bullets: [
      "Won UK National Company of the Year in Young Enterprise — the top outcome in the program — after winning at regional and then national level.",
      "Led the finance function: budgeting, pricing strategy, P&L, and investor pitch materials for a five-person team across product, sales, and operations.",
    ],
    metrics: [{ v: "🏆", l: "UK National Winner" }, { v: "🌍", l: "European Finalist" }, { v: "5", l: "Person Team" }],
    skills: ["Entrepreneurship", "Financial Modeling", "P&L", "Pitch Decks"],
    accentColor: "#D97706",
  },
]

export const projects: Project[] = [
  {
    slug: "glacier-engine", index: "01",
    title: "Options Trading Infrastructure",
    company: "Glacier Capital Systems",
    type: "Quantitative Finance", status: "Live in Production", statusColor: "green",
    description: "Full Python research stack for a live options trading firm. Multi-factor scoring, volatility surface modeling, regime detection, real-time Next.js alert dashboard. 20+ instruments, 5-minute rescan cadence.",
    detail: [
      { title: "Market Scanner & Scoring", body: "Multi-factor system screening the full options universe against volume, IV rank, bid-ask, and custom factor weights. All parameters in YAML files — zero code changes to tune strategy." },
      { title: "Volatility Surface Model", body: "Builds IV surfaces across strikes and expirations. Used to identify rich/cheap options and detect term structure anomalies. Regime detector flags risk-on/risk-off based on IV patterns." },
      { title: "Real-Time Alert Dashboard", body: "Next.js 15 + Supabase Realtime replaces cron+email. Python worker on Fly.io rescans every 5 minutes during market hours, pushes diff-based alerts to principal across devices." },
    ],
    metrics: [{ v: "20+", l: "Instruments" }, { v: "5 min", l: "Rescan" }, { v: "100%", l: "Solo Built" }],
    tech: ["Python", "YAML", "Black-Scholes", "Greeks", "Next.js 15", "Supabase", "Fly.io"],
    accentColor: "#0F172A",
    chartData: [
      { m: "Feb", s: 0, b: 0 }, { m: "Mar", s: 2.1, b: 1.8 }, { m: "Apr", s: 3.4, b: 2.1 },
      { m: "May", s: 4.1, b: 2.9 }, { m: "Jun", s: 5.8, b: 3.2 }, { m: "Jul", s: 4.9, b: 3.8 },
      { m: "Aug", s: 7.2, b: 4.1 }, { m: "Sep", s: 8.9, b: 4.8 }, { m: "Oct", s: 10.1, b: 5.3 },
      { m: "Nov", s: 11.4, b: 6.1 }, { m: "Dec", s: 13.2, b: 7.2 }, { m: "Jan", s: 15.8, b: 9.1 },
    ],
  },
  {
    slug: "closebooks-saas", index: "02",
    title: "CloseBooks — AI Bookkeeping SaaS",
    company: "Founder",
    type: "AI / Full-Stack SaaS", status: "Active", statusColor: "blue",
    description: "Multi-tenant SaaS automating month-end close for CPA firms. LLM pipeline maps bank statement line items to chart of accounts. Three-tier Stripe billing, Row Level Security, deployed on Vercel.",
    detail: [
      { title: "Multi-Tenant Architecture", body: "Next.js 14 + Supabase PostgreSQL with full Row Level Security. Every query scoped to the authenticated firm. Zero cross-tenant data leakage possible at the database level." },
      { title: "LLM Transaction Categorization", body: "Anthropic Claude API pipeline. Accepts CSV and PDF bank statements, extracts line items, maps each to the client's chart of accounts. Ambiguous transactions flagged for human review." },
      { title: "Stripe Billing", body: "Complete subscription stack: free trial, professional, and enterprise tiers. Stripe webhooks update Supabase subscription state. Feature gates enforce tier limits throughout." },
    ],
    metrics: [{ v: "Multi", l: "Tenant" }, { v: "LLM", l: "Pipeline" }, { v: "Stripe", l: "Billing" }],
    tech: ["Next.js 14", "TypeScript", "Supabase", "Anthropic API", "Stripe", "Vercel"],
    liveUrl: "https://closebooks-app.vercel.app",
    accentColor: "#16A34A",
  },
  {
    slug: "yandex-analytics", index: "03",
    title: "Yandex Afisha: Full-Cycle Analytics",
    company: "Yandex Practicum Capstone",
    type: "Data Analytics", status: "Completed", statusColor: "green",
    description: "End-to-end analytics pipeline for Russia's leading event ticketing platform. 290K+ orders, PostgreSQL data pipeline, interactive DataLens dashboard, Python EDA with statistical hypothesis testing.",
    detail: [
      { title: "PostgreSQL Data Pipeline", body: "290,000+ orders across five relational tables. SQL queries for data quality auditing, duplicate detection, multi-currency handling (RUB/KZT), and revenue outlier flagging." },
      { title: "Interactive DataLens Dashboard", body: "KPI indicators, time-series charts for weekly revenue and order dynamics, device/event breakdowns, filterable tables by region, currency, and event category." },
      { title: "Python EDA + Hypothesis Testing", body: "pandas, seaborn, scipy: currency conversion, outlier filtering at 99th percentile, seasonality decomposition, statistical hypothesis testing on mobile vs desktop behaviour." },
    ],
    metrics: [{ v: "290K+", l: "Orders" }, { v: "79%", l: "Mobile Revenue" }, { v: "300+", l: "Training Hours" }],
    tech: ["Python", "pandas", "seaborn", "scipy", "PostgreSQL", "SQL", "Yandex DataLens"],
    accentColor: "#DC2626",
  },
  {
    slug: "quant-research", index: "04",
    title: "Quantitative Finance Research",
    company: "FINA 4335 — Northeastern",
    type: "Academic Research", status: "65/65 Perfect Score", statusColor: "green",
    description: "Fama-French 3-factor regressions, Black-Scholes options pricing engine, CAPM backtesting, Sharpe ratio annualization on 33 S&P 1500 stocks. Rigorous look-ahead bias controls. Perfect score.",
    detail: [
      { title: "Fama-French Regression", body: "Alpha and beta exposures to market, SMB, and HML factors for 33 S&P 1500 stocks. Factors scaled to percentage terms for proper OLS alignment." },
      { title: "Black-Scholes Engine", body: "Full Python implementation with d1/d2, cumulative normal distribution, put-call parity verification." },
      { title: "Portfolio Construction", body: "Buy-and-hold with vectorized returns. Sharpe annualized ×√12. Maximum drawdown on rolling cumulative returns. Look-ahead bias eliminated with .shift(1)." },
    ],
    metrics: [{ v: "65/65", l: "Score" }, { v: "33", l: "Stocks" }, { v: "25yr", l: "Data Range" }],
    tech: ["Python", "pandas", "statsmodels", "yfinance", "matplotlib", "Jupyter"],
    accentColor: "#7C3AED",
  },
]

export const education = {
  university: {
    name: "Northeastern University",
    college: "College of Science",
    degree: "B.S. Mathematics and Business Administration",
    period: "Sep 2024 – May 2028",
    location: "Boston, MA",
    courses: [
      "Probability & Statistical Theory", "Partial Differential Equations",
      "Stochastic Processes (Markov Chains, Queueing Theory)",
      "Mathematical Statistics", "Linear Algebra",
      "Investments", "Corporate Finance", "Blockchain in Finance",
    ],
  },
  schools: [
    { name: "Bromsgrove School", qualification: "A-Levels", period: "2022–2024", location: "Bromsgrove, UK" },
    { name: "The King's School, Canterbury", qualification: "Secondary", period: "2021–2022", location: "Canterbury, UK" },
  ],
  certs: [
    { name: "Claude Code in Action", issuer: "Anthropic", year: "Apr 2026", color: "#0A0A0A", initials: "A", lightText: true },
    { name: "AI Engineer for Data Scientists Associate", issuer: "DataCamp", year: "Feb 2026", color: "#03EF62", initials: "DC", lightText: false },
    { name: "Generative AI in Action", issuer: "IBM", year: "2026", color: "#006699", initials: "IBM", lightText: true },
    { name: "BCG Teaming Simulation", issuer: "Boston Consulting Group", year: "2025", color: "#006A4E", initials: "BCG", lightText: true },
  ],
}

export const skills = [
  { label: "Programming", items: ["Python", "TypeScript", "JavaScript", "SQL", "pandas", "NumPy", "SciPy", "scikit-learn", "PyTorch", "matplotlib"] },
  { label: "Quant Finance", items: ["Options Pricing", "Black-Scholes", "Greeks", "Volatility Surface", "Portfolio Construction", "Fama-French", "CAPM", "DCF Modeling", "Equity Research"] },
  { label: "AI & ML", items: ["LLM Pipelines", "Anthropic Claude API", "Agentic AI", "NLP", "Generative AI", "Hypothesis Testing"] },
  { label: "Web & Infra", items: ["Next.js 15", "React", "Supabase", "PostgreSQL", "Vercel", "Fly.io", "Git", "Stripe"] },
  { label: "Data Analytics", items: ["Yandex DataLens", "Dashboard Design", "EDA", "Seasonality Analysis", "A/B Testing", "Outlier Detection"] },
]
