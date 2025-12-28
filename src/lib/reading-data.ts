export interface Book {
    t: string; // title
    a: string; // author
    w: string; // why
}

export interface Module {
    title: string;
    desc: string;
    books: Book[];
}

export interface Persona {
    id: string;
    name: string;
    icon: string;
    color: string;
    hex: string;
    bgHex: string;
    vibe: string;
    goal: string;
    stats: number[];
    modules: Module[];
}

export const curriculumData: Persona[] = [
    {
        id: "strategist",
        name: "The Narrative Strategist",
        icon: "fa-chess-king",
        color: "red",
        hex: "#9B2C2C", // Burgundy
        bgHex: "rgba(155, 44, 44, 0.2)",
        vibe: "The New Yorker meets the Boardroom.",
        goal: "To understand the world through the lens of power, history, and biography rather than dry theory.",
        stats: [95, 80, 60, 70, 90], // [Power, Logic, Empathy, Vision, Influence]
        modules: [
            {
                title: "1. The Titans of Industry",
                desc: "Study the lives of those who built empires to understand leverage and will.",
                books: [
                    { t: "The Fish That Ate the Whale", a: "Rich Cohen", w: "He toppled governments just to sell bananas. You think you have limits? You don't. Pure hustle." },
                    { t: "Titan", a: "Ron Chernow", w: "Patience. Compounding. Monopoly. He built a machine, not just a company. Study the machine." },
                    { t: "The House of Morgan", a: "Ron Chernow", w: "The modern world was built by this family. You need to know how the plumbing of finance works." },
                    { t: "The Snowball", a: "Alice Schroeder", w: "He bets on truth. He ignores the noise. Be rational when everyone else is crazy." },
                    { t: "The Ride of a Lifetime", a: "Bob Iger", w: "Ego kills companies. He put his ego aside and bought Pixar, Marvel, Star Wars. That is strength." },
                    { t: "King of Oil", a: "Daniel Ammann", w: "The world runs on oil. These guys controlled the flow. Understand the supply chain, understand the world." },
                    { t: "Personal History", a: "Katharine Graham", w: "She was terrified, but she led anyway. Leadership isn't about not being scared. It's about acting." },
                    { t: "Pour Your Heart Into It", a: "Howard Schultz", w: "He built a giant with a soul. That is incredibly hard. Scale usually kills culture. Don't let it." },
                    { t: "Grinding It Out", a: "Ray Kroc", w: "He wasn't a genius. He just worked harder than everyone else. Persistence is the only magic." },
                    { t: "Sam Walton: Made in America", a: "Sam Walton", w: "He stayed cheap. He listened to the customer. He ignored Wall Street. Humility wins." },
                    { t: "Losing the Signal", a: "Jacquie McNish", w: "They had it all. They got comfortable. They died. Never, ever get comfortable." },
                    { t: "Hatching Twitter", a: "Nick Bilton", w: "It looked like a rocket ship. Inside, it was a clown car. Reality is messy. Embrace the mess." }
                ]
            },
            {
                title: "2. The Architecture of Power",
                desc: "Understanding how political capital is accumulated and spent.",
                books: [
                    { t: "The Power Broker", a: "Robert Caro", w: "You want to build big things? You need to understand power. This is the bible of getting it done." },
                    { t: "Master of the Senate", a: "Robert Caro", w: "He turned a boring room into a weapon. It's about leverage. Find the leverage." },
                    { t: "Napoleon: A Life", a: "Andrew Roberts", w: "Ambition. Pure, unfiltered ambition. See how far a single human will can actually go." },
                    { t: "Grant", a: "Ron Chernow", w: "He was a failure. Then he saved the Union. Life is long. You can always come back." },
                    { t: "Team of Rivals", a: "Doris Kearns Goodwin", w: "Don't hire friends. Hire people better than you. Even if they hate you. That's how you win." },
                    { t: "Leonardo da Vinci", a: "Walter Isaacson", w: "Art and science are the same thing. Be curious about everything. Everything connects." },
                    { t: "Kissinger", a: "Walter Isaacson", w: "The world is messy. Sometimes you have to make hard choices to keep the peace. Grow up and see it." },
                    { t: "The Wise Men", a: "Isaacson & Thomas", w: "A few friends designed the post-war world. Never underestimate a small group of smart people." },
                    { t: "Lee Kuan Yew", a: "Memoirs", w: "He took a swamp and made it a spaceship. He didn't make excuses. He built." },
                    { t: "Churchill: Walking with Destiny", a: "Andrew Roberts", w: "Words are weapons. When all was lost, he used the English language to save civilization." },
                    { t: "Caesar: Life of a Colossus", a: "Adrian Goldsworthy", w: "He crossed the line when nobody else dared. But watch out—ambition has a price." },
                    { t: "Alexander Hamilton", a: "Ron Chernow", w: "He built the financial system from scratch. He wrote his way out of poverty. Write your future." }
                ]
            },
            {
                title: "3. High-Stakes Storytelling",
                desc: "Narrative non-fiction journalism that reads like a thriller.",
                books: [
                    { t: "Empire of Pain", a: "Patrick Radden Keefe", w: "They built a dynasty on pain. It shows you what happens when profit eats ethics. Don't be them." },
                    { t: "Say Nothing", a: "Patrick Radden Keefe", w: "History isn't just dates. It's people, trauma, and memory. Understand the human cost." },
                    { t: "The Rogues", a: "Patrick Radden Keefe", w: "Rebels and grifters. It's fun, but it teaches you to spot the fakes." },
                    { t: "Barbarians at the Gate", a: "Bryan Burrough", w: "Greed. Ego. The 80s. It's a masterclass in what happens when money becomes the only goal." },
                    { t: "Liar's Poker", a: "Michael Lewis", w: "Wall Street isn't smarter than you. It's just louder. See through the noise." },
                    { t: "The Big Short", a: "Michael Lewis", w: "The whole world was wrong. A few guys were right. Be the one who actually looks at the data." },
                    { t: "The Wager", a: "David Grann", w: "When the ship sinks, who are you? Civilization is thin. Character is everything." },
                    { t: "Killers of the Flower Moon", a: "David Grann", w: "Evil exists. It hides in plain sight. Open your eyes." },
                    { t: "Red Notice", a: "Bill Browder", w: "You think business is just spreadsheets? Sometimes it's life or death. Be brave." },
                    { t: "Freezing Order", a: "Bill Browder", w: "They tried to stop him. He kept going. Follow the money, find the truth." },
                    { t: "The Smartest Guys in the Room", a: "Bethany McLean", w: "They thought they were the smartest guys in the room. They were just arrogant. Don't be arrogant." },
                    { t: "Too Big to Fail", a: "Andrew Ross Sorkin", w: "The system almost collapsed. Understand how fragile the machine actually is." }
                ]
            },
            {
                title: "4. Strategy & Decision Making",
                desc: "The applied history and mental models behind the stories.",
                books: [
                    { t: "Finite and Infinite Games", a: "James Carse", w: "Are you playing to win, or playing to keep playing? Build a company for the infinite game." },
                    { t: "Thinking in Bets", a: "Annie Duke", w: "Life is poker, not chess. You don't have all the info. Make the best bet and move on." },
                    { t: "Superforecasting", a: "Philip Tetlock", w: "Experts are guessing. You can do better. Learn to update your beliefs when facts change." },
                    { t: "The Outsiders", a: "William Thorndike", w: "CEOs love press. These guys loved cash flow. Focus on the result, not the fame." },
                    { t: "7 Powers", a: "Hamilton Helmer", w: "If you don't have a moat, you don't have a business. Memorize these seven advantages." },
                    { t: "Competition Demystified", a: "Bruce Greenwald", w: "Business is war. If it's easy to enter your market, you're dead. Build walls." },
                    { t: "Good Strategy Bad Strategy", a: "Richard Rumelt", w: "Most strategy is just fluff. Real strategy is solving the hardest problem. Do that." },
                    { t: "The Black Swan", a: "Nassim Nicholas Taleb", w: "The thing that kills you is the thing you never saw coming. Survive the impossible." },
                    { t: "Fooled by Randomness", a: "Nassim Nicholas Taleb", w: "You got lucky. Don't confuse it with being smart. Stay humble." },
                    { t: "Skin in the Game", a: "Nassim Nicholas Taleb", w: "Never trust a person who doesn't lose when they're wrong. Risk is the only truth." },
                    { t: "Antifragile", a: "Nassim Nicholas Taleb", w: "Don't just survive stress. Get stronger from it. Be the thing that loves the chaos." },
                    { t: "The Bed of Procrustes", a: "Nassim Nicholas Taleb", w: "Modern life tries to fit you into a box. Break the box." }
                ]
            },
            {
                title: "5. Survival & Extremes",
                desc: "Leadership when everything goes wrong.",
                books: [
                    { t: "Endurance", a: "Alfred Lansing", w: "They were stuck in hell on ice. They didn't quit. If they can survive that, you can survive this." },
                    { t: "Into Thin Air", a: "Jon Krakauer", w: "They kept climbing because they spent the money. Sunk cost kills. Know when to turn back." },
                    { t: "Touching the Void", a: "Joe Simpson", w: "He was left for dead. He crawled home. The human spirit is unbreakable. Believe it." },
                    { t: "Man's Search for Meaning", a: "Viktor Frankl", w: "You can lose everything but your mind. Find a purpose, and you can survive anything." },
                    { t: "Unbroken", a: "Laura Hillenbrand", w: "Pain is temporary. Quitting lasts forever. This guy just refused to break." },
                    { t: "The Splendid and the Vile", a: "Erik Larson", w: "Bombs were falling every night. He kept working. Keep working." },
                    { t: "Dead Wake", a: "Erik Larson", w: "Technology fails. Arrogance sinks ships. Respect the ocean. Respect the risk." },
                    { t: "Midnight in Chernobyl", a: "Adam Higginbotham", w: "Lies destroy systems. When you hide the truth, it explodes. Tell the truth." },
                    { t: "Alive", a: "Piers Paul Read", w: "They did the unthinkable to survive. Life wants to live. It's powerful." },
                    { t: "Skeletons on the Zahara", a: "Dean King", w: "The desert doesn't care about you. Resilience is your only weapon." },
                    { t: "River of Doubt", a: "Candice Millard", w: "A President almost died in a jungle. Adventure is dangerous. Do it anyway." },
                    { t: "Destiny of the Republic", a: "Candice Millard", w: "Doctors killed him because they wouldn't wash their hands. Question the experts." }
                ]
            }
        ]
    },
    {
        id: "founder",
        name: "The Contrarian Founder",
        icon: "fa-rocket",
        color: "blue",
        hex: "#2C5282", // Navy
        bgHex: "rgba(44, 82, 130, 0.2)",
        vibe: "Silicon Valley War Room.",
        goal: "Operational resilience, systems thinking, and contrarian truth-seeking.",
        stats: [80, 95, 40, 85, 70],
        modules: [
            {
                title: "1. The Operator's Manual",
                desc: "Hard management and execution.",
                books: [
                    { t: "The Hard Thing About Hard Things", a: "Ben Horowitz", w: "School is over. This is the real world. This tells you what to do when everything is burning." },
                    { t: "High Output Management", a: "Andrew Grove", w: "Output. Leverage. Throughput. This is the physics of management. Study it." },
                    { t: "Only the Paranoid Survive", a: "Andrew Grove", w: "Success breeds complacency. Only the paranoid survive. Always be looking for the cliff." },
                    { t: "The Effective Executive", a: "Peter Drucker", w: "Stop being busy. Start being effective. There is a huge difference. Focus on the output." },
                    { t: "Measure What Matters", a: "John Doerr", w: "If you can't measure it, it doesn't exist. Get everyone moving the same way." },
                    { t: "Working Backwards", a: "Colin Bryar", w: "Amazon doesn't use PowerPoint. They write memos. Clear writing is clear thinking. Think clearly." },
                    { t: "No Rules Rules", a: "Reed Hastings", w: "Talent density. Get the best people, pay them top of market, and get out of their way." },
                    { t: "Amp It Up", a: "Frank Slootman", w: "Move faster. Raise the standards. Most people accept mediocrity. Don't accept it." },
                    { t: "Build", a: "Tony Fadell", w: "He built the iPod. He knows how to make things people love. It's about the details." },
                    { t: "Trillion Dollar Coach", a: "Eric Schmidt", w: "The best CEOs have a coach. You can't see your own swing. Get help." },
                    { t: "Venture Deals", a: "Brad Feld", w: "Don't get tricked by the money guys. Understand the term sheet. Protect your equity." },
                    { t: "Secrets of Sand Hill Road", a: "Scott Kupor", w: "VCs follow patterns. Know what they want before you walk in the room." }
                ]
            },
            {
                title: "2. Systems & Innovation",
                desc: "The mechanics of scaling and disruption.",
                books: [
                    { t: "The Innovator's Dilemma", a: "Clayton Christensen", w: "Doing everything 'right' can still kill your company. Disruption is inevitable. Be the disruption." },
                    { t: "Crossing the Chasm", a: "Geoffrey Moore", w: "Early adopters are easy. The mainstream is hard. This is how you cross that gap." },
                    { t: "Blue Ocean Strategy", a: "W. Chan Kim", w: "Stop fighting in a crowded pool. Go where nobody else is. Find the open water." },
                    { t: "The Lean Startup", a: "Eric Ries", w: "Don't guess. Experiment. Treat your business like a science lab. Fail fast." },
                    { t: "Loonshots", a: "Safi Bahcall", w: "Crazy ideas change the world. You need a system to protect them from the suits." },
                    { t: "The Goal", a: "Eliyahu Goldratt", w: "Find the bottleneck. Fix the bottleneck. Everything else is a waste of time." },
                    { t: "Thinking in Systems", a: "Donella Meadows", w: "The world isn't a line; it's a loop. Understand feedback loops or get crushed by them." },
                    { t: "Scale", a: "Geoffrey West", w: "Companies die. Cities survive. Understand the math of growth and death." },
                    { t: "Complexity: A Guided Tour", a: "Melanie Mitchell", w: "Chaos has a pattern. Learn how order comes from nothing. It's beautiful." },
                    { t: "Algorithm Design Manual", a: "Steven Skiena", w: "Think like a computer. Efficiency matters. Sharpen your logic." },
                    { t: "The Mythical Man-Month", a: "Frederick Brooks", w: "Adding more people to a late project makes it later. It's a law of physics. Remember it." },
                    { t: "The Design of Everyday Things", a: "Don Norman", w: "If you can't figure it out, it's bad design. Empathy for the user is everything." }
                ]
            },
            {
                title: "3. The Contrarian Worldview",
                desc: "Philosophy and rationality.",
                books: [
                    { t: "Poor Charlie's Almanack", a: "Charlie Munger", w: "He's smarter than you. Listen to him. Invert, always invert. Avoid stupidity." },
                    { t: "Seeking Wisdom", a: "Peter Bevelin", w: "Darwin and Munger in one book. It's a cheat code for thinking clearly." },
                    { t: "The Sovereign Individual", a: "James Dale Davidson", w: "They predicted Bitcoin in 1997. Understand where the digital world is actually going." },
                    { t: "The Fountainhead", a: "Ayn Rand", w: "Do not compromise. Build what you believe in. The mob is usually wrong." },
                    { t: "Atlas Shrugged", a: "Ayn Rand", w: "Production drives the world. Be a producer, not a looter." },
                    { t: "The Lessons of History", a: "Will & Ariel Durant", w: "Human nature hasn't changed in 5,000 years. Read this and stop being surprised." },
                    { t: "The Beginning of Infinity", a: "David Deutsch", w: "Problems are inevitable. Problems are soluble. We can figure anything out." },
                    { t: "The Fabric of Reality", a: "David Deutsch", w: "Quantum physics, evolution, computation. It's all one thing. Expand your mind." },
                    { t: "Rationality", a: "Steven Pinker", w: "Your brain has bugs. Learn logic. Learn probability. Stop being irrational." },
                    { t: "Enlightenment Now", a: "Steven Pinker", w: "The world is getting better. Don't be a pessimist. Look at the data." },
                    { t: "Stubborn Attachments", a: "Tyler Cowen", w: "Growth solves problems. We have a moral duty to grow the economy. Build faster." },
                    { t: "Things Hidden...", a: "René Girard", w: "You want things because other people want them. Break the cycle of imitation." }
                ]
            },
            {
                title: "4. Evolutionary Reality",
                desc: "Understanding biological systems and competition.",
                books: [
                    { t: "The Selfish Gene", a: "Richard Dawkins", w: "You are just a vehicle for your genes. Understand the code that drives you." },
                    { t: "The Red Queen", a: "Matt Ridley", w: "You have to run just to stay in the same place. Evolution never stops. Keep running." },
                    { t: "The Evolution of Everything", a: "Matt Ridley", w: "No one is in charge. Order emerges from the bottom up. Trust the process." },
                    { t: "Guns, Germs, and Steel", a: "Jared Diamond", w: "It's not about race. It's about geography. Understand the hand you were dealt." },
                    { t: "Collapse", a: "Jared Diamond", w: "Societies choose to fail. Don't make the same mistakes. Adapt or die." },
                    { t: "Sapiens", a: "Yuval Noah Harari", w: "Money is a story. Nations are stories. We rule the world because we can tell lies." },
                    { t: "Homo Deus", a: "Yuval Noah Harari", w: "What happens when we solve hunger and war? We chase immortality. Get ready." },
                    { t: "The Vital Question", a: "Nick Lane", w: "Energy is everything. Life is just chemistry fighting entropy. Understand the energy." },
                    { t: "Who We Are and How We Got Here", a: "David Reich", w: "We are all mixed. Ancient DNA tells the truth. History is migration." },
                    { t: "Behave", a: "Robert Sapolsky", w: "It's not good or evil. It's biology. It's hormones. Understand the machine inside you." },
                    { t: "Determined", a: "Robert Sapolsky", w: "Maybe you don't have free will. That's a scary thought. Confront it." },
                    { t: "The Moral Animal", a: "Robert Wright", w: "Your feelings are just evolutionary tools. Don't trust them blindly. Analyze them." }
                ]
            },
            {
                title: "5. Modern Geopolitics & Tech",
                desc: "The current battlefield.",
                books: [
                    { t: "Chip War", a: "Chris Miller", w: "Chips are the new oil. If you can't make chips, you don't matter. This is the bottleneck." },
                    { t: "The Prize", a: "Daniel Yergin", w: "Energy is power. History is just a fight for energy. Know the history." },
                    { t: "The New Map", a: "Daniel Yergin", w: "The map is changing. Green energy, fracking, China. Navigate the new world." },
                    { t: "World Order", a: "Henry Kissinger", w: "Chaos is the default. Order is hard. We are losing the order. Pay attention." },
                    { t: "The World for Sale", a: "Javier Blas", w: "Traders move the world's resources. They are invisible. See them." },
                    { t: "Freedom's Forge", a: "Arthur Herman", w: "Business won WWII. Production capacity is the ultimate deterrent. Build factories." },
                    { t: "Skunk Works", a: "Ben Rich", w: "They built jets in secret. Small teams, high secrecy, impossible goals. That's how you innovate." },
                    { t: "The Master Switch", a: "Tim Wu", w: "Every open system eventually closes. The internet is closing. Fight for it." },
                    { t: "Super Pumped", a: "Mike Isaac", w: "Uber broke every rule. It was ugly. It worked. Then it broke. Learn from it." },
                    { t: "Amazon Unbound", a: "Brad Stone", w: "Bezos is ruthless. He is visionary. He is relentless. Study the best." },
                    { t: "The Everything Store", a: "Brad Stone", w: "Start small. Dream huge. Grind every single day. That is the Amazon way." },
                    { t: "Elon Musk", a: "Walter Isaacson", w: "He is crazy. He is brilliant. He changes reality. Genius is not neat and tidy." }
                ]
            }
        ]
    },
    {
        id: "academic",
        name: "The Dark Academic",
        icon: "fa-book-open",
        color: "green",
        hex: "#2F855A", // Forest
        bgHex: "rgba(47, 133, 90, 0.2)",
        vibe: "Rainy library windows, tweed coats, moral ambiguity.",
        goal: "Aesthetic and moral complexity. Deepening the soul through tragedy.",
        stats: [30, 80, 95, 60, 40],
        modules: [
            {
                title: "1. The 'Secret History' Aesthetic",
                desc: "Modern Gothic and obsessiveness.",
                books: [
                    { t: "The Goldfinch", a: "Donna Tartt", w: "Art survives. People die. This book hurts, and that's the point. Feel the loss." },
                    { t: "The Little Friend", a: "Donna Tartt", w: "Childhood isn't innocent. It's terrifying. Look into the dark." },
                    { t: "The Magus", a: "John Fowles", w: "They are playing a game with your mind. You won't know what's real. Let it happen." },
                    { t: "The Collector", a: "John Fowles", w: "He loves her, so he caged her. It's disturbing. It's brilliant. Don't look away." },
                    { t: "The Sea, The Sea", a: "Iris Murdoch", w: "We are all vain. We rewrite our own pasts. Watch a man drown in his own ego." },
                    { t: "Atonement", a: "Ian McEwan", w: "One lie destroys everything. You can't fix the past. You just have to live with it." },
                    { t: "The Blind Assassin", a: "Margaret Atwood", w: "Stories inside stories. Betrayal runs deep. History is just what we choose to remember." },
                    { t: "Possession", a: "A.S. Byatt", w: "Digging up the past is dangerous. Romance is a ghost story. Fall in love with the dead." },
                    { t: "Brideshead Revisited", a: "Evelyn Waugh", w: "The world is moving on. Beauty is fading. Hold onto it while you can." },
                    { t: "Vile Bodies", a: "Evelyn Waugh", w: "Partying while the world burns. It's funny until it's tragic. Sound familiar?" },
                    { t: "The Line of Beauty", a: "Alan Hollinghurst", w: "It's seductive. It's superficial. It cuts deep. Welcome to the 80s." },
                    { t: "White Noise", a: "Don DeLillo", w: "We are scared of death. We buy things to forget. It doesn't work. Confront the fear." }
                ]
            },
            {
                title: "2. The Russians & The French",
                desc: "Existential weight and psychological depth.",
                books: [
                    { t: "The Brothers Karamazov", a: "Fyodor Dostoevsky", w: "Faith or reason? Choose. This is the heavyweight championship of the soul." },
                    { t: "Demons", a: "Fyodor Dostoevsky", w: "Ideas have consequences. Radical ideas kill. See what happens when society loses its mind." },
                    { t: "The Idiot", a: "Fyodor Dostoevsky", w: "Be truly good, and the world will break you. It's tragic. Be good anyway." },
                    { t: "Notes from Underground", a: "Fyodor Dostoevsky", w: "He is spiteful. He is sick. He is you. Look in the mirror." },
                    { t: "Anna Karenina", a: "Leo Tolstoy", w: "Passion burns. Society judges. The train is coming. It's perfect." },
                    { t: "The Death of Ivan Ilyich", a: "Leo Tolstoy", w: "You are going to die. Stop living a fake life. Wake up before it's too late." },
                    { t: "Fathers and Sons", a: "Ivan Turgenev", w: "The old vs. the new. Nihilism vs. tradition. The fight never ends." },
                    { t: "The Stranger", a: "Albert Camus", w: "He refused to lie. He refused to fake emotion. Society hated him for it. Be real." },
                    { t: "The Plague", a: "Albert Camus", w: "The world is sick. There is no cure. Do your job anyway. That is dignity." },
                    { t: "The Myth of Sisyphus", a: "Albert Camus", w: "Life is absurd. Push the rock up the hill. Smile while you do it." },
                    { t: "Nausea", a: "Jean-Paul Sartre", w: "Existence is sticky. It's overwhelming. Feel the weight of just being alive." },
                    { t: "No Exit", a: "Jean-Paul Sartre", w: "There is no escape. Hell is other people. Deal with them." }
                ]
            },
            {
                title: "3. Japanese Melancholy",
                desc: "The beauty of decay and honor.",
                books: [
                    { t: "The Sailor Who Fell from Grace...", a: "Yukio Mishima", w: "Glory is dangerous. Domesticity is boring. He chose glory. Watch the fall." },
                    { t: "Spring Snow", a: "Yukio Mishima", w: "Beauty is fragile. It breaks easily. Watch it shatter." },
                    { t: "The Temple of the Golden Pavilion", a: "Yukio Mishima", w: "It was too beautiful. He had to burn it. Obsession destroys." },
                    { t: "Runaway Horses", a: "Yukio Mishima", w: "Purity leads to blood. He wanted to change the world. He died for it." },
                    { t: "No Longer Human", a: "Osamu Dazai", w: "He wore a mask his whole life. He was terrified of humans. It's heartbreaking." },
                    { t: "The Setting Sun", a: "Osamu Dazai", w: "The old world is dying. The aristocracy is fading. There is beauty in the decline." },
                    { t: "Norwegian Wood", a: "Haruki Murakami", w: "Growing up hurts. People leave. You have to keep walking. Listen to the music." },
                    { t: "Kafka on the Shore", a: "Haruki Murakami", w: "Cats talk. Fish fall from the sky. Your subconscious is wild. Go explore it." },
                    { t: "The Wind-Up Bird Chronicle", a: "Haruki Murakami", w: "Go down into the well. Face your darkness. Find what's missing." },
                    { t: "Kitchen", a: "Banana Yoshimoto", w: "Death happens. Eat good food. Keep living. It's simple and profound." },
                    { t: "Snow Country", a: "Yasunari Kawabata", w: "It's cold. It's lonely. It's wasted love. It's stunningly beautiful." },
                    { t: "Thousand Cranes", a: "Yasunari Kawabata", w: "The tea ceremony hides guilt. The past stains the present. Drink the tea." }
                ]
            },
            {
                title: "4. The Cult of Beauty",
                desc: "Aestheticism, satire, and decadence.",
                books: [
                    { t: "De Profundis", a: "Oscar Wilde", w: "He lost everything. He found his soul in prison. Suffering teaches you who you are." },
                    { t: "The Importance of Being Earnest", a: "Oscar Wilde", w: "Life is too important to be taken seriously. Laugh at everything." },
                    { t: "Against Nature", a: "J.K. Huysmans", w: "He hated nature. He loved artificiality. This is the book that corrupted Dorian Gray." },
                    { t: "Lolita", a: "Vladimir Nabokov", w: "The prose is beautiful. The subject is a monster. Can you separate them?" },
                    { t: "Pale Fire", a: "Vladimir Nabokov", w: "It's a puzzle. It's a game. The narrator is lying to you. Can you solve it?" },
                    { t: "Pnin", a: "Vladimir Nabokov", w: "He is awkward. He is exiled. He is tragic. You will love him." },
                    { t: "The Master and Margarita", a: "Mikhail Bulgakov", w: "The Devil came to Moscow. He caused chaos. It's hilarious. Magic is real." },
                    { t: "Perfume", a: "Patrick Süskind", w: "He had no scent, so he stole yours. It's dark. It smells incredible." },
                    { t: "American Psycho", a: "Bret Easton Ellis", w: "Suits. Cards. Murders. It's empty. It's the 80s. Look at the void." },
                    { t: "Less Than Zero", a: "Bret Easton Ellis", w: "They are young, rich, and dead inside. The sun is shining. Nothing matters." },
                    { t: "The Unbearable Lightness of Being", a: "Milan Kundera", w: "Heavy or light? Which do you choose? Every choice disappears once you make it." },
                    { t: "The Book of Laughter and Forgetting", a: "Milan Kundera", w: "They want to erase history. Don't let them. Memory is resistance." }
                ]
            },
            {
                title: "5. Quiet Devastation",
                desc: "The Stoner vibe: tragedy in ordinary life.",
                books: [
                    { t: "Stoner", a: "John Williams", w: "He lived a quiet life. He died. It was beautiful. This book will change you." },
                    { t: "Augustus", a: "John Williams", w: "He ruled the world. He lost his daughter. Power is lonely. Read the letters." },
                    { t: "Butcher's Crossing", a: "John Williams", w: "The West wasn't heroic. It was brutal. Nature doesn't care about your dreams." },
                    { t: "Revolutionary Road", a: "Richard Yates", w: "The suburbs are a trap. The dream is a lie. They scream in the kitchen. Listen." },
                    { t: "The Heart is a Lonely Hunter", a: "Carson McCullers", w: "Everyone is lonely. Everyone wants to be heard. Listen to the silence." },
                    { t: "A Room of One's Own", a: "Virginia Woolf", w: "You need money and a room to create. It's practical. Get the money." },
                    { t: "Mrs. Dalloway", a: "Virginia Woolf", w: "One day holds a whole life. The flowers. The party. The suicide. It's all connected." },
                    { t: "To the Lighthouse", a: "Virginia Woolf", w: "Time passes. People die. The house decays. Art remains." },
                    { t: "The Bell Jar", a: "Sylvia Plath", w: "She was talented. She was sinking. The bell jar trapped her. Breathe fresh air." },
                    { t: "Play It As It Lays", a: "Joan Didion", w: "California is empty. The snake is in the garden. Keep driving on the freeway." },
                    { t: "The Year of Magical Thinking", a: "Joan Didion", w: "Grief makes you crazy. You think you can bring them back. You can't. Read this." },
                    { t: "My Year of Rest and Relaxation", a: "Ottessa Moshfegh", w: "She slept for a year. She hated everything. It's dark. It funny. Wake up." }
                ]
            }
        ]
    },
    {
        id: "futurist",
        name: "The Speculative Futurist",
        icon: "fa-robot",
        color: "indigo",
        hex: "#553C9A", // Indigo
        bgHex: "rgba(85, 60, 154, 0.2)",
        vibe: "Late-night debates about simulation theory and Mars.",
        goal: "Cognitive flexibility. Expanding imagination to the scale of the cosmos.",
        stats: [40, 95, 50, 100, 30],
        modules: [
            {
                title: "1. The Hard Problem",
                desc: "First contact, physics, and consciousness.",
                books: [
                    { t: "The Three-Body Problem", a: "Cixin Liu", w: "Physics is a weapon. The universe is a forest. Hunters are hiding. Be quiet." },
                    { t: "The Dark Forest", a: "Cixin Liu", w: "If they find us, they destroy us. This is the Fermi Paradox solved. It's terrifying." },
                    { t: "Death's End", a: "Cixin Liu", w: "Dimensions collapse. The universe dies. Think bigger. Bigger than that." },
                    { t: "Project Hail Mary", a: "Andy Weir", w: "The sun is dying. One guy has to fix it. Science is the superpower. Use it." },
                    { t: "The Martian", a: "Andy Weir", w: "He's stuck on Mars. He doesn't panic. He does the math. Do the math." },
                    { t: "Contact", a: "Carl Sagan", w: "It's not about the aliens. It's about us. Are we ready? Probably not." },
                    { t: "Rendezvous with Rama", a: "Arthur C. Clarke", w: "A cylinder enters the system. It ignores us. We are ants. Accept it." },
                    { t: "Childhood's End", a: "Arthur C. Clarke", w: "The aliens bring peace. It costs us our humanity. Is it worth it?" },
                    { t: "Solaris", a: "Stanislaw Lem", w: "The planet is alive. It reads your mind. You can't talk to it. It's truly alien." },
                    { t: "His Master's Voice", a: "Stanislaw Lem", w: "We got a signal. We have no idea what it means. We are too stupid. That's humbling." },
                    { t: "Blindsight", a: "Peter Watts", w: "Consciousness is a glitch. Space vampires are real. This will break your brain." },
                    { t: "Echopraxia", a: "Peter Watts", w: "God, biology, and hive minds. Evolution isn't done with us. Adapt." }
                ]
            },
            {
                title: "2. The Cyberpunk Roots",
                desc: "The near future of digital existence.",
                books: [
                    { t: "Neuromancer", a: "William Gibson", w: "He invented the Matrix before the internet existed. The sky is the color of a TV. Jack in." },
                    { t: "Count Zero", a: "William Gibson", w: "Voodoo gods in the code. Corporate extraction teams. The future is dirty. Love it." },
                    { t: "Mona Lisa Overdrive", a: "William Gibson", w: "The Sprawl is real. The rich live forever. The street finds its own use for things." },
                    { t: "Snow Crash", a: "Neal Stephenson", w: "The Metaverse. Avatars. Pizza delivery mafia. He predicted it all. Read the manual." },
                    { t: "The Diamond Age", a: "Neal Stephenson", w: "3D printers make everything. Education is the only value left. Learn or die." },
                    { t: "Cryptonomicon", a: "Neal Stephenson", w: "Codes. Gold. Data havens. The roots of crypto are here. Decode it." },
                    { t: "Seveneves", a: "Neal Stephenson", w: "The moon blew up. We have two years. Science has to save us. Get to work." },
                    { t: "Altered Carbon", a: "Richard K. Morgan", w: "Death is obsolete. You are just software. Sleeves are cheap. Identity is fluid." },
                    { t: "Do Androids Dream of Electric Sheep?", a: "Philip K. Dick", w: "What is real? What is fake? Does it matter if you feel love? Ask the robot." },
                    { t: "Ubik", a: "Philip K. Dick", w: "Time is decaying. Reality is eating itself. Buy Ubik. It saves you." },
                    { t: "A Scanner Darkly", a: "Philip K. Dick", w: "Drugs destroy your mind. The surveillance state watches. You lose yourself. Watch out." },
                    { t: "Ready Player One", a: "Ernest Cline", w: "The real world sucks. We hide in the game. It's a warning, not a manual." }
                ]
            },
            {
                title: "3. Galactic Scale",
                desc: "Space Opera and strategy.",
                books: [
                    { t: "Dune", a: "Frank Herbert", w: "The spice must flow. Politics, religion, ecology. It's all one system. Control the resource." },
                    { t: "Dune Messiah", a: "Frank Herbert", w: "Heroes are dangerous. Jihad kills billions. Be careful who you follow." },
                    { t: "Children of Dune", a: "Frank Herbert", w: "Change is painful. To save humanity, you have to become a monster." },
                    { t: "God Emperor of Dune", a: "Frank Herbert", w: "He lived 3,000 years. He is a worm. He sees the Golden Path. Trust the long game." },
                    { t: "Foundation", a: "Isaac Asimov", w: "Empires fall. Math predicts it. We can shorten the dark age. Build the Foundation." },
                    { t: "Foundation and Empire", a: "Isaac Asimov", w: "The plan was perfect. Then a mutant showed up. Outliers break models. Prepare for them." },
                    { t: "Second Foundation", a: "Isaac Asimov", w: "Mind control vs. physics. Who runs the galaxy? The smartest guys in the room." },
                    { t: "Hyperion", a: "Dan Simmons", w: "The Shrike is coming. Time is leaking. Tell your story before you die." },
                    { t: "The Fall of Hyperion", a: "Dan Simmons", w: "The AI Core is manipulating us. We are parasites. War is coming. Choose a side." },
                    { t: "Endymion", a: "Dan Simmons", w: "Love moves the universe. Evolution takes a leap. The adventure never ends." },
                    { t: "Consider Phlebas", a: "Iain M. Banks", w: "The Culture has everything. They fight for fun. Utopia is weird. See it." },
                    { t: "The Player of Games", a: "Iain M. Banks", w: "They play games to decide empires. Strategy is everything. Play better." }
                ]
            },
            {
                title: "4. The Philosophy of Tech",
                desc: "AI, Post-Humanism, and risk.",
                books: [
                    { t: "Superintelligence", a: "Nick Bostrom", w: "AI will be smarter than us. If we don't align it, we die. This is the most important problem." },
                    { t: "Life 3.0", a: "Max Tegmark", w: "We are designing our successors. Hardware. Software. Life. Choose the future." },
                    { t: "Human Compatible", a: "Stuart Russell", w: "Robots need to doubt. Uncertainty is safety. Teach them to ask questions." },
                    { t: "The Singularity is Near", a: "Ray Kurzweil", w: "Exponential growth is crazy. We will merge with machines. Live long enough to see it." },
                    { t: "Nexus", a: "Yuval Noah Harari", w: "Information networks run history. AI is a new network. It can hack us. Wake up." },
                    { t: "The Coming Wave", a: "Mustafa Suleyman", w: "Tech is getting cheaper and deadlier. Containment is hard. We have to try." },
                    { t: "Permutation City", a: "Greg Egan", w: "Copy your brain. Run it on a server. Are you still you? The math says yes." },
                    { t: "Diaspora", a: "Greg Egan", w: "Flesh is weak. Become software. Explore the stars. Leave the body behind." },
                    { t: "Axiomatic", a: "Greg Egan", w: "Can you edit your beliefs? Can you hack your own love? Bio-hacking is the future." },
                    { t: "Exhalation", a: "Ted Chiang", w: "The universe is breathing out. Entropy wins. Build beauty while you can." },
                    { t: "Stories of Your Life and Others", a: "Ted Chiang", w: "Language changes how you think. See time all at once. Communicate better." },
                    { t: "I, Robot", a: "Isaac Asimov", w: "Three laws. Logic puzzles. Robots try to help, but logic is tricky. Debug the code." }
                ]
            },
            {
                title: "5. Climate & Collapse",
                desc: "Future history and survival.",
                books: [
                    { t: "The Ministry for the Future", a: "Kim Stanley Robinson", w: "Heat waves kill. Carbon coin saves us. It's a blueprint. We can actually fix this." },
                    { t: "Red Mars", a: "Kim Stanley Robinson", w: "Build a world from scratch. Politics, engineering, botany. Mars is the next frontier." },
                    { t: "Green Mars", a: "Kim Stanley Robinson", w: "Terraforming takes time. Revolution happens fast. Freedom on a new planet." },
                    { t: "Blue Mars", a: "Kim Stanley Robinson", w: "Live forever. Adapt to space. Humanity evolves. The journey is long." },
                    { t: "Aurora", a: "Kim Stanley Robinson", w: "Starships are hard. Biology fights back. Maybe Earth is the only home. Protect it." },
                    { t: "Parable of the Sower", a: "Octavia Butler", w: "Society crumbles. Fire spreads. God is Change. Build a community to survive." },
                    { t: "Parable of the Talents", a: "Octavia Butler", w: "Fanatics take over. They want the old ways. Fight for the new way." },
                    { t: "Oryx and Crake", a: "Margaret Atwood", w: "Science without ethics is suicide. We engineered our replacement. Oops." },
                    { t: "The Year of the Flood", a: "Margaret Atwood", w: "The waterless flood. The gardeners survive. Eat your veggies. survive the plague." },
                    { t: "MaddAddam", a: "Margaret Atwood", w: "New myths for a new world. We have to live with the monsters we made." },
                    { t: "Station Eleven", a: "Emily St. John Mandel", w: "Survival is insufficient. We need art. We need Shakespeare. Even at the end of the world." },
                    { t: "A Canticle for Leibowitz", a: "Walter M. Miller Jr.", w: "We blew it up. Monks save the books. We learn it again. We blow it up again. Break the cycle." }
                ]
            }
        ]
    },
    {
        id: "alchemist",
        name: "The Social Alchemist",
        icon: "fa-users",
        color: "yellow",
        hex: "#B7791F", // Bronze/Gold
        bgHex: "rgba(183, 121, 31, 0.2)",
        vibe: "The most magnetic person at the dinner party.",
        goal: "Elite emotional intelligence, influence, and understanding the dark triad.",
        stats: [70, 50, 100, 30, 80],
        modules: [
            {
                title: "1. The Greene/Machiavelli Canon",
                desc: "Power Dynamics and Strategy.",
                books: [
                    { t: "The 48 Laws of Power", a: "Robert Greene", w: "People are playing games. You are losing because you don't know the rules. Learn the rules." },
                    { t: "The Laws of Human Nature", a: "Robert Greene", w: "You have a dark side. Everyone does. Stop being naive. See the shadow." },
                    { t: "The Art of Seduction", a: "Robert Greene", w: "Charm is a weapon. Use it. Make them fall in love with you." },
                    { t: "The 33 Strategies of War", a: "Robert Greene", w: "Life is conflict. Don't fight fair. Fight to win. Strategy over brute force." },
                    { t: "Mastery", a: "Robert Greene", w: "There are no shortcuts. 10,000 hours. Deep focus. Be undeniable." },
                    { t: "The Prince", a: "Niccolò Machiavelli", w: "It's better to be feared than loved. It's ugly, but it's true. Face reality." },
                    { t: "Discourses on Livy", a: "Niccolò Machiavelli", w: "Republics fall when people get lazy. Virtue requires vigilance. Wake up." },
                    { t: "The Art of War", a: "Sun Tzu", w: "The best victory is the one without fighting. Know yourself. Know your enemy." },
                    { t: "The Book of Five Rings", a: "Miyamoto Musashi", w: "There is only one way: the way of the warrior. Discipline. Focus. Cut." },
                    { t: "Meditations", a: "Marcus Aurelius", w: "The emperor of the world was sad. He stayed strong. Control your mind. It's all you have." },
                    { t: "Letters from a Stoic", a: "Seneca", w: "Time is short. You are wasting it. Stop complaining. Start living." },
                    { t: "Maxims", a: "La Rochefoucauld", w: "We are all vain. We act from self-interest. Don't get mad. Just observe." }
                ]
            },
            {
                title: "2. Tactical Influence",
                desc: "Negotiation, persuasion, and sales.",
                books: [
                    { t: "Never Split the Difference", a: "Chris Voss", w: "Hostages are on the line. Splitting the difference kills them. Get what you want." },
                    { t: "Influence", a: "Robert Cialdini", w: "Six buttons control human brains. Reciprocity. Scarcity. Push the buttons." },
                    { t: "Pre-Suasion", a: "Robert Cialdini", w: "The battle is won before it starts. Set the stage. Frame the argument." },
                    { t: "Start with No", a: "Jim Camp", w: "Yes is fake. No is real. Make them say no. Then you can talk." },
                    { t: "Getting to Yes", a: "Roger Fisher", w: "Don't attack the person. Attack the problem. Find the win-win. Build the bridge." },
                    { t: "Crucial Conversations", a: "Kerry Patterson", w: "High stakes. High emotion. Don't freeze. Don't explode. Talk it out." },
                    { t: "Pitch Anything", a: "Oren Klaff", w: "The croc brain is in charge. Frame the deal. Be the prize. Don't chase." },
                    { t: "Flip the Script", a: "Oren Klaff", w: "Inception is real. Make them think it was their idea. That's true persuasion." },
                    { t: "Made to Stick", a: "Chip Heath", w: "Why do urban legends survive? They are sticky. Make your ideas sticky." },
                    { t: "Switch", a: "Chip Heath", w: "The elephant is emotional. The rider is rational. Direct the rider. Motivate the elephant." },
                    { t: "To Sell Is Human", a: "Daniel Pink", w: "We are all selling. Teachers, doctors, parents. Learn to move people. It's noble." },
                    { t: "Win Bigly", a: "Scott Adams", w: "Facts don't matter. Persuasion matters. Master the filter. Control the reality." }
                ]
            },
            {
                title: "3. The Psychology of Status",
                desc: "Why we act the way we do.",
                books: [
                    { t: "The Status Game", a: "Will Storr", w: "You want status. It drives everything. Admit it. Then you can play the game." },
                    { t: "The Science of Storytelling", a: "Will Storr", w: "Your brain hallucinates reality. Stories control the hallucination. Tell better stories." },
                    { t: "Selfie", a: "Will Storr", w: "We are obsessed with ourselves. It's making us sick. Look outward. Get over yourself." },
                    { t: "Games People Play", a: "Eric Berne", w: "You are running a script. 'Poor me.' 'Yes, but.' Stop playing the game." },
                    { t: "What Do You Say After...", a: "Eric Berne", w: "Your destiny was written when you were six. Rewrite the script. Take control." },
                    { t: "I'm OK – You're OK", a: "Thomas A. Harris", w: "You feel like a child. You act like a parent. Be an adult. It's hard." },
                    { t: "Predictably Irrational", a: "Dan Ariely", w: "You think you are logical. You aren't. You are weird. Understand your bugs." },
                    { t: "The Righteous Mind", a: "Jonathan Haidt", w: "Politics is religion. They aren't evil; they just have different morals. Understand them." },
                    { t: "The Coddling of American Mind", a: "Jonathan Haidt", w: "Safetyism makes you weak. Trauma makes you strong. Stop hiding." },
                    { t: "Thinking, Fast and Slow", a: "Daniel Kahneman", w: "System 1 is fast and stupid. System 2 is slow and lazy. Wake up System 2." },
                    { t: "Noise", a: "Daniel Kahneman", w: "Your judgment is random. You are inconsistent. Clean up the noise." },
                    { t: "Nudge", a: "Richard Thaler", w: "People are lazy. Design the default choice. Help them do the right thing." }
                ]
            },
            {
                title: "4. Media & Manipulation",
                desc: "Mass psychology and propaganda.",
                books: [
                    { t: "Trust Me, I'm Lying", a: "Ryan Holiday", w: "Blogs lie. News lies. It's all a hustle. Don't believe the clickbait." },
                    { t: "Conspiracy", a: "Ryan Holiday", w: "Thiel plotted for years. He destroyed Gawker. Patience and money win. Be careful." },
                    { t: "Ego Is the Enemy", a: "Ryan Holiday", w: "Success goes to your head. Failure breaks your heart. Ego is the enemy. Kill it." },
                    { t: "Propaganda", a: "Edward Bernays", w: "He made women smoke. He made you eat bacon. He engineered consent. Know the tricks." },
                    { t: "Manufacturing Consent", a: "Noam Chomsky", w: "The media sells audiences to advertisers. You are the product. Wake up." },
                    { t: "Amusing Ourselves to Death", a: "Neil Postman", w: "Orwell was wrong. Huxley was right. We love our oppression. Turn off the TV." },
                    { t: "The Image", a: "Daniel Boorstin", w: "We prefer the fake to the real. Celebrities are famous for being famous. It's hollow." },
                    { t: "Crowds and Power", a: "Elias Canetti", w: "The mob wants to grow. The mob wants to destroy. Don't get lost in the crowd." },
                    { t: "The True Believer", a: "Eric Hoffer", w: "Fanatics are lonely. They want to belong. They will burn the world to feel safe." },
                    { t: "So You've Been Publicly Shamed", a: "Jon Ronson", w: "One tweet can ruin your life. The internet is a mob. Watch what you say." },
                    { t: "The Psychopath Test", a: "Jon Ronson", w: "CEOs are psychopaths. Leaders are crazy. Maybe you are too. Take the test." },
                    { t: "Mistakes Were Made", a: "Carol Tavris", w: "You never admit you're wrong. You justify it. Stop justifying. Admit it." }
                ]
            },
            {
                title: "5. Narrative Case Studies",
                desc: "True crime, charisma, and cults.",
                books: [
                    { t: "Midnight in the Garden...", a: "John Berendt", w: "Savannah is weird. Money hides secrets. A murder exposes it all. Atmosphere is power." },
                    { t: "The Devil in the White City", a: "Erik Larson", w: "He built a murder castle. He was charming. Evil wears a nice suit." },
                    { t: "In the Garden of Beasts", a: "Erik Larson", w: "They danced while the Nazis rose. Denial is comfortable. Look at the monster." },
                    { t: "Catch Me If You Can", a: "Frank Abagnale", w: "He was a pilot. A doctor. A lawyer. He was a kid. Confidence is the only currency." },
                    { t: "The Wolf of Wall Street", a: "Jordan Belfort", w: "Sell me this pen. Greed is a drug. He had it all and lost it. Don't be him." },
                    { t: "Billion Dollar Whale", a: "Tom Wright", w: "He stole billions. He partied with Leo. No one checked the books. Audit everything." },
                    { t: "Cultish", a: "Amanda Montell", w: "SoulCycle is a cult. Startups are cults. Language controls you. Speak clearly." },
                    { t: "Going Clear", a: "Lawrence Wright", w: "Belief is powerful. Belief is dangerous. They trapped Tom Cruise. Don't get trapped." },
                    { t: "Under the Banner of Heaven", a: "Jon Krakauer", w: "God told them to kill. Fundamentalism is scary. Faith needs reason." },
                    { t: "Helter Skelter", a: "Vincent Bugliosi", w: "Manson controlled them. He didn't kill anyone. He made them do it. Influence is deadly." },
                    { t: "The Adversary", a: "Emmanuel Carrère", w: "He lied for 20 years. He killed his family to keep the lie. The truth sets you free." },
                    { t: "In Cold Blood", a: "Truman Capote", w: "Two drifters killed a family. It was pointless. It changed writing forever. Read the master." }
                ]
            }
        ]
    }
];
