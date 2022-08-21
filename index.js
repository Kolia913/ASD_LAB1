let array = []
const generateBtn = document.getElementById('generate')
const input = document.getElementById('input')
const sortBtn = document.getElementById('sort')
const secondsElapsedSpan = document.getElementById('timeValue')
const resultParagrapgh = document.getElementById('resultElements')
const timeTitle = document.getElementById('timeTitle')
const scrollTopBtn = document.getElementById('scrollTop')
const scrllBottomBtn = document.getElementById('scrollBottom')
const text = document.getElementById('text')
const spinner = document.getElementById('spinner')
const paragrapgh = document.getElementById('elements')
const processedParagraph = document.getElementById('processedElements')

scrollTopBtn.style.display = "none"
scrllBottomBtn.style.display = "flex"

function isEven(s)
{
    let l = s.length;
 
    let dotSeen = false;
    for (let i = l - 1; i >= 0; i--)
    {
        if (s[i] == '0' && dotSeen == false)
        continue;

        if (s[i] == '.')
        {
            dotSeen = true;
            continue;
        }
 
        if ((s[i] - '0') % 2 == 0)
            return true;
             
        return false;   
    }
}

generateBtn.addEventListener('click', function() {
  spinner.style.display = 'none'
  array = []
  paragrapgh.innerText = ""
  processedParagraph.innerText = ""
  resultParagrapgh.innerText = ""
  secondsElapsedSpan.innerText = ""
  sortBtn.style.display = 'none'
  timeTitle.style.display = 'none'

  if(!!input.value) {
    const count = Number(input.value)
    for(let i = 0; i < count; i++) {
      array.push(Math.random())
    }
    const elementsString = array.join(", ")
    paragrapgh.innerText = "Raw: \n [ " + elementsString + " ]"
    array = array.map(el => {
      if(isEven(el.toString())) {
        return Math.sqrt(Math.abs(el-10))
      } else {
        return el
      }
    })
    const processedElementsString = array.join(", ")
    processedParagraph.innerText = "Processed: \n [ " + processedElementsString + " ]"
    sortBtn.style.display = 'flex'
  }
})

async function bubbleSort(array) {
  let temp = 0
  let sorted = false
  let comps = array.length - 1
  let iteratrions = 0
  while(!sorted) {
    sorted = true
    iteratrions++
    for(let i = 0; i < comps; i++) {
      if(array[i] > array[i+1]) {
        temp = array[i]
        array[i] = array[i+1]
        array[i+1] = temp
        sorted = 0
      }
    }
    const elementsString = array.join(', ')
    resultParagrapgh.innerText += `Step ${iteratrions}: \n` +
    "[ " + elementsString + " ] \n"
    comps--
  }
  return array
}

sortBtn.addEventListener('click', function() {
  text.style.display = 'none'
  spinner.style.display = 'inline-block'
  const start = performance.now()
  bubbleSort(array).then((res) => {
    array = res
    const end = performance.now()
    const elementsString = array.join(", ")
    timeTitle.style.display = 'block'
    secondsElapsedSpan.innerText = end - start + ' ms.'
    resultParagrapgh.innerText += "Sorted: \n [ " + elementsString + " ]"
    text.style.display = 'block'
    spinner.style.display = 'none'
  })
})

window.onscroll = function() {scrollFunction()}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = "flex"
  } else {
    scrollTopBtn.style.display = "none"
  }
  if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    scrllBottomBtn.style.display = "none"
  } else {
    scrllBottomBtn.style.display = "flex"
  }
}

scrollTopBtn.addEventListener('click', function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

scrllBottomBtn.addEventListener('click', function() {
  window.scrollTo(0, document.body.scrollHeight)
})
