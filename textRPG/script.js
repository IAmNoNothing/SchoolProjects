function dialogue(id) {
    if (dialogues[id] == undefined) {
        console.log(`Dialogue ${id} does not exist`);
        return;
    }

    const current = dialogues[id];
    const speaker = (typeof current["says"] === "function") ? current["says"]() : current["says"];

    game.innerHTML = "";

    const container = document.createElement("div");
    container.className = "dialogue-container";

    const img = document.createElement("img");
    img.className = "dialogue-img";
    img.src = `./img/${speaker}.jpg`;
    img.alt = `${speaker}.jpg`;

    const dialogueText = document.createElement("div");
    dialogueText.id = "dialogue-text";

    const says = document.createElement("div");
    says.id = "says";
    says.textContent = speaker;

    const text = document.createElement("div");
    text.id = "text";

    const options = document.createElement("div");
    options.id = "options";

    dialogueText.append(says, text, options);
    container.append(img, dialogueText);
    game.appendChild(container);

    document.getElementById("says").innerHTML = speaker;
    document.getElementById("text").innerHTML = current["value"];

    current["options"].forEach(element => {
        const next = element["next"];
        const onchoose = element["onchoose"];
        const enable = element["enable"];

        const btn = document.createElement("button");
        btn.className = 'options';
        btn.id = `option-${next}`;
        btn.innerHTML = element["value"];

        if (enable) {
            btn.disabled = !enable();
        }

        btn.onclick = () => {
            if (onchoose) onchoose();
            dialogue(next);
        };

        document.getElementById("options").appendChild(btn);
    });
}

function genericNext(id) {
    return {
        "value": "Далі",
        "next": id
    }
}

let game = null;
let player = null;

function initGame() {
    game = document.getElementById("game");

    player = {
        class: document.getElementById("select-class").value,
        race: document.getElementById("select-race").value,
        weapon: document.getElementById("select-weapon").value,
        inventory: {}
    };

    game.innerHTML = "";

    dialogue("start");
}

function playerName() {
    return "Гравець";
}

function dobrinyaName() {
    if (gameVars.knowsDobrinya) {
        return "Добриня";
    }
    return "Невідомо";
}

const dialogues = {
    "sleeping-2": {
        "value": "Це ти дивився аніме?",
        "says": dobrinyaName,
        "options": [
            {
                "next": "sleeping-3-1",
                "value": "Хто ти?",
                "onchoose": () => { gameVars.knowsDobrinya = true; }
            },
            {
                "next": "sleeping-4",
                "value": "Так, я дивився ДжоДжо... А що?"
            },
            {
                "next": "sleeping-3-3",
                "value": "Ні, з чого ти взяв?"
            }
        ]
    },

    "start": {
        "says": playerName,
        "value": "Нудно... Що сьогодні робити?",
        "options": [
            {
                "value": "Дивитись аніме",
                "next": "watch-anime-1"
            },
            {
                "value": "Піду мобілізуюся",
                "next": "mobilize-training-1"
            }
        ]
    },
    "watch-anime-1": {
        "says": playerName,
        "value": "Може подивлюся аніме?",
        "options": [
            {
                "value": "<b>Краще не треба</b>",
                "next": "start",
            },
            {
                "value": "Час вмикати ДжоДжо!",
                "next": "watch-anime-2"
            }
        ]
    },
    "watch-anime-2": {
        "says": playerName,
        "value": "Тут стільки ДжоДжо референсів...",
        "options": [
            genericNext("watch-anime-3")
        ]
    },
    "watch-anime-3": {
        "says": playerName,
        "value": "...",
        "options": [
            genericNext("watch-anime-4")
        ]
    },
    "watch-anime-4": {
        "says": playerName,
        "value": "Піду спати.",
        "options": [
            genericNext("sleeping-1")
        ]
    },
    "sleeping-1": {
        "says": dobrinyaName,
        "value": "Гей ти! Так ти! Я до тебе розмовляю!",
        "options": [
            {
                "next": "sleeping-2",
                "value": "Щ-що?"
            }
        ]
    },
    "sleeping-2": {
        "value": "Це ти дивився аніме?",
        "says": dobrinyaName,
        "options": [
            {
                "next": "sleeping-3-1",
                "value": "Хто ти?",
                "onchoose": () => { gameVars.knowsDobrinya = true; }
            },
            {
                "next": "sleeping-4",
                "value": "Так, я дивився ДжоДжо... А що?"
            },
            {
                "next": "sleeping-3-3",
                "value": "Ні, з чого ти взяв?"
            }
        ]
    },
    "sleeping-3-1": {
        "says": dobrinyaName,
        "value": "Моє ім'я - Добриня. Я ходю по світах і очищую їх від слащавості і японських мультиків. Я помітив, що хтось дивиться аніме в цьому районі і вирішив зайти.",
        "options": [
            {
                "next": "sleeping-4",
                "value": "Ну... Я дивився аніме. Що тепер?"
            },
            {
                "value": "Ти помилився, я цього не робив.",
                "next": "sleeping-4",
            }
        ]
    },
    "sleeping-4": {
        "says": dobrinyaName,
        "value": "Справді? Ну то тримай цей квиточок, на жаль місце було лише в першому вагончику, але тобі підійде.",
        "options": [
            {
                "next": "sleeping-5",
                "value": "<b>Взяти квиток</b>",
                "onchoose": () => { player.inventory["paravozik-ticket"] = (player.inventory["paravozik-ticket"] || 0) + 1; }
            }
        ]
    },
    "sleeping-5": {
        "says": dobrinyaName,
        "value": "Віднеси його на станцію і покатайся",
        "options": [
            {
                "next": "after-sleep-1",
                "value": "Хм... Окей?"
            }
        ]
    },
    "mobilize-training-1": {
        "says": playerName,
        "value": "Перед мобілізацією треба пройти тренування. Ви відпрацьовуєте стрільбу, тактику та фізичні вправи.",
        "options": [
            { "value": "Тренуватися", "next": "mobilize-training-2" },
            { "value": "Пропустити", "next": "mobilize" }
        ]
    },
    "mobilize-training-2": {
        "says": "Тренер",
        "value": "Відмінно! Ти опановуєш нові навички і готуєшся до бойового завдання.",
        "options": [
            { "value": "Йти на завдання", "next": "mobilize" }
        ]
    },
    "mobilize": {
        "says": "Наратор",
        "value": "Вас відправляють в пустельну лабораторію White Mesa на невідоме завдання.",
        "options": [
            { "value": "Вперед в пустелю", "next": "white-mesa-approach" },
        ]
    },
    "white-mesa-approach": {
        "says": "Наратор",
        "value": "Ви підходите до секретної бази: металева огорожа, сторожові вежі, жар пустелі. Вас ведуть до входу в підземелля.",
        "options": [
            { "value": "Увійти", "next": "lab-entry" }
        ]
    },
    "lab-entry": {
        "says": "Офіцер",
        "value": "Вас відведуть в глиб. На вас чекає доктор Камден.",
        "options": [
            { "value": "Оглянути тріск", "next": "portal-1" }
        ]
    },
    "portal-1": {
        "says": "Наратор",
        "value": "Вас відводять до доктора Камдена, він якраз був посеред виконання експерименту з \"позиченою\" технологією іншої компанії. Але щось пішло не так, броньоване скло, що було між вами і невідомою речовиною тріснуло. Вас почало затягувати вглиб.",
        "options": [
            {
                "value": "Допоможіть!",
                "next": "portal-2"
            }
        ]
    },
    "portal-2": {
        "says": "Наратор",
        "value": "Світ виривається з-під ніг. Ви опиняєтесь у знайомій кімнаті.",
        "options": [
            { "value": "Оглянутися", "next": "mirror-1" }
        ]
    },
    "mirror-1": {
        "says": "Добриня",
        "value": "В кімнаті ви бачите себе, але та інша версія сидить у кріслі і дивиться аніме. Вона майже не помічає вас.",
        "options": [
            { "value": "Зробити міжвимірний пранк самого себе", "next": "mirror-2" },
            { "value": "Подивитися з ним", "next": "", "enable": () => { return false; }}
        ]
    },
    "mirror-2": {
        "says": "Добриня",
        "value": "Поки той засинає, ви підходите і будите. Він дивиться на вас налякано.",
        "options": [
            {
                "value": "Я - Добриня, ходю по світах і очищую їх від слащавості і японських мультиків.",
                "next": "mirror-3",
            }
        ]
    },
    "mirror-3": {
        "says": "Добриня",
        "value": "Ви дістаєте з карману квиточок і віддаєте іншому собі. ",
        "options": [
            { "value": "Віддай його кондуктору на станції", "next": "mirror-4" }
        ]
    },
    "mirror-4": {
        "says": "Наратор",
        "value": "Ви не договорили і вас засмоктує назад.",
        "options": [
            { "value": "Прокинутися", "next": "after-portal-1" }
        ]
    },
    "after-portal-1": {
        "says": "Офіцер",
        "value": "Вас виносять з лабораторії. При допиті ви твердите, що нічого не бачили.",
        "options": [
            { "value": "Сказати правду", "next": "interrogation-1" },
            { "value": "Мовчати", "next": "interrogation-2" }
        ]
    },
    "interrogation-1": {
        "says": "Слідчий",
        "value": "Ви розповідаєте. Вони записують це у файли. Файли прибирають.",
        "options": [
            { "value": "Далі", "next": "execution-setup" }
        ]
    },
    "interrogation-2": {
        "says": "Слідчий",
        "value": "Ви мовчите. З вашого досьє вичитують дивні позначки - 'контакт з іншим світом'.",
        "options": [
            { "value": "Чекати результату", "next": "execution-setup" }
        ]
    },
    "execution-setup": {
        "says": "Наратор",
        "value": "Пізніше вас допитують у таємному відділі. Постанову підписано. Документи засекречені. Вранці - розстріл.",
        "options": [
            { "value": "Прийняти", "next": "ending-communist" }
        ]
    },
    "ending-communist": {
        "says": "Наратор",
        "value": "Бум... Про вас ніхто не знає, наче Добрині ніколи й не існувало.",
        "options": [
            { "value": "Кінець", "next": "start" }
        ]
    },
    "after-sleep-1": {
        "says": "Будильник",
        "value": "Дззззззззззз",
        "options": [
            { "value": "Прокинутися", "next": "after-sleep-2" },
            { "value": "Спати далі" , "next": "after-sleep-1" }
        ]
    },
    "after-sleep-2": {
        "says": "Наратор",
        "value": "Ви прокидаєтесь вранці. Пам'ятаєте дивний сон і знайшли в кишені квиток.",
        "options": [
            { "value": "Іти на вокзал", "next": "station-1" },
            { "value": "Викинути квиток", "next": "start" }
        ]
    },
    "station-1": {
        "says": "Наратор",
        "value": "На вокзалі - суєта. Ви підходите до кондуктора та показуєте квиток.",
        "options": [
            { "value": "Показати квиток", "next": "conductor-1" }
        ]
    },
    "conductor-1": {
        "says": "Кондуктор",
        "value": "Він забирає квиток, усміхається, нічого не каже. Через хвилину в вагон заходять вісім перекачаних мужиків.",
        "options": [
            { "value": "Сісти у вагон", "next": "train-ride" },
            { "value": "Відмовитись", "next": "start" }
        ]
    },
    "train-ride": {
        "says": "Наратор",
        "value": "Поїзд відправляється. Останнє, що чутно - голос провідника: 'Ти обрав... <b>Гудок потяга</b> вибір!'",
        "options": [
            { "value": "Кінець: ніхто не знає", "next": "ending-paravozik" }
        ]
    },
    "ending-paravozik": {
        "says": "Наратор",
        "value": "Вагон зникає в ніч. Ніхто вже не дізнається, що було далі. Квиточок залишився як свідок.",
        "options": [
            { "value": "Кінець", "next": "start" }
        ]
    }
};

const gameVars = {
    hasTicketFromTraining: false,
    toldTruth: false,
    executed: false,
    secretUnlocked: false,
    knowsDobrinya: true
};
