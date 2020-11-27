const container = document.querySelector('.container')
const titleField = document.querySelector('#title')
const textField = document.querySelector('#text')

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function getRandomHex(){
    return Math.floor(Math.random() * 256)
}

document.body.style.backgroundColor = `rgba(${getRandomHex()}, ${getRandomHex()}, ${getRandomHex()}, 0.25)`

async function getRandomWhatever() {
    const response = await fetch(`https://wikiluke.herokuapp.com/random`);

    if (!response.ok) {
        throw new Error(`Something went wrong, please try again`);
    }

    return response.json();
}

getRandomWhatever().then(res => {

    const data = {type: '', title: '', text: ''};

    switch (res.type) {
    case 'Word': 
        data.title = res.name;
        data.text = res.definition;
        break;
    case 'Learning': 
        data.title = res.category.toProperCase()
        data.text = res.text
        break;
    case 'Advice': 
        data.title = 'Advice From Future Luke'
        data.text = res.text
        break;
    case 'Quote': 
        data.title = `"${res.text}"`
        data.text = `- ${res.author || "Probably Someone Cool"}`
        break;
    }
    
    container.classList.add(res.type.toLowerCase())

        const title = document.createElement('p')
        title.classList.add('title');
        title.innerText = data.title;
        container.appendChild(title);
    
        const text = document.createElement('p')
        text.classList.add('text');
        text.innerText = data.text;
        container.appendChild(text);
    
});


