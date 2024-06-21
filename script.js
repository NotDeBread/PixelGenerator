const canvas = doge('canvas')
const ctx = canvas.getContext('2d')

let colorMode = 0

const inputs = {
    x: doge('inputX'),
    y: doge('inputY'),
    pixelSize: doge('inputPixelSize')
}

inputs.x.value = DeBread.randomNum(5, 100)
inputs.y.value = DeBread.randomNum(5, 100)
inputs.pixelSize.value = DeBread.randomNum(1, 5)

function switchColorMode(mode) {
    colorMode = mode
    for(let i = 0; i < 4; i++) {
        doge(`colorButton${i}`).setAttribute('active', 'false')
    }
    doge(`colorButton${mode}`).setAttribute('active', 'true')
} switchColorMode(DeBread.randomNum(0, 3))

function generateRandomPixels() {
    changeWarningText('Generating...','white')
    setTimeout(() => {
        const startDate = performance.now()
        const width = inputs.x.value
        const height = inputs.y.value
        const pixelSize = inputs.pixelSize.value
    
        if(width < 32767 && height < 32767) {
            canvas.width = width * pixelSize
            canvas.height = height * pixelSize
        
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    if(colorMode === 0) {
                        ctx.fillStyle = DeBread.randomColor()
                        doge('possibility').innerHTML = `1 in ${formatNumber(width * height)}<power>${formatNumber(Math.pow(255, 3))}</power>`
                    } else if(colorMode === 1) {
                        const randomValue = DeBread.randomNum(0, 255) 
                        ctx.fillStyle = `rgb(${randomValue}, ${randomValue}, ${randomValue})`

                        doge('possibility').innerHTML = `1 in ${formatNumber(width * height)}<power>255</power>`
                    } else if(colorMode === 2) {
                        if(DeBread.randomNum(0, 1) === 0) {
                            ctx.fillStyle = `rgb(255, 255, 255)`
                        } else {
                            ctx.fillStyle = `rgb(0, 0, 0)`
                        }
                        doge('possibility').innerText = `1 in ${formatNumber(Math.pow(width * height, 2))}`
                    } else if(colorMode === 3) {
                        if(isEven(y+x)) {
                            ctx.fillStyle = `rgb(255, 255, 255)`
                        } else {
                            ctx.fillStyle = `rgb(0, 0, 0)`
                        }
                    }
                    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
                    if(y + 1 === parseInt(inputs.y.value)) {
                        changeWarningText(`${formatNumber(inputs.x.value * inputs.y.value)} pixels generated in ${performance.now() - startDate}ms.`,'white')
                    }
                }
            }
        } else { changeWarningText(`Canvas' dimensions cannot exceed 32767px`, 'rgb(255, 100, 100)')}
    }, 25)
}
generateRandomPixels()

function changeWarningText(text, color) {
    doge('pixelsGenerated').innerText = text
    doge('pixelsGenerated').style.color = color
}

document.body.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', (ev) => {
        if(!parseInt(ev.key) && !ev.ctrlKey && !['backspace','0','tab','arrowleft','arrowright','.'].includes(ev.key.toLowerCase())) {
            ev.preventDefault()
        }
    })
})

document.addEventListener('keydown', ev => {
    document.body.querySelectorAll('input').forEach(input => {
        if(document.activeElement === input) {
            return
        }

        if(ev.key === 'h') {
            if(doge('ui').style.display === 'none') {
                doge('ui').style.display = 'unset'
            } else {
                doge('ui').style.display = 'none'
            }
        }
    })
})






//didnt make this lmao
function downloadCanvas() {
    canvas.toBlob((blob) => {
      saveBlob(blob, `screencapture-${canvas.width}x${canvas.height}.png`);
    });
}

const saveBlob = (function() {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  return function saveData(blob, fileName) {
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
  };
}());