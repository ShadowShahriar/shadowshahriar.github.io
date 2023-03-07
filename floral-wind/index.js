const sizeMin = 90
const sizeMax = 250
const offset = 55
const shift = 400
const body = document.querySelector('body')
const colors = [
	'#f7b267',
	'#f79d65',
	'#f4845f',
	'#f27059',
	'#f25c54',
	'#c9184a',
	'#a4133c',
	'#F9B58B'
]

function random(min, max, round) {
	let result = min + Math.random() * (max - min)
	return round ? Math.round(result) : result
}

function flower(e) {
	let x = e.clientX,
		y = e.clientY,
		n = random(1, 8, true)

	for (let i = 0; i < n; i++) {
		let elem = document.createElement('div')
		let estyle = elem.style

		let size = random(sizeMin, sizeMax)
		estyle.fontSize = `${size}px`

		let coordx = x + random(offset * -1, offset) - size / 2
		let coordy = y + random(offset * -1, offset) - size / 2
		estyle.left = `${coordx}px`
		estyle.top = `${coordy}px`

		let color = random(0, colors.length - 1, true)
		estyle.color = colors[color]
		elem.innerText = '*'

		let newX = random(shift * -1, shift),
			newY = random(shift * -1, shift),
			delay = random(10, 40) / 1000

		estyle.setProperty('--i', `${delay}s`)
		estyle.setProperty('--shiftX', `${newX}px`)
		estyle.setProperty('--shiftY', `${newY}px`)
		estyle.setProperty('--color', `${colors[color]}99`)
		;['webkitAnimationEnd', 'animationend'].forEach(ev =>
			elem.addEventListener(ev, () => elem.remove())
		)

		body.appendChild(elem)
	}
}

body.addEventListener('mousemove', e => flower(e))
body.addEventListener('touchmove', e => {
	e.preventDefault()
	let touch_points = e.touches.length
	for (let i = 0; i < touch_points; i++) {
		flower(e.touches[i])
	}
})
