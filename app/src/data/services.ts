export interface ServiceFaq { q: string; a: string }
export interface ServiceRow { cells: string[] }
export interface ServicePageData {
  slug: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  answer: string;
  intro: string[];
  symptomsTitle: string;
  symptoms: { title: string; body: string }[];
  includedTitle: string;
  included: string[];
  table?: { title: string; note?: string; headers: string[]; rows: ServiceRow[] };
  pricingTitle: string;
  pricingNote: string;
  pricing: { item: string; range: string; detail: string }[];
  processTitle: string;
  process: { title: string; body: string }[];
  modelsTitle: string;
  models: string[];
  localTitle: string;
  local: string[];
  faqs: ServiceFaq[];
  related: { label: string; href: string }[];
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  'toyota-prius-battery-repair-replacement': {
    slug: 'toyota-prius-battery-repair-replacement',
    eyebrow: 'Hybrid battery service',
    h1: 'Toyota Prius Hybrid Battery Repair & Replacement in Upland, CA',
    metaTitle: 'Toyota Prius Hybrid Battery Replacement in Upland, CA',
    metaDescription:
      'Prius hybrid battery testing, module repair, reconditioning and replacement in Upland. Typical 2026 costs, warning signs and 1–2 day turnaround. Call 909-238-7028.',
    image: '/wp-content/uploads/2025/05/prius-hood-up-1.jpeg',
    imageAlt: 'Toyota Prius with the hood open at Tip Top Hybrid in Upland, California',
    answer:
      'A Prius hybrid battery replacement typically costs $1,500–$2,600 for a reconditioned pack or $3,500–$5,000 for a new OEM pack at a dealer. Most cars do not need a full pack. We test block voltages and cooling first, then quote repair, reconditioning or replacement. Turnaround is usually one to two days.',
    intro: [
      'The red triangle, P0A80 or a fuel gauge that drops two bars on a mild hill does not automatically mean the pack is dead. On a Prius, one weak module, a clogged cooling intake or a failing fan can trigger the same warnings as a pack at the end of its life. Testing before replacing is how you avoid a four-figure bill you did not need.',
      'We work on Prius Gen 2, Gen 3, Gen 4 and Gen 5, plus Prius c, v and Prime. Every job starts with a scan and a block-voltage log, and every quote explains what we found, what we would do and what it costs before we touch the car.',
    ],
    symptomsTitle: 'Signs your Prius hybrid battery needs attention',
    symptoms: [
      { title: 'Red triangle or “Check Hybrid System”', body: 'Usually paired with P0A80 or a cooling code. The pack failed a self-test, but the cause can be a module, a connection or airflow.' },
      { title: 'Fuel economy drops', body: 'A slide from the high 40s to the 30s over a few months is the most common early sign. The engine runs more because the pack cannot carry its share.' },
      { title: 'Charge gauge moves fast', body: 'The battery bars drop quickly under load and recover just as fast. That points to reduced capacity or an unbalanced block.' },
      { title: 'Sluggish acceleration', body: 'Electric assist fades, so the car feels heavier from a stop and on grades.' },
      { title: 'Engine runs at stoplights', body: 'A healthy Prius shuts the engine off at a stop. If it idles constantly, the pack is not accepting or delivering charge.' },
      { title: 'Cooling fan stays loud', body: 'A hot pack commands more fan. Dust in the intake behind the rear seat is a common cause in inland California.' },
      { title: 'No start, but the lights are bright', body: 'A traction battery can prevent READY mode. A weak 12V battery can do the same, so both get tested.' },
      { title: 'Smell or visible heat', body: 'A hot or venting pack is a stop-driving situation. Call before you drive it again.' },
    ],
    includedTitle: 'What our Prius battery service includes',
    included: [
      'Hybrid system scan and freeze-frame review',
      'Block-by-block voltage and temperature log',
      'Battery cooling fan, duct and intake inspection',
      'Weak module replacement and cell balancing',
      'Full reconditioning with load testing',
      'New OEM, remanufactured or low-mileage pack options',
      'Installation, system verification and road test',
      'Written warranty terms before work begins',
    ],
    table: {
      title: 'Repair, recondition or replace?',
      note: 'The right answer depends on how many blocks are weak and how the pack behaves under load.',
      headers: ['Option', 'Typical 2026 cost', 'Best for', 'Turnaround'],
      rows: [
        { cells: ['Module repair', '$450–$900', 'One or two weak blocks, rest of the pack healthy', 'Same day'] },
        { cells: ['Reconditioning', '$900–$1,800', 'Even wear, capacity down but no failed modules', '1–2 days'] },
        { cells: ['Remanufactured pack', '$1,500–$2,600', 'Multiple weak modules or a pack that fails load testing', '1–2 days'] },
        { cells: ['New OEM pack (dealer)', '$3,500–$5,000', 'Warranty work or a customer who wants new OEM', 'Often 3–7 days'] },
      ],
    },
    pricingTitle: 'What a Prius battery costs in 2026',
    pricingNote: 'Market ranges, not a quote from us. Prices checked November 2026 and vary by generation, pack condition and warranty.',
    pricing: [
      { item: 'Hybrid battery diagnostic', range: '$100–$200', detail: 'Scan, block voltages, cooling check, written findings.' },
      { item: 'Module repair', range: '$450–$900', detail: 'Replace and balance weak blocks.' },
      { item: 'Reconditioned pack', range: '$900–$1,800', detail: 'Tested, balanced and load-tested before install.' },
      { item: 'Remanufactured pack, installed', range: '$1,500–$2,600', detail: 'Most common choice for a high-mileage Prius.' },
      { item: 'New OEM pack at a dealer', range: '$3,500–$5,000', detail: 'Part and labor. Longer warranty, highest price.' },
      { item: '12V auxiliary battery', range: '$180–$320', detail: 'Often the real cause of a no-start or warning light.' },
    ],
    processTitle: 'How the job runs',
    process: [
      { title: 'Scan and drive', body: 'We pull hybrid codes, freeze frame and live data, then confirm the symptom on a short road test.' },
      { title: 'Test the pack', body: 'Block voltages, temperature, fan command and a load test tell us whether the issue is one module or the whole pack.' },
      { title: 'Quote the options', body: 'You get repair, recondition and replacement prices in writing, with the trade-offs for your car and budget.' },
      { title: 'Fix and verify', body: 'We complete the work, clear and re-scan, check cooling airflow and road test before the car goes back.' },
    ],
    modelsTitle: 'Prius and hybrid models we service',
    models: ['Prius Gen 2 (2004–2009)', 'Prius Gen 3 (2010–2015)', 'Prius Gen 4 (2016–2022)', 'Prius Gen 5 (2023+)', 'Prius c', 'Prius v', 'Prius Prime', 'Camry Hybrid', 'RAV4 Hybrid', 'Highlander Hybrid', 'Lexus CT 200h', 'Lexus ES 300h', 'Honda Accord Hybrid', 'Honda Civic Hybrid', 'Ford Fusion Hybrid', 'Ford Escape Hybrid'],
    localTitle: 'Serving Upland and the Inland Empire',
    local: [
      'Our shop is at 1894 W 9th St Ste B in Upland, a few minutes from the 10 and the 210. Most customers come from Upland, Montclair, Claremont, Pomona, Rancho Cucamonga, Ontario, San Bernardino and Riverside.',
      'Inland heat is hard on hybrid packs. The battery cools through a vent behind the rear seat, and dust from the foothills plus summer temperatures of 100°F and up shorten pack life. We check and clean that airflow path on every battery job, because a new pack with a blocked intake will run hot too.',
    ],
    faqs: [
      { q: 'How much does a Prius hybrid battery cost to replace?', a: 'In 2026, a reconditioned or remanufactured pack installed at an independent hybrid shop typically runs $1,500–$2,600. A new OEM pack at a dealer is usually $3,500–$5,000. Module-level repair can be $450–$900 when only one or two blocks are weak.' },
      { q: 'How long does a Prius hybrid battery last?', a: 'Most Prius packs last 10–15 years or 150,000–200,000 miles. Inland Empire heat, short trips and a blocked cooling intake shorten that. A pack that is regularly above normal temperature ages faster than the mileage suggests.' },
      { q: 'Can you repair the battery instead of replacing it?', a: 'Yes, when testing shows one or two weak blocks and the rest of the pack is even. We replace and balance those modules, then load test the pack. If several blocks are weak or the pack fails under load, replacement is the better value.' },
      { q: 'Do I need to replace the whole pack if I have P0A80?', a: 'No. P0A80 means the pack failed a self-test, not that every module is dead. A block-voltage log shows which section is weak. Many cars need a module repair, not a full pack.' },
      { q: 'How long does the replacement take?', a: 'Most Prius battery replacements take one to two days. We confirm the timeline when we quote, because pack availability varies by generation.' },
      { q: 'Is there a warranty?', a: 'Yes. Warranty length depends on whether we repair modules, install a reconditioned pack or fit a new OEM pack. The exact term and what it covers are written on your estimate before work starts.' },
      { q: 'Can a weak 12V battery cause hybrid warnings?', a: 'Often, yes. Low system voltage can make hybrid modules drop offline and set codes that look like a pack failure. We test the 12V battery before condemning the traction pack.' },
      { q: 'Do you work on Prius Prime and other plug-in hybrids?', a: 'Yes. We service Prius Prime, RAV4 Prime and other Toyota and Lexus hybrids, along with Honda, Ford and Lexus hybrid models.' },
    ],
    related: [
      { label: 'Hybrid battery health test: what we check', href: '/hybrid-battery-health-test/' },
      { label: 'Repair or replace a Prius battery?', href: '/can-a-prius-hybrid-battery-be-repaired-instead-of-replaced/' },
      { label: 'P0A80 code explained', href: '/toyota-prius-p0a80-code-what-it-means-and-what-to-do-next/' },
      { label: 'How long hybrid batteries last', href: '/how-long-does-a-hybrid-battery-really-last-signs-its-time-for-replacement/' },
      { label: 'Hybrid battery replacement cost in 2026', href: '/hybrid-battery-replacement-cost/' },
      { label: 'Heat and hybrid battery life in Southern California', href: '/hybrid-battery-overheating/' },
    ],
  },

  'high-voltage-system-repair': {
    slug: 'high-voltage-system-repair',
    eyebrow: 'High-voltage service',
    h1: 'Hybrid High-Voltage System Diagnostics & Repair',
    metaTitle: 'Hybrid High-Voltage System Repair in Upland, CA',
    metaDescription:
      'High-voltage hybrid diagnostics, isolation testing, cable and inverter repair in Upland. Safe, shop-only service for Toyota, Lexus, Honda and Ford hybrids.',
    image: '/wp-content/uploads/2025/05/hybrid-battery.jpg',
    imageAlt: 'High-voltage hybrid battery pack being serviced at Tip Top Hybrid',
    answer:
      'High-voltage repairs cover the traction battery, orange cables, inverter, service plug and isolation faults. They are shop-only work: the pack stays live with the car off. We test for isolation, inspect connectors and repair or replace the failed component instead of guessing at the whole system.',
    intro: [
      'A high-voltage fault can look like a dozen other problems: no start, a red triangle, a sudden loss of power, a coolant leak or a battery that will not hold charge. The difference is safety. Orange cables and the pack carry enough energy to injure or kill, and the system stays energised when the car is off.',
      'We diagnose the high-voltage side with the same order every time: codes first, then isolation and cable checks, then the pack and inverter. That sequence finds the failed part without replacing good components.',
    ],
    symptomsTitle: 'When to stop driving and call',
    symptoms: [
      { title: 'Red triangle or “Check Hybrid System”', body: 'A high-voltage or inverter fault can set this. Do not clear it and keep driving.' },
      { title: 'Burning smell or visible smoke', body: 'Stop safely, turn the car off and do not open the hood or touch orange cables. Call the shop.' },
      { title: 'Sudden power loss', body: 'The car may enter limp mode to protect the system. Driving it can cause more damage.' },
      { title: 'Isolation or ground fault codes', body: 'Voltage is leaking to the chassis. This needs a dry bay and a megohmmeter, not a driveway test.' },
      { title: 'Coolant loss with no external leak', body: 'An inverter or battery cooling circuit may be leaking internally.' },
      { title: 'Damaged orange cable or connector', body: 'Rodent damage, collision damage or a cracked connector is a safety issue, not a wait-and-see item.' },
    ],
    includedTitle: 'What high-voltage service covers',
    included: [
      'Full hybrid system scan and code review',
      'High-voltage isolation and insulation testing',
      'Orange cable, connector and service-plug inspection',
      'Traction battery block, temperature and cooling checks',
      'Inverter and converter diagnostics',
      'High-voltage component repair or replacement',
      'System re-scan, leak check and road test',
      'Written findings and a clear safety recommendation',
    ],
    table: {
      title: 'Common high-voltage faults',
      note: 'The code points at a circuit. Testing tells you which part on that circuit failed.',
      headers: ['Symptom or code', 'What it often means', 'First test'],
      rows: [
        { cells: ['P0A80', 'Pack failed self-test', 'Block voltage spread under load'] },
        { cells: ['P0A93 / P0A94', 'Inverter cooling or performance fault', 'Coolant flow, pump command, inverter data'] },
        { cells: ['Isolation fault', 'Voltage leaking to chassis', 'Sectional insulation test with a megohmmeter'] },
        { cells: ['No start, bright lights', 'High-voltage relay or pack fault', '12V first, then relay and pack data'] },
        { cells: ['Coolant loss', 'Internal or external cooling leak', 'Pressure test and visual inspection'] },
      ],
    },
    pricingTitle: 'What high-voltage repair costs',
    pricingNote: 'Typical 2026 market ranges, not a quote from us. High-voltage work is quoted after testing because the failed part drives the price.',
    pricing: [
      { item: 'High-voltage diagnostic', range: '$150–$300', detail: 'Scan, isolation test, connector inspection, written findings.' },
      { item: 'Cable or connector repair', range: '$250–$900', detail: 'Depends on access and whether the cable is damaged.' },
      { item: 'Inverter repair or replacement', range: '$800–$2,200', detail: 'Repair, remanufactured or used OEM depending on model.' },
      { item: 'Traction battery module repair', range: '$450–$900', detail: 'Weak block replacement and balancing.' },
      { item: 'Traction battery replacement', range: '$1,500–$5,000', detail: 'Reconditioned through new OEM.' },
    ],
    processTitle: 'The safe diagnostic order',
    process: [
      { title: 'Interview and scan', body: 'We record when the fault happens, what lights are on and whether the car has been jumped or overheated.' },
      { title: 'Isolate the circuit', body: 'Codes narrow the system. Insulation and continuity tests find the cable, connector or component.' },
      { title: 'Inspect and test', body: 'We check the pack, inverter, cooling and service plug with the correct PPE and procedures.' },
      { title: 'Repair and verify', body: 'The failed part is repaired or replaced, then the system is re-scanned, leak-checked and road tested.' },
    ],
    modelsTitle: 'Hybrids we service',
    models: ['Toyota Prius', 'Prius Prime', 'Camry Hybrid', 'RAV4 Hybrid', 'Highlander Hybrid', 'Lexus CT 200h', 'Lexus ES 300h', 'Lexus RX 450h', 'Honda Accord Hybrid', 'Honda Civic Hybrid', 'Ford Fusion Hybrid', 'Ford Escape Hybrid'],
    localTitle: 'High-voltage work in Upland',
    local: [
      'We are based in Upland and serve Montclair, Claremont, Pomona, Rancho Cucamonga, Ontario, San Bernardino and Riverside. If the car will not start, call before arranging a tow so we can tell you whether it is safe to move.',
      'High-voltage faults are one of the few jobs where a short drive can turn a repair into a replacement. If you see a red triangle, smell coolant or notice a burning odor, stop and call 909-238-7028.',
    ],
    faqs: [
      { q: 'Is it safe to drive with a high-voltage warning?', a: 'Usually no. A red triangle or isolation fault can mean the system is protecting itself. Driving can damage the inverter or pack further. Stop safely and call.' },
      { q: 'Can a high-voltage problem be fixed at home?', a: 'No. The pack and cables stay live with the car off, and isolation testing needs a dry bay and the right meter. This is shop-only work.' },
      { q: 'How much does a high-voltage diagnostic cost?', a: 'Typical independent shop pricing is $150–$300 for a scan, isolation test and written findings. We confirm the fee before starting.' },
      { q: 'Do you replace the whole pack for an isolation fault?', a: 'Not automatically. An isolation fault can come from a cable, connector, inverter or one section of the pack. Sectional testing finds the source first.' },
      { q: 'Can a coolant leak damage the inverter?', a: 'Yes. The inverter is cooled by its own circuit, and a leaking pump, hose or internal seal can overheat it. A pressure test and flow check are part of the diagnostic.' },
      { q: 'Do you work on Honda and Ford hybrids?', a: 'Yes. We service Toyota, Lexus, Honda and Ford hybrids, including Accord, Civic, Fusion and Escape models.' },
    ],
    related: [
      { label: 'High-voltage repair: what owners should know', href: '/what-every-hybrid-owner-should-know-about-high-voltage-system-repair/' },
      { label: 'Inverter water pump service', href: '/inverter-water-pump-service/' },
      { label: 'Inverter and brake actuator repair', href: '/inverter-brake-actuator-repair/' },
      { label: 'Hybrid battery health test', href: '/hybrid-battery-health-test/' },
      { label: 'Prius red triangle causes', href: '/toyota-prius-red-triangle-warning-light-causes-and-repair-options/' },
      { label: 'Book a diagnostic', href: '/free-estimate/' },
    ],
  },

  'inverter-brake-actuator-repair': {
    slug: 'inverter-brake-actuator-repair',
    eyebrow: 'Inverter & brake actuator',
    h1: 'Hybrid Inverter & Brake Actuator Repair',
    metaTitle: 'Hybrid Brake Actuator & Inverter Repair in Upland, CA',
    metaDescription:
      'Prius and hybrid brake actuator replacement, ABS codes and inverter repair in Upland. C1256, C1310, C1391 and P0A93 diagnosed properly. Call 909-238-7028.',
    image: '/wp-content/uploads/2025/05/brake-repair.jpg',
    imageAlt: 'Hybrid brake and inverter repair at Tip Top Hybrid in Upland',
    answer:
      'Brake actuator faults show up as ABS, BRAKE and VSC lights together, a buzzing pump or a soft pedal. Inverter faults usually bring a red triangle, P0A93 or a power loss. Both need testing first: the actuator is expensive, and an inverter code can come from its cooling pump rather than the inverter itself.',
    intro: [
      'These are two different systems with one thing in common: a bad diagnosis gets expensive fast. A brake actuator is a high-pressure assembly, not a standard master cylinder, and replacing one because of a wheel-speed sensor code wastes more than a thousand dollars. An inverter replaced because of a failed water pump does the same.',
      'We test the circuit, the pump and the live data before quoting. If a cheaper repair fixes the fault, we say so.',
    ],
    symptomsTitle: 'Brake actuator and inverter warning signs',
    symptoms: [
      { title: 'ABS, BRAKE and VSC lights together', body: 'The classic brake actuator pattern on a Prius. Codes are usually C1256, C1310 or C1391.' },
      { title: 'Buzzing or running pump at a stop', body: 'The actuator pump runs longer or more often than it should. A persistent buzzer means stop driving.' },
      { title: 'Soft, long or inconsistent pedal', body: 'Pedal feel changes when the accumulator cannot hold pressure.' },
      { title: 'Red triangle and reduced power', body: 'Often inverter-related. The car may enter limp mode to protect the system.' },
      { title: 'P0A93 or P0A94', body: 'Inverter cooling or performance fault. Check the water pump and coolant flow before condemning the inverter.' },
      { title: 'Overheating or coolant loss', body: 'An inverter water pump that has failed can overheat the inverter and turn a $500 job into a $2,000 one.' },
    ],
    includedTitle: 'What we test and repair',
    included: [
      'Brake ECU and ABS code scan with freeze frame',
      'Actuator pump, accumulator and pressure testing',
      'Brake bleed and calibration after replacement',
      'Inverter live-data and coolant-flow testing',
      'Water pump, hose and coolant circuit inspection',
      'Inverter repair or replacement with correct part matching',
      'System re-scan and road test',
      'Written quote before any parts are ordered',
    ],
    table: {
      title: 'Which part is actually failing?',
      note: 'Codes narrow it down. These are the patterns we see most often.',
      headers: ['Code or symptom', 'Likely cause', 'Typical fix'],
      rows: [
        { cells: ['C1256 / C1310 / C1391', 'Brake actuator accumulator or internal leak', 'Replace actuator, bleed and calibrate'] },
        { cells: ['ABS light plus speed sensor code', 'Wheel-speed sensor or wiring', 'Sensor or harness repair, not an actuator'] },
        { cells: ['Soft pedal, no codes', 'Air in the system or a failing actuator', 'Bleed and pressure test first'] },
        { cells: ['P0A93', 'Inverter coolant pump or flow fault', 'Water pump, coolant and flow test'] },
        { cells: ['P0A94', 'Inverter performance fault', 'Inverter diagnosis and repair or replacement'] },
      ],
    },
    pricingTitle: 'Typical repair costs',
    pricingNote: 'Market ranges, not a quote from us. Prices checked November 2026. OEM versus remanufactured is the biggest variable.',
    pricing: [
      { item: 'Brake actuator diagnostic', range: '$150–$250', detail: 'Code scan, pressure test, written findings.' },
      { item: 'Brake actuator replacement', range: '$1,200–$2,600', detail: 'Remanufactured to new OEM, including bleed and calibration.' },
      { item: 'Inverter water pump replacement', range: '$350–$700', detail: 'Pump, coolant and system bleed.' },
      { item: 'Inverter repair or replacement', range: '$800–$2,200', detail: 'Depends on model and whether the unit is repairable.' },
      { item: 'Wheel-speed sensor or harness', range: '$150–$450', detail: 'Often mistaken for an actuator fault.' },
    ],
    processTitle: 'How we diagnose it',
    process: [
      { title: 'Scan both systems', body: 'Brake and hybrid codes, freeze frame and live data, not just the light on the dash.' },
      { title: 'Test pressure and flow', body: 'Actuator pressure and inverter coolant flow tell us whether the part or its support system failed.' },
      { title: 'Quote the real fix', body: 'We price the correct repair and explain why a sensor or pump is not the actuator or inverter.' },
      { title: 'Replace, bleed, calibrate', body: 'Brake work gets a full bleed and calibration. Inverter work gets a coolant fill, re-scan and road test.' },
    ],
    modelsTitle: 'Models we service',
    models: ['Prius Gen 2', 'Prius Gen 3', 'Prius Gen 4', 'Prius Prime', 'Camry Hybrid', 'RAV4 Hybrid', 'Lexus CT 200h', 'Lexus ES 300h', 'Honda Accord Hybrid', 'Honda Civic Hybrid', 'Ford Fusion Hybrid'],
    localTitle: 'Brake and inverter work in Upland',
    local: [
      'We serve Upland, Montclair, Claremont, Pomona, Rancho Cucamonga, Ontario, San Bernardino and Riverside. Brake work is safety-critical, so we keep the same-day and next-day slots for cars with a hard pedal, a buzzer or a red triangle.',
      'If your commute is the 10 or the 210, a brake actuator that is starting to leak will get worse in stop-and-go traffic. Have it tested before a long downhill or a road trip.',
    ],
    faqs: [
      { q: 'What do C1256, C1310 and C1391 mean?', a: 'They are common Prius brake actuator codes tied to accumulator pressure and internal leaks. The code points at the actuator, but pressure testing confirms it before replacement.' },
      { q: 'Can I drive with the ABS and BRAKE lights on?', a: 'Only to a safe place. If the pedal is soft, the buzzer is constant or the car takes longer to stop, do not drive it. Call and arrange a tow.' },
      { q: 'How much does a Prius brake actuator cost?', a: 'A remanufactured or used OEM unit installed typically runs $1,200–$1,900. A new OEM actuator can reach $2,600. The exact price depends on generation and part availability.' },
      { q: 'Is a used brake actuator a good idea?', a: 'Only if it is tested and warrantied. These units fail with age, and a used part with unknown history can fail again. We quote the warranty with each option.' },
      { q: 'Does a P0A93 code mean the inverter is bad?', a: 'Often no. P0A93 is usually a cooling or water-pump fault. We test pump command, coolant flow and temperature before quoting an inverter.' },
      { q: 'How long does the repair take?', a: 'Brake actuator replacement is usually same day to two days depending on parts. Inverter work depends on whether the unit is repaired or replaced.' },
    ],
    related: [
      { label: 'Brake actuator failure symptoms', href: '/brake-actuator-failure-in-hybrid-vehicles-symptoms-solutions/' },
      { label: 'Prius brake actuator replacement cost', href: '/toyota-prius-brake-actuator-replacement-cost-complete-guide/' },
      { label: 'Inverter water pump service', href: '/inverter-water-pump-service/' },
      { label: 'Prius inverter failure symptoms', href: '/prius-inverter-failure-symptoms-you-should-never-ignore/' },
      { label: 'High-voltage system repair', href: '/high-voltage-system-repair/' },
      { label: 'Get a written estimate', href: '/free-estimate/' },
    ],
  },

  'inverter-water-pump-service': {
    slug: 'inverter-water-pump-service',
    eyebrow: 'Inverter cooling',
    h1: 'Hybrid Inverter Water Pump Service & Replacement',
    metaTitle: 'Inverter Water Pump Replacement in Upland, CA',
    metaDescription:
      'Prius and hybrid inverter water pump replacement in Upland. Stop P0A93 overheating before it damages the inverter. Same-day service available. Call 909-238-7028.',
    image: '/wp-content/uploads/2025/05/water-pump-engine-repair.jpg',
    imageAlt: 'Inverter water pump service on a hybrid at Tip Top Hybrid',
    answer:
      'The inverter water pump circulates coolant through the inverter. When it slows or stops, the inverter overheats, the car may limit power and P0A93 can set. Replacing the pump early typically costs $350–$700. Waiting can turn it into an inverter replacement at $800–$2,200 or more.',
    intro: [
      'The inverter is what converts DC from the battery into AC for the electric motor, and it makes heat doing it. A small electric pump moves coolant through the inverter to keep it in range. The pump runs whenever the car is on, so it wears like any other moving part.',
      'This is one of the cheapest preventive repairs on a hybrid and one of the most expensive to ignore. We test pump command, coolant flow and temperature before replacing anything.',
    ],
    symptomsTitle: 'Signs the inverter water pump is failing',
    symptoms: [
      { title: 'P0A93 code', body: 'The most direct signal. It means the inverter cooling system is not performing as expected.' },
      { title: 'Red triangle and power loss', body: 'The car limits power to protect the inverter. Do not keep driving on it.' },
      { title: 'Coolant smell or low coolant', body: 'A leaking pump, hose or seal. Pressure testing finds the source.' },
      { title: 'Noisy pump or unusual whine', body: 'A failing bearing or impeller can make a noise that changes with speed.' },
      { title: 'Overheating after short drives', body: 'A weak pump moves less coolant, so heat builds faster than the system can shed it.' },
      { title: 'Coolant not returning to the reservoir', body: 'Low flow or air in the system. Both need diagnosis, not just a top-up.' },
    ],
    includedTitle: 'What the service includes',
    included: [
      'Pump command and live-data check',
      'Coolant flow and temperature verification',
      'Pressure test for leaks and air intrusion',
      'OEM-quality pump replacement',
      'Coolant fill and system bleed',
      'Inverter re-scan and road test',
      'Written quote before work starts',
    ],
    pricingTitle: 'Typical inverter water pump cost',
    pricingNote: 'Market ranges, not a quote from us. Prices checked November 2026 and vary by model and pump type.',
    pricing: [
      { item: 'Cooling system diagnostic', range: '$100–$200', detail: 'Scan, flow check, pressure test.' },
      { item: 'Water pump replacement', range: '$350–$700', detail: 'Pump, coolant, bleed and verification.' },
      { item: 'Hose or connector repair', range: '$150–$400', detail: 'Depends on access and part.' },
      { item: 'Inverter replacement (if ignored)', range: '$800–$2,200', detail: 'What the pump repair is preventing.' },
    ],
    processTitle: 'How we replace it',
    process: [
      { title: 'Confirm the fault', body: 'We check the code, pump command and coolant flow so a sensor or air lock does not get mistaken for a pump.' },
      { title: 'Pressure test', body: 'A leak test finds hoses, seals or a cracked housing before we fit a new pump.' },
      { title: 'Replace and bleed', body: 'New pump, correct coolant, full bleed. Air left in the system causes the same overheating.' },
      { title: 'Verify', body: 'Re-scan, watch temperature and flow, then road test.' },
    ],
    modelsTitle: 'Models we service',
    models: ['Prius Gen 2', 'Prius Gen 3', 'Prius Gen 4', 'Prius Prime', 'Camry Hybrid', 'RAV4 Hybrid', 'Highlander Hybrid', 'Lexus CT 200h', 'Lexus ES 300h', 'Honda Accord Hybrid', 'Ford Fusion Hybrid'],
    localTitle: 'Inverter cooling in inland heat',
    local: [
      'Upland, Montclair, Claremont, Pomona, Rancho Cucamonga and San Bernardino all see summer heat that makes the inverter work harder. The pump and coolant are the only things keeping it in range.',
      'If the red triangle comes on on a hot afternoon, stop and let the car cool before driving further. Call 909-238-7028 and we will tell you whether it is safe to move.',
    ],
    faqs: [
      { q: 'What is an inverter water pump?', a: 'It is an electric pump that circulates coolant through the inverter, the component that converts battery power for the electric motor. Without flow, the inverter overheats.' },
      { q: 'How much does a Prius inverter water pump cost?', a: 'Typical installed pricing is $350–$700 at an independent shop, depending on the model and pump. A dealer is usually higher.' },
      { q: 'Can I drive with P0A93?', a: 'Only to a safe place. The car is protecting the inverter. Continued driving can overheat it and turn a pump job into an inverter replacement.' },
      { q: 'How long does the replacement take?', a: 'Most inverter water pump replacements are same-day or next-day. We confirm when we quote.' },
      { q: 'Is it covered by warranty?', a: 'The pump and labor carry a written warranty. The term depends on the part used and is stated on your estimate.' },
      { q: 'How often should the coolant be changed?', a: 'Follow the manufacturer interval for your model. Inland heat and high mileage are reasons to inspect the coolant and pump sooner.' },
    ],
    related: [
      { label: 'Prius inverter water pump symptoms', href: '/signs-your-prius-inverter-water-pump-is-failing/' },
      { label: 'Hybrid inverter failure symptoms', href: '/prius-inverter-failure-symptoms-you-should-never-ignore/' },
      { label: 'Inverter and brake actuator repair', href: '/inverter-brake-actuator-repair/' },
      { label: 'High-voltage system repair', href: '/high-voltage-system-repair/' },
      { label: 'Book a diagnostic', href: '/free-estimate/' },
    ],
  },

  'hybrid-transaxle-drivetrain-service': {
    slug: 'hybrid-transaxle-drivetrain-service',
    eyebrow: 'Transaxle & drivetrain',
    h1: 'Hybrid Transaxle & Drivetrain Service',
    metaTitle: 'Hybrid Transaxle & Drivetrain Repair in Upland, CA',
    metaDescription:
      'Hybrid transaxle repair, fluid service and drivetrain diagnostics in Upland. Whine, shudder, leak or no-move faults on Prius, Camry and Lexus hybrids.',
    image: '/wp-content/uploads/2025/05/drivetrain-repair.jpg',
    imageAlt: 'Hybrid transaxle and drivetrain service at Tip Top Hybrid',
    answer:
      'A hybrid transaxle combines the electric motors, a planetary gear set and the final drive in one housing. Whining, shuddering, leaking or a car that will not move can come from the transaxle, its bearings or the control system. Fluid condition and a road test tell us whether it needs service, a rebuild or replacement.',
    intro: [
      'A hybrid transaxle is not a conventional automatic. There are no clutch packs or bands in the usual sense. Two motor-generators and a planetary gear set blend engine and electric power, and the unit shares fluid with the final drive on many models.',
      'That makes diagnosis different. A noise may be a bearing, a fluid level issue or a motor-generator fault. We test before recommending a rebuild, because a transaxle is one of the most expensive parts on the car.',
    ],
    symptomsTitle: 'Signs of a transaxle or drivetrain problem',
    symptoms: [
      { title: 'Whine or hum that changes with speed', body: 'Bearing or gear wear. Note the speed and whether it changes in EV mode.' },
      { title: 'Shudder or clunk', body: 'Worn mounts, a driveshaft issue or internal wear. A road test localises it.' },
      { title: 'Fluid leak', body: 'Seals and gaskets age. A leak that reaches the fluid level turns into a much bigger repair.' },
      { title: 'Car will not move', body: 'Could be the transaxle, a motor-generator, the inverter or a control fault. Stop and call.' },
      { title: 'Metal in the fluid', body: 'A sign of internal wear. The pan and fluid tell the story.' },
      { title: 'Noise only in EV mode', body: 'Points toward the motor-generator or the transaxle rather than the engine.' },
    ],
    includedTitle: 'What the service includes',
    included: [
      'Road test and noise localisation',
      'Fluid level, condition and leak inspection',
      'Transaxle and motor-generator data review',
      'Mount, axle and driveshaft inspection',
      'Fluid service with the correct specification',
      'Rebuild or replacement options with warranty terms',
      'Post-repair road test and re-scan',
    ],
    pricingTitle: 'Typical transaxle costs',
    pricingNote: 'Market ranges, not a quote from us. Prices checked November 2026. Rebuild versus used versus new is the main variable.',
    pricing: [
      { item: 'Transaxle diagnostic', range: '$150–$300', detail: 'Road test, fluid check, scan and written findings.' },
      { item: 'Fluid service', range: '$150–$300', detail: 'Correct fluid and level, leak check.' },
      { item: 'Used transaxle, installed', range: '$1,200–$2,500', detail: 'Low-mileage unit with a limited warranty.' },
      { item: 'Rebuilt transaxle, installed', range: '$2,500–$4,500', detail: 'Rebuilt unit and labor, longer warranty.' },
      { item: 'New OEM transaxle', range: '$4,000–$7,000+', detail: 'Dealer-level part pricing.' },
    ],
    processTitle: 'How we diagnose a transaxle',
    process: [
      { title: 'Road test', body: 'We reproduce the noise or shudder and note speed, load and EV versus engine operation.' },
      { title: 'Check fluid and leaks', body: 'Level, colour, smell and metal content. A leak is cheaper to fix before the unit runs low.' },
      { title: 'Review live data', body: 'Motor-generator speeds, inverter data and codes separate a control fault from a mechanical one.' },
      { title: 'Quote the options', body: 'Service, repair, used or rebuilt, with the warranty and risk explained for each.' },
    ],
    modelsTitle: 'Models we service',
    models: ['Prius Gen 2', 'Prius Gen 3', 'Prius Gen 4', 'Prius Prime', 'Camry Hybrid', 'RAV4 Hybrid', 'Highlander Hybrid', 'Lexus CT 200h', 'Lexus ES 300h', 'Lexus RX 450h', 'Honda Accord Hybrid'],
    localTitle: 'Transaxle work around Upland',
    local: [
      'We serve Upland, Montclair, Claremont, Pomona, Rancho Cucamonga, Ontario, San Bernardino and Riverside. Stop-and-go on the 10 and the 210 works the drivetrain hard, and a small fluid leak can become a major repair in a few months.',
      'If a noise appears only at highway speed or only in EV mode, tell us when you book. That detail saves diagnostic time.',
    ],
    faqs: [
      { q: 'Do hybrid transaxles need fluid changes?', a: 'Yes. Follow the manufacturer interval for your model. The fluid still wears, and a leak can drop the level without a visible puddle under the car.' },
      { q: 'What does a hybrid transaxle cost to replace?', a: 'A used unit installed typically runs $1,200–$2,500. A rebuilt unit runs $2,500–$4,500, and a new OEM unit can exceed $4,000 depending on the model.' },
      { q: 'Can a transaxle be repaired instead of replaced?', a: 'Sometimes. Bearings, seals and some internal parts can be replaced. The decision depends on the failure and the condition of the rest of the unit.' },
      { q: 'Is a whining noise always the transaxle?', a: 'No. Tires, wheel bearings, the engine and the motor-generators can all whine. A road test and live data localise it.' },
      { q: 'Can I drive with a transaxle leak?', a: 'Short distances only, and check the level. If the unit runs low, bearing and gear damage can make it unrepairable.' },
      { q: 'How long does the repair take?', a: 'Fluid service is same-day. A transaxle replacement is usually several days depending on parts availability.' },
    ],
    related: [
      { label: 'What a hybrid transaxle does', href: '/what-is-a-hybrid-transaxle-and-why-does-it-fail/' },
      { label: 'What happens when a hybrid transaxle fails', href: '/what-does-a-hybrid-transaxle-do-when-it-fails/' },
      { label: 'What is a transaxle?', href: '/what-is-transaxle-in-a-car/' },
      { label: 'Hybrid engine and transmission replacement', href: '/hybrid-engine-transmission-replacement/' },
      { label: 'Book a diagnostic', href: '/free-estimate/' },
    ],
  },

  'hybrid-engine-transmission-replacement': {
    slug: 'hybrid-engine-transmission-replacement',
    eyebrow: 'Engine & transmission',
    h1: 'Hybrid Engine & Transmission Replacement',
    metaTitle: 'Hybrid Engine & Transmission Replacement in Upland, CA',
    metaDescription:
      'Prius head gasket, hybrid engine replacement and transmission repair in Upland. We diagnose coolant loss, knocking and no-start faults before quoting.',
    image: '/wp-content/uploads/2025/05/drivetrain-repair.jpg',
    imageAlt: 'Hybrid engine and transmission replacement at Tip Top Hybrid',
    answer:
      'Hybrid engine replacement is usually a head-gasket or cooling-failure story on a high-mileage Prius, not a sudden catastrophic failure. A used engine installed typically runs $2,000–$4,000; a rebuilt or new unit costs more. We pressure-test, scan and inspect before recommending an engine, because a coolant leak can look like a head gasket.',
    intro: [
      'Hybrid engines run less than a conventional engine at idle, but they still wear. On a Gen 3 Prius, the well-known head-gasket failure starts with coolant loss, a misfire or white smoke and ends with an engine that will not hold temperature. Catching it before it overheats saves the block.',
      'The transmission side is usually the transaxle, which we cover separately. This page is for engine replacement, head gasket work and the jobs that follow an overheating event.',
    ],
    symptomsTitle: 'Signs you may be facing engine work',
    symptoms: [
      { title: 'Coolant loss with no puddle', body: 'A head gasket or EGR cooler can consume coolant. A pressure test and combustion-gas test confirm it.' },
      { title: 'White smoke or sweet smell', body: 'Coolant burning in the exhaust. Stop driving and pressure-test before the engine overheats.' },
      { title: 'Misfire or rough running', body: 'A coolant-contaminated cylinder or a failing head gasket can set misfire codes.' },
      { title: 'Overheating', body: 'Even one hard overheat can warp a head. Do not keep driving to “see if it settles”.' },
      { title: 'Knocking or metal noise', body: 'Bottom-end wear. An oil sample and inspection tell you whether a rebuild or replacement is the right call.' },
      { title: 'No start after overheating', body: 'Could be mechanical, electrical or a hybrid system fault. Diagnose before replacing an engine.' },
    ],
    includedTitle: 'What the job includes',
    included: [
      'Cooling system pressure and combustion-gas testing',
      'Compression and leak-down testing',
      'Hybrid system scan and code review',
      'Head gasket, EGR and cooling repair options',
      'Used, rebuilt or new engine sourcing',
      'Engine replacement with correct hybrid-specific parts',
      'Post-install re-scan, coolant bleed and road test',
      'Written warranty terms on the engine and labor',
    ],
    pricingTitle: 'Typical engine and transmission costs',
    pricingNote: 'Market ranges, not a quote from us. Prices checked November 2026. Part source and warranty move the number more than labor.',
    pricing: [
      { item: 'Engine diagnostic and pressure test', range: '$150–$300', detail: 'Scan, pressure test, combustion-gas test, findings.' },
      { item: 'Head gasket repair', range: '$1,800–$3,500', detail: 'Depends on machine work and while-you-are-in parts.' },
      { item: 'Used engine, installed', range: '$2,000–$4,000', detail: 'Low-mileage unit with a limited warranty.' },
      { item: 'Rebuilt engine, installed', range: '$3,500–$6,000', detail: 'Longer warranty, higher cost.' },
      { item: 'Transaxle replacement', range: '$1,200–$4,500', detail: 'Used through rebuilt, installed.' },
    ],
    processTitle: 'How we decide',
    process: [
      { title: 'Confirm the failure', body: 'Pressure, combustion gas and compression tests tell us whether it is a gasket, a crack or wear.' },
      { title: 'Check the rest of the car', body: 'A high-mileage chassis, a tired transaxle or a weak battery changes whether a replacement makes sense.' },
      { title: 'Quote the options', body: 'Repair, used engine or rebuilt engine, each with warranty and turnaround.' },
      { title: 'Install and verify', body: 'Correct hybrid-specific parts, coolant bleed, re-scan and road test.' },
    ],
    modelsTitle: 'Models we service',
    models: ['Prius Gen 2', 'Prius Gen 3', 'Prius Gen 4', 'Prius c', 'Prius v', 'Prius Prime', 'Camry Hybrid', 'RAV4 Hybrid', 'Highlander Hybrid', 'Lexus CT 200h', 'Lexus ES 300h'],
    localTitle: 'Engine work in Upland',
    local: [
      'We serve Upland, Montclair, Claremont, Pomona, Rancho Cucamonga, Ontario, San Bernardino and Riverside. A Prius with a slow coolant leak is common here, and summer heat makes an overheating event more likely.',
      'If the coolant light comes on, stop and let the car cool. Driving to the next exit can turn a head gasket into a warped head and a much larger bill.',
    ],
    faqs: [
      { q: 'How much does a Prius engine replacement cost?', a: 'A used engine installed typically runs $2,000–$4,000. A rebuilt engine runs $3,500–$6,000. Head gasket repair is usually $1,800–$3,500 depending on machine work.' },
      { q: 'Is a head gasket failure common on a Prius?', a: 'It is a known issue on higher-mileage Gen 3 cars. Coolant loss, white smoke and a misfire are the usual signs. A pressure and combustion-gas test confirm it.' },
      { q: 'Can I drive with a blown head gasket?', a: 'No. Coolant can enter the cylinders and the engine can overheat quickly. Stop and arrange a tow.' },
      { q: 'Is a used engine a safe option?', a: 'It can be, if it is a low-mileage unit with a warranty and the installation is done correctly. We quote the warranty and risk for each option.' },
      { q: 'Do you replace transmissions too?', a: 'Yes. Most hybrids use a transaxle rather than a conventional transmission. We service and replace both, and explain which one your car has.' },
      { q: 'How long does the job take?', a: 'Head gasket work is usually several days. An engine replacement depends on sourcing and typically takes a week or more.' },
    ],
    related: [
      { label: 'Hybrid transaxle and drivetrain service', href: '/hybrid-transaxle-drivetrain-service/' },
      { label: 'What is a hybrid transaxle?', href: '/what-is-a-hybrid-transaxle-and-why-does-it-fail/' },
      { label: 'Toyota Camry hybrid problems', href: '/common-toyota-camry-hybrid-problems-and-how-to-fix-them/' },
      { label: '15 warning signs your hybrid needs service', href: '/15-warning-signs-your-hybrid-needs-immediate-service/' },
      { label: 'Book a diagnostic', href: '/free-estimate/' },
    ],
  },
};
