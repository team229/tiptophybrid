# Tip Top Hybrid — SEO plan, November 2026

Research date: 20 November 2026. Search Console window: 20 May – 18 November 2026.
Paid research: 364 OpenSEO credits (keyword metrics, 8 SERPs, 1 keyword set, 3 backlink profiles).

---

## 1. Where the site stands

Search Console shows a clear split: the blog earns the impressions, the service pages earn almost nothing.

| Page | Impressions (6 mo) | Queries it ranks for |
|---|---:|---:|
| `/hybrid-fuel-economy-drops-10-causes-fixes-every-driver-should-know/` | 21,272 | — |
| `/what-is-a-brake-actuator/` | 35,004 | — |
| `/how-to-diagnose-hybrid-inverter-problems-before-you-visit-a-mechanic/` | 13,378 | — |
| `/toyota-prius-battery-repair-replacement/` | 853 | 50, none commercial |
| `/high-voltage-system-repair/` | 269 | 8 |
| `/inverter-water-pump-service/` | 0 | 0 |
| `/inverter-brake-actuator-repair/` | 1 | 1 |
| `/testimonials/` | 492 | 1 (branded) |
| `/upland-auto-body-car-repair-shop-services/` | 2 | 1 (branded) |

Branded searches ("tip top hybrid") convert; the money queries do not reach the service pages at all.
The strongest commercial phrase the site has any position for is **"hybrid battery replacement near me"** (position 4.5),
but it lands on a blog-style URL, not the service page.

### Backlinks

| Domain | Referring domains | Backlinks | Rank | Spam score |
|---|---:|---:|---:|---:|
| tiptophybrid.com | 59 | 64 | 0 | 60 |
| gasketmasters.com | 71 | 73 | 0 | 55 |
| kingofhybrid.com | 70 | 85 | 11 | 46 |

Authority is low across the local set, so this is winnable with citations, reviews and a handful of real local links.
Tip Top's spam score (60) is the highest of the three: audit and disavow toxic links before building.

---

## 2. Keyword map (volume = US monthly, November 2026)

| Page | Primary | Secondary | Volume | KD |
|---|---|---|---:|---:|
| `/toyota-prius-battery-repair-replacement/` | toyota prius hybrid battery replacement | hybrid battery replacement, prius battery repair, hybrid battery reconditioning | 6,600 | 0 |
| `/upland-auto-body-car-repair-shop-services/` | hybrid car repair near me | hybrid mechanic near me, hybrid specialist near me | 2,400 | 0 |
| `/inverter-brake-actuator-repair/` | prius brake actuator replacement | brake actuator replacement cost, hybrid brake actuator repair | 50–90 | 0 |
| `/inverter-water-pump-service/` | prius inverter water pump | inverter water pump replacement | 90 | 0 |
| `/hybrid-transaxle-drivetrain-service/` | hybrid transmission repair | hybrid transaxle repair, transaxle service | 50 | 0 |
| `/hybrid-engine-transmission-replacement/` | prius engine replacement | hybrid engine replacement, hybrid transmission repair | 50 | 0 |
| `/high-voltage-system-repair/` | high voltage hybrid battery repair | hv cable repair, hybrid isolation fault | 100 imp | 0 |
| `/testimonials/` | tip top hybrid reviews | hybrid repair reviews | branded | — |
| `/about-us/` | about tip top hybrid | hybrid specialist upland | branded | — |

Notes from the SERP review:

- **"hybrid inverter repair" is a solar-inverter query.** Do not target it. Use "hybrid car inverter repair",
  "prius inverter replacement" and "P0A93" instead.
- **"prius brake actuator replacement" is a parts query** (eBay, Toyota parts). The service-intent variants are
  "brake actuator repair", "ABS actuator replacement near me" and the code queries (C1256, C1310, C1391).
- **"hybrid battery replacement" is national and informational.** The local commercial variant is
  "hybrid battery replacement near me"; the site already sits at 4.5 there.
- **"near me" pages win with location + service in the title, a phone number above the fold, and city coverage.**
  Gasket Masters, King of Hybrid and Hybrid World all do this.

---

## 3. On-page changes shipped

- Six service pages rebuilt from 220–690 words to 1,300–1,700 words, each with:
  answer block, symptoms, what is included, comparison table, dated price ranges, 4-step process,
  model coverage, local section, 6–8 FAQs, related links and a phone CTA.
- New services hub targeting "hybrid car repair near me" and "hybrid mechanic near me".
- Testimonials rebuilt with five real customer quotes and `AggregateRating`/`Review` schema (5.0, 8 reviews).
- New `/about-us/` page with `AboutPage` + `FAQPage` schema, linked from the header and footer.
- `Service`, `FAQPage` and `BreadcrumbList` schema on every service page.
- Internal links from services to the blog posts that already rank, and from those posts back to the services.
- Corrected the "180+ reviews" claim on 72 city pages. The GBP profile shows 8 reviews; the pages now say
  "5.0 rated on Google".

---

## 4. Off-page plan (next 90 days)

### 4.1 Fix the foundation

1. **Disavow / clean toxic links.** Spam score 60 with 59 referring domains is not normal for a local shop.
   Export the backlink profile, mark directory spam and PBNs, disavow in Search Console.
2. **One NAP everywhere.** `Tip Top Hybrid · 1894 W 9th St Ste B, Upland, CA 91786 · 909-238-7028`.
   Fix any listing that uses the old `1894 W 9th St` without the suite, or a different name.
3. **Canonical domain.** Confirm `https://www.tiptophybrid.com` is the only indexed host and that the CDN
   serves the same content on `tiptophybrid.b-cdn.net` with a canonical to `www`.

### 4.2 Google Business Profile (highest return, free)

- Primary category: Auto repair shop. Secondary: Hybrid repair, Battery store, Auto electrical service.
- Add all six services with descriptions and prices where possible.
- Upload 30+ real photos: shop, bays, battery packs, brake actuators, team. Refresh monthly.
- Publish one GBP post per week: a repair story, a seasonal warning (inland heat, summer cooling), or an offer.
- Add the free-estimate link as the appointment URL, tagged `?utm_source=GMB&utm_medium=organic`.
- Answer every review within 48 hours and add the service and city in the reply.
- Seed 10 Q&As from the FAQ blocks on the service pages.

### 4.3 Reviews (target: 40 by May 2027)

- Ask at pickup with a QR card. One ask, no incentives.
- Text/email the Google review link the same day.
- Reply to every review with the repair type and city, e.g. "Thanks Angela — glad the reconditioned pack got the
  2010 Prius back on the road in Upland."
- Aim for 6–8 new reviews a month; that is enough to pass the local competitors on review count.

### 4.4 Citations (one afternoon, then quarterly)

Build or claim: Yelp, BBB, Bing Places, Apple Business Connect, Nextdoor, RepairPal, Carfax Service Shop,
Mechanic Advisor, CARFAX, AutoMD, Clutch (already listed), Linkspreneurs (already listed), Chamber of Commerce
(Upland and Montclair), Inland Empire business directories.

Rules: exact NAP, one category per listing, no keyword stuffing in the business name.

### 4.5 Real local links (6–10 in 90 days)

| Target | Why it works |
|---|---|
| Upland Chamber of Commerce | Membership page + business directory, strong local relevance |
| City of Upland / Montclair community pages | Sponsorships and event pages |
| Inland Valley Daily Bulletin | Local repair-tip column or quoted expert |
| Local car clubs and hybrid owner groups | Workshop night, tech talk, link from their events page |
| High school and college auto programs | Guest talk or tool donation; .edu link |
| Local EV/hybrid Facebook groups and Nextdoor | Recommendations, not link drops |
| Supplier and parts partners | "Where to get it installed" dealer locator |
| Charity or community sponsor | Sponsor page link with the shop's name |

Avoid: paid guest-post networks, exact-match anchor packages, directory blasts. The profile already carries
too much low-quality link weight.

### 4.6 Content that earns links

- **Inland Empire hybrid battery heat study** — anonymised shop data: packs replaced by city, age and mileage.
  Local journalists and forums link to original data.
- **Prius Gen 3 head gasket cost guide** — already a known failure; make the most complete page in California.
- **Hybrid brake actuator code library** — C1256, C1310, C1391, what each means and what it costs.
- **"Is it worth fixing?" calculator** — repair cost vs car value. Interactive tools attract links.

---

## 5. Measurement

- Weekly: GSC queries for the six service pages, GBP calls and direction requests.
- Monthly: service-page clicks and form fills in GA4; new reviews; referring domains.
- 90-day targets: 59 → 85 referring domains; 8 → 30 Google reviews; service pages from 0 commercial
  queries to 25+ each; "hybrid battery replacement near me" into the top 3.
