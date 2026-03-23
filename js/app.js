// Japanese Conjugation Lab - Verb conjugation engine and UI

// =====================================================================
// DATA
// =====================================================================

const ROWS=[
  {l:'あ\nform',v:'a',k:['あ','か','が','さ','た','な','は','ま','ら']},
  {l:'い\nform',v:'i',k:['い','き','ぎ','し','ち','に','び','み','り']},
  {l:'う\nform',v:'u',k:['う','く','ぐ','す','つ','ぬ','ぶ','む','る']},
  {l:'え\nform',v:'e',k:['え','け','げ','せ','て','ね','べ','め','れ']},
  {l:'お\nform',v:'o',k:['お','こ','ご','そ','と','の','ぼ','も','ろ']},
];
const EXTRA=['や','ゆ','よ','わ','を','ん','','',''];

const EC={'う':0,'く':1,'ぐ':2,'す':3,'つ':4,'ぬ':5,'ぶ':6,'む':7,'る':8};
const ST={
  0:{a:'わ',i:'い',u:'う',e:'え',o:'お'},
  1:{a:'か',i:'き',u:'く',e:'け',o:'こ'},
  2:{a:'が',i:'ぎ',u:'ぐ',e:'げ',o:'ご'},
  3:{a:'さ',i:'し',u:'す',e:'せ',o:'そ'},
  4:{a:'た',i:'ち',u:'つ',e:'て',o:'と'},
  5:{a:'な',i:'に',u:'ぬ',e:'ね',o:'の'},
  6:{a:'ば',i:'び',u:'ぶ',e:'べ',o:'ぼ'},
  7:{a:'ま',i:'み',u:'む',e:'め',o:'も'},
  8:{a:'ら',i:'り',u:'る',e:'れ',o:'ろ'},
};
const TETA={
  'う':{te:'って',ta:'った'},'く':{te:'いて',ta:'いた'},'ぐ':{te:'いで',ta:'いだ'},
  'す':{te:'して',ta:'した'},'つ':{te:'って',ta:'った'},'ぬ':{te:'んで',ta:'んだ'},
  'ぶ':{te:'んで',ta:'んだ'},'む':{te:'んで',ta:'んだ'},'る':{te:'って',ta:'った'},
};
const SPEC={'いく':{te:'いって',ta:'いった'}};

const WORDS=[
  // === GODAN (regular) ===
  {k:'買う',r:'かう',m:'to buy',t:'godan',jlpt:5},
  {k:'行く',r:'いく',m:'to go, to move (towards)',t:'godan',jlpt:5},
  {k:'泳ぐ',r:'およぐ',m:'to swim',t:'godan',jlpt:4},
  {k:'話す',r:'はなす',m:'to speak, to talk',t:'godan',jlpt:5},
  {k:'待つ',r:'まつ',m:'to wait',t:'godan',jlpt:5},
  {k:'死ぬ',r:'しぬ',m:'to die',t:'godan',jlpt:4},
  {k:'遊ぶ',r:'あそぶ',m:'to play, to hang out',t:'godan',jlpt:5},
  {k:'飲む',r:'のむ',m:'to drink',t:'godan',jlpt:5},
  {k:'分かる',r:'わかる',m:'to understand',t:'godan',jlpt:4},
  {k:'走る',r:'はしる',m:'to run',t:'godan',jlpt:4},
  {k:'切る',r:'きる',m:'to cut',t:'godan',jlpt:4},
  {k:'作る',r:'つくる',m:'to make, to create',t:'godan',jlpt:4},
  {k:'送る',r:'おくる',m:'to send',t:'godan',jlpt:4},
  {k:'帰る',r:'かえる',m:'to return home',t:'godan',jlpt:5},
  {k:'乗る',r:'のる',m:'to ride',t:'godan',jlpt:4},
  {k:'売る',r:'うる',m:'to sell',t:'godan',jlpt:4},
  {k:'読む',r:'よむ',m:'to read',t:'godan',jlpt:5},
  {k:'書く',r:'かく',m:'to write',t:'godan',jlpt:5},
  {k:'立つ',r:'たつ',m:'to stand',t:'godan',jlpt:4},
  {k:'持つ',r:'もつ',m:'to hold, to have',t:'godan',jlpt:5},
  {k:'歌う',r:'うたう',m:'to sing',t:'godan',jlpt:4},
  {k:'洗う',r:'あらう',m:'to wash',t:'godan',jlpt:5},
  {k:'会う',r:'あう',m:'to meet',t:'godan',jlpt:5},
  {k:'言う',r:'いう',m:'to say',t:'godan',jlpt:5},
  {k:'思う',r:'おもう',m:'to think',t:'godan',jlpt:4},
  {k:'知る',r:'しる',m:'to know',t:'godan',jlpt:4},
  {k:'座る',r:'すわる',m:'to sit',t:'godan',jlpt:4},
  {k:'取る',r:'とる',m:'to take',t:'godan',jlpt:4},
  {k:'入る',r:'はいる',m:'to enter',t:'godan',jlpt:4},
  {k:'歩く',r:'あるく',m:'to walk',t:'godan',jlpt:4},
  {k:'働く',r:'はたらく',m:'to work',t:'godan',jlpt:4},
  {k:'届く',r:'とどく',m:'to reach, to arrive',t:'godan',jlpt:3},
  {k:'払う',r:'はらう',m:'to pay',t:'godan',jlpt:4},
  {k:'通る',r:'とおる',m:'to pass through',t:'godan',jlpt:4},
  {k:'困る',r:'こまる',m:'to be troubled',t:'godan',jlpt:4},
  {k:'終わる',r:'おわる',m:'to end',t:'godan',jlpt:4},
  {k:'始まる',r:'はじまる',m:'to begin (intrans.)',t:'godan',jlpt:4},
  {k:'変わる',r:'かわる',m:'to change (intrans.)',t:'godan',jlpt:4},
  {k:'聞く',r:'きく',m:'to listen, to ask',t:'godan',jlpt:5},
  {k:'使う',r:'つかう',m:'to use',t:'godan',jlpt:5},
  {k:'住む',r:'すむ',m:'to live, to reside',t:'godan',jlpt:4},
  {k:'着く',r:'つく',m:'to arrive',t:'godan',jlpt:4},
  {k:'飛ぶ',r:'とぶ',m:'to fly, to jump',t:'godan',jlpt:4},
  {k:'なる',r:'なる',m:'to become',t:'godan',jlpt:4},
  {k:'もらう',r:'もらう',m:'to receive',t:'godan',jlpt:4},
  {k:'やる',r:'やる',m:'to do (casual)',t:'godan',jlpt:4},
  {k:'押す',r:'おす',m:'to push, to press',t:'godan',jlpt:4},
  {k:'引く',r:'ひく',m:'to pull, to draw',t:'godan',jlpt:4},
  {k:'消す',r:'けす',m:'to erase, to turn off',t:'godan',jlpt:4},
  {k:'貸す',r:'かす',m:'to lend',t:'godan',jlpt:4},

  // === GODAN EXCEPTIONS (iru/eru ending but godan) ===
  {k:'要る',r:'いる',m:'to need',t:'godan',jlpt:3,exc:true},
  {k:'焦る',r:'あせる',m:'to be flustered',t:'godan',jlpt:2,exc:true},
  {k:'滑る',r:'すべる',m:'to slide, to slip',t:'godan',jlpt:2,exc:true},
  {k:'蹴る',r:'ける',m:'to kick',t:'godan',jlpt:2,exc:true},
  {k:'握る',r:'にぎる',m:'to grasp, to grip',t:'godan',jlpt:2,exc:true},
  {k:'限る',r:'かぎる',m:'to limit',t:'godan',jlpt:2,exc:true},
  {k:'喋る',r:'しゃべる',m:'to chat, to talk',t:'godan',jlpt:2,exc:true},
  {k:'減る',r:'へる',m:'to decrease',t:'godan',jlpt:2,exc:true},
  {k:'参る',r:'まいる',m:'to come/go (humble)',t:'godan',jlpt:4,exc:true},
  {k:'混じる',r:'まじる',m:'to be mixed',t:'godan',jlpt:2,exc:true},
  {k:'散る',r:'ちる',m:'to scatter',t:'godan',jlpt:2,exc:true},
  {k:'湿る',r:'しめる',m:'to become damp',t:'godan',jlpt:2,exc:true},
  {k:'捻る',r:'ひねる',m:'to twist',t:'godan',jlpt:2,exc:true},

  // === ICHIDAN ===
  {k:'食べる',r:'たべる',m:'to eat',t:'ichidan',jlpt:5},
  {k:'見る',r:'みる',m:'to see, to look',t:'ichidan',jlpt:5},
  {k:'出る',r:'でる',m:'to leave, to go out',t:'ichidan',jlpt:5},
  {k:'着る',r:'きる',m:'to wear (upper body)',t:'ichidan',jlpt:4},
  {k:'いる',r:'いる',m:'to be, to exist (animate)',t:'ichidan',jlpt:5},
  {k:'起きる',r:'おきる',m:'to wake up',t:'ichidan',jlpt:5},
  {k:'寝る',r:'ねる',m:'to sleep',t:'ichidan',jlpt:5},
  {k:'開ける',r:'あける',m:'to open',t:'ichidan',jlpt:4},
  {k:'閉める',r:'しめる',m:'to close',t:'ichidan',jlpt:4},
  {k:'教える',r:'おしえる',m:'to teach',t:'ichidan',jlpt:4},
  {k:'掛ける',r:'かける',m:'to hang, to call',t:'ichidan',jlpt:4},
  {k:'借りる',r:'かりる',m:'to borrow',t:'ichidan',jlpt:4},
  {k:'忘れる',r:'わすれる',m:'to forget',t:'ichidan',jlpt:4},
  {k:'答える',r:'こたえる',m:'to answer',t:'ichidan',jlpt:4},
  {k:'調べる',r:'しらべる',m:'to investigate',t:'ichidan',jlpt:4},
  {k:'覚える',r:'おぼえる',m:'to memorize',t:'ichidan',jlpt:4},
  {k:'始める',r:'はじめる',m:'to begin (something)',t:'ichidan',jlpt:4},
  {k:'止める',r:'やめる',m:'to stop, to quit',t:'ichidan',jlpt:4},
  {k:'集める',r:'あつめる',m:'to collect',t:'ichidan',jlpt:3},
  {k:'伝える',r:'つたえる',m:'to convey',t:'ichidan',jlpt:3},
  {k:'逃げる',r:'にげる',m:'to escape',t:'ichidan',jlpt:4},
  {k:'捨てる',r:'すてる',m:'to throw away',t:'ichidan',jlpt:4},
  {k:'続ける',r:'つづける',m:'to continue',t:'ichidan',jlpt:4},
  {k:'負ける',r:'まける',m:'to lose (game)',t:'ichidan',jlpt:4},
  {k:'信じる',r:'しんじる',m:'to believe',t:'ichidan',jlpt:3},
  {k:'感じる',r:'かんじる',m:'to feel',t:'ichidan',jlpt:3},
  {k:'上げる',r:'あげる',m:'to give, to raise',t:'ichidan',jlpt:4},
  {k:'出かける',r:'でかける',m:'to go out',t:'ichidan',jlpt:4},
  {k:'生まれる',r:'うまれる',m:'to be born',t:'ichidan',jlpt:4},
  {k:'疲れる',r:'つかれる',m:'to get tired',t:'ichidan',jlpt:4},
  {k:'落ちる',r:'おちる',m:'to fall',t:'ichidan',jlpt:4},
  {k:'決める',r:'きめる',m:'to decide',t:'ichidan',jlpt:3},
  {k:'できる',r:'できる',m:'to be able to, to be ready',t:'ichidan',jlpt:4},
  {k:'くれる',r:'くれる',m:'to give (to me)',t:'ichidan',jlpt:4},
  {k:'つける',r:'つける',m:'to turn on, to attach',t:'ichidan',jlpt:4},

  // === IRREGULAR ===
  {k:'する',r:'する',m:'to do',t:'irregular',jlpt:5},
  {k:'来る',r:'くる',m:'to come',t:'irregular',jlpt:5},
  {k:'ある',r:'ある',m:'to exist, to be (inanimate)',t:'irregular',jlpt:5},
  // Compound suru verbs
  {k:'勉強する',r:'べんきょうする',m:'to study',t:'irregular',jlpt:5},
  {k:'運動する',r:'うんどうする',m:'to exercise',t:'irregular',jlpt:4},
  {k:'料理する',r:'りょうりする',m:'to cook',t:'irregular',jlpt:4},
  {k:'掃除する',r:'そうじする',m:'to clean',t:'irregular',jlpt:4},
  {k:'洗濯する',r:'せんたくする',m:'to do laundry',t:'irregular',jlpt:4},
  {k:'散歩する',r:'さんぽする',m:'to take a walk',t:'irregular',jlpt:4},
  {k:'旅行する',r:'りょこうする',m:'to travel',t:'irregular',jlpt:4},
  {k:'電話する',r:'でんわする',m:'to call (phone)',t:'irregular',jlpt:4},
  {k:'心配する',r:'しんぱいする',m:'to worry',t:'irregular',jlpt:4},
  {k:'結婚する',r:'けっこんする',m:'to marry',t:'irregular',jlpt:4},

  // === MORE N3 GODAN ===
  {k:'並ぶ',r:'ならぶ',m:'to line up',t:'godan',jlpt:3},
  {k:'選ぶ',r:'えらぶ',m:'to choose',t:'godan',jlpt:3},
  {k:'戻る',r:'もどる',m:'to return, to go back',t:'godan',jlpt:3},
  {k:'頼む',r:'たのむ',m:'to request, to ask',t:'godan',jlpt:3},
  {k:'拾う',r:'ひろう',m:'to pick up',t:'godan',jlpt:3},
  {k:'盗む',r:'ぬすむ',m:'to steal',t:'godan',jlpt:3},
  {k:'叫ぶ',r:'さけぶ',m:'to shout, to scream',t:'godan',jlpt:3},
  {k:'謝る',r:'あやまる',m:'to apologize',t:'godan',jlpt:3},
  {k:'祈る',r:'いのる',m:'to pray',t:'godan',jlpt:3},
  {k:'刺す',r:'さす',m:'to stab, to sting',t:'godan',jlpt:3},

  // === MORE N3 ICHIDAN ===
  {k:'育てる',r:'そだてる',m:'to raise, to nurture',t:'ichidan',jlpt:3},
  {k:'比べる',r:'くらべる',m:'to compare',t:'ichidan',jlpt:3},
  {k:'慣れる',r:'なれる',m:'to get used to',t:'ichidan',jlpt:3},
  {k:'増える',r:'ふえる',m:'to increase',t:'ichidan',jlpt:3},
  {k:'壊れる',r:'こわれる',m:'to break (intrans.)',t:'ichidan',jlpt:3},
  {k:'似る',r:'にる',m:'to resemble',t:'ichidan',jlpt:3},
  {k:'現れる',r:'あらわれる',m:'to appear',t:'ichidan',jlpt:3},
  {k:'倒れる',r:'たおれる',m:'to collapse, to fall down',t:'ichidan',jlpt:3},

  // === N1 GODAN ===
  {k:'呟く',r:'つぶやく',m:'to mutter, to murmur',t:'godan',jlpt:1},
  {k:'頷く',r:'うなずく',m:'to nod',t:'godan',jlpt:1},
  {k:'囁く',r:'ささやく',m:'to whisper',t:'godan',jlpt:1},
  {k:'覆す',r:'くつがえす',m:'to overturn',t:'godan',jlpt:1},
  {k:'怠る',r:'おこたる',m:'to neglect',t:'godan',jlpt:1},
  {k:'潰す',r:'つぶす',m:'to crush, to smash',t:'godan',jlpt:1},
  {k:'漂う',r:'ただよう',m:'to drift, to float',t:'godan',jlpt:1},

  // === N1 ICHIDAN ===
  {k:'甘える',r:'あまえる',m:'to act spoiled',t:'ichidan',jlpt:1},
  {k:'飢える',r:'うえる',m:'to starve',t:'ichidan',jlpt:1},
  {k:'怯える',r:'おびえる',m:'to be frightened',t:'ichidan',jlpt:1},
  {k:'衰える',r:'おとろえる',m:'to decline, to weaken',t:'ichidan',jlpt:1},
  {k:'企てる',r:'くわだてる',m:'to plan, to scheme',t:'ichidan',jlpt:1},

  // === I-ADJECTIVES ===
  {k:'大きい',r:'おおきい',m:'big, large',t:'i-adj',jlpt:5},
  {k:'小さい',r:'ちいさい',m:'small, little',t:'i-adj',jlpt:5},
  {k:'高い',r:'たかい',m:'tall, expensive',t:'i-adj',jlpt:5},
  {k:'安い',r:'やすい',m:'cheap',t:'i-adj',jlpt:5},
  {k:'新しい',r:'あたらしい',m:'new',t:'i-adj',jlpt:5},
  {k:'古い',r:'ふるい',m:'old (things)',t:'i-adj',jlpt:5},
  {k:'暑い',r:'あつい',m:'hot (weather)',t:'i-adj',jlpt:5},
  {k:'寒い',r:'さむい',m:'cold (weather)',t:'i-adj',jlpt:5},
  {k:'長い',r:'ながい',m:'long',t:'i-adj',jlpt:5},
  {k:'短い',r:'みじかい',m:'short',t:'i-adj',jlpt:5},
  {k:'いい',r:'いい',m:'good',t:'i-adj',jlpt:5,exc:true},
  {k:'悪い',r:'わるい',m:'bad',t:'i-adj',jlpt:5},
  {k:'早い',r:'はやい',m:'early, fast',t:'i-adj',jlpt:5},
  {k:'遅い',r:'おそい',m:'late, slow',t:'i-adj',jlpt:5},
  {k:'近い',r:'ちかい',m:'near, close',t:'i-adj',jlpt:5},
  {k:'遠い',r:'とおい',m:'far',t:'i-adj',jlpt:5},
  {k:'多い',r:'おおい',m:'many, much',t:'i-adj',jlpt:5},
  {k:'少ない',r:'すくない',m:'few, little',t:'i-adj',jlpt:5},
  {k:'楽しい',r:'たのしい',m:'fun, enjoyable',t:'i-adj',jlpt:5},
  {k:'難しい',r:'むずかしい',m:'difficult',t:'i-adj',jlpt:5},
  {k:'美味しい',r:'おいしい',m:'delicious',t:'i-adj',jlpt:5},
  {k:'嬉しい',r:'うれしい',m:'happy, glad',t:'i-adj',jlpt:4},
  {k:'悲しい',r:'かなしい',m:'sad',t:'i-adj',jlpt:4},
  {k:'厳しい',r:'きびしい',m:'strict, harsh',t:'i-adj',jlpt:4},
  {k:'眠い',r:'ねむい',m:'sleepy',t:'i-adj',jlpt:4},
  {k:'痛い',r:'いたい',m:'painful',t:'i-adj',jlpt:4},
  {k:'白い',r:'しろい',m:'white',t:'i-adj',jlpt:5},
  {k:'黒い',r:'くろい',m:'black',t:'i-adj',jlpt:5},
  {k:'赤い',r:'あかい',m:'red',t:'i-adj',jlpt:5},
  {k:'青い',r:'あおい',m:'blue',t:'i-adj',jlpt:5},
  {k:'強い',r:'つよい',m:'strong',t:'i-adj',jlpt:4},
  {k:'弱い',r:'よわい',m:'weak',t:'i-adj',jlpt:4},
  {k:'若い',r:'わかい',m:'young',t:'i-adj',jlpt:4},
  {k:'広い',r:'ひろい',m:'wide, spacious',t:'i-adj',jlpt:4},
  {k:'狭い',r:'せまい',m:'narrow, cramped',t:'i-adj',jlpt:4},
  {k:'忙しい',r:'いそがしい',m:'busy',t:'i-adj',jlpt:5},
  {k:'優しい',r:'やさしい',m:'kind, gentle',t:'i-adj',jlpt:4},
  {k:'危ない',r:'あぶない',m:'dangerous',t:'i-adj',jlpt:4},
  // === NA-ADJECTIVES ===
  {k:'元気',r:'げんき',m:'energetic, healthy',t:'na-adj',jlpt:5},
  {k:'綺麗',r:'きれい',m:'pretty, clean',t:'na-adj',jlpt:5},
  {k:'静か',r:'しずか',m:'quiet',t:'na-adj',jlpt:5},
  {k:'好き',r:'すき',m:'liked, favorite',t:'na-adj',jlpt:5},
  {k:'嫌い',r:'きらい',m:'disliked',t:'na-adj',jlpt:5},
  {k:'有名',r:'ゆうめい',m:'famous',t:'na-adj',jlpt:4},
  {k:'大変',r:'たいへん',m:'tough, serious',t:'na-adj',jlpt:4},
  {k:'簡単',r:'かんたん',m:'easy, simple',t:'na-adj',jlpt:4},
  {k:'大丈夫',r:'だいじょうぶ',m:'okay, all right',t:'na-adj',jlpt:5},
  {k:'賑やか',r:'にぎやか',m:'lively, bustling',t:'na-adj',jlpt:4},
  {k:'丁寧',r:'ていねい',m:'polite, careful',t:'na-adj',jlpt:4},
  {k:'複雑',r:'ふくざつ',m:'complicated',t:'na-adj',jlpt:4},
  {k:'不便',r:'ふべん',m:'inconvenient',t:'na-adj',jlpt:4},
  {k:'安全',r:'あんぜん',m:'safe',t:'na-adj',jlpt:4},
  {k:'真面目',r:'まじめ',m:'serious, diligent',t:'na-adj',jlpt:4},
  {k:'便利',r:'べんり',m:'convenient',t:'na-adj',jlpt:4},
  {k:'上手',r:'じょうず',m:'skillful, good at',t:'na-adj',jlpt:5},
  {k:'下手',r:'へた',m:'unskillful, bad at',t:'na-adj',jlpt:5},
  {k:'暇',r:'ひま',m:'free (time), not busy',t:'na-adj',jlpt:4},
  {k:'特別',r:'とくべつ',m:'special',t:'na-adj',jlpt:3},
  {k:'必要',r:'ひつよう',m:'necessary',t:'na-adj',jlpt:3},
  // === NOUNS (for copula conjugation) ===
  {k:'学生',r:'がくせい',m:'student',t:'noun',jlpt:5},
  {k:'先生',r:'せんせい',m:'teacher',t:'noun',jlpt:5},
  {k:'日本人',r:'にほんじん',m:'Japanese person',t:'noun',jlpt:5},
  {k:'友達',r:'ともだち',m:'friend',t:'noun',jlpt:5},
  {k:'猫',r:'ねこ',m:'cat',t:'noun',jlpt:5},
  {k:'犬',r:'いぬ',m:'dog',t:'noun',jlpt:5},
  {k:'本',r:'ほん',m:'book',t:'noun',jlpt:5},
  {k:'水',r:'みず',m:'water',t:'noun',jlpt:5},
  {k:'大人',r:'おとな',m:'adult',t:'noun',jlpt:4},
  {k:'子供',r:'こども',m:'child',t:'noun',jlpt:4},
  {k:'社会人',r:'しゃかいじん',m:'working adult',t:'noun',jlpt:3},
  {k:'病気',r:'びょうき',m:'illness, sick',t:'noun',jlpt:4},
  {k:'秘密',r:'ひみつ',m:'secret',t:'noun',jlpt:3},
  {k:'嘘',r:'うそ',m:'lie',t:'noun',jlpt:4},
  {k:'本当',r:'ほんとう',m:'truth, reality',t:'noun',jlpt:4},
];

// =====================================================================
// STATE
// =====================================================================

let activeTab='verb'; // 'verb', 'adj', 'noun'
let cur=null;       // current verb {k, r, m, t}
let selVowel=null;  // selected vowel row 'a','i','u','e','o' or null
let selConj=null;   // selected conjugation id or null
let endingRemoved=false; // for ichidan: has る been removed?

// Drill-down stack
let drillStack=[];
let teCompoundMode = false;

// Search & filter state
let searchQuery='';
let jlptFilter=new Set();
let excFilter=false;

// =====================================================================
// CONJUGATION ENGINE
// =====================================================================

const DRILLABLE = new Set(['eru','passive','causative','causepass','teiru','te']);

const TE_COMPOUNDS = [
  {id:'te_shimau', suf:'しまう', lb:'てしまう', desc:'completion / regret', en:v=>`end up ${enBase(v)}ing`, drillType:'godan'},
  {id:'te_miru',   suf:'みる',   lb:'てみる',   desc:'try doing',          en:v=>`try ${enBase(v)}ing`,    drillType:'ichidan'},
  {id:'te_oku',    suf:'おく',   lb:'ておく',   desc:'do in advance',      en:v=>`${enBase(v)} in advance`, drillType:'godan'},
  {id:'te_aru',    suf:'ある',   lb:'てある',   desc:'resultative state',   en:v=>`is ${enBase(v)}ed (state)`, drillType:'aru'},
  {id:'te_ageru',  suf:'あげる', lb:'てあげる', desc:'do for someone',     en:v=>`${enBase(v)} for someone`, drillType:'ichidan'},
  {id:'te_morau',  suf:'もらう', lb:'てもらう', desc:'have someone do',    en:v=>`have someone ${enBase(v)}`, drillType:'godan'},
  {id:'te_kureru', suf:'くれる', lb:'てくれる', desc:'someone does for me',en:v=>`someone ${enBase(v)}s for me`, drillType:'ichidan'},
  {id:'te_kudasai',suf:'ください',lb:'てください',desc:'please do (polite)', en:v=>`please ${enBase(v)}`, drillType:null},
  {id:'te_moii',   suf:'もいい', lb:'てもいい', desc:'permission',         en:v=>`may ${enBase(v)}`, drillType:null},
  {id:'te_ikena',  suf:'はいけない',lb:'てはいけない',desc:'prohibition',  en:v=>`must not ${enBase(v)}`, drillType:null},
];

function enBase(v) { return v.m.replace('to ','').replace(/,.*$/,''); }

function CONJS(isDrilled) {
  const sections = [
    {sec:'Polite (ます forms)', items:[
      {id:'masu',   lb:'polite present',    en:v=>`will ${enBase(v)}`, form:'i', cl:'blue'},
      {id:'mashita',lb:'polite past',       en:v=>`did ${enBase(v)}`, form:'i', cl:'blue'},
      {id:'masen',  lb:'polite negative',   en:v=>`won't ${enBase(v)}`, form:'i', cl:'blue'},
      {id:'msndsh', lb:'polite past neg',   en:v=>`didn't ${enBase(v)}`, form:'i', cl:'blue'},
    ]},
    {sec:'Desire / Let\'s', items:[
      {id:'mashou', lb:"let's (polite)",    en:v=>`let's ${enBase(v)}`, form:'i', cl:'green'},
      {id:'tai',    lb:'want to',           en:v=>`want to ${enBase(v)}`, form:'i', cl:'green'},
      {id:'takatta',lb:'wanted to',         en:v=>`wanted to ${enBase(v)}`, form:'i', cl:'green'},
      {id:'taknai', lb:"don't want to",     en:v=>`don't want to ${enBase(v)}`, form:'i', cl:'green'},
      {id:'taknkt', lb:"didn't want to",    en:v=>`didn't want to ${enBase(v)}`, form:'i', cl:'green'},
    ]},
    {sec:'Informal Negative (あ form)', items:[
      {id:'nai',    lb:'informal neg',      en:v=>`won't ${enBase(v)}`, form:'a', cl:'red'},
      {id:'nakatta',lb:'informal past neg', en:v=>`didn't ${enBase(v)}`, form:'a', cl:'red'},
      {id:'naide',  lb:"don't (request)",   en:v=>`don't ${enBase(v)}`, form:'a', cl:'red'},
    ]},
  ];

  if (!isDrilled) {
    sections.push({sec:'Potential (え form) -- drillable', items:[
      {id:'eru',    lb:'can (dictionary)',   en:v=>`can ${enBase(v)}`, form:'e', cl:'orange', drillable:true},
    ]});
    sections.push({sec:'Passive (あ form + れる) -- drillable', items:[
      {id:'passive',lb:'passive (dictionary)',en:v=>`is ${enBase(v)}ed / gets ${enBase(v)}ed`, form:'a', cl:'pink', drillable:true},
    ]});
    sections.push({sec:'Causative (あ form + せる) -- drillable', items:[
      {id:'causative',lb:'causative (dictionary)',en:v=>`make/let ${enBase(v)}`, form:'a', cl:'teal', drillable:true},
    ]});
    sections.push({sec:'Causative-Passive -- drillable', items:[
      {id:'causepass',lb:'causative-passive',en:v=>`is made to ${enBase(v)}`, form:'a', cl:'purple', drillable:true},
    ]});
  }

  // Volitional
  sections.push({sec:'Volitional (お form)', items:[
    {id:'you',    lb:"let's (informal)",  en:v=>`let's ${enBase(v)}`, form:'o', cl:'yellow'},
  ]});

  // Conditional
  sections.push({sec:'Conditional', items:[
    {id:'cond',   lb:'ば conditional', en:v=>`if ${enBase(v)}`, form:'e', cl:'brown'},
    {id:'tara',   lb:'たら conditional', en:v=>`if/when ${enBase(v)}`, form:'ta', cl:'brown'},
  ]});

  // Progressive (drillable)
  if (!isDrilled) {
    sections.push({sec:'Progressive -- drillable', items:[
      {id:'teiru',  lb:'ている (ongoing)', en:v=>`is ${enBase(v)}ing`, form:'te', cl:'teal', drillable:true},
    ]});
  }

  // Imperative
  sections.push({sec:'Imperative', items:[
    {id:'imperative',lb:'imperative',   en:v=>`${enBase(v)}!`, form:'e', cl:'red'},
  ]});

  // Dictionary / te / ta
  sections.push({sec:'Dictionary / て / た', items:[
    {id:'koto',   lb:'こと (noun)',        en:v=>`${enBase(v)}ing (noun)`, form:'u', cl:'teal'},
    {id:'no',     lb:'の (noun)',          en:v=>`${enBase(v)}ing (noun)`, form:'u', cl:'teal'},
    {id:'na',     lb:"don't! (command)",  en:v=>`don't ${enBase(v)}!`, form:'u', cl:'red'},
    {id:'te',     lb:'て form [expand]',   en:v=>`${enBase(v)}! / and...`, form:'te', cl:'yellow', drillable:true},
    {id:'ta',     lb:'た form (past)',     en:v=>`did ${enBase(v)} (informal)`, form:'ta', cl:'yellow'},
  ]});

  return sections;
}

function CONJS_ADJ() {
  return [
    {sec:'Present', items:[
      {id:'adj_pres',     lb:'present (plain)',     en:w=>`is ${w.m}`,           form:'dict', cl:'blue'},
      {id:'adj_pres_pol', lb:'present (polite)',    en:w=>`is ${w.m} (polite)`,  form:'dict', cl:'blue'},
    ]},
    {sec:'Past', items:[
      {id:'adj_past',     lb:'past (plain)',        en:w=>`was ${w.m}`,           form:'stem', cl:'green'},
      {id:'adj_past_pol', lb:'past (polite)',       en:w=>`was ${w.m} (polite)`,  form:'stem', cl:'green'},
    ]},
    {sec:'Negative', items:[
      {id:'adj_neg',      lb:'negative (plain)',    en:w=>`is not ${w.m}`,           form:'stem', cl:'red'},
      {id:'adj_neg_pol',  lb:'negative (polite)',   en:w=>`is not ${w.m} (polite)`,  form:'stem', cl:'red'},
    ]},
    {sec:'Past Negative', items:[
      {id:'adj_pneg',     lb:'past neg (plain)',    en:w=>`was not ${w.m}`,           form:'stem', cl:'orange'},
      {id:'adj_pneg_pol', lb:'past neg (polite)',   en:w=>`was not ${w.m} (polite)`,  form:'stem', cl:'orange'},
    ]},
    {sec:'Te Form / Conditional', items:[
      {id:'adj_te',       lb:'て form',             en:w=>`${w.m}, and...`,      form:'stem', cl:'yellow'},
      {id:'adj_ba',       lb:'ば conditional',      en:w=>`if ${w.m}`,           form:'stem', cl:'brown'},
      {id:'adj_tara',     lb:'たら conditional',    en:w=>`if/when ${w.m}`,      form:'stem', cl:'brown'},
    ]},
    {sec:'Adverbial / Attributive', items:[
      {id:'adj_adv',      lb:'adverbial',           en:w=>`${w.m} (adverb)`,     form:'stem', cl:'teal'},
      {id:'adj_attr',     lb:'attributive + noun',  en:w=>`${w.m} (before noun)`, form:'dict', cl:'purple'},
    ]},
  ];
}

function CONJS_NOUN() {
  return [
    {sec:'Present', items:[
      {id:'n_pres',     lb:'present (plain)',     en:w=>`is (a) ${w.m}`,           form:'all', cl:'blue'},
      {id:'n_pres_pol', lb:'present (polite)',    en:w=>`is (a) ${w.m} (polite)`,  form:'all', cl:'blue'},
    ]},
    {sec:'Past', items:[
      {id:'n_past',     lb:'past (plain)',        en:w=>`was (a) ${w.m}`,           form:'all', cl:'green'},
      {id:'n_past_pol', lb:'past (polite)',       en:w=>`was (a) ${w.m} (polite)`,  form:'all', cl:'green'},
    ]},
    {sec:'Negative', items:[
      {id:'n_neg',      lb:'negative (plain)',    en:w=>`is not (a) ${w.m}`,           form:'all', cl:'red'},
      {id:'n_neg_pol',  lb:'negative (polite)',   en:w=>`is not (a) ${w.m} (polite)`,  form:'all', cl:'red'},
    ]},
    {sec:'Past Negative', items:[
      {id:'n_pneg',     lb:'past neg (plain)',    en:w=>`was not (a) ${w.m}`,           form:'all', cl:'orange'},
      {id:'n_pneg_pol', lb:'past neg (polite)',   en:w=>`was not (a) ${w.m} (polite)`,  form:'all', cl:'orange'},
    ]},
    {sec:'Te Form / Conditional', items:[
      {id:'n_te',       lb:'て form',             en:w=>`is (a) ${w.m}, and...`, form:'all', cl:'yellow'},
      {id:'n_cond',     lb:'なら conditional',    en:w=>`if (a) ${w.m}`,         form:'all', cl:'brown'},
      {id:'n_tara',     lb:'たら conditional',    en:w=>`if/when was (a) ${w.m}`,form:'all', cl:'brown'},
    ]},
    {sec:'Attributive', items:[
      {id:'n_attr',     lb:'attributive + noun',  en:w=>`${w.m}'s / ${w.m} (before noun)`, form:'all', cl:'purple'},
    ]},
  ];
}

function getConjParts(v, cid) {
  if(!v) return null;
  if(v.t==='i-adj') return partsIAdj(v,cid);
  if(v.t==='na-adj') return partsNaAdj(v,cid);
  if(v.t==='noun') return partsNoun(v,cid);
  if(v.t==='godan') return partsGodan(v,cid);
  if(v.t==='ichidan'||v.t==='drilled') return partsIchidan(v,cid);
  if(v.t==='irregular') return partsIrr(v,cid);
  return null;
}

function getFullConj(v,cid) {
  const p=getConjParts(v,cid);
  return p ? p.full : null;
}

function getDisplaySuffix(v, cid) {
  const p=getConjParts(v,cid);
  return p ? p.suffix : null;
}

function partsIchidan(v, cid) {
  const root=v.r.slice(0,-1); // drop る
  const suffMap={
    masu:'ます',mashita:'ました',masen:'ません',msndsh:'ませんでした',
    mashou:'ましょう',tai:'たい',takatta:'たかった',taknai:'たくない',taknkt:'たくなかった',
    nai:'ない',nakatta:'なかった',naide:'ないで',
    eru:'られる',
    passive:'られる',
    causative:'させる',
    causepass:'させられる',
    you:'よう',koto:'ること',no:'るの',na:'るな',te:'て',ta:'た',
    cond:'れば',
    tara:'たら',
    teiru:'ている',
    imperative:'ろ',
  };
  const suf=suffMap[cid];
  if(!suf) return null;
  const keepRu = cid==='koto'||cid==='no'||cid==='na';
  const full = keepRu ? v.r+suf.slice(1) : root+suf;
  return { full, root, stemKana:'', suffix:suf };
}

function partsGodan(v, cid) {
  const last=v.r.slice(-1), col=EC[last], root=v.r.slice(0,-1), st=ST[col];
  if(!st) return null;

  // i-form
  const iSuf={masu:'ます',mashita:'ました',masen:'ません',msndsh:'ませんでした',
    mashou:'ましょう',tai:'たい',takatta:'たかった',taknai:'たくない',taknkt:'たくなかった'};
  if(iSuf[cid]) return { full:root+st.i+iSuf[cid], root, stemKana:st.i, suffix:iSuf[cid] };

  // a-form
  const aSuf={nai:'ない',nakatta:'なかった',naide:'ないで'};
  if(aSuf[cid]) return { full:root+st.a+aSuf[cid], root, stemKana:st.a, suffix:aSuf[cid] };

  // Passive: a-form + れる
  if(cid==='passive') return { full:root+st.a+'れる', root, stemKana:st.a, suffix:'れる' };
  // Causative: a-form + せる
  if(cid==='causative') return { full:root+st.a+'せる', root, stemKana:st.a, suffix:'せる' };
  // Causative-passive: a-form + せられる
  if(cid==='causepass') return { full:root+st.a+'せられる', root, stemKana:st.a, suffix:'せられる' };

  // e-form (potential) - just the dictionary form る
  if(cid==='eru') return { full:root+st.e+'る', root, stemKana:st.e, suffix:'る' };

  // Conditional ば: e-form + ば
  if(cid==='cond') return { full:root+st.e+'ば', root, stemKana:st.e, suffix:'ば' };

  // Imperative: e-form (no suffix)
  if(cid==='imperative') return { full:root+st.e, root, stemKana:st.e, suffix:'' };

  // o-form
  if(cid==='you') return { full:root+st.o+'う', root, stemKana:st.o, suffix:'う' };

  // u-form
  if(cid==='koto') return { full:v.r+'こと', root, stemKana:last, suffix:'こと' };
  if(cid==='no') return { full:v.r+'の', root, stemKana:last, suffix:'の' };
  if(cid==='na') return { full:v.r+'な', root, stemKana:last, suffix:'な' };

  // te/ta
  let te,ta;
  if(SPEC[v.r]){te=SPEC[v.r].te;ta=SPEC[v.r].ta;}
  else{const r=TETA[last];te=root+r.te;ta=root+r.ta;}
  if(cid==='te') {
    const teSuf = SPEC[v.r] ? SPEC[v.r].te.slice(root.length) : TETA[last].te;
    return { full:te, root, stemKana:'', suffix:teSuf };
  }
  if(cid==='ta') {
    const taSuf = SPEC[v.r] ? SPEC[v.r].ta.slice(root.length) : TETA[last].ta;
    return { full:ta, root, stemKana:'', suffix:taSuf };
  }

  // Conditional たら: ta-form + ら
  if(cid==='tara') {
    let taForm;
    if(SPEC[v.r]){taForm=SPEC[v.r].ta;}
    else{taForm=root+TETA[last].ta;}
    const taSuf = SPEC[v.r] ? SPEC[v.r].ta.slice(root.length) : TETA[last].ta;
    return { full:taForm+'ら', root, stemKana:'', suffix:taSuf+'ら' };
  }

  // Progressive ている: te-form + いる
  if(cid==='teiru') {
    let teForm;
    if(SPEC[v.r]){teForm=SPEC[v.r].te;}
    else{teForm=root+TETA[last].te;}
    const teSuf = SPEC[v.r] ? SPEC[v.r].te.slice(root.length) : TETA[last].te;
    return { full:teForm+'いる', root, stemKana:'', suffix:teSuf+'いる' };
  }

  return null;
}

function partsIrr(v, cid) {
  const isSuru = v.r.endsWith('する');
  const isKuru = v.r === 'くる';

  if(isSuru) {
    const prefix = v.r.slice(0, -2);
    const baseMap={
      masu:{sk:'し',sf:'ます'},mashita:{sk:'し',sf:'ました'},masen:{sk:'し',sf:'ません'},msndsh:{sk:'し',sf:'ませんでした'},
      mashou:{sk:'し',sf:'ましょう'},tai:{sk:'し',sf:'たい'},takatta:{sk:'し',sf:'たかった'},taknai:{sk:'し',sf:'たくない'},taknkt:{sk:'し',sf:'たくなかった'},
      nai:{sk:'し',sf:'ない'},nakatta:{sk:'し',sf:'なかった'},naide:{sk:'し',sf:'ないで'},
      eru:{sk:'でき',sf:'る'},
      passive:{sk:'さ',sf:'れる'},causative:{sk:'さ',sf:'せる'},causepass:{sk:'さ',sf:'せられる'},
      you:{sk:'し',sf:'よう'},koto:{sk:'する',sf:'こと'},no:{sk:'する',sf:'の'},na:{sk:'する',sf:'な'},te:{sk:'し',sf:'て'},ta:{sk:'し',sf:'た'},
      cond:{sk:'す',sf:'れば'},
      tara:{sk:'し',sf:'たら'},
      teiru:{sk:'し',sf:'ている'},
      imperative:{sk:'し',sf:'ろ'},
    };
    if(!baseMap[cid]) return null;
    const b = baseMap[cid];
    const sk = prefix + b.sk;
    return { full:sk+b.sf, root:'', stemKana:sk, suffix:b.sf };
  } else if(isKuru) {
    const map={
      masu:{sk:'き',sf:'ます'},mashita:{sk:'き',sf:'ました'},masen:{sk:'き',sf:'ません'},msndsh:{sk:'き',sf:'ませんでした'},
      mashou:{sk:'き',sf:'ましょう'},tai:{sk:'き',sf:'たい'},takatta:{sk:'き',sf:'たかった'},taknai:{sk:'き',sf:'たくない'},taknkt:{sk:'き',sf:'たくなかった'},
      nai:{sk:'こ',sf:'ない'},nakatta:{sk:'こ',sf:'なかった'},naide:{sk:'こ',sf:'ないで'},
      eru:{sk:'こられ',sf:'る'},
      passive:{sk:'こ',sf:'られる'},causative:{sk:'こ',sf:'させる'},causepass:{sk:'こ',sf:'させられる'},
      you:{sk:'こ',sf:'よう'},koto:{sk:'くる',sf:'こと'},no:{sk:'くる',sf:'の'},na:{sk:'くる',sf:'な'},te:{sk:'き',sf:'て'},ta:{sk:'き',sf:'た'},
      cond:{sk:'く',sf:'れば'},
      tara:{sk:'き',sf:'たら'},
      teiru:{sk:'き',sf:'ている'},
      imperative:{sk:'こ',sf:'い'},
    };
    if(!map[cid]) return null;
    const m=map[cid];
    return { full:m.sk+m.sf, root:'', stemKana:m.sk, suffix:m.sf };
  } else if(v.r.endsWith('ある')) {
    // ある is irregular: negative is ない (not あらない)
    // No potential, passive, causative, causative-passive, or imperative forms
    // Handles both standalone ある and compound てある
    const prefix = v.r.slice(0, -2);
    const base = {
      masu:{sk:'あり',sf:'ます'},mashita:{sk:'あり',sf:'ました'},
      masen:{sk:'あり',sf:'ません'},msndsh:{sk:'あり',sf:'ませんでした'},
      mashou:{sk:'あり',sf:'ましょう'},
      tai:{sk:'あり',sf:'たい'},takatta:{sk:'あり',sf:'たかった'},
      taknai:{sk:'あり',sf:'たくない'},taknkt:{sk:'あり',sf:'たくなかった'},
      nai:{sk:'',sf:'ない'},nakatta:{sk:'',sf:'なかった'},naide:{sk:'',sf:'ないで'},
      you:{sk:'あろ',sf:'う'},
      koto:{sk:'ある',sf:'こと'},no:{sk:'ある',sf:'の'},
      te:{sk:'あっ',sf:'て'},ta:{sk:'あっ',sf:'た'},
      cond:{sk:'あれ',sf:'ば'},tara:{sk:'あっ',sf:'たら'},teiru:{sk:'あっ',sf:'ている'},
    };
    if(!base[cid]) return null;
    const m=base[cid];
    return { full:prefix+m.sk+m.sf, root:prefix, stemKana:m.sk, suffix:m.sf };
  }
  return null;
}

function partsIAdj(w, cid) {
  const isIi = (w.r === 'いい');
  const root = isIi ? '' : w.r.slice(0, -1);
  const stem = isIi ? 'よ' : w.r.slice(0, -1);

  // Dictionary forms use the original word, not the よ stem
  if(isIi && (cid==='adj_pres' || cid==='adj_pres_pol' || cid==='adj_attr')) {
    const map = {
      adj_pres:     { sf:'いい',     full:'いい' },
      adj_pres_pol: { sf:'いいです', full:'いいです' },
      adj_attr:     { sf:'いい',     full:'いい' },
    };
    const e = map[cid];
    return { full:e.full, root:'', stemKana:'', suffix:e.sf };
  }

  const map = {
    adj_pres:     { sf:'い',           full:w.r },
    adj_pres_pol: { sf:'いです',       full:w.r+'です' },
    adj_past:     { sf:'かった',       full:stem+'かった' },
    adj_past_pol: { sf:'かったです',   full:stem+'かったです' },
    adj_neg:      { sf:'くない',       full:stem+'くない' },
    adj_neg_pol:  { sf:'くないです',   full:stem+'くないです' },
    adj_pneg:     { sf:'くなかった',   full:stem+'くなかった' },
    adj_pneg_pol: { sf:'くなかったです',full:stem+'くなかったです' },
    adj_te:       { sf:'くて',         full:stem+'くて' },
    adj_ba:       { sf:'ければ',       full:stem+'ければ' },
    adj_tara:     { sf:'かったら',     full:stem+'かったら' },
    adj_adv:      { sf:'く',           full:stem+'く' },
    adj_attr:     { sf:'い',           full:w.r },
  };
  const e = map[cid];
  if(!e) return null;
  return { full:e.full, root:root, stemKana:isIi?stem:'', suffix:e.sf };
}

function partsNaAdj(w, cid) {
  const stem = w.r;
  const map = {
    adj_pres:     { sf: 'だ' },
    adj_pres_pol: { sf: 'です' },
    adj_past:     { sf: 'だった' },
    adj_past_pol: { sf: 'でした' },
    adj_neg:      { sf: 'じゃない' },
    adj_neg_pol:  { sf: 'ではありません' },
    adj_pneg:     { sf: 'じゃなかった' },
    adj_pneg_pol: { sf: 'ではありませんでした' },
    adj_te:       { sf: 'で' },
    adj_ba:       { sf: 'なら(ば)' },
    adj_tara:     { sf: 'だったら' },
    adj_adv:      { sf: 'に' },
    adj_attr:     { sf: 'な' },
  };
  const e = map[cid];
  if (!e) return null;
  return { full: stem + e.sf, root: stem, stemKana: '', suffix: e.sf };
}

function partsNoun(w, cid) {
  const stem = w.r;
  const map = {
    n_pres:     { sf: 'だ' },
    n_pres_pol: { sf: 'です' },
    n_past:     { sf: 'だった' },
    n_past_pol: { sf: 'でした' },
    n_neg:      { sf: 'じゃない' },
    n_neg_pol:  { sf: 'ではありません' },
    n_pneg:     { sf: 'じゃなかった' },
    n_pneg_pol: { sf: 'ではありませんでした' },
    n_te:       { sf: 'で' },
    n_cond:     { sf: 'なら' },
    n_tara:     { sf: 'だったら' },
    n_attr:     { sf: 'の' },
  };
  const e = map[cid];
  if (!e) return null;
  return { full: stem + e.sf, root: stem, stemKana: '', suffix: e.sf };
}

function getAllConjItems() {
  const all=[];
  let sections;
  if(cur && (cur.t==='i-adj' || cur.t==='na-adj')) sections = CONJS_ADJ();
  else if(cur && cur.t==='noun') sections = CONJS_NOUN();
  else sections = CONJS(drillStack.length>0);
  sections.forEach(s=>s.items.forEach(i=>all.push(i)));
  return all;
}

function getGodanStemKana() {
  if(!cur||cur.t!=='godan'||!selVowel) return null;
  const last=cur.r.slice(-1), col=EC[last];
  return ST[col]?.[selVowel]||null;
}

// Is a conjugation lit given current state?
function isLit(form) {
  if(!cur) return false;
  if(cur.t==='i-adj') {
    if(!endingRemoved) return form==='dict';
    return true;
  }
  if(cur.t==='na-adj' || cur.t==='noun') return true;
  if(cur.t==='ichidan'||cur.t==='irregular'||cur.t==='drilled') {
    if((cur.t==='ichidan'||cur.t==='drilled') && !endingRemoved) {
      return form==='u'||form==='te'||form==='ta';
    }
    return true;
  }
  // Godan: u/te/ta only show when no vowel is selected (default state).
  if(!selVowel) return form==='u'||form==='te'||form==='ta';
  return form===selVowel;
}

// =====================================================================
// DRILL-DOWN
// =====================================================================

function getDrillLabel(cid) {
  const labels = {
    eru:'potential', passive:'passive', causative:'causative', causepass:'causative-passive',
    teiru:'progressive', te:'て form'
  };
  if (labels[cid]) return labels[cid];
  const tc = TE_COMPOUNDS.find(c => c.id === cid);
  if (tc) return tc.lb;
  return cid;
}

function getDrillMeaning(baseVerb, cid) {
  const b = enBase(baseVerb);
  const meanings = {
    eru:`to be able to ${b}`,
    passive:`to be ${b}ed`,
    causative:`to make/let ${b}`,
    causepass:`to be made to ${b}`,
    teiru:`to be ${b}ing`,
    te:`${baseVerb.m} (て form)`,
  };
  if (meanings[cid]) return meanings[cid];
  // Check TE_COMPOUNDS
  const tc = TE_COMPOUNDS.find(c => c.id === cid);
  if (tc) return 'to ' + tc.en(baseVerb);
  return baseVerb.m;
}

function drillInto(cid) {
  if(cur.t==='i-adj' || cur.t==='na-adj' || cur.t==='noun') return;

  if(cid === 'te') {
    // て form opens compound selection panel
    drillStack.push({ verb:cur, conjId:cid, label:'て form', selVowel, endingRemoved });
    teCompoundMode = true;
    selConj = null;
    selVowel = null;
    endingRemoved = false;
    render();
    return;
  }

  const full = getFullConj(cur, cid);
  if(!full || !full.endsWith('る')) return;

  drillStack.push({
    verb: cur,
    conjId: cid,
    label: getDrillLabel(cid),
    selVowel: selVowel,
    endingRemoved: endingRemoved,
  });

  cur = {
    k: full,
    r: full,
    m: getDrillMeaning(drillStack[0]?.verb || cur, cid),
    t: 'drilled',
  };
  selVowel = null;
  selConj = null;
  endingRemoved = true;
  render();
}

function drillTeCompound(compound) {
  // Get the base verb (the one we drilled て from)
  const baseEntry = drillStack[drillStack.length - 1];
  const baseVerb = baseEntry.verb;
  const teForm = getFullConj(baseVerb, 'te');
  if (!teForm) return;
  const full = teForm + compound.suf;

  if (!compound.drillType) {
    // Terminal phrase -- just show in tiles
    selConj = selConj === compound.id ? null : compound.id;
    render();
    return;
  }

  // Determine the drilled verb type
  let newType;
  if (compound.drillType === 'ichidan') newType = 'drilled';
  else if (compound.drillType === 'aru') newType = 'irregular';
  else newType = compound.drillType; // 'godan'

  drillStack.push({
    verb: cur, conjId: compound.id,
    label: compound.lb, selVowel: null, endingRemoved: false,
  });

  cur = {
    k: full, r: full,
    m: 'to ' + compound.en(baseVerb),
    t: newType,
  };
  teCompoundMode = false;
  selVowel = null;
  selConj = null;
  // Auto-remove ending for ichidan drilled verbs
  endingRemoved = (compound.drillType === 'ichidan');
  render();
}

function drillBack(toIndex) {
  teCompoundMode = false;
  if(toIndex < 0 || toIndex >= drillStack.length) {
    const base = drillStack[0];
    cur = base.verb;
    selVowel = null;
    selConj = null;
    endingRemoved = false;
    drillStack = [];
  } else {
    const entry = drillStack[toIndex];
    drillStack = drillStack.slice(0, toIndex);
    cur = entry.verb;
    selVowel = null;
    selConj = null;
    endingRemoved = false;
  }
  render();
}

// =====================================================================
// RENDERING
// =====================================================================

function render() {
  renderTiles();
  renderHint();
  renderInfo();
  renderChart();
  renderDrillBar();
  renderConj();
  renderBar();
  renderFilterBtns();
  pushState();
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === activeTab);
  });
}

function renderTiles() {
  const el=document.getElementById('tiles');
  el.innerHTML='';
  el.className='tile-slots';
  const N=8;
  if(!cur) { for(let i=0;i<N;i++){const d=document.createElement('div');d.className='tile-slot';el.appendChild(d);} return; }

  // Compact tiles for long conjugated forms
  let charCount = [...cur.r].length;
  if(selConj) { const p=getConjParts(cur,selConj); if(p) charCount=[...p.full].length; }
  if(charCount > 10) el.classList.add('very-compact');
  else if(charCount > 7) el.classList.add('compact');

  // Handle て compound terminal phrase display
  if (selConj && teCompoundMode) {
    const compound = TE_COMPOUNDS.find(c => c.id === selConj);
    if (compound) {
      const baseEntry = drillStack[drillStack.length - 1];
      const baseVerb = baseEntry.verb;
      const teForm = getFullConj(baseVerb, 'te');
      if (teForm) {
        const teChars = [...teForm];
        const sufChars = [...compound.suf];
        const allChars = [...teChars, ...sufChars];
        const total = Math.max(N, allChars.length);
        let cc = allChars.length;
        if (cc > 10) el.classList.add('very-compact');
        else if (cc > 7) el.classList.add('compact');
        for (let i = 0; i < total; i++) {
          const d = document.createElement('div');
          d.className = 'tile-slot';
          if (i < allChars.length) {
            d.textContent = allChars[i];
            if (i < teChars.length) d.classList.add('stem-new');
            else d.classList.add('conj-part');
          }
          el.appendChild(d);
        }
        return;
      }
    }
  }

  if(selConj && cur) {
    const parts=getConjParts(cur,selConj);
    if(parts) {
      const rootChars=[...parts.root];
      const stemChars=[...parts.stemKana];
      const sufChars=[...parts.suffix];
      const allChars=[...rootChars,...stemChars,...sufChars];
      const total=Math.max(N,allChars.length);

      const isDrillable = (DRILLABLE.has(selConj) && parts.full.endsWith('る') && drillStack.length < 3)
                       || (DRILLABLE.has(selConj) && selConj === 'te' && drillStack.length < 3);

      for(let i=0;i<total;i++) {
        const d=document.createElement('div');
        d.className='tile-slot';
        if(i<allChars.length) {
          d.textContent=allChars[i];
          if(i<rootChars.length) {
            d.classList.add('filled');
          } else if(i<rootChars.length+stemChars.length) {
            d.classList.add('stem-new');
          } else {
            d.classList.add('conj-part');
            if(isDrillable && i===allChars.length-1 && (allChars[i]==='る' || selConj === 'te')) {
              d.classList.remove('conj-part');
              d.classList.add('ending');
              d.classList.add('pulse');
              d.title = selConj==='te' ? 'Click to expand て compounds' : 'Click to drill deeper into this conjugation';
              d.onclick=()=>drillInto(selConj);
            }
          }
        }
        el.appendChild(d);
      }
      return;
    }
  }

  // Show verb reading with interactive ending
  const chars=[...cur.r];
  for(let i=0;i<Math.max(N,chars.length);i++) {
    const d=document.createElement('div');
    d.className='tile-slot';
    if(i<chars.length) {
      d.textContent=chars[i];
      d.classList.add('filled');
      if(i===chars.length-1) {
        if(cur.t==='godan') {
          if(selVowel) {
            const newK=getGodanStemKana();
            if(newK && selVowel!=='u') {
              d.textContent=newK;
              d.classList.add('stem-new');
              d.classList.remove('filled');
            } else {
              d.classList.add('ending');
            }
          } else {
            d.classList.add('ending');
          }
        } else if(cur.t==='i-adj') {
          if(endingRemoved) {
            d.classList.add('removed');
            d.classList.remove('filled');
            d.textContent='い';
            d.style.color='#4a5a6a';
            d.style.textDecoration='line-through';
            d.style.cursor='pointer';
            d.onclick=()=>{ endingRemoved=false; selConj=null; render(); };
          } else {
            d.classList.add('ending');
            d.classList.add('pulse');
            d.onclick=()=>{ endingRemoved=true; selConj=null; render(); };
          }
        } else if(cur.t==='na-adj' || cur.t==='noun') {
          // No interactive ending - just filled
        } else if(cur.t==='ichidan'||cur.t==='drilled') {
          if(endingRemoved) {
            d.classList.add('removed');
            d.classList.remove('filled');
            d.textContent='る';
            d.style.color='#4a5a6a';
            d.style.textDecoration='line-through';
            d.style.cursor='pointer';
            d.onclick=()=>{ endingRemoved=false; selConj=null; render(); };
          } else {
            d.classList.add('ending','pulse');
            d.onclick=()=>{ endingRemoved=true; selConj=null; render(); };
          }
        } else {
          // irregular
          d.classList.add('ending');
        }
      }
    }
    el.appendChild(d);
  }
}

function renderHint() {
  const el=document.getElementById('tileHint');
  if(!cur) { el.textContent=''; return; }

  if (teCompoundMode) {
    el.textContent = 'Select a て compound to drill deeper, or a phrase to see the full form';
    return;
  }

  const isIchi = cur.t==='ichidan'||cur.t==='drilled';
  const isGodan = cur.t==='godan';

  if(cur.t==='i-adj' && !endingRemoved) {
    el.textContent='Click the い tile to remove it and see conjugations';
    return;
  } else if(cur.t==='i-adj' && endingRemoved && !selConj) {
    el.textContent='Click a conjugation to build the word';
    return;
  } else if((cur.t==='na-adj' || cur.t==='noun') && !selConj) {
    el.textContent='Click a conjugation to build the word';
    return;
  }

  if(isGodan && !selVowel) {
    el.textContent='Click a kana in the highlighted column to select a form';
  } else if(isGodan && selVowel && !selConj) {
    el.textContent='Click a conjugation on the right';
  } else if(isIchi && !endingRemoved) {
    el.textContent='Click the る tile to remove it and see conjugations';
  } else if(isIchi && endingRemoved && !selConj) {
    el.textContent='Click a conjugation to build the word';
  } else if(selConj) {
    // Check if drillable
    const isDrillable = DRILLABLE.has(selConj) && drillStack.length < 3;
    const parts = getConjParts(cur, selConj);
    if(isDrillable && parts && (parts.full.endsWith('る') || selConj === 'te')) {
      el.textContent = selConj === 'te' ? 'Click the gold て tile to expand て compounds' : 'Click the gold る to drill deeper into this form';
    } else {
      // Show english meaning
      const defs=getAllConjItems();
      const it=defs.find(x=>x.id===selConj);
      if(it) el.textContent=it.en(cur);
      else el.textContent='';
    }
  } else if(cur.t==='irregular' && !selConj) {
    el.textContent='Click a conjugation to build the word';
  } else {
    el.textContent='';
  }
}

function renderInfo() {
  const kEl=document.getElementById('vkanji'),mEl=document.getElementById('vmeaning'),tEl=document.getElementById('vtype'),eEl=document.getElementById('venglish');
  if(!cur){kEl.innerHTML='<span style="color:#556;font-size:13px">Select a word below or click "Surprise me"</span>';mEl.textContent='';tEl.innerHTML='';eEl.textContent='';return;}

  if(drillStack.length > 0) {
    const base = drillStack[0].verb;
    kEl.innerHTML=`<span class="big">${cur.r}</span>`;
    mEl.textContent=cur.m + ` (from ${base.k})`;
  } else {
    kEl.innerHTML=`<span class="big">${cur.k}</span> (${cur.r})`;
    mEl.textContent=cur.m;
  }

  let cls, txt;
  if(cur.t==='i-adj') { cls='i-adj'; txt='い-Adjective'; }
  else if(cur.t==='na-adj') { cls='na-adj'; txt='な-Adjective'; }
  else if(cur.t==='noun') { cls='noun'; txt='Noun + Copula'; }
  else if(cur.t==='godan') { cls='godan'; txt='Regular (Godan / 5-step)'; }
  else if(cur.t==='ichidan'||cur.t==='drilled') { cls='ichidan'; txt=cur.t==='drilled'?'Sub-verb (ichidan-like)':'Iru/Eru (Ichidan / 1-step)'; }
  else { cls='irregular'; txt='Irregular'; }
  tEl.innerHTML=`<span class="verb-type-badge ${cls}">${txt}</span>`;

  if (teCompoundMode && selConj) {
    const compound = TE_COMPOUNDS.find(c => c.id === selConj);
    if (compound) {
      const baseVerb = drillStack[drillStack.length - 1]?.verb;
      if (baseVerb) eEl.textContent = compound.en(baseVerb);
    }
  } else if(selConj&&cur) {
    const defs=getAllConjItems();
    const it=defs.find(x=>x.id===selConj);
    if(it) eEl.textContent=it.en(cur);
    else eEl.textContent='';
  } else {
    eEl.textContent='';
  }
}

function renderDrillBar() {
  const el=document.getElementById('drillBar');
  if(drillStack.length === 0) { el.innerHTML=''; return; }

  el.innerHTML='';
  const bar=document.createElement('div');
  bar.className='drill-bar';

  const baseCrumb=document.createElement('span');
  baseCrumb.className='crumb';
  baseCrumb.textContent=drillStack[0].verb.k;
  baseCrumb.onclick=()=>{ drillBack(-1); };
  bar.appendChild(baseCrumb);

  drillStack.forEach((entry, i)=>{
    const arrow=document.createElement('span');
    arrow.className='arrow';
    arrow.textContent=' > ';
    bar.appendChild(arrow);

    const crumb=document.createElement('span');
    crumb.className='crumb' + (i===drillStack.length-1?' current':'');
    crumb.textContent=entry.label;
    if(i<drillStack.length-1) {
      crumb.onclick=()=>{ drillBack(i+1); };
    }
    bar.appendChild(crumb);
  });

  const hint=document.createElement('span');
  hint.className='drill-hint';
  hint.textContent = teCompoundMode ? 'select a て compound' : 'click る to go deeper';
  bar.appendChild(hint);

  el.appendChild(bar);
}

function renderChart() {
  const g=document.getElementById('chart');
  g.innerHTML='';

  if (teCompoundMode) {
    g.style.display = 'block';
    const baseEntry = drillStack[drillStack.length - 1];
    const baseVerb = baseEntry?.verb;
    const teForm = baseVerb ? getFullConj(baseVerb, 'te') : '';
    g.innerHTML = '<div class="ref-card"><div class="ref-title">て Form Compounds</div><div class="ref-stem">' + (teForm || '') + '</div><div class="ref-hint">Select a compound to conjugate the combined form,<br>or a fixed phrase to see the complete expression</div></div>';
    return;
  }

  // For non-verb tabs, show a reference card instead of the kana chart
  if(cur && (cur.t==='i-adj' || cur.t==='na-adj' || cur.t==='noun')) {
    g.style.display='block';
    let title, stemText, hint;
    if(cur.t==='i-adj') {
      const isIi = cur.r==='いい';
      title = 'い-Adjective';
      stemText = isIi ? 'Stem: よ (irregular)' : 'Stem: ' + cur.r.slice(0,-1);
      hint = isIi ? 'Irregular: いい \u2192 よ + endings' : 'Drop い, then add conjugation endings';
    } else if(cur.t==='na-adj') {
      title = 'な-Adjective';
      stemText = 'Stem: ' + cur.r;
      hint = 'Add copula endings (だ, です, etc.) directly to the stem';
    } else {
      title = 'Noun + Copula';
      stemText = 'Word: ' + cur.r;
      hint = 'Add copula endings (だ, です, etc.) to express state of being';
    }
    g.innerHTML = '<div class="ref-card"><div class="ref-title">' + title + '</div><div class="ref-stem">' + stemText + '</div><div class="ref-hint">' + hint + '</div></div>';
    return;
  }

  if(!cur && (activeTab==='adj' || activeTab==='noun')) {
    g.style.display='block';
    g.innerHTML = '<div class="ref-card"><div class="ref-hint">Select a word to see conjugation info</div></div>';
    return;
  }

  g.style.display='';
  const endCol = cur&&cur.t==='godan' ? EC[cur.r.slice(-1)] : -1;

  ROWS.forEach((row,ri)=>{
    const lbl=document.createElement('div');
    lbl.className='row-label';
    lbl.textContent=row.l;
    g.appendChild(lbl);

    row.k.forEach((ch,ci)=>{
      const c=document.createElement('div');
      c.className='kana-cell';
      c.textContent=ch;
      if(!ch){c.classList.add('empty');}
      else if(cur&&cur.t==='godan'&&ci===endCol) {
        if(ri===2) {
          c.classList.add(selVowel==='u'?'active-stem':'verb-ending');
        } else if(selVowel===row.v) {
          c.classList.add('active-stem');
        } else {
          c.classList.add('col-clickable');
        }
        c.onclick=()=>{
          if(selVowel===row.v) { selVowel=null; }
          else { selVowel=row.v; }
          selConj=null;
          render();
        };
      }
      // Ichidan/drilled/irregular: highlight る (column 8, row 2)
      else if(cur&&(cur.t==='ichidan'||cur.t==='drilled'||cur.t==='irregular')&&ci===8&&ri===2&&ch==='る') {
        c.classList.add(endingRemoved?'active-stem':'verb-ending');
      }
      g.appendChild(c);
    });
  });
  const el=document.createElement('div');
  el.className='row-label';
  g.appendChild(el);
  EXTRA.forEach(ch=>{
    const c=document.createElement('div');
    c.className='kana-cell'+(ch?'':' empty');
    c.textContent=ch;
    g.appendChild(c);
  });
}

function renderTeCompounds() {
  const p = document.getElementById('conjP');
  p.innerHTML = '';

  // Get the base verb from drill stack
  const baseEntry = drillStack[drillStack.length - 1];
  const baseVerb = baseEntry.verb;
  const teForm = getFullConj(baseVerb, 'te');
  if (!teForm) return;

  // Section: Drillable compounds
  const drillSection = document.createElement('div');
  drillSection.className = 'conj-section';
  const drillTitle = document.createElement('div');
  drillTitle.className = 'conj-section-title';
  drillTitle.textContent = 'て + Verb Compounds (click to drill deeper)';
  drillSection.appendChild(drillTitle);

  const drillGrid = document.createElement('div');
  drillGrid.className = 'conj-grid';
  TE_COMPOUNDS.filter(c => c.drillType).forEach(compound => {
    const c = document.createElement('div');
    c.className = 'cc teal lit';
    if (selConj === compound.id) c.classList.add('selected');
    c.innerHTML = compound.suf + `<span class="lb">${compound.desc}</span>`;
    c.onclick = () => drillTeCompound(compound);
    drillGrid.appendChild(c);
  });
  drillSection.appendChild(drillGrid);
  p.appendChild(drillSection);

  // Section: Fixed phrases
  const fixedSection = document.createElement('div');
  fixedSection.className = 'conj-section';
  const fixedTitle = document.createElement('div');
  fixedTitle.className = 'conj-section-title';
  fixedTitle.textContent = 'て + Fixed Phrases';
  fixedSection.appendChild(fixedTitle);

  const fixedGrid = document.createElement('div');
  fixedGrid.className = 'conj-grid';
  TE_COMPOUNDS.filter(c => !c.drillType).forEach(compound => {
    const c = document.createElement('div');
    c.className = 'cc yellow lit';
    if (selConj === compound.id) c.classList.add('selected');
    c.innerHTML = compound.suf + `<span class="lb">${compound.desc}</span>`;
    c.onclick = () => {
      selConj = selConj === compound.id ? null : compound.id;
      render();
    };
    fixedGrid.appendChild(c);
  });
  fixedSection.appendChild(fixedGrid);
  p.appendChild(fixedSection);
}

function renderConj() {
  const p=document.getElementById('conjP');
  p.innerHTML='';
  if (teCompoundMode) {
    renderTeCompounds();
    return;
  }
  const isDrilled = drillStack.length > 0;
  const isAdj = cur && (cur.t==='i-adj' || cur.t==='na-adj');
  const isNoun = cur && cur.t==='noun';
  const sections = isAdj ? CONJS_ADJ() : isNoun ? CONJS_NOUN() : CONJS(isDrilled);

  sections.forEach(sec=>{
    // Check if any item in this section is lit
    // Hide section if no items are lit OR if all lit items produce null conjugations
    const anyLit = sec.items.some(it => isLit(it.form));
    const anyReal = anyLit && cur && sec.items.some(it => isLit(it.form) && getConjParts(cur, it.id));

    const wrapper = document.createElement('div');
    wrapper.className = 'conj-section' + (anyReal ? '' : ' hidden');

    const h=document.createElement('div');
    h.className='conj-section-title';
    h.textContent=sec.sec;
    wrapper.appendChild(h);

    // Use grid with appropriate column count
    const grid = document.createElement('div');
    const n = sec.items.length;
    grid.className = 'conj-grid' + (n===1?' cols-1':n===3?' cols-3':'');

    sec.items.forEach(it=>{
      const c=document.createElement('div');
      const lit=isLit(it.form);
      c.className='cc '+(lit?it.cl+' lit':'off');
      if(selConj===it.id) c.classList.add('selected');

      if(lit&&cur) {
        const suf=getDisplaySuffix(cur,it.id);
        let label = it.lb;
        if(it.drillable && it.id==='te') label += ' [click て to expand]';
        else if(it.drillable) label += ' [click る to drill]';
        c.innerHTML=(suf||'\u2014')+`<span class="lb">${label}</span>`;
        c.onclick=()=>{
          selConj=selConj===it.id?null:it.id;
          render();
        };
      } else {
        c.innerHTML=`<span class="lb">${it.lb}</span>`;
      }
      grid.appendChild(c);
    });
    wrapper.appendChild(grid);
    p.appendChild(wrapper);
  });
}

// =====================================================================
// SEARCH & FILTER
// =====================================================================

// Hiragana to romaji conversion for search
const H2R={'あ':'a','い':'i','う':'u','え':'e','お':'o',
'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko','が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so','ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to','だ':'da','ぢ':'di','づ':'du','で':'de','ど':'do',
'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho','ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
'や':'ya','ゆ':'yu','よ':'yo','ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
'わ':'wa','を':'wo','ん':'n',
'きゃ':'kya','きゅ':'kyu','きょ':'kyo','しゃ':'sha','しゅ':'shu','しょ':'sho',
'ちゃ':'cha','ちゅ':'chu','ちょ':'cho','にゃ':'nya','にゅ':'nyu','にょ':'nyo',
'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo','みゃ':'mya','みゅ':'myu','みょ':'myo',
'りゃ':'rya','りゅ':'ryu','りょ':'ryo',
'ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo','じゃ':'ja','じゅ':'ju','じょ':'jo',
'びゃ':'bya','びゅ':'byu','びょ':'byo','ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo',
'っ':''};

function kanaToRomaji(s) {
  let r='',i=0;
  while(i<s.length) {
    if(s[i]==='っ'&&i+1<s.length) { const next=H2R[s[i+1]]; if(next) { r+=next[0]; i++; continue; } }
    if(i+1<s.length&&H2R[s[i]+s[i+1]]) { r+=H2R[s[i]+s[i+1]]; i+=2; continue; }
    if(H2R[s[i]]) { r+=H2R[s[i]]; i++; continue; }
    r+=s[i]; i++;
  }
  return r;
}

// Cache romaji for each verb
WORDS.forEach(v=>{ v._romaji=kanaToRomaji(v.r); });

function getFilteredWords() {
  const tabTypes = {
    verb: ['godan','ichidan','irregular'],
    adj: ['i-adj','na-adj'],
    noun: ['noun'],
  };
  const allowedTypes = tabTypes[activeTab] || [];
  return WORDS.filter(v=>{
    if(!allowedTypes.includes(v.t)) return false;
    // Search filter (supports kanji, kana, romaji, and english)
    if(searchQuery) {
      const q=searchQuery.toLowerCase();
      if(!v.k.includes(q) && !v.r.includes(q) && !v.m.toLowerCase().includes(q) && !v._romaji.includes(q)) return false;
    }
    // JLPT filter
    if(jlptFilter.size > 0 && !jlptFilter.has(v.jlpt)) return false;
    // Exception filter
    if(excFilter && !v.exc) return false;
    return true;
  });
}

function renderBar() {
  const bar=document.getElementById('vbar');
  bar.innerHTML='';

  const filtered = getFilteredWords();

  let groups;
  if(activeTab==='verb') {
    groups = [
      {label:'Godan (Regular / 5-step)',cls:'godan-label',filter:v=>v.t==='godan'&&!v.exc},
      {label:'Godan Exceptions (iru/eru)',cls:'godan-exc-label',filter:v=>v.t==='godan'&&v.exc},
      {label:'Ichidan (Iru/Eru / 1-step)',cls:'ichidan-label',filter:v=>v.t==='ichidan'},
      {label:'Irregular',cls:'irregular-label',filter:v=>v.t==='irregular'},
    ];
  } else if(activeTab==='adj') {
    groups = [
      {label:'い-Adjectives',cls:'i-adj-label',filter:v=>v.t==='i-adj'&&!v.exc},
      {label:'い-Adjective Exceptions',cls:'i-adj-label',filter:v=>v.t==='i-adj'&&v.exc},
      {label:'な-Adjectives',cls:'na-adj-label',filter:v=>v.t==='na-adj'},
    ];
  } else {
    groups = [
      {label:'Nouns',cls:'noun-label',filter:v=>v.t==='noun'},
    ];
  }

  groups.forEach(g=>{
    const verbs=filtered.filter(g.filter);
    if(!verbs.length) return;
    const grp=document.createElement('div');
    grp.className='verb-group';
    const lbl=document.createElement('div');
    lbl.className='verb-group-label '+g.cls;
    lbl.textContent=g.label+` (${verbs.length})`;
    grp.appendChild(lbl);
    const chips=document.createElement('div');
    chips.className='verb-group-chips';
    verbs.forEach(v=>{
      const d=document.createElement('div');
      d.className='vchip '+v.t+(cur&&cur.k===v.k&&drillStack.length===0?' on':'');
      let inner='';
      const excTitle = v.t==='i-adj' ? 'Irregular adjective' : 'Godan exception - looks ichidan!';
      if(v.exc) inner+='<span class="exc-badge" title="'+excTitle+'">!</span>';
      inner+=`<span class="ck">${v.k}</span>`;
      inner+=`<span class="cr">${v.r}</span>`;
      if(v.jlpt) inner+=`<span class="jlpt-badge j${v.jlpt}">N${v.jlpt}</span>`;
      d.innerHTML=inner;
      d.onclick=()=>loadVerb(v);
      chips.appendChild(d);
    });
    grp.appendChild(chips);
    bar.appendChild(grp);
  });
}

function renderFilterBtns() {
  [5,4,3,2,1].forEach(n=>{
    const btns=document.querySelectorAll(`.jlpt-btn.n${n}`);
    btns.forEach(b=>{
      if(jlptFilter.has(n)) b.classList.add('active');
      else b.classList.remove('active');
    });
  });
  const excBtn=document.getElementById('excBtn');
  if(excFilter) excBtn.classList.add('active');
  else excBtn.classList.remove('active');
}

function onSearchInput() {
  searchQuery=document.getElementById('searchInput').value;
  renderBar();
}

function toggleJlpt(n) {
  if(jlptFilter.has(n)) jlptFilter.delete(n);
  else jlptFilter.add(n);
  renderFilterBtns();
  renderBar();
}

function toggleExc() {
  excFilter=!excFilter;
  renderFilterBtns();
  renderBar();
}

// =====================================================================
// URL STATE
// =====================================================================

function pushState() {
  if(!cur) { history.replaceState(null,'',location.pathname); return; }
  const p = new URLSearchParams();
  p.set('tab', activeTab);
  p.set('v', cur.k); // use kanji as verb identifier (unique)
  if(selVowel) p.set('f', selVowel);
  if(endingRemoved) p.set('ru', '0');
  if(selConj) p.set('c', selConj);
  if(drillStack.length > 0) {
    p.set('d', drillStack.map(e => e.conjId).join(','));
  }
  if(teCompoundMode) p.set('tem','1');
  history.replaceState(null, '', '#' + p.toString());
}

function loadFromURL() {
  const hash = location.hash.slice(1);
  if(!hash) return false;
  const p = new URLSearchParams(hash);
  const tab = p.get('tab');
  if(tab && ['verb','adj','noun'].includes(tab)) activeTab = tab;
  const wordKey = p.get('v');
  if(!wordKey) return false;

  const verb = WORDS.find(v => v.k === wordKey);
  if(!verb) return false;

  cur = verb;
  selVowel = null;
  selConj = null;
  endingRemoved = false;
  drillStack = [];

  // Replay drill-down stack
  const drills = p.get('d');
  if(drills) {
    for(const cid of drills.split(',')) {
      if(cid === 'te') {
        // て form opens compound selection - just push to stack, don't change cur
        drillStack.push({
          verb: cur, conjId: cid,
          label: getDrillLabel(cid),
          selVowel: null, endingRemoved: false,
        });
        continue;
      }
      // Check if this is a TE_COMPOUND
      const tc = TE_COMPOUNDS.find(c => c.id === cid);
      if(tc) {
        const teBaseEntry = drillStack[drillStack.length - 1];
        const teForm = getFullConj(teBaseEntry.verb, 'te');
        if(!teForm) break;
        const full = teForm + tc.suf;
        let newType;
        if (tc.drillType === 'ichidan') newType = 'drilled';
        else if (tc.drillType === 'aru') newType = 'irregular';
        else newType = tc.drillType;
        drillStack.push({
          verb: cur, conjId: cid,
          label: getDrillLabel(cid),
          selVowel: null, endingRemoved: false,
        });
        cur = { k: full, r: full, m: getDrillMeaning(drillStack[0].verb, cid), t: newType };
        continue;
      }
      const full = getFullConj(cur, cid);
      if(!full || !full.endsWith('る')) break;
      drillStack.push({
        verb: cur, conjId: cid,
        label: getDrillLabel(cid),
        selVowel: null, endingRemoved: false,
      });
      cur = { k: full, r: full, m: getDrillMeaning(drillStack[0].verb, cid), t: 'drilled' };
    }
  }

  // Restore state
  if(p.get('ru') === '0') endingRemoved = true;
  if(p.get('f')) selVowel = p.get('f');
  if(p.get('c')) selConj = p.get('c');
  if(p.get('tem')==='1') teCompoundMode = true;

  return true;
}

// =====================================================================
// ACTIONS
// =====================================================================

function switchTab(tab) {
  activeTab = tab;
  cur = null; selVowel = null; selConj = null; endingRemoved = false; drillStack = []; teCompoundMode = false;
  render();
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
}

function loadVerb(v) {
  cur=v; selVowel=null; selConj=null; endingRemoved=false; drillStack=[]; teCompoundMode=false;
  render();
}

function getRandomWord() {
  const pool = getFilteredWords();
  if(pool.length===0) {
    // Fallback to any word in the current tab
    const tabTypes = {verb:['godan','ichidan','irregular'],adj:['i-adj','na-adj'],noun:['noun']};
    const fallback = WORDS.filter(v => (tabTypes[activeTab]||[]).includes(v.t));
    if(fallback.length===0) return;
    loadVerb(fallback[Math.floor(Math.random()*fallback.length)]);
    return;
  }
  loadVerb(pool[Math.floor(Math.random()*pool.length)]);
}

function clearAll() { cur=null; selVowel=null; selConj=null; endingRemoved=false; drillStack=[]; teCompoundMode=false; render(); }

// =====================================================================
// INIT
// =====================================================================

if(!loadFromURL()) {
  loadVerb(WORDS.find(v=>v.k==='行く'));
} else {
  render();
}
