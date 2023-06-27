// Находим нужные элементы
const buttonStart = document.querySelector('#start')
const screens = document.querySelectorAll('#screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

// Создаём переменные, времени и счёт игрока
let time = 0
let score = 0

// Создаём массив где хранятся цвета circle
const colors = ['#7dca6f', '#e74c3c', '#e894b1', '#2a90a7', '#8e44ad', '#3498db', '#6729a8', '#e67e22', '#2ecc71']

// При клике на кнопку начать игрку, перематываем первый screen
buttonStart.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})


// При клике на кнопку выборки времени, определяем время и начинаем игру
timeList.addEventListener('click', (event) => {
	// Проверяем нажал ли игрок на кнопку
	if(event.target.classList.contains('time-btn')) {
		// Записываем в переменную time, то время которое выбрал игрок
		time = parseInt(event.target.getAttribute('date-time'))

		// Запускаем функцию setTime(), с параметром time
		setTime(time)
		// Запускаем функцию startGame()
		startGame()
	}
})

// При клике по board проверяем, если игрок нажал на circle, увеличиваем счёт на 1 и удаляем текущий circle, после чего добавляем новый circle
board.addEventListener('click', (event) => {
	if(event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})

// Функция отвечает за запуск игры и создания первого circle
function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	screens[1].classList.add('up')
}

// Функция отвечает за подсчёт времени
function decreaseTime() {
	if(time === 0) {
		finishGame()
	} else {
		let current = --time
		if(current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}
}


// Функция отвечает за запись в timeEl текущее время
function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}


// Функция отвечает за конец игры, убирает время и выводим счёт игрока
function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
}

// Функция отвечает за создание рандомного circle, и добавление его в board
function createRandomCircle() {
	const circle = document.createElement('div')
	const size = getRandomNumber(10, 60)
	const {width, height} = board.getBoundingClientRect()
	const сolorCircle = randomColorInCircle()

	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`

	// Задаём случайный background и boxShadow
	circle.style.background = сolorCircle
	circle.style.boxShadow = `0 0 2px${сolorCircle}, 0 0 10px ${сolorCircle}`

	board.append(circle)
}

// Функция отвечает за создание рандомных чисел, от минимального до максимального
function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

// Фунция отвечает за генерацию случайного цвета, цвет берётся из массива colors
function randomColorInCircle() {
	return colors[Math.floor(Math.random() * colors.length)]
}


// Фунция, которая отвечает за чит Аим Бот (Автоматически нажимает на circle)
function winTheGame() {
	function killCircle() {
		const circle = document.querySelector('.circle')

		if(circle) {
			circle.click()
		}
	}

	setInterval(killCircle, 1)
}