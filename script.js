(()=>{
    const rows = 6
    const cols = 5
    for (let i=0; i<rows*cols; i++){
        document.querySelector("#grid").innerHTML += `
            <div class="w-[70px] h-[70px] border border-solid border-white transition-all flex justify-center items-center text-2xl text-white uppercase"></div>
        `
    }
})()

async function main() {
    let words
    try {
        const url = "http://127.0.0.1:3000/api/words"
        const res = await fetch(url)
        words = await res.json()
    } catch (err) {
        console.log(err.message);
        words = []
    }

    function generateRandomWord() {
        let index = Math.floor(Math.random() * words.length)
        return words[index]
    }

    // Game variables
    const wordOfDay = generateRandomWord()?.toLowerCase()
    console.log(`Answer: ${wordOfDay}`)
    
    const grids = document.querySelectorAll("#grid div")
    
    let counter = 0
    let currWord = ""
    let tries = 0
    
    function reload() {
        location.reload()
    }
    
    function CheckWord() {
        if ((counter > 0) && !(counter % 5)){
            let i = 0, index = tries*5
            while (i < 5){
                if (currWord[i] === wordOfDay[i])
                    grids[index + i].classList.add("bg-green-500")

                else if (wordOfDay.includes(currWord[i]))
                    grids[index + i].classList.add("bg-yellow-800")

                else grids[index + i].classList.add("bg-black")

                i++
            }

            if (currWord === wordOfDay){
                alert("You won")
                reload()
            }

            currWord = ""
            tries++
        }
    }
    
    function Enter(e) {
        let upperLimit = (tries*5) + 4

        if (counter <= upperLimit){
            grids[counter++].textContent = e.key
            currWord += e.key
        }
    }
    
    function Back() {
        let lowerLimit = tries*5
        if (counter > lowerLimit)
            grids[--counter].textContent = ""
    }
    
    function CheckDefeat() {
        if (tries > 5){
            alert("You Lost")
            reload()
        }
    }
    
    window.addEventListener("keydown",e => {
        if (e.key == "Enter")
            CheckWord()

        CheckDefeat()

        if (e.key.length == 1 && e.key.match(/[a-z]/))
            Enter(e)

        if (e.key == "Backspace")
            Back()
    })
    
    document.querySelector("#back-btn").addEventListener("click",Back)
    document.querySelector("#enter").addEventListener("click",CheckWord)
    document.querySelector("#replay").addEventListener("click",reload)
}

main()