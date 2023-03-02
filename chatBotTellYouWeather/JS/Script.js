// elements 
let sendBtn = document.getElementById('sendBtn')
let textBox = document.getElementById('textBox')
let chatContainer = document.getElementById('chatContainer')
let alert = document.getElementById('alert')


let user = {
    message: "", counter: 0
}




let httpReq




// create user message 
function sendMessage(messageTxt) {
    let messageEle = document.createElement('div')
    messageEle.classList.add('w-50', 'bg-white', 'float-end', 'shadow', 'rounded-2', 'm-1', 'p-1')
    messageEle.innerHTML = `<span class="ms-2">you :</span>
    <span class="mt-1 p-2">${messageTxt}</span>`

    messageEle.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 500 })

    chatContainer.appendChild(messageEle)

    chatContainer.scrollTop = chatContainer.scrollHeight
}

// chat bot message 
function chatBotMessage(messageTxt) {
    let messageEle = document.createElement('div')
    messageEle.classList.add('w-50', 'bg-white', 'float-start', 'shadow', 'rounded-2', 'm-2', 'p-1')
    messageEle.innerHTML = `<span >ChatBotSpeak:</span>
    <span class="">${messageTxt}</span>`

    messageEle.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 500 })


    chatContainer.appendChild(messageEle)

    chatContainer.scrollTop = chatContainer.scrollHeight

}

// alert for user when send empty value
function tempAlert(msg, duration, AlertColor) {
    let ele = document.createElement("div");
    ele.classList = `alert w-50 alert-${AlertColor} text-center`

    ele.innerHTML = msg;
    setTimeout(function () {
        ele.parentNode.removeChild(ele);
    }, duration);
    alert.appendChild(ele);
}

// send message when user click mouse
sendBtn.addEventListener('click', function () {
    if (textBox.value == "") {
        tempAlert('Please Write Your Message', 3000, 'danger')
    } else {
        let messageTxt = textBox.value.trim()
        user.message = messageTxt
        sendMessage(messageTxt)
     
        assistantRosponse(messageTxt)
        

        textBox.value = ''

      

        
    }
})

// send message when user press enter
textBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click()
    }
})




async function getWeatherReq(lat, long) {
    httpReq = await fetch(`
    https://api.weatherapi.com/v1/forecast.json?key=a07ba83ab200431d807174630221006&q=${+parseInt(lat)},${+parseInt(long)}&days=1&aqi=no&alerts=no`)

    let responseApi = await httpReq.json()

    let city = responseApi.location.name
    let temp = responseApi.current.temp_c
    let hum = responseApi.current.humidity
    let icon = responseApi.current.condition.icon

    let meaasgeToSend
    meaasgeToSend = `<br><span ><img  src="https:${icon}"></span>`
    meaasgeToSend += `<br>city: ${city}`
    meaasgeToSend += `<br>temperature: ${temp}C `
    meaasgeToSend += `<br> Humidity : ${hum}`

    chatBotMessage(meaasgeToSend)


}

// get Location And Weather
function getLocationAndWeather() {
    navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude
        let long = pos.coords.longitude
        getWeatherReq(lat, long)
    }, (err) => {
        console.log(err);
    })
}


function initializeOptions() {
    let options = [
        { number: 1, chocie: "Weather" },
        { number: 2, chocie: "Sports" },
        { number: 3, chocie: "News" },

    ]


    let messageEle = document.createElement('div')
    messageEle.classList.add('w-50', 'bg-white', 'float-start', 'shadow', 'rounded-2', 'm-1', 'ps-1')

    for (let i = 0; i < options.length; i++) {
        messageEle.innerHTML += `
        <span class="mt-1 ps-1"> ${options[i].number} - ${options[i].chocie}</span>
        <br>
        `
    }

    messageEle.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 500 })

    chatContainer.appendChild(messageEle)

    chatContainer.scrollTop = chatContainer.scrollHeight

}
chatBotMessage('Please Choose Option ')
initializeOptions()



function assistantRosponse(msg) {
    let userChoice = parseInt(msg.trim())

    switch (userChoice) {
        case 1:
            getLocationAndWeather()
            break;
        case 2:
            tempAlert('You Are Choose Sports Option', 2000, 'success')
            setTimeout(() => {
                window.open('https://www.google.com/search?q=sports')
            }, 800);
            break;
        case 3:
            tempAlert('You Are Choose News Option', 2000, 'success')
            setTimeout(() => {
                window.open('https://www.google.com/search?q=news')
            }, 800);
            break;
        default:
            tempAlert('please choose Existing option', 3000, 'danger')

    }
}