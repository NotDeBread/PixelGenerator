const rowInput = document.getElementById('rowInput')
const columnInput = document.getElementById('columnInput')
const pixelSizeInput = document.getElementById('pixelSizeInput')
const blurInput = document.getElementById('blurInput')
const colorInput = document.getElementById('colorInput')
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
            menuShown = false
        } else {
            document.getElementById('menu').style.setProperty('display','flex')
            menuShown = true
        }
    }
    if(event.key === 'Enter') {
        buttonClick()
    }
    if(event.key === 'Escape') {
        container.innerHTML = ''
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

generate()

function generate() {
    container.innerHTML = ''

    container.style.setProperty('grid-template-rows',`repeat(${rowInput.value}, 1fr)`)
    container.style.setProperty('grid-template-columns',`repeat(${columnInput.value}, 1fr)`)
    container.style.setProperty('filter',`blur(${blurInput.value}px)`)

    for(let i = 0; i < rowInput.value * columnInput.value; i++) {
        var pixel = document.createElement('div')
        pixel.classList.add('pixel')
        if(colorInput.checked) {
            pixel.style.setProperty('background-color',`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
        } else {
            let randomWhite = Math.floor(Math.random() * 255)
            pixel.style.setProperty('background-color',`rgb(${randomWhite}, ${randomWhite}, ${randomWhite})`)
        }
        pixel.style.setProperty('width',`${pixelSizeInput.value}px`)
        pixel.style.setProperty('height',`${pixelSizeInput.value}px`)

        container.appendChild(pixel)
    } 

    setTimeout(() => {
        document.getElementById('warning').innerHTML = ''
        if(rowInput.value * columnInput.value > 1) {
            document.getElementById('generated').innerText = `${formatNumber(rowInput.value * columnInput.value)} pixels generated.`
        } else [
            document.getElementById('generated').innerText = `Bro really generated 1 pixel 💀`
        ]
        warningClicks = 0
    }, 500);
}
