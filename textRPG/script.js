const dialogues = {
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
                "next": "mobilize"
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
                "nexxt": "sleeping-3-3",
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
    }
};

let gameVars = {
    knowsDobrinya: false
}

function playerName() {
    return "Гравець";
}

function dobrinyaName() {
    if (gameVars.knowsDobrinya) {
        return "Добриня";
    }
    return "...";
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

function dialogue(id) {
    if (dialogues[id] == undefined) {
        console.log(`Dialogue ${id} does not exist`);
        return;
    }

    const current = dialogues[id];
    const speaker = current["says"]();

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

        const btn = document.createElement("button");
        btn.className = 'options';
        btn.id = `option-${next}`;
        btn.innerHTML = element["value"];

        btn.onclick = () => {
            if (onchoose) onchoose();
            dialogue(next);
        };

        document.getElementById("options").appendChild(btn);
    });
}