const storyContent = document.getElementById('story-content');
const choicesContainer = document.getElementById('choices');
const backgroundMusic = document.getElementById('background-music');
backgroundMusic.volume = 0.3;
backgroundMusic.play();

let inventory = [];

// Load the click sound effect
const clickSound = new Audio('click-sound.mp3');

const story = {
    start: {
        text: "Welcome to the Magical Forest! 🌳✨ Your enchanted journey begins here. Which magical creature would you like to meet first?",
        image: "images/magical-forest.jpg",
        choices: [
            { text: "The Wise Old Owl 🦉", next: 'owl' },
            { text: "The Mischievous Fairy 🧚", next: 'fairy' }
        ]
    },
    owl: {
        text: "You approach a giant oak tree where a majestic owl perches. Its eyes gleam with ancient wisdom. 'Hoo goes there?' it asks. 'To prove your worth, you must answer my riddle.'",
        image: "images/wise-owl.jpg",
        choices: [
            { text: "Accept the challenge", next: 'owlRiddle' },
            { text: "Politely decline", next: 'start' }
        ]
    },
    owlRiddle: {
        text: "The owl asks: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?'",
        image: "images/owl-riddle.jpg",
        choices: [
            { text: "Answer the riddle", next: () => askRiddle("What am I?", "echo", 'riddleSuccess', 'riddleFailure') },
            { text: "Ask for a hint", next: 'riddleHint' }
        ]
    },
    riddleHint: {
        text: "The owl hoots softly, 'Think of something that repeats what you say in the mountains.'",
        image: "images/owl-hint.jpg",
        choices: [
            { text: "Try to answer now", next: () => askRiddle("What am I?", "echo", 'riddleSuccess', 'riddleFailure') },
            { text: "Give up and explore elsewhere", next: 'start' }
        ]
    },
    riddleSuccess: {
        text: "The owl's eyes widen with surprise. 'Correct! You have earned this magical feather. It will guide you in times of need.' You add the Owl Feather to your inventory.",
        image: "images/owl-success.jpg",
        onEnter: () => addToInventory("Owl Feather 🪶"),
        choices: [
            { text: "Thank the owl and continue", next: 'start' },
            { text: "Ask the owl for advice", next: 'owlAdvice' }
        ]
    },
    riddleFailure: {
        text: "The owl shakes its head. 'Not quite right. Perhaps you need more wisdom before solving riddles. Come back when you're ready.'",
        image: "images/owl-failure.jpg",
        choices: [
            { text: "Try again", next: 'owlRiddle' },
            { text: "Explore elsewhere", next: 'start' }
        ]
    },
    owlAdvice: {
        text: "The owl ponders for a moment. 'Seek the Enchanted Grove. But beware, only those with pure hearts may enter.'",
        image: "images/owl-advice.jpg",
        choices: [
            { text: "Thank the owl and leave", next: 'start' },
            { text: "Ask about the Enchanted Grove", next: 'enchantedGroveInfo' }
        ]
    },
    enchantedGroveInfo: {
        text: "The owl explains, 'The Enchanted Grove lies beyond the Misty Mountains. You'll need the Fairy's Blessing to pass through safely.'",
        image: "images/enchanted-grove-info.jpg",
        choices: [
            { text: "Seek the Fairy's Blessing", next: 'fairy', disabled: !inventory.includes("Fairy Dust") },
            { text: "Return to exploring", next: 'start' }
        ]
    },
    fairy: {
        text: "A tiny, glowing fairy appears before you, leaving a trail of sparkles. She giggles and says, 'Want to play a magical game?'",
        image: "images/mischievous-fairy.jpg",
        choices: [
            { text: "Play the fairy's game", next: 'fairyGame' },
            { text: "Ask about magical secrets", next: 'fairySecrets' }
        ]
    },
    fairyGame: {
        text: "The fairy waves her wand, and three glowing orbs appear. 'Choose the one with true magic inside!' she chirps.",
        image: "images/fairy-game.jpg",
        choices: [
            { text: "Choose the red orb", next: () => fairyGameResult('red') },
            { text: "Choose the blue orb", next: () => fairyGameResult('blue') }
        ]
    },
    fairySecrets: {
        text: "The fairy's eyes twinkle with mischief. 'Ooh, secrets! I know where a rainbow unicorn likes to graze. Want to find it?'",
        image: "images/fairy-secret.jpg",
        choices: [
            { text: "Search for the unicorn", next: 'unicornMeadow' },
            { text: "Ask for a different secret", next: 'fairyOtherSecret' }
        ]
    },
    fairyOtherSecret: {
        text: "The fairy whispers, 'There's a hidden waterfall that grants wishes, but you need a Moonstone to activate its power.'",
        image: "images/fairy-other-secret.jpg",
        choices: [
            { text: "Ask where to find a Moonstone", next: 'moonstoneQuest' },
            { text: "Thank the fairy and continue exploring", next: 'start' }
        ]
    },
    moonstoneQuest: {
        text: "The fairy explains, 'Moonstones are guarded by the Night Sprites in the Twilight Cavern. Be cautious, they love riddles!'",
        image: "images/moonstone-quest.jpg",
        choices: [
            { text: "Venture to the Twilight Cavern", next: 'twilightCavern', disabled: !inventory.includes("Owl Feather") },
            { text: "Maybe later", next: 'start' }
        ]
    },
    unicornMeadow: {
        text: "You follow the fairy's directions and find a beautiful meadow. There, grazing peacefully, is a majestic rainbow unicorn!",
        image: "images/unicorn-meadow.jpg",
        choices: [
            { text: "Approach the unicorn", next: 'approachUnicorn' },
            { text: "Observe from a distance", next: 'observeUnicorn' }
        ]
    },
    approachUnicorn: {
        text: "The unicorn notices you and trots over. It nuzzles your hand and a shimmering hair falls from its mane. You add the Unicorn Hair to your inventory.",
        image: "images/unicorn-approach.jpg",
        onEnter: () => addToInventory("Unicorn Hair 🦄"),
        choices: [
            { text: "Thank the unicorn and continue exploring", next: 'start' },
            { text: "Ask the fairy about the hair's magic", next: 'unicornHairMagic' }
        ]
    },
    observeUnicorn: {
        text: "You watch the unicorn from afar. Its rainbow mane shimmers in the sunlight, creating a mesmerizing display of colors.",
        image: "images/unicorn-observe.jpg",
        choices: [
            { text: "Try to approach now", next: 'approachUnicorn' },
            { text: "Leave the unicorn in peace", next: 'start' }
        ]
    },
    unicornHairMagic: {
        text: "The fairy explains, 'Unicorn hair has powerful healing properties. It can also unlock certain magical barriers!'",
        image: "images/unicorn-hair-magic.jpg",
        choices: [
            { text: "Ask about magical barriers", next: 'magicalBarriers', disabled: true},
            { text: "Thank the fairy and continue", next: 'start' }
        ]
    }
};

function displayStoryNode(node) {
    storyContent.innerHTML = `<p>${node.text}</p><button id="tts-button">🔊</button>`;
    if (node.image) {
        const image = document.createElement('img');
        image.src = node.image;
        image.alt = 'Story Scene';
        storyContent.appendChild(image);
    }
    
    choicesContainer.innerHTML = '';
    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        
        if (choice.disabled) {
            button.classList.add('disabled');
            button.onclick = () => showWarning("This choice is not available yet!");
        } else {
            button.onclick = () => {
                clickSound.play(); // Play the click sound effect
                if (typeof choice.next === 'function') {
                    choice.next();
                } else {
                    displayStoryNode(story[choice.next]);
                }
            };
        }
        choicesContainer.appendChild(button);
    });

    if (node.onEnter) {
        node.onEnter();
    }

    document.getElementById('tts-button').onclick = () => textToSpeech(node.text);
}

function showWarning(message) {
    alert(message);
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

function askRiddle(question, answer, successNode, failureNode) {
    const userAnswer = prompt(question);
    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
        displayStoryNode(story[successNode]);
    } else {
        displayStoryNode(story[failureNode]);
    }
}

function fairyGameResult(choice) {
    const magicOrb = 'blue'; // Assuming blue is the correct choice
    if (choice === magicOrb) {
        displayStoryNode(story['riddleSuccess']);
    } else {
        displayStoryNode(story['riddleFailure']);
    }
}

function textToSpeech(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
}

displayStoryNode(story.start);
