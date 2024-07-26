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
            { text: "Suggest informing the White Guard", next: 'suggestInformGuard' }
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
    }
};

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