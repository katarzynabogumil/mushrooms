document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#start').addEventListener('click', () => take_quiz());
});

function take_quiz () {
    let score = {
        shiitake: 0,
        morel: 0,
        button: 0,
        chanterelle: 0,
        fly: 0,
        oyster: 0,
        porcini: 0
    }
    display_question(0, score);
}
        
function display_question (n, score) {
    let container = document.querySelector('#take-quiz');

    if (n === Object.keys(QUESTIONS).length) {
        let winner = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
        let outcome = OUTCOMES[winner];

        container.innerHTML = `            
            <div class='card middle'>
                <div class="card-body">
                Congratulations! You finished the quiz.
                You are the ${outcome.title}!
                </div>
            </div>
        `;
        
        const image = document.createElement('img');
        image.classList.add('img-fluid', 'mx-auto', 'outcome-img');
        image.src = outcome.img;
        container.append(image);
        
        const desc = document.createElement('div');
        desc.classList.add('card', 'light');
        desc.innerHTML = `
            <div class="card-body">
                ${outcome.description}
            </div>
        `;
        container.append(desc);

    } else {
        let question = Object.values(QUESTIONS)[n];
        container.innerHTML = `
            <div class='card middle'>
                <div class="card-body">
                    Question ${n+1}:<br>
                    ${question.question}
                </div>
            </div>
        `;
        
        const answers_div = document.createElement('div');
        
        let answers = [question.answers[0].text, question.answers[1].text, question.answers[2].text, question.answers[3].text, question.answers[4].text];
        let buttonStyle = `<div class="answer col-sm btn btn-light light m-1">`;
        answers_div.innerHTML = `
            <div class="container m-2 mx-auto">
                <div class="row">
                    ${buttonStyle} ${answers[0]} </div>
                </div><div class="row">
                    ${buttonStyle} ${answers[1]} </div>
                </div><div class="row">
                    ${buttonStyle} ${answers[2]} </div>
                </div><div class="row">
                    ${buttonStyle} ${answers[3]} </div>
                </div><div class="row">
                    ${buttonStyle} ${answers[4]} </div>
                </div>
            </div>
        `;
        container.append(answers_div);
        
        let buttons = document.getElementsByClassName('answer');
        let check_multiple = once(check_answer);
        Array.prototype.forEach.call(buttons, el => {
            el.addEventListener('click', e => {
                score = check_multiple(e.target, n, buttons, score);
                setTimeout(() => display_question(n+1, score), 1500);
            });
        });
    }
}


function once (func) {
    let called = false;
    let result;
    return function () {
        if (!called) {
            called = true;
            result = func.apply(this, arguments);
        }
        return result;
    };
}


function check_answer (clicked, n, buttons, score) {
    let answers = QUESTIONS[n].answers;
    answers.forEach(answer => {
        if (clicked.innerText === answer.text) {
            answer.points.forEach(mushroom => {
                score[mushroom]++;
            });
        }
    });
    clicked.classList.remove('light');
    clicked.classList.add('dark');
    return score;
}


const QUESTIONS = {
    0: {
        question: `Which of these environments do you feel most at home in?`,
        answers: [
            {text: 'Outdoors in nature',
            points: ['shiitake']},
            {text: 'In a cozy café with friends',
            points: ['morel']},
            {text: 'In a bustling city',
            points: ['button', 'chanterelle']},
            {text: 'At a concert or festival',
            points: ['fly']},
            {text: 'In your own private space',
            points: ['oyster', 'porcini']},
        ]
    },
    1: {
        question: `When faced with a problem, what's your go-to solution?`,
        answers: [
            {text: 'Take action and tackle it head-on',
            points: ['porcini', 'chanterelle']},
            {text: 'Talk it out with a friend or loved one',
            points: ['morel']},
            {text: 'Analyze it from every angle before making a decision',
            points: ['button', 'shiitake']},
            {text: 'Ignore it and hope it goes away on its own',
            points: ['fly']},
            {text: 'Seek advice from a trusted mentor or expert',
            points: ['oyster']},
        ]
    },
    2: {
        question: `Which of these traits best describes you?`,
        answers: [
            {text: 'Outgoing',
            points: ['fly']},
            {text: 'Compassionate',
            points: ['oyster']},
            {text: 'Reliable',
            points: ['button', 'porcini']},
            {text: 'Adventurous',
            points: ['chanterelle', 'morel']},
            {text: 'Wise',
            points: ['shiitake']},
        ]

    },
    3: {
        question: `What's your favorite type of cuisine?`,
        answers: [
            {text: 'Italian',
            points: ['porcini']},
            {text: 'Asian',
            points: ['shiitake']},
            {text: 'Comfort food',
            points: ['chanterelle']},
            {text: 'Fine dining',
            points: ['oyster', 'morel']},
            {text: 'Fast food',
            points: ['fly', 'button']},
        ]
    },
    4: {
        question: `What is your favorite type of music?`,
        answers: [
            {text: ' Pop or upbeat tunes',
            points: ['fly']},
            {text: 'Indie or alternative',
            points: ['oyster', 'button']},
            {text: 'Classical or jazz',
            points: ['porcini', 'shiitake']},
            {text: 'Heavy metal or hard rock',
            points: ['morel']},
            {text: 'Folk',
            points: ['chanterelle']},
        ]
    },
    5: {
        question: `What's your communication style in a group setting?`,
        answers: [
            {text: `I'm the leader and like to take charge`,
            points: ['button', 'chanterelle']},
            {text: `I'm a good listener and supportive of others`,
            points: ['oyster', 'shiitake']},
            {text: `I'm straightforward and honest, sometimes to a fault`,
            points: ['porcini']},
            {text: `I'm outgoing and love to entertain`,
            points: ['fly']},
            {text: `I'm introverted and prefer to observe`,
            points: ['morel']},
        ]
    },
};

const OUTCOMES = {
    fly: {
        title: 'Fly Agaric',
        img: './static/fly.jpg',
        description: `
        You are outgoing and love being the center of attention. 
        You have a unique and quirky personality that draws people to you, 
        but your intensity can also be overwhelming. Your creativity and sense of 
        adventure make you exciting to be around, but you can be toxic to those who get too close.
        `,
    },
    oyster: {
        title: 'Oyster Mushroom',
        img: './static/oyster.jpg',
        description: `
        You are a calming presence in any situation. 
        You are empathetic and always ready to lend a listening ear to those in need. 
        You value harmony and connection, and you are skilled at navigating conflicts 
        and helping people find common ground.
        `,
    },
    shiitake: {
        title: 'Shiitake Mushroom',
        img: './static/shiitake.jpg',
        description: `
        You are hardworking and disciplined, with a strong sense of purpose. 
        You are reliable and consistent, and people know they can count on you 
        to follow through on your commitments. You have a practical, no-nonsense 
        approach to life that gets things done.
        `,
    },
    button: {
        title: 'Button Mushroom',
        img: './static/button.png',
        description: `
            You are easygoing and adaptable, able to fit into any situation with ease. 
            You have a cheerful and optimistic outlook on life, and you enjoy the simple 
            pleasures of good food, good company, and a comfortable home. You value 
            stability and security, and you work hard to maintain them.
        `,
    },
    chanterelle: {
        title: 'Chanterelle Mushroom',
        img: './static/chanterelle.jpg',
        description: `
        You are a free spirit with a love of adventure. You are always seeking 
        out new experiences and exploring the world around you. You are optimistic 
        and outgoing, with a warm and welcoming personality that draws people to you.
        `,
    },
    porcini: {
        title: 'Porcini Mushroom',
        img: './static/porcini.jpg',
        description: `
        You are sophisticated and refined, with a taste for the finer things in life. 
        You have a discerning palate and an appreciation for art, culture, and intellectual 
        pursuits. You are confident and self-assured, and you value quality and excellence 
        in all things.
        `,
    },
    morel: {
        title: 'Morel Mushroom',
        img: './static/morel.jpg',
        description: `
            You are mysterious and enigmatic, with a depth of character that others find intriguing. 
            You have a quiet strength and resilience that helps you navigate life's challenges with 
            grace and poise. You are intuitive and perceptive, with a keen sense of empathy that 
            allows you to connect with others on a deep level.
        `,
    },
}
