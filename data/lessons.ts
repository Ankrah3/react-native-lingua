import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ============ SPANISH ============

  // Spanish · Basics
  {
    lessonId: "spanish-basics-1",
    unitId: "spanish-basics",
    languageId: "spanish",
    title: "Hello!",
    description: "Say hello and introduce yourself in Spanish.",
    order: 1,
    type: "audio",
    durationMinutes: 5,
    xpReward: 15,
    goal: "Introduce yourself with a greeting and your name.",
    vocabulary: [
      { term: "hola", translation: "hello" },
      { term: "me llamo", translation: "my name is" },
      { term: "¿Cómo estás?", translation: "How are you?" },
    ],
    phrases: [
      { text: "¡Hola!", translation: "Hello!" },
      { text: "Me llamo Ana.", translation: "My name is Ana." },
      { text: "Muy bien, gracias.", translation: "Very well, thanks." },
    ],
    activities: [
      {
        activityId: "spanish-basics-1-a1",
        lessonId: "spanish-basics-1",
        order: 1,
        type: "repeat",
        prompt: "Repeat after me: ¡Hola!",
      },
      {
        activityId: "spanish-basics-1-a2",
        lessonId: "spanish-basics-1",
        order: 2,
        type: "listen",
        prompt: "What does 'me llamo' mean?",
      },
    ],
    aiTeacherPrompt:
      "Hi! I'm your friendly Spanish teacher. In this short lesson we'll practice a simple hello and introduce ourselves. We'll use just three little phrases: 'hola' for hello, 'me llamo' for my name is, and '¿Cómo estás?' to ask how someone is. Say them slowly with me, repeat after me, and we'll take it one small step at a time. Great job!",
  },
  {
    lessonId: "spanish-basics-2",
    unitId: "spanish-basics",
    languageId: "spanish",
    title: "Goodbye",
    description: "Learn polite ways to say goodbye.",
    order: 2,
    type: "audio",
    durationMinutes: 5,
    xpReward: 15,
    goal: "Say goodbye politely in different situations.",
    vocabulary: [
      { term: "adiós", translation: "goodbye" },
      { term: "hasta luego", translation: "see you later" },
      { term: "buenas noches", translation: "good night" },
    ],
    phrases: [
      { text: "Adiós.", translation: "Goodbye." },
      { text: "¡Hasta luego!", translation: "See you later!" },
      { text: "Buenas noches.", translation: "Good night." },
    ],
    activities: [
      {
        activityId: "spanish-basics-2-a1",
        lessonId: "spanish-basics-2",
        order: 1,
        type: "repeat",
        prompt: "Repeat after me: Adiós.",
      },
      {
        activityId: "spanish-basics-2-a2",
        lessonId: "spanish-basics-2",
        order: 2,
        type: "fill-blank",
        prompt: "Fill in the missing word: ___ luego.",
      },
    ],
    aiTeacherPrompt:
      "Welcome back! Today we'll practice saying goodbye the way Spanish speakers really do. We'll learn 'adiós', 'hasta luego' for see you later, and 'buenas noches' for good night. Listen carefully, repeat after me, and don't worry about getting it perfect on the first try. We'll go nice and easy!",
  },

  // Spanish · Greetings & Introductions
  {
    lessonId: "spanish-greetings-1",
    unitId: "spanish-greetings",
    languageId: "spanish",
    title: "Nice to Meet You",
    description: "Introduce others and respond politely.",
    order: 1,
    type: "audio",
    durationMinutes: 7,
    xpReward: 20,
    goal: "Introduce someone and respond with 'nice to meet you'.",
    vocabulary: [
      { term: "encantado", translation: "nice to meet you (male)" },
      { term: "éste es", translation: "this is" },
      { term: "amigo", translation: "friend" },
    ],
    phrases: [
      { text: "Éste es mi amigo.", translation: "This is my friend." },
      { text: "¡Encantado!", translation: "Nice to meet you!" },
      { text: "Mucho gusto.", translation: "Pleased to meet you." },
    ],
    activities: [
      {
        activityId: "spanish-greetings-1-a1",
        lessonId: "spanish-greetings-1",
        order: 1,
        type: "multiple-choice",
        prompt: "Which phrase means 'nice to meet you'?",
      },
      {
        activityId: "spanish-greetings-1-a2",
        lessonId: "spanish-greetings-1",
        order: 2,
        type: "repeat",
        prompt: "Repeat after me: Éste es mi amigo.",
      },
    ],
    aiTeacherPrompt:
      "Hola again! This time we're going to introduce a friend. We'll use 'éste es' for this is, 'amigo' for friend, and 'encantado' or 'mucho gusto' to say nice to meet you. It's a lovely, natural way to break the ice. Repeat the phrases with me, and let me help you sound warm and confident!",
  },
  {
    lessonId: "spanish-greetings-2",
    unitId: "spanish-greetings",
    languageId: "spanish",
    title: "Where Are You From?",
    description: "Ask and answer where someone is from.",
    order: 2,
    type: "audio",
    durationMinutes: 7,
    xpReward: 20,
    goal: "Ask where someone is from and say where you are from.",
    vocabulary: [
      { term: "¿De dónde eres?", translation: "Where are you from?" },
      { term: "soy de", translation: "I am from" },
      { term: "país", translation: "country" },
    ],
    phrases: [
      { text: "¿De dónde eres?", translation: "Where are you from?" },
      { text: "Soy de México.", translation: "I am from Mexico." },
      { text: "¿Y tú?", translation: "And you?" },
    ],
    activities: [
      {
        activityId: "spanish-greetings-2-a1",
        lessonId: "spanish-greetings-2",
        order: 1,
        type: "listen",
        prompt: "What does '¿De dónde eres?' mean?",
      },
      {
        activityId: "spanish-greetings-2-a2",
        lessonId: "spanish-greetings-2",
        order: 2,
        type: "match",
        prompt: "Match 'soy de' with its translation.",
      },
    ],
    aiTeacherPrompt:
      "Hola, hola! Let's get to know each other. Today we'll ask '¿De dónde eres?' to find out where someone is from, and answer with 'soy de' plus your country. Remember to keep it friendly and short. I'll guide you through the words slowly, and we'll practice until it feels natural.",
  },

  // Spanish · Travel Essentials
  {
    lessonId: "spanish-travel-1",
    unitId: "spanish-travel",
    languageId: "spanish",
    title: "Ordering Coffee",
    description: "Order a drink at a café with confidence.",
    order: 1,
    type: "audio",
    durationMinutes: 8,
    xpReward: 25,
    goal: "Order a coffee politely and say thank you.",
    vocabulary: [
      { term: "café", translation: "coffee" },
      { term: "por favor", translation: "please" },
      { term: "gracias", translation: "thank you" },
    ],
    phrases: [
      { text: "Un café, por favor.", translation: "A coffee, please." },
      { text: "¿Cuánto cuesta?", translation: "How much does it cost?" },
      { text: "Gracias.", translation: "Thank you." },
    ],
    activities: [
      {
        activityId: "spanish-travel-1-a1",
        lessonId: "spanish-travel-1",
        order: 1,
        type: "fill-blank",
        prompt: "Fill in the blank: Un ___, por favor.",
      },
      {
        activityId: "spanish-travel-1-a2",
        lessonId: "spanish-travel-1",
        order: 2,
        type: "repeat",
        prompt: "Repeat after me: Un café, por favor.",
      },
    ],
    aiTeacherPrompt:
      "Hola! Ready to order like a local? In this lesson we'll practice asking for a coffee: 'Un café, por favor.' Then we'll ask the price with '¿Cuánto cuesta?' and always remember a friendly 'gracias.' These three phrases will make any café visit so much easier. Repeat them with me and enjoy your coffee!",
  },
  {
    lessonId: "spanish-travel-2",
    unitId: "spanish-travel",
    languageId: "spanish",
    title: "Getting Directions",
    description: "Ask for directions and understand simple answers.",
    order: 2,
    type: "audio",
    durationMinutes: 8,
    xpReward: 25,
    goal: "Ask where a place is and understand left and right.",
    vocabulary: [
      { term: "¿Dónde está?", translation: "Where is?" },
      { term: "izquierda", translation: "left" },
      { term: "derecha", translation: "right" },
    ],
    phrases: [
      {
        text: "¿Dónde está la estación?",
        translation: "Where is the station?",
      },
      { text: "A la izquierda.", translation: "To the left." },
      { text: "A la derecha.", translation: "To the right." },
    ],
    activities: [
      {
        activityId: "spanish-travel-2-a1",
        lessonId: "spanish-travel-2",
        order: 1,
        type: "multiple-choice",
        prompt: "What does 'izquierda' mean?",
      },
      {
        activityId: "spanish-travel-2-a2",
        lessonId: "spanish-travel-2",
        order: 2,
        type: "listen",
        prompt: "Listen and repeat: ¿Dónde está la estación?",
      },
    ],
    aiTeacherPrompt:
      "Hola, traveler! Let's get you un-lost. We'll learn to ask '¿Dónde está la estación?' to find the station, and we'll understand directions like 'izquierda' for left and 'derecha' for right. I'll say each word slowly so it's easy to catch. You've got this!",
  },

  // ============ FRENCH ============

  // French · Basics
  {
    lessonId: "french-basics-1",
    unitId: "french-basics",
    languageId: "french",
    title: "Hello!",
    description: "Say hello and introduce yourself in French.",
    order: 1,
    type: "audio",
    durationMinutes: 5,
    xpReward: 15,
    goal: "Introduce yourself with a greeting and your name.",
    vocabulary: [
      { term: "bonjour", translation: "hello" },
      { term: "je m'appelle", translation: "my name is" },
      { term: "comment ça va?", translation: "how are you?" },
    ],
    phrases: [
      { text: "Bonjour !", translation: "Hello!" },
      { text: "Je m'appelle Camille.", translation: "My name is Camille." },
      { text: "Très bien, merci.", translation: "Very well, thanks." },
    ],
    activities: [
      {
        activityId: "french-basics-1-a1",
        lessonId: "french-basics-1",
        order: 1,
        type: "repeat",
        prompt: "Repeat after me: Bonjour !",
      },
      {
        activityId: "french-basics-1-a2",
        lessonId: "french-basics-1",
        order: 2,
        type: "listen",
        prompt: "What does 'je m'appelle' mean?",
      },
    ],
    aiTeacherPrompt:
      "Bonjour! I'm your friendly French teacher. Today we'll practice a simple hello and introduce ourselves. We'll use 'bonjour' for hello, 'je m'appelle' for my name is, and 'comment ça va?' to ask how someone is doing. Say them slowly with me, repeat after me, and we'll go at your pace. Wonderful!",
  },
  {
    lessonId: "french-basics-2",
    unitId: "french-basics",
    languageId: "french",
    title: "Goodbye",
    description: "Learn polite ways to say goodbye.",
    order: 2,
    type: "audio",
    durationMinutes: 5,
    xpReward: 15,
    goal: "Say goodbye politely in different situations.",
    vocabulary: [
      { term: "au revoir", translation: "goodbye" },
      { term: "à bientôt", translation: "see you soon" },
      { term: "bonne nuit", translation: "good night" },
    ],
    phrases: [
      { text: "Au revoir.", translation: "Goodbye." },
      { text: "À bientôt !", translation: "See you soon!" },
      { text: "Bonne nuit.", translation: "Good night." },
    ],
    activities: [
      {
        activityId: "french-basics-2-a1",
        lessonId: "french-basics-2",
        order: 1,
        type: "repeat",
        prompt: "Repeat after me: Au revoir.",
      },
      {
        activityId: "french-basics-2-a2",
        lessonId: "french-basics-2",
        order: 2,
        type: "fill-blank",
        prompt: "Fill in the missing word: À ___ !",
      },
    ],
    aiTeacherPrompt:
      "Bienvenue back! Today let's practice saying goodbye the French way. We'll learn 'au revoir' for goodbye, 'à bientôt' for see you soon, and 'bonne nuit' for good night. Listen closely, repeat after me, and take your time. We'll make it feel light and easy!",
  },

  // French · Greetings & Introductions
  {
    lessonId: "french-greetings-1",
    unitId: "french-greetings",
    languageId: "french",
    title: "Nice to Meet You",
    description: "Introduce others and respond politely.",
    order: 1,
    type: "audio",
    durationMinutes: 7,
    xpReward: 20,
    goal: "Introduce someone and respond with 'nice to meet you'.",
    vocabulary: [
      { term: "enchanté", translation: "nice to meet you" },
      { term: "voici", translation: "this is" },
      { term: "ami", translation: "friend (male)" },
    ],
    phrases: [
      { text: "Voici mon ami.", translation: "This is my friend." },
      { text: "Enchanté !", translation: "Nice to meet you!" },
      { text: "Ravi de vous rencontrer.", translation: "Pleased to meet you." },
    ],
    activities: [
      {
        activityId: "french-greetings-1-a1",
        lessonId: "french-greetings-1",
        order: 1,
        type: "multiple-choice",
        prompt: "Which phrase means 'nice to meet you'?",
      },
      {
        activityId: "french-greetings-1-a2",
        lessonId: "french-greetings-1",
        order: 2,
        type: "repeat",
        prompt: "Repeat after me: Voici mon ami.",
      },
    ],
    aiTeacherPrompt:
      "Bonjour again! This time we'll introduce a friend. We'll use 'voici' for this is, 'ami' for friend, and 'enchanté' or 'ravi de vous rencontrer' to say nice to meet you. It's a lovely, friendly way to start a conversation. Repeat the phrases with me and sound truly charming!",
  },
  {
    lessonId: "french-greetings-2",
    unitId: "french-greetings",
    languageId: "french",
    title: "Where Are You From?",
    description: "Ask and answer where someone is from.",
    order: 2,
    type: "audio",
    durationMinutes: 7,
    xpReward: 20,
    goal: "Ask where someone is from and say where you are from.",
    vocabulary: [
      { term: "d'où viens-tu?", translation: "where are you from?" },
      { term: "je viens de", translation: "I am from" },
      { term: "pays", translation: "country" },
    ],
    phrases: [
      { text: "D'où viens-tu ?", translation: "Where are you from?" },
      { text: "Je viens de France.", translation: "I am from France." },
      { text: "Et toi ?", translation: "And you?" },
    ],
    activities: [
      {
        activityId: "french-greetings-2-a1",
        lessonId: "french-greetings-2",
        order: 1,
        type: "listen",
        prompt: "What does 'D'où viens-tu ?' mean?",
      },
      {
        activityId: "french-greetings-2-a2",
        lessonId: "french-greetings-2",
        order: 2,
        type: "match",
        prompt: "Match 'je viens de' with its translation.",
      },
    ],
    aiTeacherPrompt:
      "Bonjour, bonjour! Let's connect. Today we'll ask 'D'où viens-tu ?' to learn where someone is from, and answer with 'je viens de' plus your country. Keep it warm and simple. I'll walk you through each word gently, and we'll practice until it flows easily.",
  },

  // French · Travel Essentials
  {
    lessonId: "french-travel-1",
    unitId: "french-travel",
    languageId: "french",
    title: "Ordering Coffee",
    description: "Order a drink at a café with confidence.",
    order: 1,
    type: "audio",
    durationMinutes: 8,
    xpReward: 25,
    goal: "Order a coffee politely and say thank you.",
    vocabulary: [
      { term: "café", translation: "coffee" },
      { term: "s'il vous plaît", translation: "please" },
      { term: "merci", translation: "thank you" },
    ],
    phrases: [
      { text: "Un café, s'il vous plaît.", translation: "A coffee, please." },
      { text: "Ça coûte combien ?", translation: "How much is it?" },
      { text: "Merci.", translation: "Thank you." },
    ],
    activities: [
      {
        activityId: "french-travel-1-a1",
        lessonId: "french-travel-1",
        order: 1,
        type: "fill-blank",
        prompt: "Fill in the blank: Un ___, s'il vous plaît.",
      },
      {
        activityId: "french-travel-1-a2",
        lessonId: "french-travel-1",
        order: 2,
        type: "repeat",
        prompt: "Repeat after me: Un café, s'il vous plaît.",
      },
    ],
    aiTeacherPrompt:
      "Bonjour! Ready to order at a Parisian café? We'll practice 'Un café, s'il vous plaît' for a coffee please, 'Ça coûte combien ?' to ask the price, and a cheerful 'merci' to say thanks. These will make any café visit a breeze. Repeat them with me and enjoy your coffee!",
  },
  {
    lessonId: "french-travel-2",
    unitId: "french-travel",
    languageId: "french",
    title: "Getting Directions",
    description: "Ask for directions and understand simple answers.",
    order: 2,
    type: "audio",
    durationMinutes: 8,
    xpReward: 25,
    goal: "Ask where a place is and understand left and right.",
    vocabulary: [
      { term: "où est", translation: "where is" },
      { term: "gauche", translation: "left" },
      { term: "droite", translation: "right" },
    ],
    phrases: [
      { text: "Où est la gare ?", translation: "Where is the station?" },
      { text: "À gauche.", translation: "To the left." },
      { text: "À droite.", translation: "To the right." },
    ],
    activities: [
      {
        activityId: "french-travel-2-a1",
        lessonId: "french-travel-2",
        order: 1,
        type: "multiple-choice",
        prompt: "What does 'gauche' mean?",
      },
      {
        activityId: "french-travel-2-a2",
        lessonId: "french-travel-2",
        order: 2,
        type: "listen",
        prompt: "Listen and repeat: Où est la gare ?",
      },
    ],
    aiTeacherPrompt:
      "Bonjour, explorer! Let's make sure you never get lost. We'll learn to ask 'Où est la gare ?' to find the train station, and we'll understand 'gauche' for left and 'droite' for right. I'll speak slowly so every word lands. You're doing wonderfully!",
  },

  // ============ CHINESE ============

  // Chinese · Basics
  {
    lessonId: "chinese-basics-1",
    unitId: "chinese-basics",
    languageId: "chinese",
    title: "Hello!",
    description: "Say hello and introduce yourself in Mandarin.",
    order: 1,
    type: "audio",
    durationMinutes: 5,
    xpReward: 15,
    goal: "Greet someone and say your name in Mandarin.",
    vocabulary: [
      { term: "你好", translation: "hello", romanization: "nǐ hǎo" },
      { term: "我叫", translation: "my name is", romanization: "wǒ jiào" },
      {
        term: "你好吗？",
        translation: "how are you?",
        romanization: "nǐ hǎo ma?",
      },
    ],
    phrases: [
      { text: "你好！", translation: "Hello!", romanization: "Nǐ hǎo!" },
      {
        text: "我叫李华。",
        translation: "My name is Li Hua.",
        romanization: "Wǒ jiào Lǐ Huá.",
      },
      {
        text: "我很好，谢谢。",
        translation: "I'm very well, thanks.",
        romanization: "Wǒ hěn hǎo, xièxie.",
      },
    ],
    activities: [
      {
        activityId: "chinese-basics-1-a1",
        lessonId: "chinese-basics-1",
        order: 1,
        type: "repeat",
        prompt: "Repeat after me: 你好！",
      },
      {
        activityId: "chinese-basics-1-a2",
        lessonId: "chinese-basics-1",
        order: 2,
        type: "listen",
        prompt: "What does '我叫' mean?",
      },
    ],
    aiTeacherPrompt:
      "Nǐ hǎo! I'm your friendly Mandarin teacher, teaching through English. Today we'll say hello with '你好' (nǐ hǎo) and introduce ourselves with '我叫' (wǒ jiào) plus our name. We'll take it slowly with pinyin so the tones feel manageable. Repeat the sounds with me, one step at a time. Great start!",
  },
  {
    lessonId: "chinese-basics-2",
    unitId: "chinese-basics",
    languageId: "chinese",
    title: "Goodbye",
    description: "Learn polite ways to say goodbye.",
    order: 2,
    type: "audio",
    durationMinutes: 5,
    xpReward: 15,
    goal: "Say goodbye politely in Mandarin.",
    vocabulary: [
      { term: "再见", translation: "goodbye", romanization: "zàijiàn" },
      { term: "晚安", translation: "good night", romanization: "wǎn'ān" },
      {
        term: "明天见",
        translation: "see you tomorrow",
        romanization: "míngtiān jiàn",
      },
    ],
    phrases: [
      { text: "再见。", translation: "Goodbye.", romanization: "Zàijiàn." },
      { text: "晚安。", translation: "Good night.", romanization: "Wǎn'ān." },
      {
        text: "明天见！",
        translation: "See you tomorrow!",
        romanization: "Míngtiān jiàn!",
      },
    ],
    activities: [
      {
        activityId: "chinese-basics-2-a1",
        lessonId: "chinese-basics-2",
        order: 1,
        type: "repeat",
        prompt: "Repeat after me: 再见。",
      },
      {
        activityId: "chinese-basics-2-a2",
        lessonId: "chinese-basics-2",
        order: 2,
        type: "fill-blank",
        prompt: "Fill in the missing word: --- 见！",
      },
    ],
    aiTeacherPrompt:
      "Welcome back! Today we'll practice saying goodbye in Mandarin. We'll learn '再见' (zàijiàn) for goodbye, '晚安' (wǎn'ān) for good night, and '明天见' (míngtiān jiàn) for see you tomorrow. I'll say each one slowly with pinyin so you can hear the tones. Repeat after me and don't stress — practice makes it stick!",
  },

  // Chinese · Greetings & Introductions
  {
    lessonId: "chinese-greetings-1",
    unitId: "chinese-greetings",
    languageId: "chinese",
    title: "Nice to Meet You",
    description: "Introduce others and respond politely.",
    order: 1,
    type: "audio",
    durationMinutes: 7,
    xpReward: 20,
    goal: "Introduce someone and say 'nice to meet you'.",
    vocabulary: [
      {
        term: "很高兴认识你",
        translation: "nice to meet you",
        romanization: "hěn gāoxìng rènshi nǐ",
      },
      { term: "这是", translation: "this is", romanization: "zhè shì" },
      { term: "朋友", translation: "friend", romanization: "péngyou" },
    ],
    phrases: [
      {
        text: "这是我的朋友。",
        translation: "This is my friend.",
        romanization: "Zhè shì wǒ de péngyou.",
      },
      {
        text: "很高兴认识你！",
        translation: "Nice to meet you!",
        romanization: "Hěn gāoxìng rènshi nǐ!",
      },
      {
        text: "我也很高兴。",
        translation: "Me too, very pleased.",
        romanization: "Wǒ yě hěn gāoxìng.",
      },
    ],
    activities: [
      {
        activityId: "chinese-greetings-1-a1",
        lessonId: "chinese-greetings-1",
        order: 1,
        type: "multiple-choice",
        prompt: "Which phrase means 'nice to meet you'?",
      },
      {
        activityId: "chinese-greetings-1-a2",
        lessonId: "chinese-greetings-1",
        order: 2,
        type: "repeat",
        prompt: "Repeat after me: 这是我的朋友。",
      },
    ],
    aiTeacherPrompt:
      "Nǐ hǎo again! Let's introduce a friend in Mandarin. We'll use '这是' (zhè shì) for this is, '朋友' (péngyou) for friend, and '很高兴认识你' (hěn gāoxìng rènshi nǐ) for nice to meet you. It's such a warm phrase. Repeat each one slowly with pinyin, and let me help you sound natural and friendly.",
  },
  {
    lessonId: "chinese-greetings-2",
    unitId: "chinese-greetings",
    languageId: "chinese",
    title: "Where Are You From?",
    description: "Ask and answer where someone is from.",
    order: 2,
    type: "audio",
    durationMinutes: 7,
    xpReward: 20,
    goal: "Ask where someone is from and say where you are from.",
    vocabulary: [
      {
        term: "你是哪国人？",
        translation: "where are you from?",
        romanization: "nǐ shì nǎ guó rén?",
      },
      {
        term: "我是...人",
        translation: "I am from...",
        romanization: "wǒ shì ... rén",
      },
      { term: "国家", translation: "country", romanization: "guójiā" },
    ],
    phrases: [
      {
        text: "你是哪国人？",
        translation: "Where are you from?",
        romanization: "Nǐ shì nǎ guó rén?",
      },
      {
        text: "我是中国人。",
        translation: "I am Chinese.",
        romanization: "Wǒ shì Zhōngguó rén.",
      },
      { text: "你呢？", translation: "And you?", romanization: "Nǐ ne?" },
    ],
    activities: [
      {
        activityId: "chinese-greetings-2-a1",
        lessonId: "chinese-greetings-2",
        order: 1,
        type: "listen",
        prompt: "What does '你是哪国人？' mean?",
      },
      {
        activityId: "chinese-greetings-2-a2",
        lessonId: "chinese-greetings-2",
        order: 2,
        type: "match",
        prompt: "Match '我是' with its translation.",
      },
    ],
    aiTeacherPrompt:
      "Nǐ hǎo! Let's get to know each other. We'll ask '你是哪国人？' (nǐ shì nǎ guó rén?) to learn where someone is from, and answer with '我是...人' (wǒ shì ... rén). We'll also pick up '你呢？' (nǐ ne?) for and you? Say each phrase slowly with me, and I'll help you build confidence one word at a time.",
  },

  // Chinese · Classroom Essentials
  {
    lessonId: "chinese-classroom-1",
    unitId: "chinese-classroom",
    languageId: "chinese",
    title: "In the Classroom",
    description: "Learn useful words for the classroom.",
    order: 1,
    type: "audio",
    durationMinutes: 8,
    xpReward: 25,
    goal: "Name classroom objects and ask what something is.",
    vocabulary: [
      { term: "书", translation: "book", romanization: "shū" },
      { term: "笔", translation: "pen", romanization: "bǐ" },
      {
        term: "这是什么？",
        translation: "what is this?",
        romanization: "zhè shì shénme?",
      },
    ],
    phrases: [
      {
        text: "这是什么？",
        translation: "What is this?",
        romanization: "Zhè shì shénme?",
      },
      {
        text: "这是书。",
        translation: "This is a book.",
        romanization: "Zhè shì shū.",
      },
      {
        text: "那是笔。",
        translation: "That is a pen.",
        romanization: "Nà shì bǐ.",
      },
    ],
    activities: [
      {
        activityId: "chinese-classroom-1-a1",
        lessonId: "chinese-classroom-1",
        order: 1,
        type: "multiple-choice",
        prompt: "What does '书' mean?",
      },
      {
        activityId: "chinese-classroom-1-a2",
        lessonId: "chinese-classroom-1",
        order: 2,
        type: "repeat",
        prompt: "Repeat after me: 这是什么？",
      },
    ],
    aiTeacherPrompt:
      "Nǐ hǎo, student! Let's learn some classroom words in Mandarin. We'll start with '书' (shū) for book and '笔' (bǐ) for pen, then ask '这是什么？' (zhè shì shénme?) to find out what something is. Say each word slowly with me and the pinyin, and I promise it'll feel simple and fun.",
  },
  {
    lessonId: "chinese-classroom-2",
    unitId: "chinese-classroom",
    languageId: "chinese",
    title: "Polite Words",
    description: "Use please, sorry, and thank you politely.",
    order: 2,
    type: "audio",
    durationMinutes: 8,
    xpReward: 25,
    goal: "Use 'please', 'sorry', and 'thank you' in short phrases.",
    vocabulary: [
      { term: "请", translation: "please", romanization: "qǐng" },
      { term: "对不起", translation: "sorry", romanization: "duìbuqǐ" },
      { term: "谢谢", translation: "thank you", romanization: "xièxie" },
    ],
    phrases: [
      {
        text: "请再说一遍。",
        translation: "Please say it again.",
        romanization: "Qǐng zài shuō yí biàn.",
      },
      { text: "对不起。", translation: "Sorry.", romanization: "Duìbuqǐ." },
      { text: "谢谢！", translation: "Thank you!", romanization: "Xièxie!" },
    ],
    activities: [
      {
        activityId: "chinese-classroom-2-a1",
        lessonId: "chinese-classroom-2",
        order: 1,
        type: "fill-blank",
        prompt: "Fill in the blank: --- 再说一遍。",
      },
      {
        activityId: "chinese-classroom-2-a2",
        lessonId: "chinese-classroom-2",
        order: 2,
        type: "repeat",
        prompt: "Repeat after me: 谢谢！",
      },
    ],
    aiTeacherPrompt:
      "Nǐ hǎo again! Manners are beautiful in any language. Today we'll learn '请' (qǐng) for please, '对不起' (duìbuqǐ) for sorry, and '谢谢' (xièxie) for thank you. We'll also practice '请再说一遍' (qǐng zài shuō yí biàn) to ask someone to repeat, which is so useful. Repeat after me, nice and slow. Excellent work!",
  },

  // ============ GERMAN ============

  // German · Basics
  {
    lessonId: "german-basics-1",
    unitId: "german-basics",
    languageId: "german",
    title: "Hello!",
    description: "Say hello and introduce yourself in German.",
    order: 1,
    type: "audio",
    durationMinutes: 5,
    xpReward: 15,
    goal: "Introduce yourself with a greeting and your name.",
    vocabulary: [
      { term: "hallo", translation: "hello" },
      { term: "ich heiße", translation: "my name is" },
      { term: "wie geht's?", translation: "how are you?" },
    ],
    phrases: [
      { text: "Hallo!", translation: "Hello!" },
      { text: "Ich heiße Anna.", translation: "My name is Anna." },
      { text: "Sehr gut, danke.", translation: "Very well, thanks." },
    ],
    activities: [
      {
        activityId: "german-basics-1-a1",
        lessonId: "german-basics-1",
        order: 1,
        type: "repeat",
        prompt: "Repeat after me: Hallo!",
      },
      {
        activityId: "german-basics-1-a2",
        lessonId: "german-basics-1",
        order: 2,
        type: "listen",
        prompt: "What does 'ich heiße' mean?",
      },
    ],
    aiTeacherPrompt:
      "Hallo! I'm your friendly German teacher. Today we'll practice a simple hello and introduce ourselves. We'll use 'hallo' for hello, 'ich heiße' for my name is, and 'wie geht's?' to ask how someone is. Say them slowly with me, repeat after me, and we'll go at your pace. Wunderbar!",
  },
  {
    lessonId: "german-basics-2",
    unitId: "german-basics",
    languageId: "german",
    title: "Goodbye",
    description: "Learn polite ways to say goodbye.",
    order: 2,
    type: "audio",
    durationMinutes: 5,
    xpReward: 15,
    goal: "Say goodbye politely in different situations.",
    vocabulary: [
      { term: "auf Wiedersehen", translation: "goodbye" },
      { term: "bis bald", translation: "see you soon" },
      { term: "gute Nacht", translation: "good night" },
    ],
    phrases: [
      { text: "Auf Wiedersehen.", translation: "Goodbye." },
      { text: "Bis bald!", translation: "See you soon!" },
      { text: "Gute Nacht.", translation: "Good night." },
    ],
    activities: [
      {
        activityId: "german-basics-2-a1",
        lessonId: "german-basics-2",
        order: 1,
        type: "repeat",
        prompt: "Repeat after me: Auf Wiedersehen.",
      },
      {
        activityId: "german-basics-2-a2",
        lessonId: "german-basics-2",
        order: 2,
        type: "fill-blank",
        prompt: "Fill in the missing word: Bis ___!",
      },
    ],
    aiTeacherPrompt:
      "Willkommen back! Today let's practice saying goodbye the German way. We'll learn 'auf Wiedersehen' for goodbye, 'bis bald' for see you soon, and 'gute Nacht' for good night. Listen closely, repeat after me, and take your time. We'll make it feel light and easy!",
  },

  // German · Greetings & Introductions
  {
    lessonId: "german-greetings-1",
    unitId: "german-greetings",
    languageId: "german",
    title: "Nice to Meet You",
    description: "Introduce others and respond politely.",
    order: 1,
    type: "audio",
    durationMinutes: 7,
    xpReward: 20,
    goal: "Introduce someone and respond with 'nice to meet you'.",
    vocabulary: [
      { term: "freut mich", translation: "nice to meet you" },
      { term: "das ist", translation: "this is" },
      { term: "Freund", translation: "friend" },
    ],
    phrases: [
      { text: "Das ist mein Freund.", translation: "This is my friend." },
      { text: "Freut mich!", translation: "Nice to meet you!" },
      { text: "Sehr erfreut.", translation: "Pleased to meet you." },
    ],
    activities: [
      {
        activityId: "german-greetings-1-a1",
        lessonId: "german-greetings-1",
        order: 1,
        type: "multiple-choice",
        prompt: "Which phrase means 'nice to meet you'?",
      },
      {
        activityId: "german-greetings-1-a2",
        lessonId: "german-greetings-1",
        order: 2,
        type: "repeat",
        prompt: "Repeat after me: Das ist mein Freund.",
      },
    ],
    aiTeacherPrompt:
      "Hallo again! This time we'll introduce a friend. We'll use 'das ist' for this is, 'Freund' for friend, and 'freut mich' to say nice to meet you. It's a lovely, friendly way to start a conversation. Repeat the phrases with me and sound truly warm!",
  },
  {
    lessonId: "german-greetings-2",
    unitId: "german-greetings",
    languageId: "german",
    title: "Where Are You From?",
    description: "Ask and answer where someone is from.",
    order: 2,
    type: "audio",
    durationMinutes: 7,
    xpReward: 20,
    goal: "Ask where someone is from and say where you are from.",
    vocabulary: [
      { term: "Woher kommst du?", translation: "where are you from?" },
      { term: "ich komme aus", translation: "I am from" },
      { term: "Land", translation: "country" },
    ],
    phrases: [
      { text: "Woher kommst du?", translation: "Where are you from?" },
      { text: "Ich komme aus Deutschland.", translation: "I am from Germany." },
      { text: "Und du?", translation: "And you?" },
    ],
    activities: [
      {
        activityId: "german-greetings-2-a1",
        lessonId: "german-greetings-2",
        order: 1,
        type: "listen",
        prompt: "What does 'Woher kommst du?' mean?",
      },
      {
        activityId: "german-greetings-2-a2",
        lessonId: "german-greetings-2",
        order: 2,
        type: "match",
        prompt: "Match 'ich komme aus' with its translation.",
      },
    ],
    aiTeacherPrompt:
      "Hallo, hallo! Let's connect. Today we'll ask 'Woher kommst du?' to learn where someone is from, and answer with 'ich komme aus' plus your country. Keep it warm and simple. I'll walk you through each word gently, and we'll practice until it flows easily.",
  },

  // German · Travel Essentials
  {
    lessonId: "german-travel-1",
    unitId: "german-travel",
    languageId: "german",
    title: "Ordering Coffee",
    description: "Order a drink at a café with confidence.",
    order: 1,
    type: "audio",
    durationMinutes: 8,
    xpReward: 25,
    goal: "Order a coffee politely and say thank you.",
    vocabulary: [
      { term: "Kaffee", translation: "coffee" },
      { term: "bitte", translation: "please" },
      { term: "danke", translation: "thank you" },
    ],
    phrases: [
      { text: "Einen Kaffee, bitte.", translation: "A coffee, please." },
      { text: "Wie viel kostet das?", translation: "How much does it cost?" },
      { text: "Danke.", translation: "Thank you." },
    ],
    activities: [
      {
        activityId: "german-travel-1-a1",
        lessonId: "german-travel-1",
        order: 1,
        type: "fill-blank",
        prompt: "Fill in the blank: Einen ___, bitte.",
      },
      {
        activityId: "german-travel-1-a2",
        lessonId: "german-travel-1",
        order: 2,
        type: "repeat",
        prompt: "Repeat after me: Einen Kaffee, bitte.",
      },
    ],
    aiTeacherPrompt:
      "Hallo! Ready to order like a local? In this lesson we'll practice asking for a coffee: 'Einen Kaffee, bitte.' Then we'll ask the price with 'Wie viel kostet das?' and always remember a friendly 'danke.' These three phrases will make any café visit so much easier. Repeat them with me and enjoy your coffee!",
  },
  {
    lessonId: "german-travel-2",
    unitId: "german-travel",
    languageId: "german",
    title: "Getting Directions",
    description: "Ask for directions and understand simple answers.",
    order: 2,
    type: "audio",
    durationMinutes: 8,
    xpReward: 25,
    goal: "Ask where a place is and understand left and right.",
    vocabulary: [
      { term: "Wo ist...?", translation: "where is...?" },
      { term: "links", translation: "left" },
      { term: "rechts", translation: "right" },
    ],
    phrases: [
      { text: "Wo ist der Bahnhof?", translation: "Where is the station?" },
      { text: "Nach links.", translation: "To the left." },
      { text: "Nach rechts.", translation: "To the right." },
    ],
    activities: [
      {
        activityId: "german-travel-2-a1",
        lessonId: "german-travel-2",
        order: 1,
        type: "multiple-choice",
        prompt: "What does 'links' mean?",
      },
      {
        activityId: "german-travel-2-a2",
        lessonId: "german-travel-2",
        order: 2,
        type: "listen",
        prompt: "Listen and repeat: Wo ist der Bahnhof?",
      },
    ],
    aiTeacherPrompt:
      "Hallo, explorer! Let's make sure you never get lost. We'll learn to ask 'Wo ist der Bahnhof?' to find the train station, and we'll understand 'links' for left and 'rechts' for right. I'll speak slowly so every word lands. You're doing wonderfully!",
  },
];

// ---------- Lookup helpers ----------

export function getLessonById(lessonId: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.lessonId === lessonId);
}

export function getLessonsByLanguage(languageId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}
