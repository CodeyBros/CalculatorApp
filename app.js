const calculator = document.querySelector('.calculator');

// Display
const output = document.querySelector('#output-value');
const history = document.querySelector('#history-value');



// Key
const keys = document.querySelector('#keyboard');
keys.addEventListener('click', function(e) {
    if (e.target.matches('button')) {

        const key = e.target 
        const action = key.dataset.action
        const type = key.dataset.type
        const keyValue = key.textContent
        const outputValue = output.textContent
        const {previousKeyType} = calculator.dataset


       
        // Is Key Number?
        if (!action) {
            if (outputValue === '0' || previousKeyType === 'operator') {
                output.textContent = keyValue
            } else {
                output.textContent = outputValue + keyValue
            }

            calculator.dataset.previousKeyType = 'number';
        } 
        

        // Is Key Decimal
        if (action === 'decimal') {
            if (!outputValue.includes('.')) {
                output.textContent = outputValue + '.'
            } else if (previousKeyType === 'operator') {
                output.textContent = '0.'
            }

            calculator.dataset.previousKeyType = 'decimal';
        }

        // Is Operator Key?
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide' ||
            action === 'sqrt' ||
            action === 'percent' ||
            action === 'tan' ||
            action === 'cos' ||
            action === 'sin' ||
            action === 'sqr' ||
            action === 'log') {

                const firstValue = calculator.dataset.firstValue
                const operator = calculator.dataset.operator
                const secondValue = outputValue

                if (
                    firstValue &&
                    operator &&
                    previousKeyType !== 'operator'
                  ) {
                    const calcValue = calculate(firstValue, operator, secondValue)
                    output.textContent = calcValue
                    calculator.dataset.firstValue = calcValue
                } else { 
                    calculator.dataset.firstValue = outputValue
                }

                history.textContent = outputValue + keyValue

                calculator.dataset.firstValue = outputValue
                calculator.dataset.operator = action

                calculator.dataset.previousKeyType = 'operator'
        }

        //Is Key Equals-To?
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = outputValue

            if (firstValue) { 
                if (previousKeyType === 'calculate') {
                    firstValue = outputValue
                    secondValue = calculator.dataset.newSecondValue

                    history.textContent = ''
                    history.textContext = outputValue
                }
                
            }
            output.textContent = calculate(firstValue, operator, secondValue)
            history.textContent = history.textContent + outputValue

            calculator.dataset.newSecondValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'            
        }   

        function calculate(firstValue, operator, secondValue) {
            firstValue = parseFloat(firstValue)
            secondValue = parseFloat(secondValue)
            let result = ''

            if (operator === 'add') {
                result = firstValue + secondValue
            } else if (operator === 'subtract') {
                result = firstValue - secondValue
            } else if (operator === 'multiply') {
                result = firstValue * secondValue
            } else if (operator === 'divide') {
                result = firstValue / secondValue
            } else if (operator ==='percent') {
                result = firstValue / secondValue * 100 
            } else if (operator ==='sqrt') {
                result = Math.sqrt(firstValue)
            } else if (operator ==='sqr') {
                result = firstValue * firstValue
            } else if (operator ==='log') {
                result = Math.log10(firstValue)
            } else if (operator ==='tan') {
                result = Math.tan(firstValue)
            } else if (operator ==='cos') {
                result = Math.cos(firstValue)
            } else if (operator ==='sin') {
                result = Math.sin(firstValue)
            } 

            return result
        }

        // Is Button Clear
        if (action !== 'clear') {
            const clearButton = document.querySelector('[data-action="clear"]')
            clearButton.textContent = 'CE'
        }
        if (action === 'clear') {
            if (keyValue === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.newSecondValue = ''
                calculator.dataset.previousKeyType = ''
                history.textContent = ''
            } else {
                key.textContent = 'AC'
            }

            output.textContent = 0
            key.textContent = 'AC'

            calculator.dataset.previousKeyType = 'clear'
        }

    }
});

