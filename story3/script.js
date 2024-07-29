const storyContent = document.getElementById('story-content');
const choicesContainer = document.getElementById('choices');
const imageContainer = document.getElementById('image-container');
const inventoryContainer = document.getElementById('inventory');
let previousNode = null;
let previousNodeKey = null; 

const story = {
    start: {
        text: "Dara woke up with a start. He opened his eyes and was immediately illuminated by the blazing morning sun. He was lying under the tree where he had been sitting a moment ago. His bag was still hanging limply on one of the branches.",
        image: "tree_morning.jpg",
        choices: [
            { text: "Brush off the grass and leaves", next: 'brushOff' },
            { text: "Look for the book", next: 'lookForBook' }
        ]
    },
    brushOff: {
        text: "Dara brushed off the grass and leaves and stood up. He rubbed his aching arm and stretched.",
        image: "dara_standing.jpg",
        choices: [
            { text: "Look for the book", next: 'lookForBook' },
            { text: "Check the time", next: 'checkTime' }
        ]
    },
    lookForBook: {
        text: "Dara looked in the grass for the book he had been reading earlier. He found the hefty volume with the cover decorated with thick gold letters spelling out 'Road Through the West.'",
        image: "book_in_grass.jpg",
        choices: [
            { text: "Put the book in the bag", next: 'putBookAway' },
            { text: "Open the book", next: 'openBook' }
        ],
        onEnter: () => addToInventory("Road Through the West")
    },
    putBookAway: {
        text: "Dara put the book away in his simple leather bag. He then looked up at the sun.",
        image: "sun_position.jpg",
        choices: [
            { text: "Check the time", next: 'checkTime' },
            { text: "Head towards the town", next: 'headToTown' }
        ]
    },
    openBook: {
        text: "Dara opened the book, tempted to read a bit more. But as he glanced at the sun, he realized he might be late.",
        image: "open_book.jpg",
        choices: [
            { text: "Read a few lines", next: 'readFewLines' },
            { text: "Close the book and check the time", next: 'checkTime' }
        ]
    },
    readFewLines: {
        text: "Dara read a few lines about the dangers beyond the Furrow. The book mentioned creatures called the Defiled and a cursed land to the West.",
        image: "book_text.jpg",
        choices: [
            { text: "Continue reading", next: 'lostInBook' },
            { text: "Close the book and check the time", next: 'checkTime' }
        ]
    },
    lostInBook: {
        text: "Dara became engrossed in the book, reading about dark figures and screams of terrified people. Suddenly, he heard the town bell ringing in the distance.",
        image: "town_bell.jpg",
        choices: [
            { text: "Rush to town", next: 'rushToTown' },
            { text: "Calmly pack up and leave", next: 'calmlyLeave' }
        ]
    },
    checkTime: {
        text: "Dara's eyes opened wide as he realized what had just happened. He had overslept! The sun was much higher in the sky than it should be.",
        image: "realization.jpg",
        choices: [
            { text: "Run towards the town", next: 'runToTown' },
            { text: "Walk quickly to town", next: 'walkQuicklyToTown' }
        ]
    },
    runToTown: {
        text: "Dara ran through the main gate and down the street. He passed the large sundial in the main square, which read 1:00 PM. He should have been in the workshop for over an hour!",
        image: "running_late.jpg",
        choices: [
            { text: "Keep running to the workshop", next: 'arriveAtWorkshop' },
            { text: "Stop to catch breath", next: 'catchBreath' }
        ]
    },
    walkQuicklyToTown: {
        text: "Dara walked quickly towards Dormund, trying not to panic. As he entered the town, he saw the sundial showing 1:00 PM. He was very late.",
        image: "town_entrance.jpg",
        choices: [
            { text: "Start running", next: 'runToWorkshop' },
            { text: "Continue walking quickly", next: 'arriveLateCalmly' }
        ]
    },
    
    catchBreath: {
        text: "Dara stopped to catch his breath. He was already late, so a few more minutes wouldn't hurt. As he rested, he noticed two White Guard officers nearby.",
        image: "white_guard.jpg",
        choices: [
            { text: "Avoid the officers and continue to the workshop", next: 'avoidOfficers' },
            { text: "Greet the officers and ask for directions", next: 'greetOfficers' }
        ]
    },
    avoidOfficers: {
        text: "Dara decided to avoid the White Guard officers. He took a side street and continued towards the workshop.",
        image: "side_street.jpg",
        choices: [
            { text: "Take a shortcut through an alley", next: 'takeShortcut' },
            { text: "Stay on the main road", next: 'stayMainRoad' }
        ]
    },
    greetOfficers: {
        text: "Dara greeted the White Guard officers and asked for the quickest way to the shoemaker's workshop. They gave him directions but looked at him suspiciously.",
        image: "officers_directions.jpg",
        choices: [
            { text: "Thank them and hurry to the workshop", next: 'hurryToWorkshop' },
            { text: "Ask them about town security", next: 'askAboutSecurity' }
        ]
    },
    takeShortcut: {
        text: "Dara took a shortcut through a narrow alley. As he rushed through, he almost bumped into a cart filled with hay.",
        image: "hay_cart.jpg",
        choices: [
            { text: "Dodge the cart", next: 'dodgeCart' },
            { text: "Help push the cart", next: 'helpWithCart' }
        ]
    },
    stayMainRoad: {
        text: "Dara stayed on the main road, weaving through the crowd. He could see the workshop in the distance.",
        image: "crowded_street.jpg",
        choices: [
            { text: "Push through the crowd", next: 'pushThroughCrowd' },
            { text: "Wait for a clearing", next: 'waitForClearing' }
        ]
    },
    arriveAtWorkshop: {
        text: "Dara arrived at the workshop, out of breath and very late. Mr. Mondart, his boss, was standing at the door with a concerned look.",
        image: "workshop_outside.jpg",
        choices: [
            { text: "Apologize profusely", next: 'apologize' },
            { text: "Try to explain", next: 'explainLate' }
        ]
    },
    apologize: {
        text: "Dara apologized profusely to Mr. Mondart. 'I'm so sorry, sir. I overslept and I know it's not an excuse. It won't happen again.'",
        image: "apologizing.jpg",
        choices: [
            { text: "Offer to work extra hours", next: 'offerExtraHours' },
            { text: "Ask about today's tasks", next: 'askAboutTasks' }
        ]
    },
    explainLate: {
        text: "Dara tried to explain, 'Mr. Mondart, I was reading this book about the dangers beyond the Furrow, and I lost track of time...'",
        image: "explaining.jpg",
        choices: [
            { text: "Show Mr. Mondart the book", next: 'showBook' },
            { text: "Apologize for the poor excuse", next: 'apologizePoorExcuse' }
        ]
    },
    showBook: {
        text: "Dara showed Mr. Mondart the book. The man's eyes widened with interest. 'The Road Through the West? That's a rare book. Where did you get it?'",
        image: "mondart_interested.jpg",
        choices: [
            { text: "Explain it was a gift from father", next: 'explainBookGift' },
            { text: "Ask if Mr. Mondart knows about the Furrow", next: 'askAboutFurrow' }
        ]
    },
    explainBookGift: {
        text: "Dara explained that the book was a gift from his father, who works in the southern mines. Mr. Mondart nodded, seeming to understand.",
        image: "mondart_understanding.jpg",
        choices: [
            { text: "Ask about today's tasks", next: 'askAboutTasks' },
            { text: "Offer to share the book later", next: 'offerShareBook' }
        ]
    },
    askAboutFurrow: {
        text: "Dara asked Mr. Mondart if he knew about the Furrow. The man's face grew serious. 'Aye, lad. It's not something to be taken lightly. But now's not the time for such talk.'",
        image: "mondart_serious.jpg",
        choices: [
            { text: "Apologize and ask about tasks", next: 'askAboutTasks' },
            { text: "Press for more information", next: 'pressForInfo' }
        ]
    },
    askAboutTasks: {
        text: "Mr. Mondart explained the day's tasks. 'We have a pile of shoes to repair, including Mrs. Kamilda's purple ones. And there are deliveries to make.'",
        image: "shoe_pile.jpg",
        choices: [
            { text: "Start with Mrs. Kamilda's shoes", next: 'startKamildaShoes' },
            { text: "Begin with general repairs", next: 'startGeneralRepairs' }
        ]
    },
    startKamildaShoes: {
        text: "Dara began working on Mrs. Kamilda's ornate purple shoes. They were unlike anything he'd seen before.",
        image: "purple_shoes.jpg",
        choices: [
            { text: "Focus on detailed work", next: 'detailedShoeWork' },
            { text: "Work quickly to make up for lost time", next: 'quickShoeWork' }
        ]
    },
    detailedShoeWork: {
        text: "Dara worked meticulously on the purple shoes, ensuring every detail was perfect. Mr. Mondart nodded approvingly as he passed by.",
        image: "detailed_work.jpg",
        choices: [
            { text: "Continue working on other shoes", next: 'continueShoeRepairs' },
            { text: "Ask about delivering the shoes", next: 'askAboutDelivery' }
        ]
    },
    continueShoeRepairs: {
        text: "Dara continued repairing shoes throughout the afternoon. By evening, he had fixed a significant number of pairs.",
        image: "evening_repairs.jpg",
        choices: [
            { text: "Prepare for deliveries", next: 'prepareDeliveries' },
            { text: "Clean up the workshop", next: 'cleanWorkshop' }
        ]
    },
    prepareDeliveries: {
        text: "Dara prepared the repaired shoes for delivery. Mr. Mondart handed him a list of addresses, including Mrs. Kamilda's and Mr. Kador's.",
        image: "delivery_list.jpg",
        choices: [
            { text: "Start with Mrs. Kamilda's delivery", next: 'deliverToKamilda' },
            { text: "Begin with Mr. Kador's delivery", next: 'deliverToKador' }
        ]
    },
    deliverToKamilda: {
        text: "Dara arrived at Mrs. Kamilda's house with her purple shoes. He found the house in disarray, with Mrs. Kamilda looking distressed.",
        image: "kamilda_house.jpg",
        choices: [
            { text: "Ask what happened", next: 'askKamilda' },
            { text: "Deliver the shoes and leave", next: 'leaveKamilda' }
        ]
    },
    askKamilda: {
        text: "'Mrs. Kamilda, is everything alright?' Dara asked. The woman looked at him with worried eyes. 'Oh, it's terrible! I've been robbed!'",
        image: "distressed_kamilda.jpg",
        choices: [
            { text: "Ask about the robbery", next: 'askAboutRobbery' },
            { text: "Offer to help", next: 'offerHelp' }
        ]
    },
    askAboutRobbery: {
        text: "Mrs. Kamilda explained frantically, 'Some monster from behind the Furrow robbed me! It took paintings, porcelain, jewelry, everything!'",
        image: "kamilda_explaining.jpg",
        choices: [
            { text: "Express disbelief about creatures from the Furrow", next: 'expressFurrowDisbelief' },
            { text: "Ask about evidence", next: 'askEvidence' }
        ]
    },
    expressFurrowDisbelief: {
        text: "Dara expressed his disbelief, 'From behind the Furrow? But that's impossible, we're so far from the border.' Mrs. Kamilda looked at him seriously, 'Nothing is impossible, young man.'",
        image: "kamilda_serious.jpg",
        choices: [
            { text: "Mention the book about the West", next: 'mentionBook' },
            { text: "Suggest informing the White Guard", next: 'suggestWhiteGuard' }
        ]
    },
    mentionBook: {
        text: "Dara mentioned his book, 'Road Through the West'. Mrs. Kamilda's eyes widened. 'You have that book? It's very rare and valuable. Be careful with such knowledge.'",
        image: "kamilda_surprised.jpg",
        choices: [
            { text: "Ask more about the book's significance", next: 'askBookSignificance' },
            { text: "Deliver the shoes and leave", next: 'leaveKamilda' }
        ]
    },
    askBookSignificance: {
        text: "Mrs. Kamilda lowered her voice, 'That book contains dangerous knowledge about the lands beyond the Furrow. Some say it's the account of a man who actually crossed and returned.'",
        image: "kamilda_whispering.jpg",
        choices: [
            { text: "Ask if the book might be related to the robbery", next: 'askBookRobberyConnection' },
            { text: "Thank her and leave", next: 'leaveKamilda' }
        ]
    },
    askBookRobberyConnection: {
        text: "Mrs. Kamilda looked thoughtful, 'I... I'm not sure. But be careful, Dara. Knowledge can be as dangerous as it is valuable. Now, I must prepare to leave. I'm moving in with my sister.'",
        image: "kamilda_thoughtful.jpg",
        choices: [
            { text: "Offer to help her pack", next: 'offerPackingHelp' },
            { text: "Wish her well and leave", next: 'leaveKamilda' }
        ]
    },
    offerPackingHelp: {
        text: "Dara offered to help Mrs. Kamilda pack. 'That's very kind of you,' she said, looking relieved. 'Could you help me with this trunk?'",
        image: "kamilda_packing.jpg",
        choices: [
            { text: "Help with the trunk", next: 'helpWithTrunk' },
            { text: "Ask about her plans", next: 'askAboutPlans' }
        ]
    },
    helpWithTrunk: {
        text: "Dara helped Mrs. Kamilda with the trunk. It was heavy and difficult to close. Using his shoemaking skills, he cleverly used some rope to secure it.",
        image: "securing_trunk.jpg",
        choices: [
            { text: "Ask about her destination", next: 'askDestination' },
            { text: "Inquire about the house", next: 'askAboutHouse' }
        ]
    },
    askAboutPlans: {
        text: "Mrs. Kamilda sighed, 'I'm moving in with my sister in the south. I can't stay here after what happened. It's not safe.'",
        image: "kamilda_explaining_plans.jpg",
        choices: [
            { text: "Express concern about her safety", next: 'expressConcern' },
            { text: "Ask about the house", next: 'askAboutHouse' }
        ]
    },
    askDestination: {
        text: "'I'm heading to my sister's place in the south,' Mrs. Kamilda explained. 'It's far from here, hopefully far from... whatever came from beyond the Furrow.'",
        image: "map_of_south.jpg",
        choices: [
            { text: "Wish her a safe journey", next: 'wishSafeJourney' },
            { text: "Ask if she needs more help", next: 'offerMoreHelp' }
        ]
    },
    askAboutHouse: {
        text: "Dara asked about the house. Mrs. Kamilda looked around sadly, 'I'll have to sell it. I don't need it anymore, and I can't bear to stay after what happened.'",
        image: "kamilda_house_interior.jpg",
        choices: [
            { text: "Express sympathy", next: 'expressSympathy' },
            { text: "Ask about the value of the house", next: 'askHouseValue' }
        ]
    },
    expressSympathy: {
        text: "Dara expressed his sympathy for Mrs. Kamilda's situation. She smiled weakly, 'Thank you, dear. You're very kind. Now, I must finish packing.'",
        image: "kamilda_smiling.jpg",
        choices: [
            { text: "Offer to help finish packing", next: 'helpFinishPacking' },
            { text: "Say goodbye and leave", next: 'sayGoodbyeKamilda' }
        ]
    },
    helpFinishPacking: {
        text: "Dara helped Mrs. Kamilda finish her packing. As they worked, she told him more about the strange events of the robbery.",
        image: "packing_scene.jpg",
        choices: [
            { text: "Ask about the robber", next: 'askAboutRobber' },
            { text: "Inquire about missing items", next: 'askAboutMissingItems' }
        ]
    },
    askAboutRobber: {
        text: "'I didn't see much,' Mrs. Kamilda said, lowering her voice. 'But what I saw... it wasn't human. It moved too fast, and its eyes... they glowed in the dark.'",
        image: "kamilda_scared.jpg",
        choices: [
            { text: "Ask if she reported it to the White Guard", next: 'askAboutWhiteGuard' },
            { text: "Express disbelief", next: 'expressDisbelief' }
        ]
    },
    askAboutMissingItems: {
        text: "Mrs. Kamilda listed the missing items: valuable paintings, jewellery, and oddly, some old books. 'They left the silverware but took my grandfather's journal,' she said, puzzled.",
        image: "empty_shelves.jpg",
        choices: [
            { text: "Ask about the journal", next: 'askAboutJournal' },
            { text: "Suggest it might be ordinary thieves", next: 'suggestOrdinaryThieves' }
        ]
    },
    askAboutJournal: {
        text: "'The journal? It was very old. My grandfather was an explorer. He... he claimed to have seen beyond the Furrow. But that's impossible, isn't it?' Mrs. Kamilda looked uncertain.",
        image: "old_journal.jpg",
        choices: [
            { text: "Connect it to 'Road Through the West'", next: 'connectToBook' },
            { text: "Reassure her it's just a coincidence", next: 'reassureCoincidence' }
        ]
    },
    connectToBook: {
        text: "Dara mentioned his book 'Road Through the West' again. Mrs. Kamilda gasped, 'That book... and my grandfather's journal... Dara, be careful. Some knowledge is dangerous.'",
        image: "kamilda_warning.jpg",
        choices: [
            { text: "Promise to be careful", next: 'promiseCareful' },
            { text: "Ask for more information", next: 'askMoreInfo' }
        ]
    },
    promiseCareful: {
        text: "Dara promised to be careful with the book. Mrs. Kamilda nodded approvingly. 'You're a good lad. Now, I think it's time for you to go. Thank you for your help.'",
        image: "kamilda_farewell.jpg",
        choices: [
            { text: "Say goodbye and leave", next: 'leaveKamilda' },
            { text: "Offer to check on the house later", next: 'offerCheckHouse' }
        ]
    },
    leaveKamilda: {
        text: "Dara said goodbye to Mrs. Kamilda and left her house. His mind was buzzing with all he had learned. He needed to get back to the workshop.",
        image: "leaving_kamilda_house.jpg",
        choices: [
            { text: "Return to the workshop", next: 'returnToWorkshop' },
            { text: "Take a moment to think", next: 'momentToThink' }
        ]
    },
    returnToWorkshop: {
        text: "Dara returned to the workshop, his mind full of thoughts about Mrs. Kamilda's robbery and the mysterious lands beyond the Furrow.",
        image: "workshop_evening.jpg",
        choices: [
            { text: "Tell Mr. Mondart about Mrs. Kamilda", next: 'tellMondartKamilda' },
            { text: "Keep the information to yourself", next: 'keepInfoSecret' }
        ]
    },
    tellMondartKamilda: {
        text: "Dara told Mr. Mondart about Mrs. Kamilda's situation. The man frowned, looking concerned. 'Creatures from beyond the Furrow? Here? That's troubling news.'",
        image: "mondart_concerned.jpg",
        choices: [
            { text: "Ask Mr. Mondart's opinion", next: 'askMondartOpinion' },
            { text: "Suggest informing the White Guard", next: 'suggestWhiteGuard' }
        ]
    },
    askMondartOpinion: {
        text: "'What do you think, Mr. Mondart? Could it really be creatures from beyond the Furrow?' Dara asked. Mr. Mondart sighed, 'I hope not, lad. But strange things have been happening lately.'",
        image: "mondart_thinking.jpg",
        choices: [
            { text: "Ask about the strange things", next: 'askStrangeThings' },
            { text: "Offer to keep an eye out", next: 'offerVigilance' }
        ]
    },
    askStrangeThings: {
        text: "Mr. Mondart lowered his voice, 'There have been rumors of odd sightings in the night. Shadows moving too fast, strange noises. But nothing confirmed... until now, perhaps.'",
        image: "mondart_whispering.jpg",
        choices: [
            { text: "Share information from the book", next: 'shareBookInfo' },
            { text: "Ask how to stay safe", next: 'askSafety' }
        ]
    },
    shareBookInfo: {
        text: "Dara shared some information from 'Road Through the West'. Mr. Mondart listened intently, his expression growing more serious. 'That's valuable knowledge, Dara. Guard it well.'",
        image: "mondart_listening.jpg",
        choices: [
            { text: "Ask if he should tell others", next: 'askTellOthers' },
            { text: "Promise to keep it secret", next: 'promiseSecrecy' }
        ]
    },
    askTellOthers: {
        text: "Mr. Mondart thought for a moment, 'No, not yet. We don't want to cause a panic. But stay alert, and come to me if you notice anything unusual.'",
        image: "mondart_cautioning.jpg",
        choices: [
            { text: "Agree to stay alert", next: 'agreeStayAlert' },
            { text: "Express concern about keeping secrets", next: 'expressSecretConcern' }
        ]
    },
    agreeStayAlert: {
        text: "Dara agreed to stay alert. Mr. Mondart nodded approvingly. 'Good lad. Now, it's getting late. You should head home and get some rest.'",
        image: "workshop_dusk.jpg",
        choices: [
            { text: "Say goodnight and leave", next: 'leaveWorkshop' },
            { text: "Offer to stay and help more", next: 'offerStayLate' }
        ]
    },
    leaveWorkshop: {
        text: "Dara said goodnight to Mr. Mondart and left the workshop. The streets of Dormund were quieter now, with only a few people hurrying home.",
        image: "dormund_night.jpg",
        choices: [
            { text: "Head straight home", next: 'goHome' },
            { text: "Take a detour to think", next: 'takeDetour' }
        ]
    },
    goHome: {
        text: "Dara arrived home, his mind full of the day's events. As he prepared for bed, he couldn't help but wonder what the future held for Dormund and for himself.",
        image: "dara_home.jpg",
        choices: [
            { text: "Read the book before sleeping", next: 'readBeforeSleep' },
            { text: "Go straight to sleep", next: 'goToSleep' }
        ]
    },
    readBeforeSleep: {
        text: "Dara opened 'Road Through the West' and began to read. The words seemed to come alive, painting vivid pictures of the dangerous lands beyond the Furrow.",
        image: "reading_at_night.jpg",
        choices: [
            { text: "Continue reading", next: 'continueReading' },
            { text: "Put the book away and sleep", next: 'putBookAwaySleep' }
        ]
    },
    continueReading: {
        text: "As Dara read on, he learned about the Defiled, creatures warped by ancient magic. The book hinted at a way to cross the Furrow safely. His eyes grew heavy, but his mind raced with possibilities.",
        image: "dara_sleepy_reading.jpg",
        choices: [
            { text: "Fall asleep with the book", next: 'fallAsleepReading' },
            { text: "Force yourself to stop reading", next: 'stopReading' }
        ]
    },
    fallAsleepReading: {
        text: "Dara fell asleep with the book on his chest. His dreams were filled with strange creatures, dark forests, and a shimmering barrier that seemed to call out to him.",
        image: "dara_sleeping.jpg",
        choices: [
            { text: "Wake up (End Chapter 1)", next: 'endChapter' }
        ]
    },
    endChapter: {
        text: "As the first light of dawn crept through the window, Dara woke up, the book still clutched to his chest. The events of yesterday and the dreams of the night swirled in his mind. He knew that his life in Dormund would never be the same. What adventures awaited him? Only time would tell...",
        image: "dawn_window.jpg",
        choices: [
            { text: "End Chapter 1", next: 'start' }
        ]
    },



    arriveLateCalmly: {
        text: "Dara continued walking quickly, trying to maintain his composure. He arrived at the workshop, out of breath but not completely disheveled.",
        image: "workshop_entrance.jpg",
        choices: [
            { text: "Apologize to Mr. Mondart", next: 'apologize' },
            { text: "Explain the situation", next: 'explainLate' }
        ]
    },
    runToWorkshop: {
        text: "Dara broke into a run, his heart pounding as he raced through the streets of Dormund. He arrived at the workshop, panting and sweating.",
        image: "workshop_exterior.jpg",
        choices: [
            { text: "Catch your breath", next: 'catchBreath' },
            { text: "Enter the workshop immediately", next: 'arriveAtWorkshop' }
        ]
    },
    askAboutSecurity: {
        text: "Dara asked the White Guard officers about the town's security. They looked at each other before one replied, 'Things have been... tense lately. Keep your eyes open, lad.'",
        image: "guards_talking.jpg",
        choices: [
            { text: "Ask for more details", next: 'askMoreSecurityDetails' },
            { text: "Thank them and head to the workshop", next: 'hurryToWorkshop' }
        ]
    },
    hurryToWorkshop: {
        text: "Dara thanked the officers and hurried towards the workshop, his mind racing with thoughts about the town's security.",
        image: "hurrying_street.jpg",
        choices: [
            { text: "Run the rest of the way", next: 'runToWorkshop' },
            { text: "Walk quickly but cautiously", next: 'arriveLateCalmly' }
        ]
    },
    headToTown: {
        text: "Dara headed towards the town of Dormund, the morning sun warming his back. He could see the town gates in the distance.",
        image: "town_approach.jpg",
        choices: [
            { text: "Walk briskly to make up time", next: 'walkQuicklyToTown' },
            { text: "Run to the workshop", next: 'runToWorkshop' }
        ]
    },
    apologizePoorExcuse: {
        text: "Dara realized his excuse sounded weak. 'I'm sorry, Mr. Mondart. It won't happen again. What can I do to make up for lost time?'",
        image: "apologetic_dara.jpg",
        choices: [
            { text: "Offer to work extra hours", next: 'continueShoeRepairs' },
            { text: "Ask about urgent tasks", next: 'askAboutTasks' }
        ]
    },
    offerShareBook: {
        text: "Dara offered to share the book with Mr. Mondart later. The man's eyes lit up with interest. 'I'd like that, lad. But for now, let's focus on our work.'",
        image: "mondart_interested.jpg",
        choices: [
            { text: "Ask about today's tasks", next: 'askAboutTasks' },
            { text: "Start working immediately", next: 'startGeneralRepairs' }
        ]
    },
    startGeneralRepairs: {
        text: "Dara began working on the pile of shoes needing repair. He picked up a worn pair of boots and examined them carefully.",
        image: "shoe_repair.jpg",
        choices: [
            { text: "Focus on quality repairs", next: 'detailedShoeWork' },
            { text: "Try to work quickly", next: 'quickShoeWork' }
        ]
    },
    quickShoeWork: {
        text: "Dara worked as quickly as he could, trying to make up for lost time. His hands moved swiftly, but he worried about the quality of his work.",
        image: "fast_repair.jpg",
        choices: [
            { text: "Slow down and focus on quality", next: 'focusQuality' },
            { text: "Continue working quickly", next: 'continueQuickWork' }
        ]
    },
    
    askAboutDelivery: {
        text: "Dara asked Mr. Mondart about delivering the repaired shoes. 'Ah yes, we have several pairs ready for delivery. Here's the list of addresses.'",
        image: "delivery_list.jpg",
        choices: [
            { text: "Start with Mrs. Kamilda's delivery", next: 'deliverToKamilda' },
            { text: "Begin with Mr. Kador's delivery", next: 'deliverToKador' }
        ]
    },
    cleanWorkshop: {
        text: "Dara began cleaning the workshop, sweeping the floor and organizing the tools. Mr. Mondart nodded approvingly.",
        image: "clean_workshop.jpg",
        choices: [
            { text: "Ask about tomorrow's tasks", next: 'askAboutTomorrowTasks' },
            { text: "Offer to stay late", next: 'offerStayLate' }
        ]
    },
    deliverToKador: {
        text: "Dara headed to Mr. Kador's house with the repaired shoes. As he approached, he noticed the house seemed oddly quiet.",
        image: "kador_house.jpg",
        choices: [
            { text: "Knock on the door", next: 'knockKadorDoor' },
            { text: "Check around the house", next: 'checkAroundKadorHouse' }
        ]
    },

    // Missing Nodes
    rushToTown: {
        text: "Dara decided to rush to town, his heart pounding as he ran through the streets of Dormund. He passed the large sundial in the main square, which read 1:00 PM.",
        image: "rushing_to_town.jpg",
        choices: [
            { text: "Keep running to the workshop", next: 'arriveAtWorkshop' },
            { text: "Slow down to catch your breath", next: 'catchBreath' }
        ]
    },
    
    calmlyLeave: {
        text: "Dara decided to calmly pack up his things and leave. He knew he was already late, so there was no point in rushing and potentially making mistakes.",
        image: "calmly_packing.jpg",
        choices: [
            { text: "Head directly to the workshop", next: 'arriveLateCalmly' },
            { text: "Take a moment to collect your thoughts", next: 'momentToThink' }
        ]
    },
    
    dodgeCart: {
        text: "Dara quickly dodged the cart filled with hay, narrowly avoiding a collision. The obese coachman looked at him angrily.",
        image: "dodging_cart.jpg",
        choices: [
            { text: "Apologize and keep running", next: 'continueRunning' },
            { text: "Slow down to be more careful", next: 'slowDown' }
        ]
    },
    
    helpWithCart: {
        text: "Dara decided to help push the cart out of the way. The coachman looked surprised but grateful for the assistance.",
        image: "helping_with_cart.jpg",
        choices: [
            { text: "Continue to the workshop after helping", next: 'continueToWorkshop' },
            { text: "Strike up a conversation with the coachman", next: 'talkToCoachman' }
        ]
    },
    
    pushThroughCrowd: {
        text: "Dara pushed his way through the crowded street, muttering apologies as he went. He was getting closer to the workshop.",
        image: "crowded_street.jpg",
        choices: [
            { text: "Keep pushing through", next: 'arriveAtWorkshop' },
            { text: "Look for a less crowded route", next: 'findAlternateRoute' }
        ]
    },
    
    waitForClearing: {
        text: "Dara decided to wait for a clearing in the crowd. It took a few moments, but eventually, a path opened up.",
        image: "street_clearing.jpg",
        choices: [
            { text: "Hurry through the clearing", next: 'hurryToWorkshop' },
            { text: "Walk calmly to conserve energy", next: 'walkCalmly' }
        ]
    },
    
    offerExtraHours: {
        text: "Dara offered to work extra hours to make up for his tardiness. Mr. Mondart nodded approvingly.",
        image: "workshop_interior.jpg",
        choices: [
            { text: "Start working immediately", next: 'startGeneralRepairs' },
            { text: "Ask about urgent tasks", next: 'askAboutTasks' }
        ]
    },
    
    pressForInfo: {
        text: "Dara pressed Mr. Mondart for more information about the Furrow. The man sighed, 'It's not something to be discussed lightly, lad. But if you must know...'",
        image: "mondart_serious.jpg",
        choices: [
            { text: "Listen intently", next: 'learnAboutFurrow' },
            { text: "Apologize and get back to work", next: 'returnToWork' }
        ]
    },
    
    offerHelp: {
        text: "Dara offered to help Mrs. Kamilda with her situation. 'That's very kind of you,' she said, looking relieved.",
        image: "kamilda_house.jpg",
        choices: [
            { text: "Help pack her belongings", next: 'helpPacking' },
            { text: "Offer to inform the White Guard", next: 'informWhiteGuard' }
        ]
    },
    
    askEvidence: {
        text: "Dara asked Mrs. Kamilda if she had any evidence of the intruder. She pointed to a broken window and some strange markings on the floor.",
        image: "evidence_scene.jpg",
        choices: [
            { text: "Examine the markings closely", next: 'examineMarkings' },
            { text: "Suggest informing the authorities", next: 'suggestAuthorities' }
        ]
    },
    
    suggestWhiteGuard: {
        text: "Dara suggested informing the White Guard about the incident. Mrs. Kamilda looked hesitant, 'I'm not sure if they'll believe me...'",
        image: "kamilda_hesitant.jpg",
        choices: [
            { text: "Offer to go with her to report", next: 'goWithKamilda' },
            { text: "Respect her decision and help pack", next: 'helpPacking' }
        ]
    },
    
    expressConcern: {
        text: "Dara expressed his concern about Mrs. Kamilda's safety. She smiled weakly, 'Thank you, dear. It's why I'm leaving as soon as possible.'",
        image: "kamilda_packing.jpg",
        choices: [
            { text: "Offer to help her move", next: 'helpMoving' },
            { text: "Ask about her destination", next: 'askDestination' }
        ]
    },
    
    wishSafeJourney: {
        text: "Dara wished Mrs. Kamilda a safe journey. She thanked him warmly and handed him a small pouch, 'For your kindness.'",
        image: "kamilda_farewell.jpg",
        choices: [
            { text: "Accept the gift gratefully", next: 'acceptGift' },
            { text: "Politely decline", next: 'declineGift' }
        ]
    },
    
    offerMoreHelp: {
        text: "Dara offered to provide more help to Mrs. Kamilda. She looked touched by his kindness.",
        image: "kamilda_grateful.jpg",
        choices: [
            { text: "Help carry her luggage", next: 'carryLuggage' },
            { text: "Offer to check on her house while she's gone", next: 'offerHouseCheck' }
        ]
    },
    
    askHouseValue: {
        text: "Dara curiously asked about the value of Mrs. Kamilda's house. She sighed, 'It's worth quite a bit, but I'd rather be safe than wealthy.'",
        image: "kamilda_house_exterior.jpg",
        choices: [
            { text: "Express understanding", next: 'expressUnderstanding' },
            { text: "Ask if she needs help selling", next: 'offerSellHelp' }
        ]
    },
    
    sayGoodbyeKamilda: {
        text: "Dara said goodbye to Mrs. Kamilda, wishing her well. She smiled warmly, 'Thank you for everything, young man. Take care of yourself.'",
        image: "kamilda_goodbye.jpg",
        choices: [
            { text: "Head back to the workshop", next: 'returnToWorkshop' },
            { text: "Reflect on the strange events", next: 'reflectOnEvents' }
        ]
    },
    askAboutWhiteGuard: {
        text: "Dara asked Mrs. Kamilda if she had informed the White Guard about the incident. She shook her head, 'I'm afraid they might not believe me. It sounds too fantastical.'",
        image: "kamilda_worried.jpg",
        choices: [
            { text: "Offer to go with her to report", next: 'goWithKamilda' },
            { text: "Suggest keeping it quiet for now", next: 'keepQuiet' }
        ]
    },
    
    expressDisbelief: {
        text: "Dara expressed disbelief about creatures from beyond the Furrow reaching Dormund. Mrs. Kamilda looked at him seriously, 'I know what I saw, young man. The world is changing.'",
        image: "kamilda_serious.jpg",
        choices: [
            { text: "Ask for more details", next: 'askMoreDetails' },
            { text: "Apologize for doubting", next: 'apologizeForDoubt' }
        ]
    },
    
    suggestOrdinaryThieves: {
        text: "Dara suggested that it might have been ordinary thieves, not creatures from beyond the Furrow. Mrs. Kamilda shook her head firmly, 'No ordinary thief could have done this.'",
        image: "kamilda_adamant.jpg",
        choices: [
            { text: "Ask why she's so sure", next: 'askWhySure' },
            { text: "Drop the subject", next: 'dropSubject' }
        ]
    },
    
    reassureCoincidence: {
        text: "Dara tried to reassure Mrs. Kamilda that it might be a coincidence, not related to the Furrow. She sighed, 'Perhaps, but I can't take that chance.'",
        image: "kamilda_uncertain.jpg",
        choices: [
            { text: "Offer to help her move", next: 'helpMoving' },
            { text: "Ask about her plans", next: 'askAboutPlans' }
        ]
    },
    
    askMoreInfo: {
        text: "Dara asked Mrs. Kamilda for more information about what happened. She lowered her voice, 'I saw it, just for a moment. It moved like no human could...'",
        image: "kamilda_whispering.jpg",
        choices: [
            { text: "Ask for a description", next: 'askDescription' },
            { text: "Suggest reporting to authorities", next: 'suggestAuthorities' }
        ]
    },
    
    offerCheckHouse: {
        text: "Dara offered to check on Mrs. Kamilda's house while she's gone. She looked relieved, 'That would be very kind of you. Here's a spare key.'",
        image: "kamilda_giving_key.jpg",
        choices: [
            { text: "Accept the responsibility", next: 'acceptResponsibility' },
            { text: "Suggest finding a professional caretaker", next: 'suggestCaretaker' }
        ]
    },
    
    askMoreSecurityDetails: {
        text: "Dara asked the White Guard officers for more details about the town's security. They exchanged glances before one replied, 'Just keep your eyes open and report anything unusual.'",
        image: "white_guard_officers.jpg",
        choices: [
            { text: "Thank them and leave", next: 'leaveOfficers' },
            { text: "Press for more information", next: 'pressOfficers' }
        ]
    },
    
    focusQuality: {
        text: "Dara decided to slow down and focus on the quality of his work. Mr. Mondart nodded approvingly as he passed by.",
        image: "dara_working.jpg",
        choices: [
            { text: "Continue working diligently", next: 'continueShoeRepairs' },
            { text: "Ask for feedback", next: 'askForFeedback' }
        ]
    },
    
    continueQuickWork: {
        text: "Dara continued to work quickly, trying to make up for lost time. He managed to repair several pairs of shoes, but worried about the quality.",
        image: "quick_repairs.jpg",
        choices: [
            { text: "Check your work", next: 'checkWork' },
            { text: "Move on to the next task", next: 'nextTask' }
        ]
    },
    
    askAboutTomorrowTasks: {
        text: "Dara asked Mr. Mondart about tomorrow's tasks. The man stroked his beard thoughtfully, 'We have a big order coming in. Be here early.'",
        image: "mondart_thinking.jpg",
        choices: [
            { text: "Promise to be on time", next: 'promiseOnTime' },
            { text: "Ask for more details about the order", next: 'askOrderDetails' }
        ]
    },
    
    knockKadorDoor: {
        text: "Dara knocked on Mr. Kador's door. There was no answer, but he heard some rustling inside.",
        image: "kador_house_door.jpg",
        choices: [
            { text: "Knock again", next: 'knockAgain' },
            { text: "Leave the shoes by the door", next: 'leaveShoes' }
        ]
    },
    
    checkAroundKadorHouse: {
        text: "Dara decided to check around Mr. Kador's house. He noticed a window slightly ajar at the back.",
        image: "kador_house_back.jpg",
        choices: [
            { text: "Call out to Mr. Kador", next: 'callOutKador' },
            { text: "Return to the front door", next: 'returnFrontDoor' }
        ]
    },
    
    investigateFurther: {
        text: "Dara decided to investigate further. He walked towards the edge of town, where the Furrow was said to be visible on clear days.",
        image: "town_edge.jpg",
        choices: [
            { text: "Look for signs of disturbance", next: 'lookForSigns' },
            { text: "Ask locals if they've seen anything", next: 'askLocals' }
        ]
    },
    
    focusOnWork: {
        text: "Dara decided to focus on his work, pushing the strange events to the back of his mind. He picked up another pair of shoes to repair.",
        image: "dara_focused_work.jpg",
        choices: [
            { text: "Continue working diligently", next: 'continueShoeRepairs' },
            { text: "Take a short break", next: 'takeBreak' }
        ]
    },
    
    contemplateSimulation: {
        text: "Dara took a moment to contemplate the situation. The strange events and Mrs. Kamilda's story swirled in his mind.",
        image: "dara_contemplating.jpg",
        choices: [
            { text: "Share your thoughts with Mr. Mondart", next: 'shareThoyghtsMondart' },
            { text: "Keep your concerns to yourself", next: 'keepConcernsSecret' }
        ]
    },
    
    askAboutRecentEvents: {
        text: "Dara asked Mr. Mondart about recent events in town. The man's expression grew serious, 'There have been... rumors. Strange sightings at night.'",
        image: "mondart_serious.jpg",
        choices: [
            { text: "Ask for more details", next: 'askMoreDetails' },
            { text: "Offer to help keep watch", next: 'offerHelp' }
        ]
    },
    
    returnToWork: {
        text: "Dara decided to return to his work, focusing on the shoes that needed repairing. He picked up a worn pair of boots and began examining them.",
        image: "dara_working.jpg",
        choices: [
            { text: "Work on the boots", next: 'workOnBoots' },
            { text: "Organize your workstation", next: 'organizeStation' }
        ]
    },
    
    thankForAdvice: {
        text: "Dara thanked Mr. Mondart for his advice. The man nodded, 'You're a good lad. Just be careful out there.'",
        image: "mondart_nodding.jpg",
        choices: [
            { text: "Ask about self-defense", next: 'askAboutSelfDefense' },
            { text: "Get back to work", next: 'returnToWork' }
        ]
    },
    
    askAboutSelfDefense: {
        text: "Dara asked Mr. Mondart about self-defense. The man raised an eyebrow, 'Thinking of taking on the Defiled yourself? Well, here's what I know...'",
        image: "mondart_explaining.jpg",
        choices: [
            { text: "Listen attentively", next: 'listenToAdvice' },
            { text: "Ask about weapons", next: 'askAboutWeapons' }
        ]
    },
    
    askAboutSecrecy: {
        text: "Dara asked Mr. Mondart why secrecy was so important. The man leaned in close, 'Knowledge can be dangerous in the wrong hands, lad. Best to keep some things quiet.'",
        image: "mondart_whispering.jpg",
        choices: [
            { text: "Promise to keep quiet", next: 'promiseSecrecy' },
            { text: "Express concern about hiding information", next: 'expressSecretConcern' }
        ]
    },
    
    changeSubject: {
        text: "Dara decided to change the subject, not wanting to dwell on the unsettling topics. 'So, about those purple shoes Mrs. Kamilda ordered...'",
        image: "workshop_interior.jpg",
        choices: [
            { text: "Discuss the shoe design", next: 'discussShoeDesign' },
            { text: "Ask about other customer orders", next: 'askAboutOrders' }
        ]
    },
    
    reluctantlyAgree: {
        text: "Dara reluctantly agreed to keep the information secret. Mr. Mondart nodded approvingly, 'Good lad. Now, let's get back to work.'",
        image: "workshop_interior.jpg",
        choices: [
            { text: "Return to shoe repairs", next: 'returnToShoeRepairs' },
            { text: "Ask about upcoming orders", next: 'askAboutOrders' }
        ]
    },
    
    expressContinuedDoubts: {
        text: "Dara expressed his continued doubts about keeping secrets. Mr. Mondart sighed, 'I understand, lad. But sometimes, it's necessary for everyone's safety.'",
        image: "mondart_explaining.jpg",
        choices: [
            { text: "Agree reluctantly", next: 'agreeReluctantly' },
            { text: "Ask who else knows", next: 'askWhoKnows' }
        ]
    },
    
    workOnRepairs: {
        text: "Dara started working on the unfinished repairs, determined to make up for lost time. He picked up a pair of worn boots and began examining them.",
        image: "dara_repairing.jpg",
        choices: [
            { text: "Focus on quality", next: 'focusQuality' },
            { text: "Work quickly", next: 'workQuickly' }
        ]
    },
    
    organizeWorkshop: {
        text: "Dara began organizing the workshop, putting tools back in their places and arranging the shoes neatly. Mr. Mondart nodded approvingly.",
        image: "organizing_workshop.jpg",
        choices: [
            { text: "Continue organizing", next: 'continueOrganizing' },
            { text: "Ask about tomorrow's tasks", next: 'askAboutTomorrowTasks' }
        ]
    },
    
    continueExploring: {
        text: "Dara decided to continue exploring the outskirts of town. He noticed some strange markings on a tree that he hadn't seen before.",
        image: "strange_markings.jpg",
        choices: [
            { text: "Examine the markings closely", next: 'examineMarkings' },
            { text: "Look for more unusual signs", next: 'lookForSigns' }
        ]
    },
    
    // new
    continueRunning: {
        text: "Dara continued running towards the workshop, his heart pounding.",
        image: "dara_running.jpg",
        choices: [
            { text: "Keep running", next: 'arriveAtWorkshop' },
            { text: "Slow down", next: 'slowDown' }
        ]
    },
    slowDown: {
        text: "Dara slowed his pace, catching his breath as he approached the workshop.",
        image: "dara_slowing.jpg",
        choices: [
            { text: "Enter the workshop", next: 'arriveAtWorkshop' },
            { text: "Take a moment to compose yourself", next: 'catchBreath' }
        ]
    },
    continueToWorkshop: {
        text: "After helping with the cart, Dara continued his journey to the workshop.",
        image: "street_to_workshop.jpg",
        choices: [
            { text: "Walk quickly", next: 'arriveLateCalmly' },
            { text: "Run the rest of the way", next: 'runToWorkshop' }
        ]
    },
    talkToCoachman: {
        text: "Dara struck up a conversation with the coachman, who seemed to know a lot about the town's recent events.",
        image: "talking_to_coachman.jpg",
        choices: [
            { text: "Ask about strange occurrences", next: 'askAboutRecentEvents' },
            { text: "Thank him and continue to the workshop", next: 'continueToWorkshop' }
        ]
    },
    findAlternateRoute: {
        text: "Dara looked for a less crowded route to the workshop.",
        image: "side_street.jpg",
        choices: [
            { text: "Take a narrow alley", next: 'takeShortcut' },
            { text: "Stick to the main road", next: 'stayMainRoad' }
        ]
    },
    walkCalmly: {
        text: "Dara decided to walk calmly to conserve energy, despite being late.",
        image: "dara_walking.jpg",
        choices: [
            { text: "Maintain a steady pace", next: 'arriveLateCalmly' },
            { text: "Pick up the pace", next: 'walkQuicklyToTown' }
        ]
    },

    learnAboutFurrow: {
        text: "Mr. Mondart began explaining about the Furrow, his voice low and serious.",
        image: "mondart_explaining.jpg",
        choices: [
            { text: "Listen intently", next: 'askMoreDetails' },
            { text: "Express concern", next: 'expressConcern' }
        ]
    },
    helpPacking: {
        text: "Dara began helping Mrs. Kamilda pack her belongings.",
        image: "packing_scene.jpg",
        choices: [
            { text: "Ask about her plans", next: 'askAboutPlans' },
            { text: "Offer to carry luggage", next: 'carryLuggage' }
        ]
    },
    informWhiteGuard: {
        text: "Dara suggested informing the White Guard about the incident.",
        image: "white_guard.jpg",
        choices: [
            { text: "Go with Mrs. Kamilda to report", next: 'goWithKamilda' },
            { text: "Offer to report on her behalf", next: 'offerToReport' }
        ]
    },
    examineMarkings: {
        text: "Dara examined the strange markings closely, trying to make sense of them.",
        image: "strange_markings.jpg",
        choices: [
            { text: "Try to decipher the markings", next: 'decipherMarkings' },
            { text: "Look for more clues", next: 'lookForSigns' }
        ]
    },
    suggestAuthorities: {
        text: "Dara suggested informing the town authorities about the incident.",
        image: "town_hall.jpg",
        choices: [
            { text: "Go to the White Guard", next: 'informWhiteGuard' },
            { text: "Speak to the town mayor", next: 'speakToMayor' }
        ]
    },
    goWithKamilda: {
        text: "Dara offered to accompany Mrs. Kamilda to report the incident.",
        image: "walking_with_kamilda.jpg",
        choices: [
            { text: "Head to the White Guard station", next: 'whiteGuardStation' },
            { text: "Ask more about the incident on the way", next: 'askMoreDetails' }
        ]
    },
    helpMoving: {
        text: "Dara offered to help Mrs. Kamilda move her belongings.",
        image: "moving_belongings.jpg",
        choices: [
            { text: "Start carrying boxes", next: 'carryLuggage' },
            { text: "Ask about her destination", next: 'askDestination' }
        ]
    },
    acceptGift: {
        text: "Dara gratefully accepted the small pouch from Mrs. Kamilda.",
        image: "accepting_gift.jpg",
        choices: [
            { text: "Thank her and say goodbye", next: 'leaveKamilda' },
            { text: "Offer to help more", next: 'offerMoreHelp' }
        ]
    },
    declineGift: {
        text: "Dara politely declined the gift, insisting his help was freely given.",
        image: "declining_gift.jpg",
        choices: [
            { text: "Say goodbye to Mrs. Kamilda", next: 'leaveKamilda' },
            { text: "Offer to help more", next: 'offerMoreHelp' }
        ]
    },
    carryLuggage: {
        text: "Dara began carrying Mrs. Kamilda's luggage, helping her prepare to leave.",
        image: "carrying_luggage.jpg",
        choices: [
            { text: "Ask about her plans", next: 'askAboutPlans' },
            { text: "Offer to check on her house while she's gone", next: 'offerHouseCheck' }
        ]
    },
    offerHouseCheck: {
        text: "Dara offered to check on Mrs. Kamilda's house while she's away.",
        image: "house_exterior.jpg",
        choices: [
            { text: "Discuss the details of house-sitting", next: 'discussHouseSitting' },
            { text: "Say goodbye and leave", next: 'leaveKamilda' }
        ]
    },
    expressUnderstanding: {
        text: "Dara expressed his understanding of Mrs. Kamilda's decision to leave.",
        image: "empathetic_dara.jpg",
        choices: [
            { text: "Offer final help before leaving", next: 'offerFinalHelp' },
            { text: "Wish her well and say goodbye", next: 'leaveKamilda' }
        ]
    },
    offerSellHelp: {
        text: "Dara offered to help Mrs. Kamilda sell her house if needed.",
        image: "house_for_sale.jpg",
        choices: [
            { text: "Discuss potential buyers", next: 'discussBuyers' },
            { text: "Say goodbye and leave", next: 'leaveKamilda' }
        ]
    },
    reflectOnEvents: {
        text: "Dara took a moment to reflect on the strange events of the day.",
        image: "dara_thinking.jpg",
        choices: [
            { text: "Head back to the workshop", next: 'returnToWorkshop' },
            { text: "Investigate further", next: 'investigateFurther' }
        ]
    },
    keepQuiet: {
        text: "Dara decided to keep quiet about the incident for now.",
        image: "dara_secretive.jpg",
        choices: [
            { text: "Return to the workshop", next: 'returnToWorkshop' },
            { text: "Investigate on your own", next: 'investigateFurther' }
        ]
    },
    askMoreDetails: {
        text: "Dara asked for more details about the strange occurrences.",
        image: "curious_dara.jpg",
        choices: [
            { text: "Listen intently", next: 'listenToDetails' },
            { text: "Share your own observations", next: 'shareObservations' }
        ]
    },
    apologizeForDoubt: {
        text: "Dara apologized for doubting Mrs. Kamilda's story.",
        image: "apologetic_dara.jpg",
        choices: [
            { text: "Offer to help", next: 'offerHelp' },
            { text: "Ask for more details", next: 'askMoreDetails' }
        ]
    },
    askWhySure: {
        text: "Dara asked Mrs. Kamilda why she was so sure it wasn't ordinary thieves.",
        image: "questioning_dara.jpg",
        choices: [
            { text: "Listen to her explanation", next: 'listenToExplanation' },
            { text: "Suggest alternative explanations", next: 'suggestAlternatives' }
        ]
    },
    dropSubject: {
        text: "Dara decided to drop the subject, not wanting to upset Mrs. Kamilda further.",
        image: "dara_changing_subject.jpg",
        choices: [
            { text: "Offer to help with packing", next: 'helpPacking' },
            { text: "Say goodbye and leave", next: 'leaveKamilda' }
        ]
    },
    askDescription: {
        text: "Dara asked Mrs. Kamilda to describe what she saw in more detail.",
        image: "kamilda_describing.jpg",
        choices: [
            { text: "Listen carefully", next: 'listenToDescription' },
            { text: "Ask about specific details", next: 'askSpecificDetails' }
        ]
    },
    acceptResponsibility: {
        text: "Dara accepted the responsibility of checking on Mrs. Kamilda's house.",
        image: "dara_nodding.jpg",
        choices: [
            { text: "Discuss the details of house-sitting", next: 'discussHouseSitting' },
            { text: "Say goodbye and leave", next: 'leaveKamilda' }
        ]
    },
    suggestCaretaker: {
        text: "Dara suggested finding a professional caretaker for Mrs. Kamilda's house.",
        image: "discussing_caretaker.jpg",
        choices: [
            { text: "Offer to help find someone", next: 'findCaretaker' },
            { text: "Say goodbye and leave", next: 'leaveKamilda' }
        ]
    },
    leaveOfficers: {
        text: "Dara thanked the White Guard officers and prepared to leave.",
        image: "leaving_officers.jpg",
        choices: [
            { text: "Head to the workshop", next: 'hurryToWorkshop' },
            { text: "Reflect on the conversation", next: 'reflectOnEvents' }
        ]
    },
    pressOfficers: {
        text: "Dara pressed the officers for more information about the town's security.",
        image: "questioning_officers.jpg",
        choices: [
            { text: "Listen to their response", next: 'listenToOfficers' },
            { text: "Thank them and leave", next: 'leaveOfficers' }
        ]
    },
    askForFeedback: {
        text: "Dara asked Mr. Mondart for feedback on his work.",
        image: "mondart_inspecting.jpg",
        choices: [
            { text: "Listen to the feedback", next: 'receiveFeedback' },
            { text: "Continue working", next: 'continueShoeRepairs' }
        ]
    },
    checkWork: {
        text: "Dara took a moment to check the quality of his rushed work.",
        image: "inspecting_shoes.jpg",
        choices: [
            { text: "Make necessary adjustments", next: 'adjustRepairs' },
            { text: "Continue with other tasks", next: 'nextTask' }
        ]
    },
    nextTask: {
        text: "Dara moved on to the next task in the workshop.",
        image: "workshop_tasks.jpg",
        choices: [
            { text: "Start a new repair", next: 'startNewRepair' },
            { text: "Organize the workstation", next: 'organizeWorkshop' }
        ]
    },
    promiseOnTime: {
        text: "Dara promised Mr. Mondart he would be on time tomorrow.",
        image: "dara_promising.jpg",
        choices: [
            { text: "Ask about tomorrow's tasks", next: 'askAboutTomorrowTasks' },
            { text: "Finish up today's work", next: 'leaveWorkshop' }
        ]
    },
    askOrderDetails: {
        text: "Dara asked Mr. Mondart for more details about the upcoming big order.",
        image: "mondart_explaining_order.jpg",
        choices: [
            { text: "Listen carefully", next: 'listenOrderDetails' },
            { text: "Offer suggestions", next: 'offerOrderSuggestions' }
        ]
    },
    knockAgain: {
        text: "Dara knocked on Mr. Kador's door again, louder this time.",
        image: "knocking_door.jpg",
        choices: [
            { text: "Wait for a response", next: 'waitForResponse' },
            { text: "Check around the house", next: 'checkAroundKadorHouse' }
        ]
    },
    leaveShoes: {
        text: "Dara decided to leave the shoes by Mr. Kador's door.",
        image: "shoes_at_door.jpg",
        choices: [
            { text: "Leave a note", next: 'leaveNote' },
            { text: "Return to the workshop", next: 'returnToWorkshop' }
        ]
    },
    callOutKador: {
        text: "Dara called out to Mr. Kador, hoping to get a response.",
        image: "calling_out.jpg",
        choices: [
            { text: "Wait for a response", next: 'waitForResponse' },
            { text: "Return to the front door", next: 'returnFrontDoor' }
        ]
    },
    returnFrontDoor: {
        text: "Dara returned to the front door of Mr. Kador's house.",
        image: "front_door.jpg",
        choices: [
            { text: "Knock again", next: 'knockAgain' },
            { text: "Leave the shoes and go", next: 'leaveShoes' }
        ]
    },
    lookForSigns: {
        text: "Dara began looking for signs of disturbance near the edge of town.",
        image: "town_edge.jpg",
        choices: [
            { text: "Investigate strange markings", next: 'examineMarkings' },
            { text: "Ask locals if they've seen anything", next: 'askLocals' }
        ]
    },
    askLocals: {
        text: "Dara decided to ask some locals if they had seen anything unusual.",
        image: "talking_to_locals.jpg",
        choices: [
            { text: "Listen to their stories", next: 'listenToLocals' },
            { text: "Share what you know", next: 'shareInformation' }
        ]
    },
    takeBreak: {
        text: "Dara decided to take a short break from his work.",
        image: "dara_resting.jpg",
        choices: [
            { text: "Reflect on recent events", next: 'reflectOnEvents' },
            { text: "Get back to work", next: 'returnToWork' }
        ]
    },
    shareThoyghtsMondart: {
        text: "Dara decided to share his thoughts about recent events with Mr. Mondart.",
        image: "talking_to_mondart.jpg",
        choices: [
            { text: "Discuss the strange occurrences", next: 'discussOccurrences' },
            { text: "Ask for advice", next: 'askMondartAdvice' }
        ]
    },
    keepConcernsSecret: {
        text: "Dara decided to keep his concerns to himself for now.",
        image: "thoughtful_dara.jpg",
        choices: [
            { text: "Focus on work", next: 'focusOnWork' },
            { text: "Investigate further later", next: 'planInvestigation' }
        ]
    },
    workOnBoots: {
        text: "Dara began working on repairing the worn pair of boots.",
        image: "repairing_boots.jpg",
        choices: [
            { text: "Focus on quality", next: 'focusQuality' },
            { text: "Work quickly", next: 'workQuickly' }
        ]
    },
    organizeStation: {
        text: "Dara started organizing his workstation, putting tools in order.",
        image: "organizing_station.jpg",
        choices: [
            { text: "Continue organizing", next: 'continueOrganizing' },
            { text: "Get back to repairs", next: 'returnToShoeRepairs' }
        ]
    },
    listenToAdvice: {
        text: "Dara listened attentively as Mr. Mondart shared his knowledge about self-defense.",
        image: "mondart_advising.jpg",
        choices: [
            { text: "Ask for more details", next: 'askMoreDetails' },
            { text: "Thank him and get back to work", next: 'returnToWork' }
        ]
    },
    askAboutWeapons: {
        text: "Dara asked Mr. Mondart about weapons that might be effective against the Defiled.",
        image: "discussing_weapons.jpg",
        choices: [
            { text: "Listen to his response", next: 'listenWeaponInfo' },
            { text: "Express concern about violence", next: 'expressConcern' }
        ]
    },
    
    // new nodes
    discussShoeDesign: {
        text: "Dara discussed the latest shoe designs with Mr. Mondart, focusing on the most popular styles and customer preferences.",
        image: "shoe_design.jpg",
        choices: [
            { text: "Ask about orders", next: 'askAboutOrders' },
            { text: "Return to shoe repairs", next: 'returnToShoeRepairs' }
        ]
    },
    askAboutOrders: {
        text: "Dara asked Mr. Mondart about the new orders and their details.",
        image: "orders.jpg",
        choices: [
            { text: "Agree reluctantly", next: 'agreeReluctantly' },
            { text: "Ask who knows", next: 'askWhoKnows' }
        ]
    },
    returnToShoeRepairs: {
        text: "Dara decided to focus on the shoe repairs that needed urgent attention.",
        image: "shoe_repairs.jpg",
        choices: [
            { text: "Work quickly", next: 'workQuickly' },
            { text: "Continue organizing", next: 'continueOrganizing' }
        ]
    },
    agreeReluctantly: {
        text: "Dara agreed to the new orders reluctantly, feeling the pressure of additional work.",
        image: "reluctant_agreement.jpg",
        choices: [
            { text: "Work quickly", next: 'workQuickly' },
            { text: "Discuss further details", next: 'askAboutOrders' }
        ]
    },
    askWhoKnows: {
        text: "Dara asked Mr. Mondart who else was aware of the new orders and their specifics.",
        image: "who_knows.jpg",
        choices: [
            { text: "Listen to details", next: 'listenToDetails' },
            { text: "Return to repairs", next: 'returnToShoeRepairs' }
        ]
    },
    workQuickly: {
        text: "Dara worked quickly to complete the repairs, hoping to catch up on his tasks.",
        image: "work_quickly.jpg",
        choices: [
            { text: "Finish work", next: 'leaveWorkshop' },
            { text: "Listen to order details", next: 'listenOrderDetails' }
        ]
    },
    continueOrganizing: {
        text: "Dara decided to continue organizing the workshop, preparing for the next day’s work.",
        image: "organizing.jpg",
        choices: [
            { text: "Finish work", next: 'leaveWorkshop' },
            { text: "Ask Mondart for advice", next: 'askMondartAdvice' }
        ]
    },
    wakeAndRead: {
        text: "Dara woke up early and decided to read a bit from his journal.",
        image: "wake_read.jpg",
        choices: [
            { text: "Continue writing", next: 'continueWriting' },
            { text: "Hide journal and sleep", next: 'hideJournalSleep' }
        ]
    },
    wakeExcited: {
        text: "Dara woke up feeling excited about the new day and what it might bring.",
        image: "wake_excited.jpg",
        choices: [
            { text: "Make plans", next: 'makePlans' },
            { text: "Continue dreaming", next: 'continueDreaming' }
        ]
    },
    continueDreaming: {
        text: "Dara continued to dream about his future, thinking about his goals and aspirations.",
        image: "continue_dreaming.jpg",
        choices: [
            { text: "Make plans", next: 'makePlans' },
            { text: "Wake up and start the day", next: 'wakeAndRead' }
        ]
    },
    peacefulNight: {
        text: "Dara had a peaceful night with no disturbances, feeling well-rested in the morning.",
        image: "peaceful_night.jpg",
        choices: [
            { text: "Wake up and start the day", next: 'wakeAndRead' },
            { text: "Enjoy the tranquility", next: 'enjoyTranquility' }
        ]
    },
    strangeDreams: {
        text: "Dara experienced strange dreams that left him feeling uneasy when he woke up.",
        image: "strange_dreams.jpg",
        choices: [
            { text: "Make plans", next: 'makePlans' },
            { text: "Discuss with someone", next: 'discussOccurrences' }
        ]
    },
    makePlans: {
        text: "Dara made plans for the day, focusing on his tasks and goals.",
        image: "make_plans.jpg",
        choices: [
            { text: "Continue writing", next: 'continueWriting' },
            { text: "Work on repairs", next: 'returnToShoeRepairs' }
        ]
    },
    continueWriting: {
        text: "Dara continued writing in his journal, reflecting on his recent experiences.",
        image: "continue_writing.jpg",
        choices: [
            { text: "Hide journal and sleep", next: 'hideJournalSleep' },
            { text: "Offer to report", next: 'offerToReport' }
        ]
    },
    hideJournalSleep: {
        text: "Dara hid his journal under the pillow and went back to sleep.",
        image: "hide_journal_sleep.jpg",
        choices: [
            { text: "Wake up refreshed", next: 'wakeAndRead' },
            { text: "Have strange dreams", next: 'strangeDreams' }
        ]
    },
    offerToReport: {
        text: "Dara offered to report any unusual occurrences to the local authorities.",
        image: "offer_report.jpg",
        choices: [
            { text: "Decipher markings", next: 'decipherMarkings' },
            { text: "Speak to the mayor", next: 'speakToMayor' }
        ]
    },
    decipherMarkings: {
        text: "Dara worked on deciphering the mysterious markings he found.",
        image: "decipher_markings.jpg",
        choices: [
            { text: "Seek further assistance", next: 'speakToMayor' },
            { text: "Continue alone", next: 'continueInvestigation' }
        ]
    },
    speakToMayor: {
        text: "Dara spoke to the mayor about the unusual markings and their possible implications.",
        image: "speak_mayor.jpg",
        choices: [
            { text: "Visit the White Guard Station", next: 'whiteGuardStation' },
            { text: "Discuss house-sitting", next: 'discussHouseSitting' }
        ]
    },
    whiteGuardStation: {
        text: "Dara visited the White Guard Station to report the findings and get their perspective.",
        image: "white_guard_station.jpg",
        choices: [
            { text: "Discuss buyers", next: 'discussBuyers' },
            { text: "Listen to details", next: 'listenToDetails' }
        ]
    },
    discussHouseSitting: {
        text: "Dara discussed house-sitting options with the local authorities.",
        image: "house_sitting.jpg",
        choices: [
            { text: "Offer final help", next: 'offerFinalHelp' },
            { text: "Share observations", next: 'shareObservations' }
        ]
    },
    offerFinalHelp: {
        text: "Dara offered his final assistance in solving the issue, hoping to provide closure.",
        image: "final_help.jpg",
        choices: [
            { text: "Discuss buyers", next: 'discussBuyers' },
            { text: "Listen to explanation", next: 'listenToExplanation' }
        ]
    },
    discussBuyers: {
        text: "Dara discussed potential buyers and their interests with Mr. Mondart.",
        image: "discuss_buyers.jpg",
        choices: [
            { text: "Listen to details", next: 'listenToDetails' },
            { text: "Suggest alternatives", next: 'suggestAlternatives' }
        ]
    },
    listenToDetails: {
        text: "Dara listened carefully to the details provided about the buyers and their requirements.",
        image: "listen_details.jpg",
        choices: [
            { text: "Share observations", next: 'shareObservations' },
            { text: "Ask for specific details", next: 'askSpecificDetails' }
        ]
    },
    shareObservations: {
        text: "Dara shared his observations about the buyers and their preferences.",
        image: "share_observations.jpg",
        choices: [
            { text: "Listen to explanation", next: 'listenToExplanation' },
            { text: "Ask for further advice", next: 'askMondartAdvice' }
        ]
    },
    listenToExplanation: {
        text: "Dara listened to an explanation about the buyers' needs and expectations.",
        image: "listen_explanation.jpg",
        choices: [
            { text: "Suggest alternatives", next: 'suggestAlternatives' },
            { text: "Receive feedback", next: 'receiveFeedback' }
        ]
    },
    suggestAlternatives: {
        text: "Dara suggested alternative approaches to meet the buyers' needs.",
        image: "suggest_alternatives.jpg",
        choices: [
            { text: "Receive feedback", next: 'receiveFeedback' },
            { text: "Discuss house-sitting", next: 'discussHouseSitting' }
        ]
    },
    listenToDescription: {
        text: "Dara listened to a description of the buyers' expectations and preferences.",
        image: "listen_description.jpg",
        choices: [
            { text: "Ask for specific details", next: 'askSpecificDetails' },
            { text: "Find caretaker", next: 'findCaretaker' }
        ]
    },
    askSpecificDetails: {
        text: "Dara asked for specific details about the buyers and their requirements.",
        image: "ask_specific_details.jpg",
        choices: [
            { text: "Find caretaker", next: 'findCaretaker' },
            { text: "Discuss occurrences", next: 'discussOccurrences' }
        ]
    },
    findCaretaker: {
        text: "Dara looked for a suitable caretaker to manage the house during his absence.",
        image: "find_caretaker.jpg",
        choices: [
            { text: "Listen to officers", next: 'listenToOfficers' },
            { text: "Receive feedback", next: 'receiveFeedback' }
        ]
    },
    listenToOfficers: {
        text: "Dara listened to the officers’ feedback on the situation and their suggestions.",
        image: "listen_officers.jpg",
        choices: [
            { text: "Adjust repairs", next: 'adjustRepairs' },
            { text: "Start new repair", next: 'startNewRepair' }
        ]
    },
    receiveFeedback: {
        text: "Dara received feedback on his recent work and was advised on improvements.",
        image: "receive_feedback.jpg",
        choices: [
            { text: "Adjust repairs", next: 'adjustRepairs' },
            { text: "Start new repair", next: 'startNewRepair' }
        ]
    },
    adjustRepairs: {
        text: "Dara adjusted the repairs based on the feedback he received.",
        image: "adjust_repairs.jpg",
        choices: [
            { text: "Finish work", next: 'leaveWorkshop' },
            { text: "Start new repair", next: 'startNewRepair' }
        ]
    },
    startNewRepair: {
        text: "Dara began working on a new repair project, focusing on the details.",
        image: "new_repair.jpg",
        choices: [
            { text: "Finish work", next: 'leaveWorkshop' },
            { text: "Listen to order details", next: 'listenOrderDetails' }
        ]
    },
    finishWork: {
        text: "Dara finished his work and prepared to move on to his next tasks.",
        image: "finish_work.jpg",
        choices: [
            { text: "Listen to locals", next: 'listenToLocals' },
            { text: "Share information", next: 'shareInformation' }
        ]
    },
    listenOrderDetails: {
        text: "Dara listened to the details of new orders and prepared to fulfill them.",
        image: "order_details.jpg",
        choices: [
            { text: "Offer order suggestions", next: 'offerOrderSuggestions' },
            { text: "Wait for response", next: 'waitForResponse' }
        ]
    },
    offerOrderSuggestions: {
        text: "Dara offered suggestions on how to handle the new orders more efficiently.",
        image: "order_suggestions.jpg",
        choices: [
            { text: "Wait for response", next: 'waitForResponse' },
            { text: "Leave a note", next: 'leaveNote' }
        ]
    },
    waitForResponse: {
        text: "Dara waited for a response to his suggestions and continued with his tasks.",
        image: "wait_response.jpg",
        choices: [
            { text: "Leave a note", next: 'leaveNote' },
            { text: "Listen to locals", next: 'listenToLocals' }
        ]
    },
    leaveNote: {
        text: "Dara left a note detailing his suggestions and thoughts on the new orders.",
        image: "leave_note.jpg",
        choices: [
            { text: "Listen to locals", next: 'listenToLocals' },
            { text: "Share information", next: 'shareInformation' }
        ]
    },
    listenToLocals: {
        text: "Dara listened to the locals' concerns and opinions about recent events.",
        image: "listen_locals.jpg",
        choices: [
            { text: "Share information", next: 'shareInformation' },
            { text: "Discuss occurrences", next: 'discussOccurrences' }
        ]
    },
    shareInformation: {
        text: "Dara shared the information he gathered with others, hoping to clarify misunderstandings.",
        image: "share_information.jpg",
        choices: [
            { text: "Discuss occurrences", next: 'discussOccurrences' },
            { text: "Ask Mondart for advice", next: 'askMondartAdvice' }
        ]
    },
    discussOccurrences: {
        text: "Dara discussed recent occurrences and their implications with Mr. Mondart.",
        image: "discuss_occurrences.jpg",
        choices: [
            { text: "Plan investigation", next: 'planInvestigation' },
            { text: "Ask Mondart for advice", next: 'askMondartAdvice' }
        ]
    },
    askMondartAdvice: {
        text: "Dara asked Mr. Mondart for his advice on the next steps in the investigation.",
        image: "ask_advice.jpg",
        choices: [
            { text: "Plan investigation", next: 'planInvestigation' },
            { text: "Listen to weapon info", next: 'listenWeaponInfo' }
        ]
    },
    planInvestigation: {
        text: "Dara planned out the investigation, focusing on the most pressing issues.",
        image: "plan_investigation.jpg",
        choices: [
            { text: "Listen to weapon info", next: 'listenWeaponInfo' },
            { text: "Discuss buyers", next: 'discussBuyers' }
        ]
    },
    listenWeaponInfo: {
        text: "Dara listened to information about the weapons related to recent incidents.",
        image: "weapon_info.jpg",
        choices: [
            { text: "Ask specific details", next: 'askSpecificDetails' },
            { text: "Find caretaker", next: 'findCaretaker' }
        ]
    },
    enjoyTranquility: {
        text: "Dara took some time to enjoy the tranquility of the early morning, reflecting on his plans and enjoying the calm.",
        image: "enjoy_tranquility.jpg",
        choices: [
            { text: "Continue investigation", next: 'continueInvestigation' },
            { text: "Make plans for the day", next: 'makePlans' }
        ]
    },
    continueInvestigation: {
        text: "Dara decided to continue with his investigation, feeling refreshed and ready to tackle the next steps.",
        image: "continue_investigation.jpg",
        choices: [
            { text: "Listen to weapon info", next: 'listenWeaponInfo' },
            { text: "Discuss occurrences", next: 'discussOccurrences' }
        ]
    },
    
    
    // Missing Nodes Ends

    momentToThink: {
        text: "Dara found a quiet spot and took a moment to process everything he had learned. The information about the Furrow and the strange robbery swirled in his mind.",
        image: "dara_thinking.jpg",
        choices: [
            { text: "Return to the workshop", next: 'returnToWorkshop' },
            { text: "Investigate further", next: 'investigateFurther' }
        ]
    },
    keepInfoSecret: {
        text: "Dara decided to keep the information about Mrs. Kamilda's robbery to himself for now. He wasn't sure who he could trust with such strange news.",
        image: "dara_secretive.jpg",
        choices: [
            { text: "Focus on work", next: 'focusOnWork' },
            { text: "Contemplate the situation", next: 'contemplateSimulation' }
        ]
    },
    offerVigilance: {
        text: "Dara offered to keep an eye out for anything unusual. Mr. Mondart smiled, 'That's good of you, lad. We all need to look out for each other these days.'",
        image: "mondart_approving.jpg",
        choices: [
            { text: "Ask for more details about recent events", next: 'askAboutRecentEvents' },
            { text: "Get back to work", next: 'returnToWork' }
        ]
    },
    askSafety: {
        text: "Dara asked Mr. Mondart how to stay safe with all the strange happenings. 'Keep your wits about you, lad. And don't wander after dark if you can help it.'",
        image: "mondart_advising.jpg",
        choices: [
            { text: "Thank him for the advice", next: 'thankForAdvice' },
            { text: "Ask about self-defense", next: 'askAboutSelfDefense' }
        ]
    },
    promiseSecrecy: {
        text: "Dara promised to keep the information about the book and recent events secret. Mr. Mondart nodded gravely, 'Good lad. Some knowledge is best kept close to the chest.'",
        image: "secret_promise.jpg",
        choices: [
            { text: "Ask why secrecy is important", next: 'askAboutSecrecy' },
            { text: "Change the subject", next: 'changeSubject' }
        ]
    },
    expressSecretConcern: {
        text: "Dara expressed his concern about keeping secrets. 'I understand, lad,' Mr. Mondart said, 'but sometimes it's necessary to protect ourselves and others.'",
        image: "mondart_explaining.jpg",
        choices: [
            { text: "Reluctantly agree", next: 'reluctantlyAgree' },
            { text: "Express continued doubts", next: 'expressContinuedDoubts' }
        ]
    },
    offerStayLate: {
        text: "Dara offered to stay late and help more at the workshop. Mr. Mondart looked surprised but pleased. 'That's very responsible of you, Dara.'",
        image: "workshop_evening.jpg",
        choices: [
            { text: "Work on unfinished repairs", next: 'workOnRepairs' },
            { text: "Help organize the workshop", next: 'organizeWorkshop' }
        ]
    },
    
    takeDetour: {
        text: "Dara decided to take a detour on his way home, his mind buzzing with all he had learned. He found himself walking towards the edge of town.",
        image: "town_outskirts.jpg",
        choices: [
            { text: "Continue exploring", next: 'continueExploring' },
            { text: "Head home", next: 'goHome' }
        ]
    },
    goToSleep: {
        text: "Exhausted from the day's events, Dara decided to go straight to sleep. He closed his eyes, but his mind was still racing with thoughts of the Furrow and Mrs. Kamilda's story.",
        image: "dara_sleeping.jpg",
        choices: [
            { text: "Have a restless night", next: 'restlessNight' },
            { text: "Dream of adventures", next: 'dreamOfAdventures' }
        ]
    },
    putBookAwaySleep: {
        text: "Dara put the book away, knowing he needed rest. As he lay in bed, he couldn't help but wonder about the secrets it contained.",
        image: "book_on_nightstand.jpg",
        choices: [
            { text: "Try to sleep", next: 'tryToSleep' },
            { text: "Think about the day's events", next: 'reflectOnDay' }
        ]
    },
    stopReading: {
        text: "With great effort, Dara forced himself to stop reading. He closed the book, his mind swirling with the information he had just learned.",
        image: "closed_book.jpg",
        choices: [
            { text: "Try to sleep", next: 'tryToSleep' },
            { text: "Write down your thoughts", next: 'writeThoughts' }
        ]
    },
    restlessNight: {
        text: "Dara had a restless night, tossing and turning as images of the Furrow and strange creatures haunted his dreams.",
        image: "dara_restless.jpg",
        choices: [
            { text: "Wake up and read", next: 'wakeAndRead' },
            { text: "Try to go back to sleep", next: 'tryToSleep' }
        ]
    },
    dreamOfAdventures: {
        text: "Dara dreamt of grand adventures beyond the Furrow, battling strange creatures and uncovering ancient secrets.",
        image: "dara_dreaming.jpg",
        choices: [
            { text: "End the game", next: 'endGame' },
            { text: "Continue dreaming", next: 'continueDreaming' }
        ]
    },
    tryToSleep: {
        text: "Dara tried to force himself to sleep, closing his eyes tightly and taking deep breaths. Slowly, he began to drift off.",
        image: "dara_sleeping.jpg",
        choices: [
            { text: "Have a peaceful night", next: 'peacefulNight' },
            { text: "Have strange dreams", next: 'strangeDreams' }
        ]
    },
    reflectOnDay: {
        text: "As Dara lay in bed, he reflected on the events of the day. Mrs. Kamilda's story, the book about the West, and the strange atmosphere in town all swirled in his mind.",
        image: "dara_reflecting.jpg",
        choices: [
            { text: "Try to sleep", next: 'tryToSleep' },
            { text: "End the game", next: 'endGame' }
        ]
    },
    writeThoughts: {
        text: "Dara decided to write down his thoughts about the day's events. He pulled out a small journal and began to record everything he had learned and experienced.",
        image: "dara_writing.jpg",
        choices: [
            { text: "Continue writing", next: 'continueWriting' },
            { text: "Hide the journal and sleep", next: 'hideJournalSleep' }
        ]
    },
    peacefulNight: {
        text: "Dara had a peaceful night, his dreams filled with calm and serenity. He woke up feeling refreshed and ready to face the new day.",
        image: "dara_peaceful.jpg",
        choices: [
            { text: "Start a new investigation", next: 'continueInvestigation' },
            { text: "End the game", next: 'endGame' }
        ]
    },
    strangeDreams: {
        text: "Dara experienced strange dreams, with visions of mysterious places and cryptic messages. He woke up feeling unsettled but curious.",
        image: "dara_strange_dreams.jpg",
        choices: [
            { text: "Wake up and investigate", next: 'continueInvestigation' },
            { text: "End the game", next: 'endGame' }
        ]
    },
    endGame: {
        text: "Thank you for playing! Dara's journey ends here, but the story continues in the minds of those who dare to imagine.",
        image: "end_game.jpg",
        choices: [
            { text: "Restart the game", next: 'start' }
        ]
    }
};

function findDisconnectedNodes(story) {
    const nodeKeys = Object.keys(story); // All node keys
    const referencedNodes = new Set();

    // Loop through all nodes and collect referenced nodes
    nodeKeys.forEach(nodeKey => {
        const node = story[nodeKey];
        if (node.choices) {
            node.choices.forEach(choice => {
                if (choice.next) {
                    referencedNodes.add(choice.next);
                }
            });
        }
    });

    // Find nodes that are referenced but not defined in story
    const disconnectedNodes = [];
    referencedNodes.forEach(referencedNode => {
        if (!nodeKeys.includes(referencedNode)) {
            disconnectedNodes.push(referencedNode);
        }
    });

    return disconnectedNodes;
}

// Usage
const disconnectedNodes = findDisconnectedNodes(story);
if (disconnectedNodes.length > 0) {
    console.log('Disconnected nodes:', disconnectedNodes);
} else {
    console.log('All nodes are properly connected.');
}


function startGame() {
    story.currentNode = 'start'; // Initialize the starting node
    displayStoryNode(story[story.currentNode]);
}

function displayStoryNode(node) {
    storyContent.innerText = node.text;
    imageContainer.style.backgroundImage = `url(${node.image})`;

    while (choicesContainer.firstChild) {
        choicesContainer.removeChild(choicesContainer.firstChild);
    }

    // Create the Back button if there was a previous node
    if (previousNode) {
        const backButton = document.createElement('button');
        backButton.innerText = 'Back';
        backButton.addEventListener('click', () => goBack());
        choicesContainer.appendChild(backButton);
    }

    // Add choices from the current node
    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;

        // Check if the choice leads to a valid node or is a warning
        if (choice.next && story[choice.next]) {
            button.addEventListener('click', () => selectChoice(choice));
        } else {
            button.addEventListener('click', () => showWarning());
        }

        choicesContainer.appendChild(button);
    });

    if (node.onEnter) {
        node.onEnter();
    }
}

function selectChoice(choice) {
    previousNode = story[story.currentNode]; // Save the current node
    previousNodeKey = story.currentNode; // Save the current node key
    const nextNode = story[choice.next];
    story.currentNode = choice.next; // Update current node
    displayStoryNode(nextNode);
}

function goBack() {
    if (previousNode) {
        story.currentNode = previousNodeKey; // Restore the previous node key
        displayStoryNode(previousNode);
        previousNode = null; // Clear the previous node
        previousNodeKey = null; // Clear the previous node key
    }
}

function showWarning() {
    alert('This button does not lead to a valid next node.');
}

function checkLandscape() {
    if (window.innerHeight > window.innerWidth) {
        document.body.innerHTML = '<h1>Please rotate your device to landscape mode.</h1>';
        document.body.style.textAlign = 'center';
    }
}

window.addEventListener('resize', checkLandscape);
checkLandscape(); // Initial check on load

story.currentNode = 'start'; // Set initial node

startGame();