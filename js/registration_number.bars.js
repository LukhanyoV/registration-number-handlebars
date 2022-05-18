// MAKE REFERENCES TO MY DOM ELEMENTS
const inputBoxBars = document.querySelector(".inputBoxBars")
const addBtnBars = document.querySelector(".addBtnBars")
const resetBtnBars = document.querySelector(".resetBtnBars")
const townBars = document.querySelector("#townBars")
// const display = document.querySelector(".display")
const errorBars = document.querySelector(".errorBars")

// CREATE INSTANCE TO MY DOM PROJECT
const registrationsBars = RegistrationNumberBars()

// DOM FUNCTIONS
// this function will check the the registration number in the array
// and then display the to screen
const displayTemplate = array => {
    let template = document.querySelector(".displayTemplate").innerHTML

    let regTemplate = Handlebars.compile(template)

    let displayDataElement = document.querySelector(".displayData")

    let displayDataHTML = regTemplate({
        regNumbers: array
    })

    displayDataElement.innerHTML = displayDataHTML
}

// // this function will add the current registration number to local storage
const addToLocalStorageBars = () => localStorage.setItem("regNumbersBars", JSON.stringify(registrationsBars.getRegNumbers()))

// // get registration numbers from local storage
const getFromLocalStorageBars = () => JSON.parse(localStorage.getItem("regNumbersBars"))

// // check if there are any registration numbers in local storage
// // if they exist and then add them to my valid registration numbers instance
getFromLocalStorageBars() !== null && getFromLocalStorageBars().forEach(el => registrationsBars.addRegNumber(el)), displayTemplate(registrationsBars.getRegNumbers())

displayTemplate(registrationsBars.getRegNumbers())

// EVENT LISTENERS
// listen to add button when clicked
addBtnBars.addEventListener("click", e => {
    e.preventDefault()
    
    // set the current registration number so that it can be validated
    registrationsBars.setRegNumber(inputBoxBars.value.toUpperCase())
    // get the registration number
    const regBars = registrationsBars.getRegNumber()
    let errorMsgBars = registrationsBars.getErrorMessage()

    // if the registration number is not valid
    // show error message for three seconds
    if(errorMsgBars !== ""){
        if(errorMsgBars === "Registration number already exists"){
            errorBars.style.color = "#0000CD"
            errorBars.innerHTML = errorMsgBars
        } else {
            errorBars.style.color = "red"
            errorBars.innerHTML = errorMsgBars
        }
        setTimeout(() => errorBars.innerHTML = "", 3000)
    }
    // if the registration number is valid
    // then add add it to the array of valid registration numbers
    else {
        errorBars.style.color = "green"
        errorBars.innerHTML = "Added successfully"
        registrationsBars.addRegNumber(regBars)
        displayTemplate(registrationsBars.getRegNumbers()) // add or update the registration number being displayed
        addToLocalStorageBars() // add or update the registration numbers in local storage
        setTimeout(() => errorBars.innerHTML = "", 3000)
    }
    // reset the error messge
    registrationsBars.clearErrorMessage()
    // reset the form inputs
    document.querySelector(".regFormBars").reset()
})

// listen to drop down when changed
townBars.addEventListener("change", () => {
    // filter the towns by their town code
    displayTemplate(registrationsBars.filterByTownCode(townBars.value))
})

// reset everything when we are done
resetBtnBars.addEventListener("click", e => {
    e.preventDefault()
    localStorage.removeItem("regNumbersBars")
    registrationsBars.reset()
    errorBars.style.color = "green"
    errorBars.innerHTML = "Registration reseted"
    displayTemplate(registrationsBars.getRegNumbers())
    setTimeout(() => errorBars.innerHTML = "", 3000)
})