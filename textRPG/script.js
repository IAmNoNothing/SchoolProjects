class Game {
    constructor() {
        this.dialogues = null;
        this.loadDialogues("dialogues.json");
        console.log("Loaded dialogues.", this.dialogues);
    }

    start() {
        console.log("Game started.");
    }

    loadDialogues(filename) {
        return fetch(filename).then(response => { return response.json() }).then(data => {
            console.log("Dialogues data:", data);
            this.dialogues = Object.assign({}, data);
        });
    }

    dialogue(id) {

    }
};

function main() {
    const game = new Game();
    game.start();
}

main();