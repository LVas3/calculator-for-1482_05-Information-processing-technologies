// script.js

let currentInput = '';
let previousInput = '';
let operation = null;

// Получение элементов
const display = document.getElementById('display');
const historyLog = document.getElementById('history-log');

// Функция для добавления цифр/точки в текущий ввод
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

// Установка выбранной операции
function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        // Если есть предыдущий ввод, считаем промежуточный результат
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

// Основная функция вычисления
function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Деление на ноль невозможно');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Запись результата и истории
    const expression = `${previousInput} ${operation} ${currentInput} = ${result}`;
    addToHistory(expression);

    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

// Очистка дисплея
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

// Обновление отображения
function updateDisplay() {
    display.value = currentInput;
}

// Добавление записи в историю
function addToHistory(entry) {
    const timestamp = new Date().toLocaleString();
    historyLog.innerText += `[${timestamp}] ${entry}\n`;
    // Автоматическая прокрутка вниз
    historyLog.scrollTop = historyLog.scrollHeight;
}
function clearHistory() {
    document.getElementById('history-log').innerText = '';
}
function addToHistory(entry) {
    const historyContainer = document.getElementById('history-log');
    const timestamp = new Date().toLocaleString();
    const newEntry = document.createElement('div');
    newEntry.innerText = `[${timestamp}] ${entry}`;
    historyContainer.appendChild(newEntry);
    // автоматическая прокрутка вниз
    historyContainer.scrollTop = historyContainer.scrollHeight;
}
function appendNumber(number) {
    // Проверка на ввод числа с ведущим нулём
    if (number === '0' && currentInput === '0') {
        // Не добавлять лишние нули
        return;
    }
    if (number === '.' && currentInput.includes('.')) return;
    // Если текущий ввод — это '0' и добавляем ещё число, заменить его
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}