const rowInput = document.getElementById('rowInput')
const columnInput = document.getElementById('columnInput')
const pixelSizeInput = document.getElementById('pixelSizeInput')
const blurInput = document.getElementById('blurInput')
const container = document.getElementById('container')

const million = Math.pow(10, 6)
const billion = Math.pow(10, 9)
const trillion = Math.pow(10, 12)

function formatNumber(number) {
    if(number >= trillion) {
        return (Math.round(number / trillion * 1000) / 1000) + " Trillion"
    } else if(number >= billion) {
        return (Math.round(number / billion * 1000) / 1000) + " Billion"
    } else if(number >= million) {
        return (Math.round(number / million * 1000) / 1000) + " Million"
    }
    return Math.round(number).toLocaleString()
}

function hasNumber(input) {
    const regex = /\d+/
    return regex.test(input)
}

var menuShown = true

document.addEventListener('keydown', (event) => {
    if(event.key === 'h') {
        if(menuShown) {
            document.getElementById('menu').style.setProperty('display','none')
            lagIndicator.style.setProperty('display','none')
            menuShown = false
        } else {
            document.getElementById('menu').style.setProperty('display','flex')
            lagIndicator.style.setProperty('display','unset')
            menuShown = true
        }
    }
    if(event.key === 'Enter') {
        buttonClick()
    }
    if(event.key === 'Escape') {
        container.innerHTML = ''
    }
    if(event.key === '1') {
        buttonSelect(0)
    }
    if(event.key === '2') {
        buttonSelect(1)
    }
    if(event.key === '3') {
        buttonSelect(2)
    }
})

var warningClicks = 0

function buttonClick() {
    if(hasNumber(rowInput.value) && hasNumber(columnInput.value) && hasNumber(pixelSizeInput.value) && hasNumber(blurInput.value)) {
        if(rowInput.value * columnInput.value >= 10000) {
            if(warningClicks === 1) {
                document.getElementById('warning').innerHTML = ''
                generate()
            }
            warningClicks++
            document.getElementById('warning').innerHTML = `Are you sure you want to generate ${formatNumber(rowInput.value * columnInput.value)} pixels? <br> Click the button again to continue.`
        } else {
            generate()
            document.getElementById('warning').innerHTML = ''
        }
    } else {
        document.getElementById('warning').innerText = 'Invalid Input!'
    }
}

//YOU WOULD NEVER GUESS HOW THIS WORKS

var colorType = 0

generate()

var whitePixels = 0
var blackPixels = 0

function generate() {
    container.innerHTML = ''

    container.style.setProperty('grid-template-rows',`repeat(${rowInput.value}, 1fr)`)
    container.style.setProperty('grid-template-columns',`repeat(${columnInput.value}, 1fr)`)
    container.style.setProperty('filter',`blur(${blurInput.value}px)`)
    whitePixels = 0
    blackPixels = 0

    for(let i = 0; i < rowInput.value * columnInput.value; i++) {
        var pixel = document.createElement('div')
        pixel.classList.add('pixel')
        if(colorType === 0) { //COLOR TYPE: COLOR

            pixel.style.setProperty('background-color',`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
        
        } else if(colorType === 1) { //COLOR TYPE: GRAYSCALE
            let randomWhite = Math.floor(Math.random() * 255)
            pixel.style.setProperty('background-color',`rgb(${randomWhite}, ${randomWhite}, ${randomWhite})`)
        
        } else { //COLOR TYPE: BLACK & WHITE

            let randomWhite = Math.floor(Math.random() * 2)
            pixel.style.setProperty('background-color',`rgb(${randomWhite * 255}, ${randomWhite * 255}, ${randomWhite * 255})`)
            if(randomWhite === 1) {
                whitePixels++
            } else {
                blackPixels++
            }

        }

        //PIXEL RENDERING

        pixel.style.setProperty('width',`${pixelSizeInput.value}px`)
        pixel.style.setProperty('height',`${pixelSizeInput.value}px`)

        container.appendChild(pixel)
    } 

    //INFO SETTING

    setTimeout(() => {
        document.getElementById('warning').innerHTML = ''
        if(rowInput.value * columnInput.value > 1) {
            document.getElementById('generated').innerText = `${formatNumber(rowInput.value * columnInput.value)} pixels generated.`
        } else {
            document.getElementById('generated').innerText = `Bro really generated 1 pixel 💀`
        }
        if(colorType === 2) {
            document.getElementById('percent').innerText = `${Math.round((whitePixels / (rowInput.value * columnInput.value)) * 100)}%W, ${Math.round((blackPixels / (rowInput.value * columnInput.value)) * 100)}%B`
        } else {
            document.getElementById('percent').innerText = ''
        }
        warningClicks = 0
    }, 100);
}

document.addEventListener('wheel', setFilter)

function setFilter() {
    setTimeout(() => {
        container.style.setProperty('filter',`blur(${blurInput.value}px)`)
    }, 100);
}

const lagIndicator = document.getElementById('lagIndicator')
var dots = ''

setInterval(() => {
    if(dots.length < 5) {
        dots += '.'
    } else {
        dots = ''
    }
    lagIndicator.innerText = dots
}, 200);

const button0 = document.getElementById('button0')
const button1 = document.getElementById('button1')
const button2 = document.getElementById('button2')

buttonSelect(0)

function buttonSelect(type) {
    if(type === 0) {
        colorType = 0
        button0.classList.add('buttonSelected')
        button1.classList.remove('buttonSelected')
        button2.classList.remove('buttonSelected')
    } else if(type === 1) {
        colorType = 1
        button0.classList.remove('buttonSelected')
        button1.classList.add('buttonSelected')
        button2.classList.remove('buttonSelected')
    } else if(type === 2) {
        colorType = 2
        button0.classList.remove('buttonSelected')
        button1.classList.remove('buttonSelected')
        button2.classList.add('buttonSelected')
    }
}