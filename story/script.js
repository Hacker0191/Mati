const storyContent = document.getElementById('story-content');
const choicesContainer = document.getElementById('choices');
const backgroundMusic = document.getElementById('background-music');
backgroundMusic.play();

const story = {
    start: {
        text: "Welcome to the magical forest! Your adventure begins here. Who will you meet first?",
        choices: [
            { text: "Meet the wise fox", next: 'fox', image: 'fox.png', sound: 'fox-sound.mp3' },
            { text: "Meet the playful otter", next: 'otter', image: 'otter.png', sound: 'otter-sound.mp3' }
        ]
    },
    fox: {
        text: "The wise fox greets you warmly and offers to share his knowledge. What will you do?",
        choices: [
            { text: "Listen to his stories", next: 'stories', image: 'fox.png', sound: 'fox-story.mp3' },
            { text: "Ask for a quest", next: 'quest', image: 'fox.png', sound: 'fox-quest.mp3' }
        ]
    },
    otter: {
        text: "The playful otter invites you to join him in a game by the river. What will you do?",
        choices: [
            { text: "Play with the otter", next: 'play', image: 'otter.png', sound: 'otter-play.mp3' },
            { text: "Ask about the forest", next: 'forest', image: 'otter.png', sound: 'otter-forest.mp3' }
        ]
    },
    stories: {
        text: "The fox shares ancient tales of the forest, full of wonder and wisdom.",
        choices: [
            { text: "Continue exploring", next: 'start' }
        ]
    },
    quest: {
        text: "The fox gives you a quest to find the hidden waterfall deep in the forest.",
        choices: [
            { text: "Accept the quest", next: 'waterfall' }
        ]
    },
    play: {
        text: "You have a wonderful time playing with the otter, laughing and splashing in the water.",
        choices: [
            { text: "Continue exploring", next: 'start' }
        ]
    },
    forest: {
        text: "The otter tells you all about the forest's secrets and hidden paths.",
        choices: [
            { text: "Continue exploring", next: 'start' }
        ]
    },
    waterfall: {
        text: "You find the hidden waterfall, a place of serene beauty and magic.",
        choices: [
            { text: "Return to the fox", next: 'fox' }
        ]
    }
};

function displayStoryNode(node) {
    storyContent.innerHTML = `<p>${node.text}</p>`;
    choicesContainer.innerHTML = '';

    if (node.image) {
        const image = document.createElement('img');
        image.src = node.image;
        image.alt = 'Character Image';
        storyContent.appendChild(image);
    }

    if (node.sound) {
        const audio = new Audio(node.sound);
        audio.play();
    }

    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => displayStoryNode(story[choice.next]);
        choicesContainer.appendChild(button);
    });
}

displayStoryNode(story.start);
