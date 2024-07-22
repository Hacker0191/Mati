const storyContent = document.getElementById('story-content');
const choicesContainer = document.getElementById('choices');
const backgroundMusic = document.getElementById('background-music');
backgroundMusic.volume = 0.3;
backgroundMusic.play();

let inventory = [];

const clickSound = new Audio('click-sound.mp3');

const story = {
    start: {
        text: "Welcome to the Enchanted Forest! 🌳✨ You're about to embark on an adventure. Who would you like to meet first?",
        image: "images/enchanted-forest.jpg",
        choices: [
            { text: "The Clever Fox 🦊", next: 'fox' },
            { text: "The Curious Platypus 🦆", next: 'platypus' }
        ]
    },
    fox: {
        text: "You approach a clearing where a red fox is sitting. 'Hello there,' it says with a sly grin. 'Care for a riddle?'",
        image: "images/clever-fox.jpg",
        choices: [
            { text: "Accept the riddle challenge", next: 'foxRiddle' },
            { text: "Ask about the forest instead", next: 'foxForestInfo' }
        ]
    },
    foxRiddle: {
        text: "The fox's eyes twinkle. 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?'",
        image: "images/fox-riddle.jpg",
        choices: [
            { text: "A map", next: 'foxRiddleSuccess' },
            { text: "A globe", next: 'foxRiddleFailure' }
        ]
    },
    foxRiddleSuccess: {
        text: "The fox nods. 'Well done! You've earned this magical compass. It will guide you through the forest.' You add the Fox Compass to your inventory.",
        image: "images/fox-success.jpg",
        onEnter: () => addToInventory("Fox Compass 🧭"),
        choices: [
            { text: "Thank the fox and continue", next: 'forestCrossroads' }
        ]
    },
    foxRiddleFailure: {
        text: "The fox shakes its head. 'Not quite. The answer was a map. Perhaps you need to explore more before solving riddles.'",
        image: "images/fox-failure.jpg",
        choices: [
            { text: "Thank the fox and continue", next: 'forestCrossroads' }
        ]
    },
    foxForestInfo: {
        text: "The fox's ears perk up. 'Ah, the forest! There's a curious platypus by the Whispering Creek, and deep in the heart of the forest lies the Mystic Cave. But beware of the Shadowy Grove!'",
        image: "images/fox-forest-info.jpg",
        choices: [
            { text: "Ask about the Whispering Creek", next: 'creekInfo' },
            { text: "Return to exploring", next: 'forestCrossroads' }
        ]
    },
    platypus: {
        text: "You arrive at the Whispering Creek, where a platypus is splashing around. It notices you and waddles over. 'G'day! Want to play a game of Memory?'",
        image: "images/curious-platypus.jpg",
        choices: [
            { text: "Play Memory with the platypus", next: 'platypusGame' },
            { text: "Ask about the Whispering Creek", next: 'creekInfo' }
        ]
    },
    platypusGame: {
        text: "The platypus shows you a sequence: Red, Blue, Green, Yellow. What's the correct order?",
        image: "images/memory-game.jpg",
        choices: [
            { text: "Red, Blue, Green, Yellow", next: 'platypusGameSuccess' },
            { text: "Blue, Red, Yellow, Green", next: 'platypusGameFailure' }
        ]
    },
    platypusGameSuccess: {
        text: "The platypus claps excitedly. 'Well done! You've earned this magic pearl. It can purify any water.' You add the Magic Pearl to your inventory.",
        image: "images/platypus-success.jpg",
        onEnter: () => addToInventory("Magic Pearl 🔮"),
        choices: [
            { text: "Thank the platypus and continue", next: 'forestCrossroads' }
        ]
    },
    platypusGameFailure: {
        text: "The platypus looks sympathetic. 'Oh, so close! The correct sequence was Red, Blue, Green, Yellow. Better luck next time!'",
        image: "images/platypus-failure.jpg",
        choices: [
            { text: "Thank the platypus and continue", next: 'forestCrossroads' }
        ]
    },
    creekInfo: {
        text: "The platypus explains, 'The Whispering Creek is magical! Listen closely, and you might hear secrets carried by the water.'",
        image: "images/creek-info.jpg",
        choices: [
            { text: "Listen to the creek", next: 'listenCreek' },
            { text: "Return to exploring", next: 'forestCrossroads' }
        ]
    },
    listenCreek: {
        text: "You lean close to the water, listening intently. You hear whispers about a hidden treasure in the Mystic Cave, but the path is through the Shadowy Grove.",
        image: "images/listen-creek.jpg",
        choices: [
            { text: "Continue exploring", next: 'forestCrossroads' }
        ]
    },
    forestCrossroads: {
        text: "You find yourself at a crossroads in the forest. Which path will you choose?",
        image: "images/forest-crossroads.jpg",
        choices: [
            { text: "Path to the Shadowy Grove", next: 'shadowyGrove' },
            { text: "Path to the Mystic Cave", next: 'mysteriousCaveEntrance' },
            { text: "Use an item from your inventory", next: 'useItemCrossroads' }
        ]
    },
    useItemCrossroads: {
        text: "Which item would you like to use?",
        image: "images/use-item-crossroads.jpg",
        choices: [
            { text: "Use Fox Compass 🧭", next: 'useCompassCrossroads', condition: () => inventory.includes("Fox Compass 🧭") },
            { text: "Use Magic Pearl 🔮", next: 'usePearlCrossroads', condition: () => inventory.includes("Magic Pearl 🔮") },
            { text: "Go back", next: 'forestCrossroads' }
        ]
    },
    useCompassCrossroads: {
        text: "The Fox Compass spins and points towards the path leading to the Mystic Cave. It seems to be guiding you to your ultimate goal.",
        image: "images/use-compass-crossroads.jpg",
        choices: [
            { text: "Follow the compass to the Mystic Cave", next: 'mysteriousCaveEntrance' },
            { text: "Ignore the compass and choose another path", next: 'forestCrossroads' }
        ]
    },
    usePearlCrossroads: {
        text: "You hold up the Magic Pearl. It glows faintly, revealing a safe path through the Shadowy Grove.",
        image: "images/use-pearl-crossroads.jpg",
        choices: [
            { text: "Take the safe path through the Shadowy Grove", next: 'shadowyGroveSafe' },
            { text: "Choose another path", next: 'forestCrossroads' }
        ]
    },
    shadowyGrove: {
        text: "You enter the Shadowy Grove. It's dark and misty, with twisted trees looming all around. You feel lost and uneasy.",
        image: "images/shadowy-grove.jpg",
        choices: [
            { text: "Try to find your way", next: 'groveLost' },
            { text: "Use an item", next: 'useItemGrove' }
        ]
    },
    useItemGrove: {
        text: "Which item would you like to use?",
        image: "images/use-item-grove.jpg",
        choices: [
            { text: "Use Fox Compass 🧭", next: 'useCompassGrove', condition: () => inventory.includes("Fox Compass 🧭") },
            { text: "Use Magic Pearl 🔮", next: 'usePearlGrove', condition: () => inventory.includes("Magic Pearl 🔮") },
            { text: "Go back", next: 'shadowyGrove' }
        ]
    },
    useCompassGrove: {
        text: "The Fox Compass glows brightly, cutting through the shadows. It points towards a hidden path that leads you safely through the grove.",
        image: "images/use-compass-grove.jpg",
        choices: [
            { text: "Follow the compass to the Mystic Cave", next: 'mysteriousCaveEntrance' }
        ]
    },
    usePearlGrove: {
        text: "The Magic Pearl illuminates a safe path through the Shadowy Grove.",
        image: "images/use-pearl-grove.jpg",
        choices: [
            { text: "Follow the illuminated path", next: 'shadowyGroveSafe' }
        ]
    },
    groveLost: {
        text: "Without guidance, you wander in circles. The shadows seem to grow darker and more menacing. You barely manage to find your way back to where you started.",
        image: "images/grove-lost.jpg",
        choices: [
            { text: "Return to the forest crossroads", next: 'forestCrossroads' }
        ]
    },
    shadowyGroveSafe: {
        text: "With the help of your magical item, you safely navigate through the Shadowy Grove and arrive at the entrance of the Mystic Cave.",
        image: "images/shadowy-grove-safe.jpg",
        choices: [
            { text: "Enter the Mystic Cave", next: 'mysteriousCaveEntrance' }
        ]
    },
    mysteriousCaveEntrance: {
        text: "You arrive at the entrance of the Mystic Cave. A magical barrier blocks the way, with a riddle inscribed: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?'",
        image: "images/mystic-cave.jpg",
        choices: [
            { text: "Answer: Echo", next: 'enterCave' },
            { text: "Answer: Wind", next: 'caveRiddleFailure' },
            { text: "Use an item", next: 'useItemCave' }
        ]
    },
    caveRiddleFailure: {
        text: "The magical barrier flashes red. That wasn't the correct answer. You can try again or use an item that might help.",
        image: "images/cave-riddle-failure.jpg",
        choices: [
            { text: "Try the riddle again", next: 'mysteriousCaveEntrance' },
            { text: "Use an item", next: 'useItemCave' }
        ]
    },
    useItemCave: {
        text: "Which item would you like to use?",
        image: "images/use-item-cave.jpg",
        choices: [
            { text: "Use Fox Compass 🧭", next: 'useCompassCave', condition: () => inventory.includes("Fox Compass 🧭") },
            { text: "Use Magic Pearl 🔮", next: 'usePearlCave', condition: () => inventory.includes("Magic Pearl 🔮") },
            { text: "Go back", next: 'mysteriousCaveEntrance' }
        ]
    },
    useCompassCave: {
        text: "You hold up the Fox Compass. It spins wildly and points to the word 'echo' carved faintly on the cave wall!",
        image: "images/use-compass-cave.jpg",
        choices: [
            { text: "Say 'echo' to the cave", next: 'enterCave' }
        ]
    },
    usePearlCave: {
        text: "You hold the Magic Pearl up to the cave entrance. It glows, revealing hidden writing that says 'The answer lies in the sound of your own voice.'",
        image: "images/use-pearl-cave.jpg",
        choices: [
            { text: "Say 'echo' to the cave", next: 'enterCave' }
        ]
    },
    enterCave: {
        text: "The magical barrier shimmers and fades away. You step into the Mystic Cave, filled with wonder at the glittering crystals and ancient inscriptions on the walls.",
        image: "images/enter-cave.jpg",
        choices: [
            { text: "Explore deeper into the cave", next: 'deepCave' }
        ]
    },
    deepCave: {
        text: "As you venture deeper, you come across a room with a single pedestal. On the pedestal rests a golden acorn, glowing with magical energy.",
        image: "images/deep-cave.jpg",
        choices: [
            { text: "Take the golden acorn", next: 'endingScene' }
        ]
    },
    endingScene: {
        text: "As you pick up the golden acorn, it begins to glow brightly. You feel a connection to all the forest creatures. You've found the magical artifact and completed your quest! Congratulations!",
        image: "images/ending-scene.jpg",
        choices: [
            { text: "Start a new adventure", next: 'start' }
        ]
    }
};

function displayStoryNode(node) {
    storyContent.innerHTML = `<p>${node.text}</p>`;
    if (node.image) {
        const image = document.createElement('img');
        image.src = node.image;
        image.alt = 'Story Scene';
        storyContent.appendChild(image);
    }
    
    choicesContainer.innerHTML = '';
    node.choices.forEach(choice => {
        if (!choice.condition || choice.condition()) {
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.onclick = () => {
                clickSound.play();
                displayStoryNode(story[choice.next]);
            };
            choicesContainer.appendChild(button);
        }
    });

    if (node.onEnter) {
        node.onEnter();
    }

    updateInventoryDisplay();
}

function addToInventory(item) {
    if (!inventory.includes(item)) {
        inventory.push(item);
        updateInventoryDisplay();
    }
}

function updateInventoryDisplay() {
    const inventoryContainer = document.getElementById('inventory');
    inventoryContainer.innerHTML = '<h3>Inventory</h3>';
    inventory.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.innerText = item;
        inventoryContainer.appendChild(itemElement);
    });
}

displayStoryNode(story.start);