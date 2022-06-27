
class calculator{
    constructor(previousCalc, currentCalc){
        this.currentCalc = currentCalc
        this.previousCalc = previousCalc
        this.allClear()
    }

    allClear(){
        this.currentValue = ''
        this.previousValue = ''
        this.operation = undefined
    }

    delete(){
        this.currentValue = this.currentValue.toString().slice(0, -1)
    }

    addNumber(number){
    if(number === '.' && this.currentValue.includes('.')) return
    this.currentValue = this.currentValue.toString() + number.toString()
    }

    selectOperation(operation){
    if(this.currentvalue === '') return
    if(this.previousValue !== ''){
        this.compute()
    }
    this.operation = operation
    this.previousValue = this.currentValue
    this.currentValue = ''
    }

    compute() {
    let computation
    const prev = parseFloat(this.previousValue) /* Converts the string to number */
    const current = parseFloat(this.currentValue) /* Converts the string to number */
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default:
            return
    }
    this.currentValue = computation
    this.operation = undefined
    this.previousValue = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0})
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    displayUpdate(){
        this.currentCalc.innerHTML = this.getDisplayNumber(this.currentValue)
        if(this.operation != null) {
            this.previousCalc.innerHTML = 
            `${this.getDisplayNumber(this.previousValue)} ${this.operation}`
        } else { 
            this.previousCalc.innerHTML = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allClear]')
const equalButton = document.querySelector('[data-equals]')
const previousCalc = document.querySelector('[data-previousCalcu]')
const currentCalc = document.querySelector('[data-currentCalcu]')

const Calculator = new calculator(previousCalc,currentCalc);

numberButtons.forEach(button => {
    button.addEventListener('click',() => {
        Calculator.addNumber(button.innerHTML)
        Calculator.displayUpdate()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',() => {
        Calculator.selectOperation(button.innerHTML)
        Calculator.displayUpdate()
    })
})

equalButton.addEventListener('click', button => {
    Calculator.compute()
    Calculator.displayUpdate()
})

deleteButton.addEventListener('click', button => {
    Calculator.delete()
    Calculator.displayUpdate()
})

allClearButton.addEventListener('click', button => {
    Calculator.allClear()
    Calculator.displayUpdate()
})

