'use strict';
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');
        }
    }
}


if (document.querySelector('.slider-about__body')) {
    new Swiper('.slider-about__body', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        speed: 800,
        // Arrows
        navigation: {
            nextEl: '.slider-about__navigation .slider-arrow_right',
            prevEl: '.slider-about__navigation .slider-arrow_left',
        },
    });
}
if (document.querySelector('.special-tabs-slider__body')) {
    const swiperSpecial = new Swiper('.special-tabs-slider__body', {
        observer: true,
        observeParents: true,
        spaceBetween: 1,
        watchOverflow: false,
        speed: 600,
        grid: {
            rows: 3,
            fill: 'column'
        },
        // Dotts
        pagination: {
            el: '.special-tabs-slider__bullets',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '0' + (index + 1) + '</span>';
            }
        },
        // Arrows
        navigation: {
            nextEl: '.special-tabs-slider__navigation .slider-arrow_right',
            prevEl: '.special-tabs-slider__navigation .slider-arrow_left',
        },
        init: false,
        on: {
            beforeResize: function () {
                sliderSpecialChange();
            },
            resize: function () {
                sliderSpecialChange();
            }
        }
    });
    function sliderSpecialChange() {
        if (window.innerWidth < 480) {
            swiperSpecial.params.slidesPerGroup = 1;
            swiperSpecial.params.slidesPerView = 1;
        } else {
            swiperSpecial.params.slidesPerGroup = 2;
            swiperSpecial.params.slidesPerView = 2;
        }
    }
    swiperSpecial.init();
}

// *isMobile
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

// *Эта функция проверяет поддерживается ли браузером формат изображения webp и если поддерживается, то эта функция добавляет из css-документа внутрь html-документа класс с изобажением формата webp
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support === true) {
        document.querySelector('html').classList.add('_webp');
    } else {
        document.querySelector('html').classList.add('_no-webp');
    }
});


// *iconMenu
const wrapper = document.querySelector('.wrapper');
let aside = document.querySelector('.aside');
let iconMenu = document.querySelector('.icon-menu');
if (iconMenu) {
    const asideCover = document.querySelector('.aside__cover');
    if (asideCover) {
        asideCover.addEventListener('click', function () {
            if (iconMenu.classList.contains('_active')) {
                menu_close();
                changeIcon();
            }
        });
    }
    iconMenu.addEventListener('click', function () {
        iconMenu.classList.toggle('_active');
        aside.classList.toggle('_active');
        document.body.classList.toggle('_lock');
        if (iconMenu.classList.contains('_active') && !iconMenu.classList.contains('_change')) {
            iconMenu.classList.add('_change')
        } else if (offset(iconMenu).top < 200 && iconMenu.classList.contains('_change') && !iconMenu.classList.contains('_active')) {
            iconMenu.classList.remove('_change')
        }
        if (!isMobile.any()) {
            if (iconMenu.classList.contains('_active')) {
                const asideWidth = aside.querySelector('.aside__wrapper').offsetWidth;
                wrapper.style.marginLeft = `${asideWidth}px`;
            } else {
                wrapper.style.marginLeft = `0px`;
            }
        }
    })
    window.addEventListener('scroll', changeIcon);
    function changeIcon() {
        if (offset(iconMenu).top > 200) {
            iconMenu.classList.add('_change')
        } else {
            iconMenu.classList.remove('_change')
        }
    }
    changeIcon();
}
// Menu close
function menu_close() {
    iconMenu.classList.remove("_active");
    aside.classList.remove("_active");
    document.body.classList.remove('_lock');
    if (!isMobile.any()) {
        wrapper.style.marginLeft = `0px`;
    }
}

// *Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
    let tab = tabs[index];
    let tabs_items = tab.querySelectorAll("._tabs-item");
    let tabs_blocks = tab.querySelectorAll("._tabs-block");
    for (let index = 0; index < tabs_items.length; index++) {
        let tabs_item = tabs_items[index];
        tabs_item.addEventListener("click", function (e) {
            for (let index = 0; index < tabs_items.length; index++) {
                let tabs_item = tabs_items[index];
                tabs_item.classList.remove('_active');
                tabs_blocks[index].classList.remove('_active');
            }
            tabs_item.classList.add('_active');
            tabs_blocks[index].classList.add('_active');
            e.preventDefault();
        });
    }
}

// *Spollers
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
    // Инициализация обычных спойлеров
    initSpollers(spollersArray);
    // Инициализация
    function initSpollers(spollersArray) {
        spollersArray.forEach(spollersBlock => {
            initSpollerBody(spollersBlock);
            spollersBlock.addEventListener('click', setSpollerAction);
        });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')) {
                        spollerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1');
                    spollerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }
    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (!spollerTitle.classList.contains('_active')) {
                    hideSpollersBody(spollersBlock)
                }
                spollerTitle.classList.toggle('_active')
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }

    function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
    }
}

// *Slide Toggle
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide')
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide')
        }, duration);
    }
};
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide')
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};
const optionsParents = document.querySelectorAll('.choose-hello-offer__options')
if (optionsParents.length > 0) {
    for (const optionsParent of optionsParents) {
        const optionsInputs = optionsParent.querySelectorAll('.options__input');
        if (optionsInputs.length > 0) {
            for (let index = 0; index < optionsInputs.length; index++) {
                const optionsInput = optionsInputs[index];
                optionsInput.addEventListener('click', function () {
                    const optionInputParent = optionsInput.closest('.options__item');
                    if (!optionInputParent.classList.contains('_checked')) {
                        const сheckedOther = optionsParent.querySelector('.options__item._checked');
                        if (сheckedOther) {
                            сheckedOther.classList.remove('_checked')
                        }
                        optionsInput.closest('.options__item').classList.add('_checked')
                    }
                });
            }
        }
    }
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			input.addEventListener('focus', function (e) {
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("99:99", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			});
			if (input.classList.contains('_date')) {
				const calendarItem = datepicker(input, {
					customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					overlayButton: 'Применить',
					overlayPlaceholder: 'Год (4 цифры)',
					startDay: 1,
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
				const dataFrom = input.getAttribute('data-from');
				const dataTo = input.getAttribute('data-to');
				if (dataFrom) {
					calendarItem.setMin(new Date(dataFrom));
				}
				if (dataTo) {
					calendarItem.setMax(new Date(dataTo));
				}
				const currentDay = document.querySelector('.qs-num.qs-current');
				const currentDayContent = +currentDay.innerHTML + 2;
				calendarItem.setMin(new Date(calendarItem.currentYear, calendarItem.currentMonth, currentDayContent));
			}
		}
	}
}

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function () {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
// Range Slider
const rangeSlider = document.querySelector('.range__slider');
if (rangeSlider) {
	noUiSlider.create(rangeSlider, {
		start: 5,
		connect: 'lower',
		range: {
			'min': [5],
			'max': [60]
		},
		format: wNumb({
			decimals: 0,
			suffix: 'м²'
		})
	});

	const input = document.getElementById('range-value');
	rangeSlider.noUiSlider.on('update', function (values) {
		input.value = values;
	});
	input.addEventListener('change', function () {
		rangeSlider.noUiSlider.set(this.value);
	});
}

// * LazyLoading
// window.onload необходим чтобы не было определённых багов с появлением картины 
window.onload = function () {
	const lazyImages = document.querySelectorAll('img[data-src]');
	if (lazyImages.length > 0) {
		const options = {
			rootMargin: "0px 0px 50px 0px",
			threshold: 0
		};
		const imageObserver = new IntersectionObserver(lazyImages => {
			for (let index = 0; index < lazyImages.length; index++) {
				const lazyImage = lazyImages[index];
				if (lazyImage.isIntersecting) {
					loadImage(lazyImage.target)
					imageObserver.unobserve(lazyImage.target);
				} else {
					return;
				}
			}
		}, options);

		function loadImage(image) {
			if (image.dataset.src) {
				image.src = image.dataset.src;
				image.removeAttribute('data-src');
				if (image.previousElementSibling) {
					webpDelete(image)
				}
			}
		}

		function webpDelete(img) {
			const webp = img.previousElementSibling;
			if (webp.tagName == 'SOURCE') {
				const dataImgSrc = img.getAttribute('src').split('.');
				if (dataImgSrc[1] !== 'svg') {
					dataImgSrc[1] = 'webp'
				}
				const dataImgSrcWebp = dataImgSrc.join('.');
				webp.setAttribute('srcset', dataImgSrcWebp);
				webp.removeAttribute('data-srcset');
			}
		}

		lazyImages.forEach(image => {
			if (image.getBoundingClientRect().top + pageYOffset > pageYOffset) {
				imageObserver.observe(image);
			} else {
				loadImage(image);
			}
		});
	}

	const loadMapBlock = document.querySelector('._load-map');
	if (loadMapBlock && !loadMapBlock.classList.contains('_loaded')) {
		const loadMapUrl = loadMapBlock.dataset.map;
		if (loadMapUrl) {
			const options = {
				rootMargin: "100px 0px 100px 0px",
				threshold: 0
			};
			const mapObserver = new IntersectionObserver((lazymap) => {
				if (lazymap[0].isIntersecting) {
					loadMapBlock.insertAdjacentHTML(
						'beforeend',
						`<iframe src="${loadMapUrl}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
					)
					loadMapBlock.removeAttribute('data-map')
					loadMapBlock.classList.add('_loaded')
					mapObserver.unobserve(lazymap[0].target)
				} else {
					return;
				}
			}, options);
			mapObserver.observe(loadMapBlock);
		}
	}
}

// *ScrollOnClick (Navigation)
const link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		const el = link[index];
		const block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.aside._active')) {
				menu_close();
				// body_lock_remove(500);
			}
			const target_block_class = el.getAttribute('href').replace('#', '');
			const target_block = document.querySelector('.' + target_block_class);
			_goto(target_block);
			e.preventDefault();
		})
	}
	window.addEventListener('scroll', function (el) {
		const old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				const el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			const block = blocks[index];
			const block_item = document.querySelector('.' + block);
			if (block_item) {
				const block_offset = offset(block_item).top;
				const block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					const current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						const current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
const goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		const goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			const target_block_class = goto_link.getAttribute('href').replace('#', '');
			const target_block = document.querySelector('.' + target_block_class);
			_goto(target_block);
			e.preventDefault();
		});
	}
}
function _goto(target_block) {
	window.scrollTo({
		top: offset(target_block).top - 50,
		behavior: "smooth"
	});
}

// *accurate page left/top coordinates
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

const parent_original = document.querySelector('.main-hello__body');
const parent = document.querySelector('.page');
const item = document.querySelector('.main-hello__offer');
function dinamicAdaptive(e) {
	if (e.matches) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[0])
			item.classList.add('done')
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2])
			item.classList.remove('done')
		}
	}
}
const mediaWidth = window.matchMedia('(max-width: 1199.98px)');
mediaWidth.addListener(dinamicAdaptive)
dinamicAdaptive(mediaWidth); 