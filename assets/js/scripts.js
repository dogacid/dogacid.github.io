// Off canvas menu 
let container = document.querySelector('.js-container')
let toggleButton = document.querySelector('.js-menu-toggle')

toggleButton.addEventListener('click', (e) => {
	e.preventDefault();
	container.classList.toggle('is-menu');
	document.body.classList.toggle("no-scroll");
	toggleButton.classList.toggle('is-active');

	if (toggleButton.getAttribute("aria-expanded") == "false") {
		toggleButton.setAttribute("aria-expanded", "true");
	} else {
		toggleButton.setAttribute("aria-expanded", "false");
	}
});


// Share buttons pop-up
(function () {
	// share popup
	let shareButton = document.querySelector('.js-post__share-button');
	let sharePopup = document.querySelector('.js-post__share-popup');

	if (shareButton) {
		 sharePopup.addEventListener('click', function (e) {
			  e.stopPropagation();
		 });

		 shareButton.addEventListener('click', function (e) {
			  e.preventDefault();
			  e.stopPropagation();
			  sharePopup.classList.toggle('is-visible');
		 });

		 document.body.addEventListener('click', function () {
			  sharePopup.classList.remove('is-visible');
		 });
	}

	// link selector and pop-up window size
	var Config = {
		 Link: ".js-share",
		 Width: 500,
		 Height: 500
	};
	// add handler links
	var slink = document.querySelectorAll(Config.Link);
	for (var a = 0; a < slink.length; a++) {
		 slink[a].onclick = PopupHandler;
	}
	// create popup
	function PopupHandler(e) {
		 e = (e ? e : window.event);
		 var t = (e.target ? e.target : e.srcElement);
		 // hide share popup
		 if (sharePopup) {
			  sharePopup.classList.remove('is-visible');
		 }
		 // popup position
		 var px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
			  py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);
		 // open popup
		 var link_href = t.href ? t.href : t.parentNode.href;
		 var popup = window.open(link_href, "social",
			  "width=" + Config.Width + ",height=" + Config.Height +
			  ",left=" + px + ",top=" + py +
			  ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
		 if (popup) {
			  popup.focus();
			  if (e.preventDefault) e.preventDefault();
			  e.returnValue = false;
		 }

		 return !!popup;
	}
})();

// Responsive embeds script
(function () {
	let wrappers = document.querySelectorAll('.post__video, .post__iframe');

	for (let i = 0; i < wrappers.length; i++) {
		let embed = wrappers[i].querySelector('iframe, embed, video, object');

		if (!embed) {
			continue;
		}

        if (embed.getAttribute('data-responsive') === 'false') {
            continue;
        }

		let w = embed.getAttribute('width');
		let h = embed.getAttribute('height');
		let ratio = false;

		if (!w || !h) {
			continue;
		}
		
		if (w.indexOf('%') > -1 && h.indexOf('%') > -1) { // percentage mode
			w = parseFloat(w.replace('%', ''));
			h = parseFloat(h.replace('%', ''));
			ratio = h / w;
		} else if (w.indexOf('%') === -1 && h.indexOf('%') === -1) { // pixels mode
			w = parseInt(w, 10);
			h = parseInt(h, 10);
			ratio = h / w;
		}

		if (ratio !== false) {
			let ratioValue = (ratio * 100) + '%';
			wrappers[i].setAttribute('style', '--embed-aspect-ratio:' + ratioValue);
		}
	}
})();