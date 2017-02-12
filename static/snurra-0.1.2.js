(function () {
	'use strict';
	var _animationEndEvents = 'webkitAnimationEnd mozAnimationEnd msAnimationEnd oAnimationEnd animationend', svgString = '<svg id="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><style>@-webkit-keyframes animSpin { 0% {opacity: 1;} 100% {opacity: 0.1;} }@keyframes animSpin { 0% {opacity: 1;} 100% {opacity: 0.1;} }.animSpin {-webkit-animation-name: animSpin;-webkit-animation-iteration-count: infinite;-webkit-animation-duration: 1s;animation-name: animSpin;animation-iteration-count: infinite;animation-duration: 1s;opacity: 0.1;}</style><path d="M15 0 H17 V8 H15 z" transform="rotate(0 16 16)" class="animSpin" style="-webkit-animation-delay: 0s; animation-delay: 0s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(22.5 16 16)" class="animSpin" style="-webkit-animation-delay: 0.0625s; animation-delay: 0.0625s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(45 16 16)" class="animSpin" style="-webkit-animation-delay: 0.125s; animation-delay: 0.125s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(67.5 16 16)" class="animSpin" style="-webkit-animation-delay: 0.1875s; animation-delay: 0.1875s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(90 16 16)" class="animSpin" style="-webkit-animation-delay: 0.25s; animation-delay: 0.25s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(112.5 16 16)" class="animSpin" style="-webkit-animation-delay: 0.3125s; animation-delay: 0.3125s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(135 16 16)" class="animSpin" style="-webkit-animation-delay: 0.375s; animation-delay: 0.375s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(157.5 16 16)" class="animSpin" style="-webkit-animation-delay: 0.4375s; animation-delay: 0.4375s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(180 16 16)" class="animSpin" style="-webkit-animation-delay: 0.5s; animation-delay: 0.5s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(202.5 16 16)" class="animSpin" style="-webkit-animation-delay: 0.5625s; animation-delay: 0.5625s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(225 16 16)" class="animSpin" style="-webkit-animation-delay: 0.625s; animation-delay: 0.625s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(247.5 16 16)" class="animSpin" style="-webkit-animation-delay: 0.6875s; animation-delay: 0.6875s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(270 16 16)" class="animSpin" style="-webkit-animation-delay: 0.75s; animation-delay: 0.75s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(292.5 16 16)" class="animSpin" style="-webkit-animation-delay: 0.8125s; animation-delay: 0.8125s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(315 16 16)" class="animSpin" style="-webkit-animation-delay: 0.875s; animation-delay: 0.875s"></path><path d="M15 0 H17 V8 H15 z" transform="rotate(337.5 16 16)" class="animSpin" style="-webkit-animation-delay: 0.9375s; animation-delay: 0.9375s"></path></svg>';

	var spinners = {
		default: svgString
	};

	function _moveChildren(from, to) {
		if (!from.firstChild) return;
		to.appendChild(from.firstChild);
		_moveChildren(from, to);
	}

	function _setOptions(opt) {
		if (opt === undefined || opt === null) opt = {};
		var o = {};
		for (var i in defaults) o[i] = (opt[i] !== undefined) ? opt[i] : defaults[i];
		return o;
	}

	function _toElement(html) {
		var a = document.createElement('div');
		a.innerHTML = html;
		return a.firstChild;
	}

	function _removeAttr(els, attrib) {
		_each(els, function (el) {
			el.removeAttribute(attrib);
		});
	}

	function _toInt(n) {
		return parseInt(n, 10);
	}

	function _each(o, func) {
		if (!o || (o.length === 0 && o != window)) return;
		if (!o.length) func(o);
		else Array.prototype.forEach.call(o, function (el, i) {
			func(el);
		});
	}

	function _one(el, events, func, useCapture) {
		var fnc = function (ev) {
			_off(el, events, fnc, useCapture);
			func(ev);
		}
		_on(el, events, fnc, useCapture);
	}

	function _on(els, events, func, useCapture) {
		if (useCapture === undefined) useCapture = false
		_each(els, function (el) {
			var ev = events.split(' ');
			for (var e in ev) el.addEventListener(ev[e], func, useCapture);
		});
	}

	function _off(els, events, func, useCapture) {
		if (useCapture === undefined) useCapture = false
		_each(els, function (el) {
			var ev = events.split(' ');
			for (var e in ev) el.removeEventListener(ev[e], func, useCapture);
		});
	}
	function _stopEventPropagation(e) {
		if (typeof e.stopPropagation === 'function') {
			e.stopPropagation();
			e.preventDefault();
		} else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
			window.event.cancelBubble = true;
		}
	}
	function _addClass(els, cls) {
		_each(els, function (el) {
			if (el.classList) {
				var arr = cls.split(' ');
				for (var i in arr) el.classList.add(arr[i]);
			} else el.className += ' ' + cls;
		});
	}

	function _removeClass(els, cls) {
		_each(els, function (el) {
			if (el.classList) {
				var arr = cls.split(' ');
				for (var i in arr) el.classList.remove(arr[i]);
			} else el.className = el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		});
	}

	function _attr(els, attrib, value) {
		if (value === undefined && els && els.getAttribute !== undefined) return els.getAttribute(attrib);
		_each(els, function (el) {
			el.setAttribute(attrib, value);
		});
	}

	function _getSVG(url, callback) {
		var r = new XMLHttpRequest();
		r.onreadystatechange = function (e) {
			if (r.readyState == 4 && r.status == 200) callback(r.responseText);
		};
		r.open('GET', url);
		r.overrideMimeType('text/plain');
		r.send();
	}

	function _isString(obj) {
		return (typeof obj === 'string');
	}

	/* ************************************
	############### SNURRA ################
	************************************ */

	var defaults = {
		autoStart: true,
		maxSize: 24,
		autoStartOnClick: null,
		onClick: null,
		spinner: 'default'
	};

	var Base = function (el, options) {
		if (_isString(el)) el = document.querySelector(el);
		if (!el) return;
		this.opt = _setOptions(options);
		this.el = el;
		if (this.opt.onClick) {
			this.opt.autoStart = false;
			this.tapOn(this.opt.onClick);
		}
		this.eventListeners = [];
		if (this.opt.autoStart) this.start();
	};
	Base.prototype.start = function () {
		if (_attr(this.el, 'data-spinning')) return;
		var spinner = (spinners[this.opt.spinner]) ? _toElement(spinners[this.opt.spinner]) : _toElement(spinners.default);

		_addClass(this.el, 'snurra');
		this.textEl = document.createElement('div');
		_moveChildren(this.el, this.textEl);
		
		this.wrapperEl = document.createElement('div');
		this.wrapperEl.appendChild(spinner);
		_addClass(this.textEl, 'snurra-text');
		_addClass(this.wrapperEl, 'snurra-img');
		
		this.el.appendChild(this.textEl);
		this.el.appendChild(this.wrapperEl);
		var s = this.el.clientHeight - 6; // -6??
		if (s > this.opt.maxSize) s = this.opt.maxSize;
		_attr(this.el, 'data-spinning', true);
		_attr(spinner, 'height', s);
		_attr(spinner, 'width', s);
		
		this.wrapperEl.style.width = s + 'px';
		this.wrapperEl.style.height = s + 'px';
		this.wrapperEl.style.marginLeft = '-' + _toInt(s / 2) + 'px';
		this.wrapperEl.style.marginTop = '-' + _toInt(s / 2) + 'px';
		_attr(this.el, 'disabled', 'true');
		_addClass(this.textEl, 'snurra-text-fadeout');
		_addClass(this.wrapperEl, 'snurra-img-fadein');
	};
	Base.prototype.stop = function (callback) {
		if (!_attr(this.el, 'data-spinning')) return;
		_removeAttr(this.el, 'disabled');
		_removeAttr(this.el, 'data-spinning');
		_removeClass(this.textEl, 'snurra-text-fadeout');
		_removeClass(this.wrapperEl, 'snurra-img-fadein');
		_addClass(this.textEl, 'snurra-text-fadein');
		_addClass(this.wrapperEl, 'snurra-img-fadeout');
		_one(this.textEl, _animationEndEvents, (function (ev) {
			_moveChildren(this.textEl, this.el);
			this.el.removeChild(this.textEl);
			this.el.removeChild(this.wrapperEl);
			_removeClass(this.el, 'snurra');
			if (callback) callback(this);
		}).bind(this));
	};
	Base.prototype.destroy = function (callback) {
		this.stop(callback);
		for (var e in this.eventListeners) {
			var ev = this.eventListeners[e];
			this.off(ev.e, ev.c, ev.u);
		}
		if (this.onClickEvent) this.offClick();
	};
	Base.prototype.pushEvent = function (events, callback, useCapture) {
		this.eventListeners.push({
			e: events,
			c: callback,
			u: useCapture
		});
	};

	Base.prototype.on = function (events, callback, useCapture) {
		this.pushEvent.push(events, callback, useCapture);
		_on(this.el, events, callback, useCapture);
	};
	Base.prototype.one = function (events, callback, useCapture) {
		this.pushEvent.push(events, callback, useCapture);
		_one(this.el, events, callback, useCapture);
	};
	Base.prototype.onClick = function (callback) {
		this.opt.onClick = callback;
		if (this.onClickEvent) this.offClick();
		if (this.opt.autoStartOnClick !== false) this.opt.autoStartOnClick = true;
		this.onClickEvent = function (ev) {
			if (this.opt.autoStartOnClick) this.start();
			this.opt.onClick(ev);
		};
		_on(this.el, 'click', this.onClickEvent.bind(this));
	};
	Base.prototype.offClick = function () {
		_off(this.el, 'click', this.onClickEvent);
	};
	Base.prototype.off = function (events, callback, useCapture) {
		_off(this.el, events, callback, useCapture);
	};

	var scope = this;
	scope.Snurra = function (el, options) {
		var instance = new Base(el, options);
		return instance;
	};
	scope.Snurra.globals = defaults;
	scope.Snurra.addStringSpinner = function (name, data, setAsDefault) {
		if (spinners[name]) return;
		spinners[url] = data;
		if (setAsDefault) scope.Snurra.globals.spinner = name;
	};
	scope.Snurra.addSpinner = function (url, setAsDefault) {
		if (spinners[url]) return;
		_getSVG(url, function (data) {
			if (data) {
				spinners[url] = data;
				if (setAsDefault) scope.Snurra.globals.spinner = url;
			}
			else console.log('could not download spinner "' + url + '"');
		});
	};
}).call(this);