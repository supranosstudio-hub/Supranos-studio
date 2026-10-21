// Auto-extracted from the original AVST reader prototype.
// Edit this file directly to change season content — no backend involved.

export interface Episode {
  n: number;
  palette: { name: string; t1: string; t2: string; t3: string };
  te: string; en: string; week: string; mv: string;
  logline: string; reveal: string; problem: string; felt: string; focus: string;
  bookend: string; spine: string; refrain: string; refrainNote: string; refrainLevel: number;
  runners: string[];
  tentpole?: boolean;
  finale?: boolean;
}

export interface CastMember {
  id: string; name: string; short: string; age: number; role: string; job: string;
  mbti: string; sign: string; home: string; homeLine: string; flaw: string; look: string;
  tell: string; line: string; carries: string[]; img: string; accent: string;
}

export interface Satellite { id: string; name: string; role: string; note: string; img: string }

export interface Place { id: string; name: string; note: string; img: string }

export interface Rule { k: string; v: string }

export interface Movement { id: string; n: string; name: string; eps: number[]; board: string; note: string }

export const SHOW = {
    title: 'Aa Vesavi Selavulu Tarvata',
    titleEn: 'Finding Home After All This While',
    season: 'S01',
    episodes: 13,
    days: 40,
    format: '64 panels · 16 pages · 4 per page',
    thesis: 'Everyone is fine after he leaves. That is the moving part.',
    logline:
      'Five people share two houses and one balcony crossing for forty days. ' +
      'One of them is leaving. The season is the forty days.',
    place: 'Hyderabad',
    style:
      'Hand-painted single-pass watercolour washes over delicate ink linework. ' +
      'Muted warm earth palette, visible paper grain, generous negative space kept clear for lettering.',
    styleRef: 'Hirayasumi (Keigo Shinzo)-adjacent'
  };

export const MOVEMENTS: Movement[] = [
    {
      id: 'friction',
      n: 'I',
      name: 'Friction',
      eps: [1, 2, 3, 4],
      board: '#e9ebef',
      note: 'Four people who live together and do not yet know each other.'
    },
    {
      id: 'synergy',
      n: 'II',
      name: 'Synergy',
      eps: [5, 6, 7, 8],
      board: '#dcdfe5',
      note: 'The flat starts working. Nobody notices it happening.'
    },
    {
      id: 'ending',
      n: 'III',
      name: 'The Ending, Arriving Slowly',
      eps: [9, 10, 11, 12, 13],
      board: '#c9cdd6',
      note: 'Nothing gets worse. It just gets closer.'
    }
  ];

export const EPISODES: Episode[] = [
    {
      n: 1,
      palette: { name: 'Sodium & slate', t1: '#2E4A8F', t2: '#B5561E', t3: '#E0D8C6' },
      te: 'Intlo Dheyyam, Naaku Em Bhayyam',
      en: 'Ghost in the Room',
      week: 'Week 1 · Day 1',
      mv: 'friction',
      logline:
        'Anudeep lands in the city thrilled, is quietly deflated by the sleepy colony he is actually moving into, and survives one long night of three false ghosts — a cat, a neighbour, and a man with a torch.',
      reveal:
        'The house is not haunted. It is just full — and the ghost is the cousin upstairs who cannot bear being alone up there.',
      problem: 'The haunting misunderstanding.',
      felt: 'The relief of being let in.',
      focus: 'Anudeep',
      bookend: 'Integrated end gag',
      spine: 'Page 5, panel 18 — the hidden camera\'s red pinprick above the curtain rail. Unremarked.',
      refrain: 'Full conviction',
      refrainNote: '"Idi temporary. 2 years anthe."',
      refrainLevel: 5,
      runners: ['The wall calendar', 'Bujji', 'Deyyam Illu']
    },
    {
      n: 2,
      palette: { name: 'Dry tap', t1: '#2E5A88', t2: '#C99A5E', t3: '#DDE1DE' },
      te: 'Rules Levu, Neelu Levu',
      en: 'House Rules',
      week: 'Week 2',
      mv: 'friction',
      logline:
        'Four people spend a morning writing rules for a flat, break every one of them within an hour, and destroy the kitchen on the exact day there is no water — while the one man who could have warned them keeps forgetting to mention things.',
      reveal:
        'Jay is not a martyr silently doing everything. He outsources and delegates. His flaw is not overwork — it is that he never thinks to tell anyone.',
      problem: 'A rulebook nobody follows, a fridge full of traps, and no water.',
      felt: 'The particular embarrassment of effort nobody asked for.',
      focus: 'Anudeep',
      bookend: 'Cold open + post-credit stinger',
      spine: 'Page 7 — Kicha\'s "traps" monologue is him protecting a dressed set. He has been framing the flat for filming.',
      refrain: 'Flat. No comfort left in it',
      refrainNote: 'Said to a mop.',
      refrainLevel: 4,
      runners: ['The parking board', 'The Ameerpet trip', 'Muddamma', 'Pinky (introduced)']
    },
    {
      n: 3,
      palette: { name: 'Empty plate', t1: '#C98A3C', t2: '#7C9464', t3: '#E4D6BC' },
      te: 'Emaina Parledu',
      en: "Anything's Fine",
      week: 'Week 3',
      mv: 'friction',
      logline:
        'Everyone in the flat keeps asking the new boy what he wants to eat. He keeps saying it does not matter. By the end of the day it has cost him a meal, a friendship-shaped argument, and the last of his politeness — and he finally names one dish.',
      reveal:
        'Anudeep cannot state a preference. Not about food — about anything. A guest who states preferences is a guest who intends to stay, and he has decided not to be someone who stays.',
      problem: 'Nobody can feed him.',
      felt: 'The loneliness of being accommodated instead of known.',
      focus: 'Anudeep',
      bookend: 'Cold open',
      spine: 'Page 11 — Kicha starts filming the argument, then lowers the camera. First time he chooses not to.',
      refrain: 'A weapon. Said in anger',
      refrainNote: 'The only time it is used to hurt someone.',
      refrainLevel: 4,
      runners: ['The toothpaste tube', 'Jay\'s shift roster']
    },
    {
      n: 4,
      palette: { name: 'Bruise', t1: '#3A3F6E', t2: '#A85842', t3: '#DAD6E0' },
      te: 'Evadu Kottadu?',
      en: 'Who Hit Me?',
      week: 'Week 4',
      mv: 'friction',
      logline:
        'Suraj spends an entire day performing heroism to avoid telling Kicha he killed his story. Anudeep finally gets to Ameerpet and only half-succeeds. Everyone comes home, and a childhood hitting game exposes exactly who each of them is.',
      reveal:
        'Suraj avoids hard truths by being loud. He is not loyal by nature — he is loyal by effort.',
      problem: 'Nobody can work out who is hitting them.',
      felt: 'The first evening that feels like a household rather than a flat.',
      focus: 'Suraj, with Kicha underneath',
      bookend: 'End gag',
      spine: 'Pages 6 and 16 — Kicha\'s spiked story is the film\'s real subject, and his camera settles the game.',
      refrain: 'Absent',
      refrainNote: 'First omission.',
      refrainLevel: 0,
      runners: ['The wall calendar', 'The bench order', 'The newsroom (established)']
    },
    {
      n: 5,
      palette: { name: 'Pickle jar', t1: '#A8632B', t2: '#5E7350', t3: '#E7D2AC' },
      te: 'Maata Ledu, Debba Undi',
      en: 'No Words, Only Hits',
      week: 'Week 5',
      mv: 'synergy',
      logline:
        'Kicha bets he can lift something nobody has moved in thirty years. Two people say the same sentence at the same moment, a jinx is called, and by the time he actually does it the entire Kopitam is too busy arguing about the rules to look.',
      reveal:
        'Kicha can genuinely do it. He is not bluffing and never was. He lifts the thing — and the only person who sees is the one person who never doubted him.',
      problem: 'A jinx nobody can agree the rules of.',
      felt: 'Doing the thing, and not being seen doing it.',
      focus: 'Kicha, with Anudeep underneath',
      bookend: 'End gag + post-credit stinger',
      spine: 'Pages 13 and 16 — the camera was running and pointed the wrong way. He never checks it.',
      refrain: 'Absent',
      refrainNote: 'He is physically unable to say it.',
      refrainLevel: 0,
      runners: ['The pickle jar', 'The Honda Shine', 'Kirana Uncle\'s notebook', 'The tab']
    },
    {
      n: 6,
      palette: { name: 'Out of focus', t1: '#8A5AA0', t2: '#C97A54', t3: '#E9DECF' },
      te: 'Girlfriend Kavali Ra',
      en: 'I Want a Girlfriend',
      week: 'Week 6',
      mv: 'synergy',
      logline:
        'Kicha asks the flat\'s self-declared expert how a man lands a girl, and Suraj — to demonstrate — becomes the girl. The lesson is going adequately until Anudeep wanders in mid-scene without knowing a scene is running.',
      reveal:
        'Anudeep is good at this. Effortlessly. He has simply never once applied it, because using it would mean wanting something now.',
      problem: 'A rehearsal nobody can keep control of, and a field test nobody should have attempted.',
      felt: 'Everybody in this flat is bad at this. It is the only thing they have in common and it is enough.',
      focus: 'Kicha. Straight man rotates to Aishwarya',
      bookend: 'Cold open',
      spine: 'Page 12 — the phone has been propped against the pickle tumbler since the cold open, red light on. It caught panel 51. Kicha never watches it back.',
      refrain: 'A question, not a statement',
      refrainNote: 'Said once, walking half a step behind everyone.',
      refrainLevel: 2,
      runners: ['The specs', 'The 3-Act System', 'The Name Book', 'The dupatta']
    },
    {
      n: 7,
      palette: { name: 'One a.m.', t1: '#1C39BB', t2: '#C56A2C', t3: '#CDD6E8' },
      te: 'Aakali Ekkuva, Alochana Thakkuva',
      en: 'More Hunger, Less Thinking',
      week: 'Week 7',
      mv: 'synergy',
      logline:
        'A one a.m. craving becomes a four-man expedition across a city that has shut for the night. They ride past a man selling biryani out of a handi because they have somewhere better to be. Everything after that is the part where they find out.',
      reveal:
        'Kicha\'s recklessness is generosity wearing a costume. He will cross the entire city at one in the morning for a craving that is not his, and never say that is why.',
      problem: 'Everything is shut, one of them has read the paper, and the bike belongs to somebody who does not know it is out.',
      felt: 'Being fed by people who had no reason to feed you.',
      focus: 'Kicha on the surface. Suraj underneath',
      bookend: 'End gag',
      spine: 'Page 6, panel 23 — Kicha films the ride one-handed at forty kilometres an hour. Unusable. He keeps every second.',
      refrain: 'Does not appear',
      refrainNote: 'No beat quiet enough is left for it.',
      refrainLevel: 0,
      runners: ['The Honda Shine', 'Pinky\'s bike', 'The frame', 'Deyyam Illu (the name, paid)']
    },
    {
      n: 8,
      palette: { name: 'Holi', t1: '#1C39BB', t2: '#C0446A', t3: '#E0E4C5' },
      te: 'Rangu Ekkuva, Helmet Ledu',
      en: 'More Colour, No Helmet',
      week: 'Week 8',
      mv: 'synergy',
      tentpole: true,
      logline:
        'Kicha\'s revenge ambush on the colleague who carpools them to work turns out to be her ambush, planned three weeks earlier — and the payload meant for Suraj lands on Anudeep, who wanted no part of any of it.',
      reveal:
        'Anudeep ends up alone with Jay for an hour and it is easy. It is the first brick under the last scene of the series.',
      problem: 'A revenge plan that was always the other person\'s plan, a wrong target, and two blue men who confess to the wrong crime.',
      felt: 'Being somewhere loud and choosing the quiet room, and not being asked why.',
      focus: 'Suraj, Kicha and Pinky for comedy · Anudeep and Jay for everything else',
      bookend: 'Cold open + end gag + post-credit stinger',
      spine: 'Page 9, panel 34 — Kicha turns the camera on himself and films the sky. Two seconds, unusable. It is the only footage of Kicha in the entire documentary.',
      refrain: 'Jay says it for him. A diagnosis',
      refrainNote: 'The only time anyone names the refrain out loud. Anudeep does not respond.',
      refrainLevel: 3,
      runners: ['The blue handprint (new, permanent)', 'The poster wall', 'Padma Aunty', 'The challan']
    },
    {
      n: 9,
      palette: { name: 'Confessional', t1: '#6E6A54', t2: '#4E7A8A', t3: '#E0D8C6' },
      te: 'Evaru Ekkuva Close?',
      en: "Who's Closest?",
      week: 'Week 9',
      mv: 'ending',
      logline:
        'A visa mock-interview at Kopitam turns into a worse question — who is closest to who — and the group realises, while answering it, that they forgot the quiet one is in the group.',
      reveal:
        'The interviews are Kicha\'s. He set the camera up, he asked the questions, and he is in the last one himself, answering to an empty chair.',
      problem: 'A question that cannot be answered without hurting somebody, being answered five times.',
      felt: 'Learning you are not the centre of anyone\'s story, and being completely fine.',
      focus: 'Ensemble. The one episode with no lead',
      bookend: 'Cold open',
      spine: 'Page 9, panel 35 — Aishwarya invents "separate confessionals so people tell the truth", describing Kicha\'s entire method back to him. The camera was already running.',
      refrain: 'Absent from the one frame built for it',
      refrainNote: 'He had the perfect setup and chose "grateful" instead.',
      refrainLevel: 0,
      runners: ['The bench order', 'The pickle tumbler', 'The ₹100 debt', 'Kicha\'s camera']
    },
    {
      n: 10,
      palette: { name: 'Four a.m.', t1: '#3A4E7A', t2: '#7A5E8A', t3: '#D6DCD2' },
      te: 'Ee Okka Chotu',
      en: 'This One Place',
      week: 'Week 10',
      mv: 'ending',
      logline:
        'The flat throws a night. It runs long, it runs loud, and at four in the morning Jay comes off the night shift into a house full of people and says the only sentence he has ever raised his voice to say.',
      reveal:
        'Jay\'s night shift started for his parents, then continued for a woman leaving for the US. Both reasons are gone, and he still works nights, and he no longer knows why.',
      problem: 'One party that will not end, and one man kept awake by the wrong thing entirely.',
      felt: 'Two people who are both leaving something behind, awake in the dark, saying just enough.',
      focus: 'Jay. Straight man rotates to Anudeep',
      bookend: 'Cold open + post-credit stinger',
      spine: 'Page 12, panel 47 — Kicha raises the camera mid-confession. Jay says "aapu." He lowers it. The only time anyone tells him to stop, and the only time he obeys.',
      refrain: 'Absent',
      refrainNote: 'After what he hears in the dark, he cannot say it.',
      refrainLevel: 0,
      runners: ['Jay\'s door', 'The photograph on the sill', 'The shift roster', 'The wobbling fan']
    },
    {
      n: 11,
      palette: { name: 'Loose change', t1: '#B5561E', t2: '#8A6A3C', t3: '#D8DEE8' },
      te: 'Vachindi',
      en: 'It Came',
      week: 'Week 11',
      mv: 'ending',
      logline:
        'Suraj wins a dosa challenge and a cash box full of coins he refuses to touch. Kicha takes it instead and bets Ravi anna a week of free breakfast on the total — then fails to reach the end of the number four times in one day, while the man beside him goes to be given a number of his own.',
      reveal:
        'Anudeep told exactly one person what today was. Not the friends he came for. Jay. And Jay carried it all day and told nobody.',
      problem: 'A cash box of coins, a bet riding on the total, and a man who cannot get to the end of a number.',
      felt: 'They celebrated him for eleven hours before they knew what for.',
      focus: 'Kicha on the surface. Anudeep underneath',
      bookend: 'Cold open',
      spine: 'Page 9, panel 36 — Kicha says he put a camera in the flat, in the middle of a joke, at forty kilometres an hour. Nobody follows it up.',
      refrain: 'Attempted. Stopped by a hand. Retired',
      refrainNote: 'Never spoken again in the series.',
      refrainLevel: 1,
      runners: ['The abandoned slipper', 'Ravi anna', 'The wall calendar', 'The bench order']
    },
    {
      n: 12,
      palette: { name: 'Balloon', t1: '#A05070', t2: '#5E8A5A', t3: '#E7D2AC' },
      te: 'Saamanlu',
      en: 'The Things',
      week: 'Week 12',
      mv: 'ending',
      logline:
        'Three of them go shopping for a departure. Two of them stay home with a cold and deliver a baby. By four o\'clock the shopping party is down to two people and a coffee — and by nine, everyone is laughing, and one person is not laughing about what they think she is.',
      reveal: 'Aishwarya has something to say and does not say it. The reader knows. He never will.',
      problem: 'A suitcase\'s worth of things and a shrinking number of people.',
      felt: 'The specific silence of choosing not to speak.',
      focus: 'Aishwarya, with Suraj underneath',
      bookend: 'Cold open',
      spine: 'Page 2 — the patient chart is a torn-out page of the Case File. The old heading still visible, scratched out.',
      refrain: 'Absent. He has stopped entirely',
      refrainNote: '',
      refrainLevel: 0,
      runners: ['Doctor Saroja', 'The Case File', 'The balloon']
    },
    {
      n: 13,
      palette: { name: 'Escalator', t1: '#3A4E6A', t2: '#9A7A4A', t3: '#DCE0E6' },
      te: 'Repu',
      en: 'Tomorrow',
      week: 'Week 12 · Day 40',
      mv: 'ending',
      finale: true,
      logline:
        'The last day. He clears security into an airport gone impossibly quiet — and on a silent escalator, for the first time, the plan feels like a question. Then his phone lights up with a story the three of them posted.',
      reveal:
        'He does not say "idi temporary" once. The absence is the reveal, and nobody notices, because the only person who could have is the one who stopped saying it.',
      problem: 'There is nothing left to do and eleven hours to do it in.',
      felt: 'Four people come home to a flat that is exactly the same and cannot sit down in it.',
      focus: 'All five. Nobody\'s episode. That is the point',
      bookend: 'Cold open + coda',
      spine: 'The video. Kicha filmed all season and could never say a true thing out loud, so the payload is shown, not spoken.',
      refrain: 'Never said. Not once, by anyone',
      refrainNote: '',
      refrainLevel: 0,
      runners: ['The frame (retired)', 'The wall calendar (retired)', 'The camera (becomes the video)']
    }
  ];

export const CAST: CastMember[] = [
    {
      id: 'anudeep',
      name: 'Anudeep Nadella',
      short: 'Anudeep',
      age: 21,
      role: 'The one who is leaving',
      job: 'Graduate student · 40 days out',
      mbti: 'INFJ',
      sign: 'Virgo',
      home: 'Future',
      homeLine: 'Believes life starts after he leaves. Everything now is temporary.',
      flaw: 'Overthinks everything',
      look: 'Neat collared shirts, a watch, clean shoes he is trying to keep clean. Loosens visibly across the season.',
      tell: 'Takes his glasses off when he is brave. Cannot see a face past two feet without them.',
      line: 'Idi temporary. 2 years anthe.',
      carries: ['Passport folder', 'Charger', 'A plan', 'An exit date'],
      img: '/images/avst/img001.webp',
      accent: '#2F5DE0'
    },
    {
      id: 'suraj',
      name: 'Suraj Babu Reddy',
      short: 'Suraj',
      age: 22,
      role: 'The one who fills the room',
      job: 'Editorial desk · Telugu news channel',
      mbti: 'ESFP',
      sign: 'Leo',
      home: 'Family',
      homeLine: 'The joint-family kid who rebuilds family wherever he lands.',
      flaw: 'Avoids the hard sentence by being louder',
      look: 'Loud fits, statement shirts, a signature walk per emotion. Never still.',
      tell: 'Gets louder to hide sadness. It has never once worked.',
      line: 'Idi… gate. Idi gate ra. Gate ante gate.',
      carries: ['A bit', 'An audience', 'Somebody else\'s business'],
      img: '/images/avst/img002.webp',
      accent: '#E4873C'
    },
    {
      id: 'kicha',
      name: 'Karthik "Kicha" Varma',
      short: 'Kicha',
      age: 22,
      role: 'The one holding the camera',
      job: 'Crime desk, field · never gets a byline',
      mbti: 'ENTP',
      sign: 'Gemini',
      home: 'Recognition',
      homeLine: 'Wants, desperately, to be seen as the genius he is sure he is.',
      flaw: 'Escalates instead of stopping',
      look: 'Grubby hoodie, low ponytail, cargo pockets full of evidence.',
      tell: 'Has been filming everything since episode one. The series title is his film\'s title.',
      line: 'Evidence. Vehicle. Unidentified.',
      carries: ['The camera', 'The Case File', 'One theory too far'],
      img: '/images/avst/img003.webp',
      accent: '#C0453B'
    },
    {
      id: 'aishwarya',
      name: 'Aishwarya Guntupalli',
      short: 'Aishwarya',
      age: 23,
      role: 'The one who comes over the railing',
      job: 'Architect · real estate',
      mbti: 'ENTJ',
      sign: 'Capricorn',
      home: 'Belonging',
      homeLine: 'The most competent one, held by no one. Manages everyone, belongs to nothing.',
      flaw: 'Will not ask for the thing she gives everyone else',
      look: 'Oversized hoodie, cargos, hair up. Always physically ready to move.',
      tell: 'Crosses a 250mm gap between two balconies like it is a doorway. It is, to her.',
      line: '(says nothing, at exactly the wrong moment)',
      carries: ['Blueprint', 'Measuring tape', 'Chipped enamel mug', 'Mechanical pencil'],
      img: '/images/avst/img004.webp',
      accent: '#5C7A4A'
    },
    {
      id: 'jay',
      name: 'Jay Ram Bhalla',
      short: 'Jay',
      age: 26,
      role: 'The one who stays',
      job: 'Night shift · reason expired',
      mbti: 'ISFP',
      sign: 'Pisces',
      home: 'Peace',
      homeLine: 'Built a quiet fortress of routine to stop hurting.',
      flaw: 'Never thinks to tell anyone anything',
      look: 'Black tee, grey trackpants, over-ear headphones round the neck. Barefoot at home.',
      tell: 'Mentors by presence. One sentence, then silence.',
      line: 'Ee okka chotu naaku nishabdam.',
      carries: ['A shift roster', 'Coffee, always', 'A photograph, edge-on'],
      img: '/images/avst/img005.webp',
      accent: '#6C7A86'
    }
  ];

export const SATELLITES: Satellite[] = [
    {
      id: 'pinky',
      name: 'Priyanka "Pinky"',
      role: 'Rival desk · carpool',
      note: 'Gets the stories Kicha\'s desk loses. Better at it than Suraj, which is why he cannot stand her.',
      img: '/images/avst/img006.webp'
    },
    {
      id: 'muddamma',
      name: 'Muddamma',
      role: 'Ground floor · arrives around noon',
      note: 'A capable woman in her forties who has seen the fridge and made her peace with it.',
      img: '/images/avst/img007.webp'
    },
    {
      id: 'ravi',
      name: 'Ravi anna',
      role: 'Kopitam · waiter',
      note: 'Named, not developed. Drawn three-quarter or from behind. Three lines an episode, maximum.',
      img: '/images/avst/img008.webp'
    },
    {
      id: 'sethji',
      name: 'Seth Ji',
      role: 'Kopitam · owner',
      note: 'Speaks in numbers. Has never completed a sentence that was not a total.',
      img: '/images/avst/img009.webp'
    },
    {
      id: 'bujji',
      name: 'Bujji',
      role: 'Brown-grey tabby · no fixed address',
      note: 'Aishwarya\'s cat. Lives half in the boys\' flat. Pays rent in neither. Wins every negotiation.',
      img: '/images/avst/img010.webp'
    }
  ];

export const PLACES: Place[] = [
    {
      id: 'houses',
      name: 'The two houses',
      note: 'Jay\'s stilt-ground house and Aishwarya\'s duplex villa, shoulder to shoulder.',
      img: '/images/avst/img011.webp'
    },
    {
      id: 'balconies',
      name: 'The crossing',
      note: 'Where the L-turn of one balcony meets a first-floor slab, 250mm apart and slightly higher. The whole show routes through this gap.',
      img: '/images/avst/img012.webp'
    },
    {
      id: 'hall',
      name: 'Deyyam Illu',
      note: 'The boys\' flat. Named in Episode 7, in passing, and never explained again.',
      img: '/images/avst/img013.webp'
    },
    {
      id: 'anudeep-room',
      name: 'The storeroom',
      note: 'Anudeep\'s room. It was a storeroom on the first day and stays shaped like one.',
      img: '/images/avst/img014.webp'
    },
    {
      id: 'sk-room',
      name: 'The edit bay',
      note: 'Suraj and Kicha\'s room. One cork board that is not a joke.',
      img: '/images/avst/img015.webp'
    },
    {
      id: 'jays-house',
      name: 'Upstairs',
      note: 'Jay\'s floor. The incense, the door, the photograph on the sill.',
      img: '/images/avst/img016.webp'
    },
    {
      id: 'kopitam-ext',
      name: 'Kosmo Kopi Tiam',
      note: 'Three shops under one iron shade. The bandi arrives after noon.',
      img: '/images/avst/img017.webp'
    },
    {
      id: 'kopitam-int',
      name: 'The bench order',
      note: 'Established on-page in Episode 5. Nobody sits anywhere else after that.',
      img: '/images/avst/img018.webp'
    }
  ];

export const RULES: Rule[] = [
    {
      k: 'One in, one out',
      v: 'Every episode permanently reveals one small new thing about a character, and temporarily creates one new problem.'
    },
    {
      k: 'Bookends',
      v: 'A cold open or an end gag. Never both. Episode 8 is the single exception and it earned it.'
    },
    {
      k: 'Never a joke after a feeling',
      v: 'If the last beat lands soft, nothing follows it.'
    },
    {
      k: 'Stingers are not jokes',
      v: 'Three to five panels after the credits. Never a punchline.'
    },
    {
      k: 'Nobody explains themselves',
      v: 'No character states their own feeling out loud. The art carries it or it does not exist.'
    },
    {
      k: 'The brand rule',
      v: 'Real products become invented ones. BLURR cola is the house standard.'
    }
  ];

export const INFLUENCES: string[] = [
    'Premalu',
    'Hirayasumi',
    'Daily Lives of High School Boys',
    'Horimiya',
    'Takagi-san',
    "That '70s Show",
    'Doraemon',
    'Telugu Medium'
  ];

