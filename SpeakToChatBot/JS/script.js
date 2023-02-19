// elements 
let sendBtn = document.getElementById('sendBtn')
let textBox = document.getElementById('textBox')
let chatContainer = document.getElementById('chatContainer')
let alert = document.getElementById('alert')



let user = {
    message: ""
}



let arrayOfPossibleMessage = [
    { "message": "how are you?", "response": "I'm great" },
    { "message": "hi", "response": "hi" },
    { "message": "who are you?", "response": "I'm your assistant" },
    { "message": "what is your name ?", "response": "I'm chatBot " },
    { "message": "how old are you?", "response": "I'm ageless" },
    { "message": "do you sleep early?", "response": "No I don'n sleep" },
    { "message": "can you dance?", "response": "yes , tango" },
    { "message": "what is your fav food ?", "response": "Pizza" },
    { "message": "do you have a job?", "response": "yes" },
    { "message": "find to me a job?", "response": "<a href='http://wwww.indeed.com' target='_blank'>Click Here </a>" },
    { "message": "today date", "response": getDate() }
]

function getDate() {
    let date = new Date()
    let day = date.getDay()
    let month = date.getMonth()
    let dayOfMonth = date.getDate()

    let dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday']

    let monthArray = ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${dayArray[day]},${monthArray[month]} ${dayOfMonth}`


}

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

setTimeout(() => {
    chatBotMessage('Hi From Window App ')
}, 600);

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
        processMessage()

        

        textBox.value =""

    }
})



// send message when user press enter
textBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click()
    }
})




function processMessage() {
    let res
    if (user.message.length > 5 || user.message.includes('hi')) {

        res = arrayOfPossibleMessage.filter(value =>
            value.message.includes(user.message.toLowerCase())
        )
        if (res.length > 0) {
            let megBot = res[0].response

            setTimeout(() => {
                chatBotMessage(megBot)
            }, 700);
        } else {
            setTimeout(() => {
                chatBotMessage("I don't understand you")
            }, 700);
        }
    } else if (user.message === 'how' || user.message === "who") {
        setTimeout(() => {
            chatBotMessage("?")
        }, 700);

    } else {
        setTimeout(() => {
            chatBotMessage("Please send me a complete sentence")

        }, 700);
    }

}
