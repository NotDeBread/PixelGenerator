const DeBread = {
    /**
    * Rounds a number to the specified decimal place.
    * @param num The number to round.
    * @param decimalPlaces The decimal place to round to.
    */
    round(num, decimalPlaces = 0) {
        return Math.round(num * (Math.pow(10, decimalPlaces))) / (Math.pow(10, decimalPlaces))
    },

    /**
    * Returns a random color.
    */
    randomColor() {
        return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    },

    /**
    * Returns a random number.
    * @param min The minimum amount the number can be.
    * @param max The maximum amount amount the number can be.
    * @param decimalPlaces The amount of decimal places.
    */
    randomNum(min = 0, max = 1, decimalPlaces = 0) {
        return DeBread.round((Math.random() * (max - min)) + min, decimalPlaces)
    },

    /**
    * Applies a shake effect to an element.
    * (This uses the CSS transform property so it will override an y current CSS transformations.)
    * @param element The element to shake.
    * @param interval The interval of the shake.
    * @param intensity The intensity of the shake.
    * @param time How long the shake lasts (ms).
    * @param rotate If to involve rotation in the shake.
    * @param rotateIntensity The intensity of the rotation in the shake.
    */
    shake(element, interval, intensityX, intensityY, time, rotate = false, rotateIntensity = 0) {
        let shakeInterval = setInterval(() => {
            if(rotate) {
                element.style.setProperty('transform',`translateX(${DeBread.randomNum(-intensityX, intensityX)}px) translateY(${DeBread.randomNum(-intensityY, intensityY)}px) rotate(${DeBread.randomNum(-rotateIntensity, rotateIntensity)}deg)`)
            } else {
                element.style.setProperty('transform',`translateX(${DeBread.randomNum(-intensityX, intensityX)}px) translateY(${DeBread.randomNum(-intensityY, intensityY)}px)`)
            }
        }, interval);
        setTimeout(() => {
            clearInterval(shakeInterval)
            doge(element).style.setProperty('transform',`none`)
        }, time);
    },

    /**
    * Plays a sound.
    * @param sound The file path of the audio.
    * @param volume The volume to play the sound at.
    */
    playSound(sound, volume = 1) {
        let audio = new Audio(sound)
        audio.volume = volume
        audio.play()
    }
}

/**
* Shortened document.getElementById.
* (From library "DeBread")
* @param id The ID of the element.
*/
function doge(id) {
    return document.getElementById(id)
}

//-----Credit: @zeanzarzin-----//

// less horrible number formatter (in my opinion)
const startingNumber = 1000000;
const numberStep = 1000;
const numberNames = [
    " Million",
    " Billion",
    " Trillion",
    " Quadrillion",
    " Quintillion",
    " Sextillion",
    " Septillion",
    " Octillion",
    " Nonillion",
    " Decillion",
    " Undecillion",
    " Duodecillion",
    " Tredecillion",
    " Quattuordecillion",
    " Quindecillion",
    " Sexdecillion",
    " Septemdecillion",
    " Octodecillion",
    " Novemdecillion",
    " Vigintillion",
    " Unvigintillion",
    " Duovigintillion",
    " Trevigintillion",
    " Quattuorvigintillion",
    " Quinvigintillion",
    " Sexvigintillion",
    " Septvigintillion",
    " Octovigintillion",
    " Nonvigintillion",
    " Trigintillion",
    " Untrigintillion",
    " Duotrigintillion",
];
const googol = Math.pow(10, 100); // googol is annoying to work with >:(

const numberNameCount = numberNames.length;

function formatNumber(number) {
    if(number >= startingNumber) {
        let i; // unfortunately i has to be defined in this scope
        let currentNumber = startingNumber;
        for(i = 0; i <= numberNameCount && number >= currentNumber*numberStep; i++) {
            currentNumber *= numberStep;
        }

        if(i == numberNameCount) {
            return (Math.round(number / googol * 1000) / 1000) + " Googol";
        }

        return (Math.round(number / currentNumber * 1000) / 1000) + numberNames[i];
    }
    return (Math.round(number*10)/10).toLocaleString();
}

//---------------//

function isEven(n) {
    n = Number(n);
    return n === 0 || !!(n && !(n%2));
}

function isOdd(n) {
    return isEven(Number(n) + 1);
}