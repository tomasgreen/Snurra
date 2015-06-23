var entityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': '&quot;',
	"'": '&#39;',
	"/": '&#x2F;'
};

function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/]/g, function (s) {
		return entityMap[s];
	});
}

function addEvent(el, events, func, useCapture) {
	if (useCapture === undefined) useCapture = false;
	var arr = events.split(' ');
	for (var i in arr) {
		el.addEventListener(arr[i], func, useCapture);
	}
}

function _on(el, events, func, useCapture) {
	if (!el || (el.length === 0 && el != window)) return;
	if (useCapture === undefined) useCapture = false;
	if (el.length) {
		for (var i = 0; i < el.length; i++) {
			_on(el[i], events, func, useCapture);
		}
		return;
	}
	var ev = events.split(' ');
	for (var e in ev) {
		el.addEventListener(ev[e], func, useCapture);
	}
}

function _stopEventPropagation(e) {
	if (typeof e.stopPropagation === 'function') {
		e.stopPropagation();
		e.preventDefault();
	} else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
		window.event.cancelBubble = true;
	}
}

function _tapOn(el, func) {
	if (el.ontouchstart === undefined) {
		_on(el, 'click', func);
		return;
	}
	var t = false;
	_on(el, 'touchstart', function (ev) {
		t = true;
	});
	_on(el, 'touchend', function (ev) {
		if (t) {
			func(ev);
			_stopEventPropagation(ev);
		}
	});
	_on(el, 'touchcancel touchleave touchmove', function (ev) {
		t = false;
	});
}

function example1() {
	var btn = document.getElementById('example1');
	_tapOn(btn,function(){
		var s = Snurra(btn);
		setTimeout(function(){
			s.destroy();
		},3000);
	});
}
function example2() {
	var s = Snurra('#example2',{
		autoStart: false
	});
	_tapOn(s.el,function(){
		s.start();
		setTimeout(function(){
			s.stop();
		},3000);
	});
}
function example3() {
	var s = Snurra('#example3',{
		autoStart: false
	});
	s.onTap(function(){
		setTimeout(function(){
			s.stop();
		},3000);
	});
}
function example4() {
	var btn = document.getElementById('example4');
	_tapOn(btn,function(){
		var s = Snurra('#example4',{
			spinner: 'static/bubbles.svg',
			maxSize: 40
		});
		setTimeout(function(){
			s.destroy();
		},3000);
	});
}
function example5 () {
	var btn = document.getElementById('example5');
	_tapOn(btn,function(){
		var s = Snurra(btn);
		setTimeout(function(){
			s.destroy();
		},3000);
	});
}
document.addEventListener('DOMContentLoaded', function () {
	hljs.initHighlightingOnLoad();
	Snurra.addSpinner('static/bubbles.svg');
	example1();
	example2();
	example3();
	example4();
	example5();
});