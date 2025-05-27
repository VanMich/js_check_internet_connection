const popup = document.querySelector(".popup"),
wifiIcon = document.querySelector('.icon i'),
popupTitle = document.querySelector('.popup .title'),
popupDesc = document.querySelector('.popup .desc'),
reconnectBtn = document.querySelector('.reconnect')
let isOnline = true, intervalId, timer = 10

const checkConnection = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        isOnline = response.status >= 200 && response.status < 300 // si le status es compris entre 200 et 300 => en ligne

    }catch (error){
        isOnline = false
    }
    timer = 10
    clearInterval(intervalId)
    handlePopup(isOnline)
}

const handlePopup = (status) =>{
    if(status) { // if the status is true (online)
        wifiIcon.className = "uil uil-wifi"
        popupTitle.innerText = "Restored Connection"
        popupDesc.innerHTML = "Your device is now successfully connected to the internet"
        popup.classList.add('online')
        return setTimeout(() => popup.classList.remove('show'), 2000)
    }
    // if the status is false (offline)
    wifiIcon.className = "uil uil-wifi-slash"
    popupTitle.innerText = "Lost Connection"
    popupDesc.innerHTML = "Your network is unavailable. We will attempt to recconect you in <b>10</b> seconds."
    popup.className = "popup show"

    intervalId = setInterval(() => { // initialisation d'un interval pour decrementer le timer de chaque 1 seconde
        timer--
        if(timer === 0) checkConnection() // if the timer reaches 0, check the connection again
        popup.querySelector('.desc b').innerText = timer
    }, 1000)
}

// only if isOnline is true, check the connection every 3 secondes
setInterval(() => isOnline && checkConnection(), 3000)

reconnectBtn.addEventListener('click', checkConnection)