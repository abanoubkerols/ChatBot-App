// elements 
let sendBtn = document.getElementById('sendBtn')
let textBox = document.getElementById('textBox')
let chatContainer = document.getElementById('chatContainer')
let alert = document.getElementById('alert')


let user = {
    message: "", counter: 0
}


let questionsToAsk = [
    { "question": "what is your name?", "answer": "" },
    { "question": "how old are you?", "answer": "" },
    { "question": "what is your job title?", "answer": "" },
    { "question": "where do you live ?", "answer": "" },
]


function askQuestions() {
    console.log(questionsToAsk);
    if (questionsToAsk.length > user.counter) {
        setTimeout(function () {
            chatBotMessage(questionsToAsk[user.counter].question)
            user.counter++
        }, 400)
    }
}

askQuestions()

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
        

        askQuestions()

        textBox.value = ''

    }
})

// send message when user press enter
textBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click()
    }
})
