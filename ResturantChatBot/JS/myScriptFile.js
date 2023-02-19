// elements 
let sendBtn = document.getElementById('sendBtn')
let textBox = document.getElementById('textBox')
let chatContainer = document.getElementById('chatContainer')
let alert = document.getElementById('alert')

let ticket = new Date().getTime()



let user = {
    message: "", counter: 0, meals: [] , ticket : ticket
}


let options = [
    { number: 1, chocie: "Meal 1", price: 24 },
    { number: 2, chocie: "Meal 2", price: 38 },
    { number: 3, chocie: "Meal 3", price: 55 },

]



function showMenu() {



    let messageEle = document.createElement('div')
    messageEle.classList.add('w-50', 'bg-white', 'float-start', 'shadow', 'rounded-2', 'm-1', 'ps-1')

    for (let i = 0; i < options.length; i++) {
        messageEle.innerHTML += `
        <span class="mt-1 ps-1"> ${options[i].number} - ${options[i].chocie} $${options[i].price} </span>
        <br>
        `
    }

    messageEle.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 500 })

    chatContainer.appendChild(messageEle)

    chatContainer.scrollTop = chatContainer.scrollHeight


}
chatBotMessage('Hi , Welcome To Our Resturant!')
chatBotMessage('Please Choose Option ')
showMenu()

function totalPrice() {
    let totalPrice = 0 

    for (let i = 0; i < user.meals.length; i++) {
       totalPrice +=  user.meals[i].price
    }
    return totalPrice
}


function resturantResponeToUser(msg) {
    let userChoice = parseInt(msg.trim())

    switch (userChoice) {
        case 1:
            user.meals.push(options[0])
            chatBotMessage("Something Else? if YES chsoose Meal Number or 50 To CheckOut")
            break;
        case 2:
            user.meals.push(options[1])
            chatBotMessage("Something Else? if YES chsoose Meal Number or 50 To CheckOut")

            break;
        case 3:
            user.meals.push(options[2])
            chatBotMessage("Something Else")
            chatBotMessage("Something Else? if YES chsoose Meal Number or 50 To CheckOut")

            break;
        case 50:
            chatBotMessage(`Total Price : $${totalPrice()}`)
            chatBotMessage(`Please Click this link To compelete CheckOut`)
            chatBotMessage(`<a href="https://google.com" target="_blank">CheckOut</a>`)

            break;
        default:
            tempAlert('please choose Existing option', 3000, 'danger')

    }
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
        // processMessage()

        // questionsToAsk[user.counter - 1].answer = user.message
        // askQuestions()

        textBox.value = ''

        // assistantRosponse(messageTxt)

        resturantResponeToUser(messageTxt)
    }
})

// send message when user press enter
textBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click()
    }
})
