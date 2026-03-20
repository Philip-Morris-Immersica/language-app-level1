import type { SupportedLang } from './languages';

// All static UI strings used throughout the app.
// Keys map to translated strings in each of the 7 supported languages.
export const UI_TRANSLATIONS: Record<string, Record<SupportedLang, string>> = {

  // ── Navigation / Sidebar ─────────────────────────────────────────────────
  'nav.contents':       { bg: 'Съдържание',    ar: 'المحتويات',      fr: 'Contenu',       en: 'Contents',    fa: 'فهرست',        uk: 'Зміст',         ru: 'Содержание'    },
  'nav.level':          { bg: 'Ниво А1',       ar: 'المستوى A1',     fr: 'Niveau A1',     en: 'Level A1',    fa: 'سطح A1',       uk: 'Рівень A1',     ru: 'Уровень A1'    },
  'nav.lesson':         { bg: 'Урок',          ar: 'الدرس',          fr: 'Leçon',         en: 'Lesson',      fa: 'درس',          uk: 'Урок',          ru: 'Урок'          },
  'nav.alphabet':       { bg: 'Азбука',        ar: 'الأبجدية',       fr: 'Alphabet',      en: 'Alphabet',    fa: 'الفبا',        uk: 'Абетка',        ru: 'Алфавит'       },
  'nav.test':           { bg: 'Тест',          ar: 'اختبار',         fr: 'Test',          en: 'Test',        fa: 'آزمون',        uk: 'Тест',          ru: 'Тест'          },

  // ── Header / App title ────────────────────────────────────────────────────
  'app.title':          { bg: 'Български език за бежанци', ar: 'اللغة البلغارية للاجئين', fr: 'Bulgare pour réfugiés', en: 'Bulgarian for refugees', fa: 'زبان بلغاری برای پناهندگان', uk: 'Болгарська мова для біженців', ru: 'Болгарский для беженцев' },

  // ── Auth / Profile ────────────────────────────────────────────────────────
  'auth.login':         { bg: 'Вход',          ar: 'تسجيل الدخول',   fr: 'Connexion',     en: 'Log in',      fa: 'ورود',         uk: 'Вхід',          ru: 'Войти'         },
  'auth.logout':        { bg: 'Изход',         ar: 'تسجيل الخروج',   fr: 'Déconnexion',   en: 'Log out',     fa: 'خروج',         uk: 'Вийти',         ru: 'Выйти'         },
  'auth.register':      { bg: 'Регистрация',   ar: 'إنشاء حساب',     fr: 'Inscription',   en: 'Register',    fa: 'ثبت‌نام',      uk: 'Реєстрація',    ru: 'Регистрация'   },
  'auth.profile':       { bg: 'Моят профил',   ar: 'ملفي الشخصي',    fr: 'Mon profil',    en: 'My profile',  fa: 'پروفایل من',   uk: 'Мій профіль',   ru: 'Мой профиль'   },
  'auth.name':          { bg: 'Име',           ar: 'الاسم',          fr: 'Nom',           en: 'Name',        fa: 'نام',          uk: "Ім'я",          ru: 'Имя'           },
  'auth.email':         { bg: 'Имейл',         ar: 'البريد الإلكتروني', fr: 'E-mail',     en: 'Email',       fa: 'ایمیل',        uk: 'Електронна пошта', ru: 'Эл. почта'  },
  'auth.password':      { bg: 'Парола',        ar: 'كلمة المرور',    fr: 'Mot de passe',  en: 'Password',    fa: 'رمز عبور',     uk: 'Пароль',        ru: 'Пароль'        },
  'auth.welcome':       { bg: 'Добре дошли!',  ar: 'أهلاً وسهلاً!',  fr: 'Bienvenue !',   en: 'Welcome!',    fa: 'خوش آمدید!',   uk: 'Ласкаво просимо!', ru: 'Добро пожаловать!' },
  'auth.createAccount': { bg: 'Създай акаунт', ar: 'إنشاء حساب',     fr: 'Créer un compte', en: 'Create account', fa: 'ایجاد حساب', uk: 'Створити акаунт', ru: 'Создать аккаунт' },
  'auth.loginPlatform': { bg: 'Влезте в платформата', ar: 'الدخول إلى المنصة', fr: 'Accéder à la plateforme', en: 'Sign in to the platform', fa: 'ورود به سیستم', uk: 'Увійдіть до платформи', ru: 'Войдите в платформу' },
  'auth.registerFree':  { bg: 'Регистрирайте се безплатно', ar: 'سجّل مجاناً', fr: 'Inscrivez-vous gratuitement', en: 'Register for free', fa: 'ثبت‌نام رایگان', uk: 'Зареєструйтеся безкоштовно', ru: 'Зарегистрируйтесь бесплатно' },
  'auth.yourName':      { bg: 'Вашето име',    ar: 'اسمك',           fr: 'Votre nom',     en: 'Your name',   fa: 'نام شما',      uk: "Ваше ім'я",     ru: 'Ваше имя'      },
  'auth.backHome':      { bg: '← Обратно към началото', ar: '← العودة للرئيسية', fr: '← Retour à l\'accueil', en: '← Back to home', fa: '← بازگشت به خانه', uk: '← На головну', ru: '← На главную' },
  'auth.alreadyHave':   { bg: 'Вече имаш акаунт?', ar: 'لديك حساب؟', fr: 'Déjà un compte ?', en: 'Already have an account?', fa: 'حساب دارید؟', uk: 'Вже маєте акаунт?', ru: 'Уже есть аккаунт?' },
  'auth.loginHere':     { bg: 'Влез тук',      ar: 'ادخل هنا',       fr: 'Connectez-vous ici', en: 'Log in here', fa: 'اینجا وارد شوید', uk: 'Увійдіть тут', ru: 'Войдите здесь' },
  'auth.doLogin':       { bg: 'Влез',          ar: 'دخول',           fr: 'Se connecter',  en: 'Log in',      fa: 'ورود',         uk: 'Увійти',        ru: 'Войти'         },
  'auth.doRegister':    { bg: 'Регистрирай се', ar: 'إنشاء الحساب',   fr: "S'inscrire",    en: 'Sign up',     fa: 'ثبت‌نام',      uk: 'Зареєструватись', ru: 'Зарегистрироваться' },

  // ── Home page ─────────────────────────────────────────────────────────────
  'home.welcome':       { bg: 'Добре дошли',   ar: 'أهلاً بكم',      fr: 'Bienvenue',     en: 'Welcome',     fa: 'خوش آمدید',    uk: 'Ласкаво просимо', ru: 'Добро пожаловать' },
  'home.subtitle':      { bg: 'в платформата за български език', ar: 'في منصة تعلم اللغة البلغارية', fr: 'sur la plateforme de langue bulgare', en: 'to the Bulgarian language platform', fa: 'به پلتفرم زبان بلغاری', uk: 'на платформу болгарської мови', ru: 'на платформу болгарского языка' },
  'home.description':   { bg: 'Цифрова платформа на UNHCR за изучаване на български език за бежанци. Безплатни интерактивни уроци, упражнения и тестове за ниво А1–Б2.', ar: 'منصة UNHCR الرقمية لتعلم اللغة البلغارية للاجئين. دروس تفاعلية مجانية وتمارين واختبارات للمستوى A1–B2.', fr: 'Plateforme numérique du HCR pour apprendre le bulgare aux réfugiés. Leçons interactives gratuites, exercices et tests pour le niveau A1–B2.', en: 'UNHCR digital platform for learning Bulgarian for refugees. Free interactive lessons, exercises and tests for level A1–B2.', fa: 'پلتفرم دیجیتال کمیساریای عالی پناهندگان برای یادگیری زبان بلغاری. دروس تعاملی رایگان، تمرین‌ها و آزمون‌ها برای سطح A1–B2.', uk: 'Цифрова платформа УВКБ ООН для вивчення болгарської мови для біженців. Безкоштовні інтерактивні уроки, вправи та тести для рівня A1–B2.', ru: 'Цифровая платформа УВКБ ООН для изучения болгарского языка для беженцев. Бесплатные интерактивные уроки, упражнения и тесты для уровня A1–B2.' },
  'home.continue':      { bg: 'Продължи',      ar: 'تابع',           fr: 'Continuer',     en: 'Continue',    fa: 'ادامه',        uk: 'Продовжити',    ru: 'Продолжить'    },
  'home.selectLevel':   { bg: 'Изберете ниво', ar: 'اختر المستوى',   fr: 'Choisissez un niveau', en: 'Select level', fa: 'سطح را انتخاب کنید', uk: 'Оберіть рівень', ru: 'Выберите уровень' },
  'home.progress':      { bg: 'Прогрес',       ar: 'التقدم',         fr: 'Progression',   en: 'Progress',    fa: 'پیشرفت',       uk: 'Прогрес',       ru: 'Прогресс'      },
  'home.completed':     { bg: '% завършено',   ar: '% مكتمل',        fr: '% terminé',     en: '% completed', fa: '% تکمیل شده',  uk: '% завершено',   ru: '% завершено'   },
  'home.selectHint':    { bg: 'Изберете ниво, за да продължите обучението си', ar: 'اختر مستوى لمتابعة تعلمك', fr: 'Choisissez un niveau pour continuer votre apprentissage', en: 'Select a level to continue learning', fa: 'برای ادامه یادگیری سطحی انتخاب کنید', uk: 'Оберіть рівень, щоб продовжити навчання', ru: 'Выберите уровень, чтобы продолжить обучение' },
  'home.statsBar':      { bg: '11 урока · Ниво А1–Б2 · Безплатно', ar: '11 درساً · المستوى A1–B2 · مجاناً', fr: '11 leçons · Niveaux A1–B2 · Gratuit', en: '11 lessons · Level A1–B2 · Free', fa: '۱۱ درس · سطح A1–B2 · رایگان', uk: '11 уроків · Рівень A1–B2 · Безкоштовно', ru: '11 уроков · Уровень A1–B2 · Бесплатно' },
  'home.welcomeUser':   { bg: 'Добре дошли,',  ar: 'أهلاً,',         fr: 'Bienvenue,',    en: 'Welcome,',    fa: 'خوش آمدید,',   uk: 'Ласкаво просимо,', ru: 'Добро пожаловать,' },

  // ── Lesson page ───────────────────────────────────────────────────────────
  'lesson.exercises':   { bg: 'Упражнения',    ar: 'التمارين',       fr: 'Exercices',     en: 'Exercises',   fa: 'تمرین‌ها',     uk: 'Вправи',        ru: 'Упражнения'    },
  'lesson.workbook':    { bg: 'Работна тетрадка', ar: 'كراسة التمارين', fr: 'Cahier d\'exercices', en: 'Workbook', fa: 'کتاب کار', uk: 'Робочий зошит', ru: 'Рабочая тетрадь' },
  'lesson.workbookMore':{ bg: 'Има още',       ar: 'يوجد أيضاً',     fr: 'Il y a encore', en: 'There are',   fa: 'همچنین',       uk: 'Є ще',          ru: 'Есть ещё'      },
  'lesson.workbookHint':{ bg: 'упражнения в работната тетрадка за допълнителна практика.', ar: 'تمارين في كراسة التمارين للممارسة الإضافية.', fr: 'exercices dans le cahier pour une pratique supplémentaire.', en: 'exercises in the workbook for additional practice.', fa: 'تمرین در کتاب کار برای تمرین بیشتر.', uk: 'вправ у робочому зошиті для додаткової практики.', ru: 'упражнений в рабочей тетради для дополнительной практики.' },
  'lesson.openWorkbook':{ bg: 'Отвори работната тетрадка', ar: 'افتح كراسة التمارين', fr: 'Ouvrir le cahier', en: 'Open workbook', fa: 'باز کردن کتاب کار', uk: 'Відкрити робочий зошит', ru: 'Открыть рабочую тетрадь' },

  // ── Exercise titles / labels ──────────────────────────────────────────────
  'exercise.prefix':    { bg: 'УПРАЖНЕНИЕ',    ar: 'تمرين',          fr: 'EXERCICE',      en: 'EXERCISE',    fa: 'تمرین',        uk: 'ВПРАВА',        ru: 'УПРАЖНЕНИЕ'    },

  // ── Navigation buttons ────────────────────────────────────────────────────
  'nav.prev':           { bg: 'Предишен урок', ar: 'الدرس السابق',   fr: 'Leçon précédente', en: 'Previous lesson', fa: 'درس قبلی', uk: 'Попередній урок', ru: 'Предыдущий урок' },
  'nav.next':           { bg: 'Следващ урок',  ar: 'الدرس التالي',   fr: 'Leçon suivante', en: 'Next lesson', fa: 'درس بعدی',    uk: 'Наступний урок', ru: 'Следующий урок' },
  'nav.doTest':         { bg: 'Направи тест',  ar: 'أجرِ الاختبار',  fr: 'Passer le test', en: 'Take test',   fa: 'انجام آزمون',  uk: 'Пройти тест',   ru: 'Пройти тест'   },

  // ── Exercise interaction ──────────────────────────────────────────────────
  'exercise.check':        { bg: 'Провери',                ar: 'تحقق',                     fr: 'Vérifier',           en: 'Check',              fa: 'بررسی',              uk: 'Перевірити',         ru: 'Проверить'          },
  'exercise.checkAnswers': { bg: 'Провери отговорите',     ar: 'تحقق من الإجابات',          fr: 'Vérifier les réponses', en: 'Check answers',   fa: 'بررسی پاسخ‌ها',      uk: 'Перевірити відповіді', ru: 'Проверить ответы'  },
  'exercise.reset':        { bg: 'Нулирай',                ar: 'إعادة تعيين',               fr: 'Réinitialiser',      en: 'Reset',              fa: 'بازنشانی',           uk: 'Скинути',            ru: 'Сбросить'           },
  'exercise.correct':      { bg: 'Правилно!',              ar: 'صحيح!',                     fr: 'Correct !',          en: 'Correct!',           fa: 'درست!',              uk: 'Правильно!',         ru: 'Правильно!'         },
  'exercise.incorrect':    { bg: 'Опитай пак',             ar: 'حاول مجدداً',               fr: 'Réessayez',          en: 'Try again',          fa: 'دوباره تلاش کن',     uk: 'Спробуй знову',      ru: 'Попробуй снова'     },
  'exercise.correctLabel': { bg: 'Правилно:',              ar: 'صحيح:',                     fr: 'Correct :',          en: 'Correct:',           fa: 'درست:',              uk: 'Правильно:',         ru: 'Правильно:'         },
  'exercise.wrongLabel':   { bg: 'Грешно',                 ar: 'خطأ',                       fr: 'Faux',               en: 'Wrong',              fa: 'غلط',                uk: 'Неправильно',        ru: 'Неправильно'        },
  'exercise.result':       { bg: 'Резултат:',              ar: 'النتيجة:',                  fr: 'Résultat :',         en: 'Result:',            fa: 'نتیجه:',             uk: 'Результат:',         ru: 'Результат:'         },
  'exercise.correct_n':    { bg: 'правилни отговора',      ar: 'إجابات صحيحة',              fr: 'réponses correctes', en: 'correct answers',    fa: 'پاسخ صحیح',          uk: 'правильних відповідей', ru: 'правильных ответов' },
  'exercise.listen':       { bg: 'Слушай',                 ar: 'استمع',                     fr: 'Écouter',            en: 'Listen',             fa: 'گوش کن',             uk: 'Слухати',            ru: 'Слушать'            },
  'exercise.stop':         { bg: 'Спри',                   ar: 'إيقاف',                     fr: 'Arrêter',            en: 'Stop',               fa: 'توقف',               uk: 'Зупинити',           ru: 'Остановить'         },
  'exercise.selectOption': { bg: 'Избери...',              ar: 'اختر...',                   fr: 'Choisir...',         en: 'Select...',          fa: 'انتخاب...',          uk: 'Вибери...',          ru: 'Выбери...'          },
  'exercise.buildSentence':{ bg: 'Изберете думи, за да построите изречението...', ar: 'اختر الكلمات لبناء الجملة...', fr: 'Choisissez des mots pour construire la phrase...', en: 'Select words to build the sentence...', fa: 'کلمات را انتخاب کنید...', uk: 'Виберіть слова для побудови речення...', ru: 'Выберите слова для построения предложения...' },
  'exercise.correctAnswer':{ bg: 'Правилен отговор:',      ar: 'الإجابة الصحيحة:',          fr: 'Bonne réponse :',    en: 'Correct answer:',    fa: 'پاسخ صحیح:',         uk: 'Правильна відповідь:', ru: 'Правильный ответ:'  },
  'exercise.foundWords':   { bg: 'Намерени думи',          ar: 'الكلمات الموجودة',          fr: 'Mots trouvés',       en: 'Found words',        fa: 'کلمات پیدا شده',     uk: 'Знайдені слова',     ru: 'Найденные слова'    },
  'exercise.skippedWords': { bg: 'Пропуснати думи:',       ar: 'الكلمات المفقودة:',         fr: 'Mots manqués :',     en: 'Missed words:',      fa: 'کلمات از دست رفته:', uk: 'Пропущені слова:',   ru: 'Пропущенные слова:' },
  'exercise.noWordsYet':   { bg: 'Все още няма намерени думи...', ar: 'لم يتم العثور على كلمات بعد...', fr: 'Aucun mot trouvé...', en: 'No words found yet...', fa: 'هنوز کلمه‌ای پیدا نشده...', uk: 'Слів ще не знайдено...', ru: 'Слова ещё не найдены...' },
  'exercise.selectWords':  { bg: 'Изберете думите, които намирате в текста:', ar: 'اختر الكلمات التي تجدها في النص:', fr: 'Sélectionnez les mots que vous trouvez dans le texte :', en: 'Select the words you find in the text:', fa: 'کلماتی که در متن پیدا می‌کنید را انتخاب کنید:', uk: 'Виберіть слова, які знаходите в тексті:', ru: 'Выберите слова, которые находите в тексте:' },
  'exercise.dragLetter':   { bg: 'Влачете поставена буква за да я преместите', ar: 'اسحب الحرف الموضوع لنقله', fr: 'Faites glisser une lettre pour la déplacer', en: 'Drag a placed letter to move it', fa: 'حرف قرار داده شده را بکشید تا جابجا شود', uk: 'Перетягніть розміщену літеру, щоб перемістити її', ru: 'Перетащите поставленную букву, чтобы переместить её' },
  'exercise.chooseAnswer': { bg: 'Изберете правилния отговор:', ar: 'اختر الإجابة الصحيحة:', fr: 'Choisissez la bonne réponse :', en: 'Choose the correct answer:', fa: 'پاسخ صحیح را انتخاب کنید:', uk: 'Виберіть правильну відповідь:', ru: 'Выберите правильный ответ:' },
  'exercise.allCorrect':   { bg: 'Браво! Всички отговори са верни!', ar: 'أحسنت! جميع الإجابات صحيحة!', fr: 'Bravo ! Toutes les réponses sont correctes !', en: 'Well done! All answers are correct!', fa: 'آفرین! همه پاسخ‌ها درست هستند!', uk: 'Браво! Всі відповіді правильні!', ru: 'Браво! Все ответы верны!' },
  'exercise.reviewErrors': { bg: 'Проверете грешните отговори (маркирани в червено).', ar: 'راجع الإجابات الخاطئة (المميزة باللون الأحمر).', fr: 'Vérifiez les mauvaises réponses (en rouge).', en: 'Check the wrong answers (marked in red).', fa: 'پاسخ‌های اشتباه را بررسی کنید (با قرمز مشخص شده).', uk: 'Перевірте неправильні відповіді (виділені червоним).', ru: 'Проверьте неправильные ответы (выделены красным).' },
  'exercise.model':        { bg: 'Модел:', ar: 'نموذج:', fr: 'Modèle :', en: 'Model:', fa: 'مدل:', uk: 'Зразок:', ru: 'Образец:' },
  // ── Lesson page strings (extra keys; lesson.exercises / workbook / openWorkbook above) ──
  'lesson.prefix':       { bg: 'Урок',            ar: 'الدرس',          fr: 'Leçon',         en: 'Lesson',       fa: 'درس',            uk: 'Урок',           ru: 'Урок'           },
  'lesson.workbookDesc':   { bg: 'Има още {n} упражнения в работната тетрадка за допълнителна практика.', ar: 'يوجد {n} تمارين إضافية في كتاب التمارين.', fr: 'Il y a {n} exercices supplémentaires dans le cahier.', en: 'There are {n} more exercises in the workbook for extra practice.', fa: 'در کتاب تمرین {n} تمرین دیگر وجود دارد.', uk: 'У робочому зошиті є ще {n} вправ для додаткової практики.', ru: 'В рабочей тетради есть ещё {n} упражнений для дополнительной практики.' },
  'lesson.review':         { bg: 'Преговор', ar: 'مراجعة', fr: 'Révision', en: 'Review', fa: 'مرور', uk: 'Повторення', ru: 'Повторение' },
  'lesson.reviewDesc':     { bg: 'Упражнения от работната тетрадка за затвърждаване на наученото.', ar: 'تمارين من كتاب التمارين لتثبيت ما تعلمته.', fr: 'Exercices du cahier pour consolider vos acquis.', en: 'Workbook exercises to reinforce what you\'ve learned.', fa: 'تمرین‌هایی از کتاب کار برای تثبیت آموخته‌ها.', uk: 'Вправи з робочого зошита для закріплення вивченого.', ru: 'Упражнения из рабочей тетради для закрепления изученного.' },
  'lesson.backToLesson':   { bg: 'Назад към урока', ar: 'العودة إلى الدرس', fr: 'Retour au cours', en: 'Back to lesson', fa: 'بازگشت به درس', uk: 'Назад до уроку', ru: 'Вернуться к уроку' },
  'lesson.takeTest':       { bg: 'Направи тест',    ar: 'إجراء اختبار',   fr: 'Faire un test', en: 'Take test',     fa: 'انجام آزمون',    uk: 'Пройти тест',    ru: 'Пройти тест'    },
  'exercise.readInPairs':  { bg: 'Прочетете диалозите по двойки', ar: 'اقرأوا الحوارات في أزواج', fr: 'Lisez les dialogues par paires', en: 'Read the dialogues in pairs', fa: 'دیالوگ‌ها را دو نفره بخوانید', uk: 'Читайте діалоги парами', ru: 'Читайте диалоги парами' },
  'exercise.clickToRead':  { bg: 'Натиснете секцията за автоматично прочитане', ar: 'انقر على القسم للقراءة التلقائية', fr: 'Cliquez sur une section pour la lire automatiquement', en: 'Click a section to hear it read aloud', fa: 'برای خواندن خودکار روی بخش کلیک کنید', uk: 'Натисніть секцію для автоматичного читання', ru: 'Нажмите на секцию для автоматического чтения' },
  'exercise.tapToTranslate': { bg: 'Натиснете картичка, за да чуете думата', ar: 'انقر على البطاقة لرؤية الترجمة', fr: 'Appuyez sur une carte pour voir la traduction', en: 'Tap a card to see the translation', fa: 'برای دیدن ترجمه روی کارت ضربه بزنید', uk: 'Натисніть картку, щоб побачити переклад', ru: 'Нажмите на карточку, чтобы увидеть перевод' },
  'exercise.swipeHowTo':     { bg: 'Как да играем:', ar: 'كيف تلعب:', fr: 'Comment jouer :', en: 'How to play:', fa: 'چگونه بازی کنیم:', uk: 'Як грати:', ru: 'Как играть:' },
  'exercise.swipeInstruction': { bg: 'Плъзнете думата наляво или надясно, за да я поставите в правилната колона.', ar: 'اسحب الكلمة يمينًا أو يسارًا لوضعها في العمود الصحيح.', fr: 'Glissez le mot à gauche ou à droite pour le placer dans la bonne colonne.', en: 'Swipe the word left or right to place it in the correct column.', fa: 'کلمه را به چپ یا راست بکشید تا در ستون صحیح قرار گیرد.', uk: 'Проведіть слово ліворуч або праворуч, щоб розмістити його у правильній колонці.', ru: 'Проведите слово влево или вправо, чтобы поместить его в нужную колонку.' },
  'exercise.swipeInstruction3': { bg: 'Плъзнете думата наляво, надясно или надолу, за да я поставите в правилната колона.', ar: 'اسحب الكلمة يمينًا أو يسارًا أو للأسفل لوضعها في العمود الصحيح.', fr: 'Glissez le mot à gauche, à droite ou vers le bas pour le placer dans la bonne colonne.', en: 'Swipe the word left, right or down to place it in the correct column.', fa: 'کلمه را به چپ، راست یا پایین بکشید تا در ستون صحیح قرار گیرد.', uk: 'Проведіть слово ліворуч, праворуч або вниз, щоб розмістити його у правильній колонці.', ru: 'Проведите слово влево, вправо или вниз, чтобы поместить его в нужную колонку.' },
  'exercise.swipeHint':      { bg: 'Плъзнете картата наляво или надясно', ar: 'اسحب البطاقة يمينًا أو يسارًا', fr: 'Glissez la carte à gauche ou à droite', en: 'Swipe the card left or right', fa: 'کارت را به چپ یا راست بکشید', uk: 'Проведіть картку ліворуч або праворуч', ru: 'Проведите карточку влево или вправо' },
  'exercise.progress':       { bg: 'Напредък', ar: 'التقدم', fr: 'Progression', en: 'Progress', fa: 'پیشرفت', uk: 'Прогрес', ru: 'Прогресс' },
  'exercise.allPlaced':      { bg: 'Всички думи са поставени', ar: 'تم وضع جميع الكلمات', fr: 'Tous les mots sont placés', en: 'All words placed', fa: 'همه کلمات قرار داده شدند', uk: 'Усі слова розміщені', ru: 'Все слова размещены' },
  'exercise.placeAllFirst':  { bg: 'Моля, поставете всички думи в колоните!', ar: 'يرجى وضع جميع الكلمات في الأعمدة!', fr: 'Veuillez placer tous les mots dans les colonnes !', en: 'Please place all words in the columns!', fa: 'لطفاً همه کلمات را در ستون‌ها قرار دهید!', uk: 'Будь ласка, розмістіть усі слова в колонках!', ru: 'Пожалуйста, разместите все слова в колонках!' },
  'exercise.excellent':      { bg: 'Отлично!', ar: 'ممتاز!', fr: 'Excellent !', en: 'Excellent!', fa: 'عالی!', uk: 'Відмінно!', ru: 'Отлично!' },
  'exercise.find':           { bg: 'Намерете', ar: 'ابحث عن', fr: 'Trouvez', en: 'Find', fa: 'پیدا کنید', uk: 'Знайдіть', ru: 'Найдите' },
  'exercise.yourTurn':       { bg: 'Вашият ред — изберете отговор:', ar: 'دورك — اختر الإجابة:', fr: 'À vous — choisissez une réponse :', en: 'Your turn — choose an answer:', fa: 'نوبت شماست — پاسخ را انتخاب کنید:', uk: 'Ваша черга — виберіть відповідь:', ru: 'Ваша очередь — выберите ответ:' },
  'exercise.answered':       { bg: 'Отговорено', ar: 'تمت الإجابة', fr: 'Répondu', en: 'Answered', fa: 'پاسخ داده شده', uk: 'Відповідь дана', ru: 'Ответ дан' },
  'exercise.allAnswered':    { bg: 'Браво! Отговорихте на всички въпроси!', ar: 'أحسنت! أجبت على جميع الأسئلة!', fr: 'Bravo ! Vous avez répondu à toutes les questions !', en: 'Well done! You answered all the questions!', fa: 'آفرین! به همه سؤالات پاسخ دادید!', uk: 'Браво! Ви відповіли на всі запитання!', ru: 'Браво! Вы ответили на все вопросы!' },
  'exercise.dictionary':     { bg: 'Речник', ar: 'قاموس', fr: 'Dictionnaire', en: 'Dictionary', fa: 'فرهنگ لغت', uk: 'Словник', ru: 'Словарь' },

  'level.title':            { bg: 'Ниво А1 — Уроци', ar: 'المستوى A1 — الدروس', fr: 'Niveau A1 — Leçons', en: 'Level A1 — Lessons', fa: 'سطح A1 — دروس', uk: 'Рівень А1 — Уроки', ru: 'Уровень А1 — Уроки' },
  'level.subtitle':         { bg: 'Български за начинаещи', ar: 'البلغارية للمبتدئين', fr: 'Bulgare pour débutants', en: 'Bulgarian for beginners', fa: 'بلغاری برای مبتدیان', uk: 'Болгарська для початківців', ru: 'Болгарский для начинающих' },
  'level.overallProgress':  { bg: 'Общ прогрес', ar: 'التقدم العام', fr: 'Progression globale', en: 'Overall progress', fa: 'پیشرفت کلی', uk: 'Загальний прогрес', ru: 'Общий прогресс' },
  'level.start':            { bg: 'Започни', ar: 'ابدأ', fr: 'Commencer', en: 'Start', fa: 'شروع', uk: 'Розпочати', ru: 'Начать' },
  'level.continue':         { bg: 'Продължи', ar: 'تابع', fr: 'Continuer', en: 'Continue', fa: 'ادامه', uk: 'Продовжити', ru: 'Продолжить' },
  'level.completed':        { bg: 'Завършен', ar: 'مكتمل', fr: 'Terminé', en: 'Completed', fa: 'تکمیل شده', uk: 'Завершено', ru: 'Завершён' },
  'level.review':           { bg: 'Преглед', ar: 'مراجعة', fr: 'Revoir', en: 'Review', fa: 'مرور', uk: 'Переглянути', ru: 'Просмотреть' },
  'level.test':             { bg: 'Тест', ar: 'اختبار', fr: 'Test', en: 'Test', fa: 'آزمون', uk: 'Тест', ru: 'Тест' },
  'level.notStarted':       { bg: 'Не е започнат', ar: 'لم يبدأ', fr: 'Non commencé', en: 'Not started', fa: 'شروع نشده', uk: 'Не розпочато', ru: 'Не начат' },
  'level.lessonsCompleted':  { bg: 'урока завършени', ar: 'دروس مكتملة', fr: 'leçons terminées', en: 'lessons completed', fa: 'درس تکمیل شده', uk: 'уроків завершено', ru: 'уроков завершено' },
  'level.backToLevels':     { bg: 'Назад към нивата', ar: 'العودة للمستويات', fr: 'Retour aux niveaux', en: 'Back to levels', fa: 'بازگشت به سطوح', uk: 'Назад до рівнів', ru: 'К уровням' },
  'level.lesson':           { bg: 'Урок', ar: 'درس', fr: 'Leçon', en: 'Lesson', fa: 'درس', uk: 'Урок', ru: 'Урок' },
};

export type UIKey = keyof typeof UI_TRANSLATIONS;
