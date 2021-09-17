import { UniversityZone } from '@api/cats';
import { Cat } from 'src/cats/cats.entity';

export const catDatas: Omit<Cat, 'created_at' | 'updated_at'>[] = [
  {
    id: 1,
    name: 'Ashy',
    neutered: true,
    one_liner:
      "Bachelor's in Laziness, Masters's in Belly Flops and PhD in Napping",
    description:
      'I am a strong and healthy boy! I have white fur with patches of stripes and yellow eyes. Also, I love flaunting my unique black eyeliner around my eyes! \n I am friendly and I like climbing trees. These days I enjoy napping around the lawn or near the UTR staircase. I just laze around and sleep until I hear food. Sometimes, I also eat more food that I should during feeding times\n By the way, I love butt scratches. Could you give me some when you see me? \n Come find me around the stairs at UTown Fine Food, or the walkway along Tembusu and ERC!',
    image:
      'https://static.wixstatic.com/media/4cd187_4a6549587a60437bacd32312fcb02948~mv2_d_1200_1600_s_2.jpg',
    zone: UniversityZone.Utown,
  },
  {
    id: 2,
    name: 'SourPlum',
    neutered: true,
    one_liner: 'Cat with the coolest fur coat',
    description:
      "I am a sweet kitty and I warm up to people once I spend some time with them. I am a tortoiseshell so my fur coat is made out out of a lovely mix of shades. I think that makes me quite unique!\nI might be a bit shy initially but I'm  actually quite vocal and friendly. Maybe you can approach me slowly at first  so I know you're just trying to be friends with me.\nCome find me at the Loading  Bay at UTown. We are fed daily around 5.30pm to 8.30pm!",
    image:
      'https://static.wixstatic.com/media/4cd187_844eaf2f4c6447ac9142f3361eb5c347~mv2.png',
    zone: UniversityZone.Utown,
  },
  {
    id: 3,
    name: 'Cow',
    neutered: true,
    one_liner: 'Lost & confused kitty (or cow?)',
    description:
      'I am a lost and confused kitty that somehow made my way to NUS. These days I just lounge at the UTown link bridge and spend my time watching the two-legged creatures pass by.  Sometimes I like to hide in the bushes and pretend that no one can see me.\nI enjoy playing with the lizards and insects that come visit me. I will also adopt the humans that come to me with offerings of food, especially if they can find me consistently!\nCome find me at the UTown link bridge - I am there most of the time, although you may not see me :3',
    image:
      'https://static.wixstatic.com/media/4cd187_3a2799bdaac14e9f8f25e1f248b455e4~mv2.jpg',
    zone: UniversityZone.Utown,
  },
  {
    id: 4,
    name: 'Toothless',
    neutered: true,
    one_liner: 'Fluffy bowling ball',
    description:
      "I may look like a furry ball of darkness, but I am actually very playful and cute! Don't let my name fool you either as I reputedly have the sharpest teeth amongst all my fellow NUS campus cats.\nI frequently express my hunger with loud meows and demands for neck scratches. I used to be quite thin, but with the dedicated daily feeding of my caregivers I have been told that I am slowly morphing to resemble a round fluffy bowling ball.\nMy secret lair is behind T-Lab of the Faculty of Engineering near EW2, though lately I am venturing into new grounds at E4A/E6 area. I will stare at the birds that casually come by to taunt me, with my tail swishing behind me like a windshield wiper...",
    image:
      'https://static.wixstatic.com/media/4cd187_89fe498f2d02490dba903a3df766302f~mv2.jpg',
    zone: UniversityZone.Engineering,
  },
  {
    id: 5,
    name: 'George',
    neutered: true,
    one_liner: 'The Wild One',
    description:
      "Me used to be a beautiful feral kitty defending and survivin on me own...I'm still beautiful as you can see. One day me stumbled onto NUS, basically a meow haven with food served on a platter everyday, no need for huntin'. \nMe warmin' up with hooman feeders nowadays. They don't seem too scary, kinda nice actually. But if me feel somethin' fishy, me run like a bullet, like Bilbo up the hill. My other lady kitty friend Emmy had health issues and was taken in by some kind hooman, so it's just me all on my lonesome again... There now be another young un' near EW2, but she just runs away when she sees me :< \nCome find me at Faculty of Engineering, at the benches along the stairs near good ol' LT7. Approach slowly and reassuringly please, if not hooman will taste me dust while me run with God-like speed.",
    image:
      'https://static.wixstatic.com/media/4cd187_4b1b1bf7bdc5406aa4132429c08bf84e~mv2.jpeg',
    zone: UniversityZone.Engineering,
  },
  {
    id: 6,
    name: 'Pip',
    neutered: true,
    one_liner: ' The Rare Fellow',
    description:
      'I have been part of NUS for quite some time now. I do not appear regularly so you might not bump into me. However, if you do, lucky you! \nYou might not be able to find me but my favourite hang out spot is the Business faculty.',
    image:
      'https://static.wixstatic.com/media/4cd187_6404162ebe874374a2e958d8cfaf4a2c~mv2.jpg',
    zone: UniversityZone.Computing,
  },
  {
    id: 7,
    name: 'Crumbs',
    neutered: true,
    one_liner: 'Stealthy Sweetheart',
    description:
      "I am a demure cat and I blend quite well with my surroundings. It takes me some time to warm-up to people but once I am comfortable, I am rather affectionate.\nWhen its dinner time, my hooman (but every other two legged hooman calls him 'Professor', whatever that means) would open the magic transparent door to the hallway that is furr-ever cool (hoomans are smart to create such places in hot humid Singapore).\nThen, me and M33y Thai would walk in for dinner outside my hoomans door. \nCome find me at AS4-B1, right near the Social Work Department or Fragrance Garden. Though these days I go out exploring the world, so I am not home very much......",
    image:
      'https://static.wixstatic.com/media/4cd187_58c26c45eaa2453981a3294c48c2c63a~mv2_d_6016_4016_s_4_2.jpg',
    zone: UniversityZone.Arts,
  },
  {
    id: 8,
    name: 'M33Y THAI',
    neutered: true,
    one_liner: 'Guardian of the AS4 area at FASS',
    description:
      "I am M33y Thai (Muay Thai), guardian of AS4. I used to be quite the fighter back in the day, and hence my name. While I may appear large and fierce, I am in fact quite nice. If you're lucky, you might also hear my magnificent meeps.\nI like observing people from my cosy spot at AS4. If you come too close, I will run away! No one can really come close to me, but I let my hooman feeder (A purr-fessor? That's what most hoomans call him...) pick me up and squeeze my fluff.\nCome find me at AS4-B1 at FASS! I am usually lounging along the walkway where the plants are. It is impossible to miss me, I am huge xD",
    image:
      'https://static.wixstatic.com/media/4cd187_7740ae70ff2c4b52b22c510b78b22705~mv2_d_3351_2070_s_2.jpg',
    zone: UniversityZone.Arts,
  },
  {
    id: 9,
    name: 'Belle',
    neutered: true,
    one_liner: 'The Shadow',
    description:
      "I have a silky black fur coat and piercing yellow eyes! I also have a small white patch near my tummy.\nI usually only appear in the mornings and evenings - it might be hard to spot me because I can be a master of stealth when I want to be. Nonetheless, I have a dedicated feeder who satisfies my tummy daily. Sometimes when I'm bored I also like the hunt the pesky rats that dare come near my territory.\nMy favourite hang out spot is the Science faculty, at the Science Foyer near the MD9 building. If I like you, I might run around your legs and meow at you.",
    image:
      'https://static.wixstatic.com/media/4cd187_06e675a37f0645d599e5fd39b74376df~mv2.jpg',
    zone: UniversityZone.Science,
  },
];
