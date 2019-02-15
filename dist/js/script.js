'use strict';

document.addEventListener('DOMContentLoaded', function () {

	var firstRunButton = document.querySelector('.button_first-run');
	var restartButton = document.querySelector('.button_restar');
	var toster = document.querySelector('.toster');
	var header = document.querySelector('.header');
	var gameWrapper = document.querySelector('.game-wrapper');
	var contentWrapper = document.querySelector('.load-content');
	var gameTitle = document.querySelector('.game-title');
	console.log();

	// Создание конфетти 
	var createConfetti = function createConfetti() {
		var confetti = document.createElement('div');
		confetti.className = 'confetti';
		toster.appendChild(confetti);

		var countConfettiItems = 30;
		var confettiColors = ['#ffe89e', '#e8a270', '#ff797c', '#cf89e8', '#979cff'];
		var fragment = document.createDocumentFragment();
		for (var i = 0; i < countConfettiItems; i++) {
			var el = document.createElement('div');
			el.classList.add('confetti__item');
			el.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
			fragment.appendChild(el);
		}

		confetti.appendChild(fragment);

		var confettiItem = document.querySelector('.confetti__item');
		console.log(confettiItem);

		var confettiRun = anime({
			targets: '.confetti__item',
			translateY: -header.clientHeight - confettiItem.offsetTop - 100,
			duration: function duration() {
				return anime.random(500, 1200);
			},
			translateX: function translateX() {
				return anime.random(-gameWrapper.clientWidth / 2, gameWrapper.clientWidth / 2);
			},
			autoplay: true,
			easing: 'linear',
			complete: function complete(anim) {
				toster.removeChild(confetti);
				circleScale.restart();
				this.reset();
			}
		});
	};

	// Формирование углов поворота тостера во время тряски
	var rotations = [];
	for (var i = 0; i < 100; i++) {
		rotations.push({ 'rotate': anime.random(-5, 5) });
	};

	// Тряска тостера
	var shake = anime({
		targets: '.toster__body',
		keyframes: rotations,
		autoplay: false,
		duration: 1000,
		loop: true,
		easing: 'easeInOutExpo'
	});

	var flyToster = anime({
		targets: toster,
		keyframes: [{
			translateY: -1000,
			autoplay: false,
			duration: 0
		}, {
			translateY: 0,
			duration: 1200
		}]
	});

	// Вращение регулятора
	var tosterRegulator = anime({
		targets: '.toster__regulator',
		autoplay: false,
		loop: true,
		rotate: 360,
		duration: 500,
		easing: 'linear'
	});

	// Исчезновение заголовков
	var tosterText = anime({
		targets: '.game-title, .toster__text',
		opacity: 0,
		autoplay: false,
		duration: 300
	});

	// Вылет кнопки за тостер
	var flyBtn = anime({
		targets: '.button_first-run',
		autoplay: false,
		keyframes: [{
			translateY: -firstRunButton.offsetTop - firstRunButton.offsetHeight - 20,
			scale: 0.6,
			duration: 1000,
			zIndex: -2
		}, {
			translateY: 0
		}],
		complete: function complete(anim) {
			tosterRegulator.restart();
			shake.restart();
		}
	});

	// Закрашивание контентной области 
	var circleScale = anime({
		targets: '.toster__circle',
		scale: 20,
		background: '#ffffff',
		easing: 'linear',
		duration: 600,
		autoplay: false,
		complete: function complete(anime) {
			displayContent();
		}
	});

	// Отображение подгруженного контента
	var loadContentShow = anime({
		targets: '.load-content',
		opacity: 1,
		easing: 'linear',
		duration: 700,
		autoplay: false

	});

	var displayContent = function displayContent() {
		toster.style.display = 'none';
		gameTitle.style.display = 'none';
		circleScale.reset();
		contentWrapper.style.display = 'block';
		// location.hash = 'test';
		loadContentShow.restart();
	};

	var restartGame = function restartGame() {
		toster.style.display = 'block';
		gameTitle.style.display = 'block';
		flyBtn.reset();
		tosterText.reset();
		// location.hash = '';
		firstRunButton.style.display = 'inline-block';
		contentWrapper.style.display = 'none';
		// playGame();
		flyToster.play();
	};

	var playGame = function playGame() {
		tosterText.restart();
		flyBtn.restart();
		setTimeout(pauseGame, 3000);
	};

	var pauseGame = function pauseGame() {

		tosterRegulator.pause();
		shake.reset();
		createConfetti();
	};

	if (location.hash) {
		displayContent();
	}

	firstRunButton.onclick = playGame;
	restartButton.onclick = restartGame;

	var openMainNav = function openMainNav() {
		document.querySelector('.main-nav_mobile').classList.add('main-nav_active');
		body.classList.add('scroll-off');
	};

	var closeMainNav = function closeMainNav() {
		document.querySelector('.main-nav_mobile').classList.remove('main-nav_active');
		body.classList.remove('scroll-off');
	};

	var burger = document.querySelector('.burger');
	var closeBtnMainNav = document.querySelector('.btn-close_main-nav');
	var body = document.querySelector('body');

	burger.onclick = openMainNav;
	closeBtnMainNav.onclick = closeMainNav;
}, false);