// MAKE REFERENCES TO MY DOM ELEMENTS
const inputBox = document.querySelector(".inputBox")
const addBtn = document.querySelector(".addBtn")
const resetBtn = document.querySelector(".resetBtn")
const town = document.querySelector("#town")
const display = document.querySelector(".display")
const error = document.querySelector(".error")

// CREATE INSTANCE TO MY DOM PROJECT
const registrations = RegistrationNumber()

// DOM FUNCTIONS
// this function will check the the registration number in the array
// and then display the to screen
const addAllToList = list => {
    display.innerHTML = ""
    list.forEach(el => addItem(el))
    if(list.length === 0) display.innerHTML = "<h3 class=\"not-avilable\">No registrations available</h3>"
}

// this function will add a node element to DOM
const addItem = item => {
    const myItem = createItem(item)
    display.append(myItem)
}

// this function will create a node element to be added to DOM
const createItem = item => {
    const elem = document.createElement("span")
    elem.className = "list-item"
    elem.textContent = item
    return item.trim() === "" ? item : elem
}

// // this function will add the current registration number to local storage
const addToLocalStorage = () => localStorage.setItem("regNumbers", JSON.stringify(registrations.getRegNumbers()))

// // get registration numbers from local storage
const getFromLocalStorage = () => JSON.parse(localStorage.getItem("regNumbers"))

// // check if there are any registration numbers in local storage
// // if they exist and then add them to my valid registration numbers instance
getFromLocalStorage() !== null && getFromLocalStorage().forEach(el => registrations.addRegNumber(el)), addAllToList(registrations.getRegNumbers())

// EVENT LISTENERS
// listen to add button when clicked
addBtn.addEventListener("click", e => {
    e.preventDefault()
    
    // set the current registration number so that it can be validated
    registrations.setRegNumber(inputBox.value.toUpperCase())
    // get the registration number
    const reg = registrations.getRegNumber()
    let errorMsg = registrations.getErrorMessage()

    console.log(registrations.getRegNumbers())
    // if the registration number is not valid
    // show error message for three seconds
    if(errorMsg !== ""){
        if(errorMsg === "Registration number already exists"){
            error.style.color = "#0000CD"
            error.innerHTML = errorMsg
        } else {
            error.style.color = "red"
            error.innerHTML = errorMsg
        }
        setTimeout(() => error.innerHTML = "", 3000)
    }
    // if the registration number is valid
    // then add add it to the array of valid registration numbers
    else {
        error.style.color = "green"
        error.innerHTML = "Added successfully"
        registrations.addRegNumber(reg)
        addAllToList(registrations.getRegNumbers()) // add or update the registration number being displayed
        addToLocalStorage() // add or update the registration numbers in local storage
        setTimeout(() => error.innerHTML = "", 3000)
    }
    // reset the error messge
    registrations.clearErrorMessage()
    // reset the form inputs
    document.querySelector(".regForm").reset()
})

// listen to drop down when changed
town.addEventListener("change", () => {
    // filter the towns by their town code
    addAllToList(registrations.filterByTownCode(town.value))
})

// reset everything when we are done
resetBtn.addEventListener("click", e => {
    e.preventDefault()
    localStorage.removeItem("regNumbers")
    registrations.reset()
    error.style.color = "green"
    error.innerHTML = "Registration reseted"
    addAllToList(registrations.getRegNumbers())
    setTimeout(() => error.innerHTML = "", 3000)
})