
const drumButtons = document.querySelectorAll('.drum');

drumButtons.forEach(button => {
        button.addEventListener('click', function(){
            const buttonValue = this.innerHTML.toLowerCase();
            makeSound(buttonValue)
        })
});

document.addEventListener('keydown', function(e){
    makeSound(e.key.toLowerCase())
});


const makeSound = (key) => {

    let audioPath = '';

    switch (key) {
        case 'a':
            audioPath = './sounds/clap.wav'
            break;
        case 's':
            audioPath = './sounds/hihat.wav'
            break;
        case 'd':
            audioPath = './sounds/kick.wav'
            break;
        case 'f':
            audioPath = './sounds/openhat.wav'
            break;
        case 'g':
            audioPath = './sounds/boom.wav'
            break;
        case 'h':
            audioPath = './sounds/ride.wav'
            break;
        case 'j':
            audioPath = './sounds/snare.wav'
            break;
        case 'k':
            audioPath = './sounds/tom.wav'
            break;
        case 'l':
            audioPath = './sounds/tink.wav'
            break;
        
        default: console.log('Key not associated with a sound.')
            break;
    }

    const audio = new Audio(audioPath);
    audio.play().catch(error => {
        console.log('Error playing audio:', error)
    })
    
};