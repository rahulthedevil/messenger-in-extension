let timeout, manifest = {
    "url": chrome.runtime.getURL('')
};

const init = () => {
    if (timeout) window.clearTimeout(timeout);
    timeout = window.setTimeout(function () {
        var size = { height: 800, width: 1000 };
        var _outerData = (size.height === window.outerHeight) && (size.width === window.outerWidth);
        var _innerData = (size.height === window.innerHeight) && (size.width === window.innerWidth);
        if (_outerData || _innerData) {
            var table = document.createElement("table");
            table.setAttribute("id", "toolbar");
            /*  */
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.setAttribute("id", "reload");
            td.setAttribute("title", "Reoad current page");
            td.addEventListener("click", function () {
                document.location.reload()
            });
            td.style.backgroundImage = "url(" + manifest.url + "panel/icons/reload.png)";
            tr.appendChild(td);
            table.appendChild(tr);
            /*  */
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.setAttribute("id", "popout");
            td.setAttribute("title", "Open Messenger in a new tab (note: this window will be closed)");
            td.style.backgroundImage = "url(" + manifest.url + "panel/icons/popout.png)";
            tr.appendChild(td);
            table.appendChild(tr);
            /*  */
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.setAttribute("id", "makedark");
            td.setAttribute("title", "Invert the colors");
            td.style.backgroundImage = "url(" + manifest.url + "panel/icons/makedark.png)";
            tr.appendChild(td);
            table.appendChild(tr);
            /*  */
            document.body.insertBefore(table, document.body.firstChild);
            /*  */
            let _popoutData = document.getElementById("popout");
            let _toolbarData = document.getElementById("toolbar");
            let _makedarkData = document.getElementById("makedark");
            let _messengerData = document.getElementById("messenger");
            /*  */
            _popoutData.addEventListener("click", function () {
                window.open("https://www.messenger.com/");
                window.close();
            });

            chrome.storage.local.get(["dark"], (data) => {
                if (_messengerData) _messengerData.setAttribute("dark", data.dark);
                else document.body.setAttribute("dark", data.dark);
            });
            _makedarkData.addEventListener("click", function () {
                chrome.storage.local.get(["dark"], (data1) => {
                    let _dark = data1.dark;
                    _dark = (_dark === true) ? false : true;
                    chrome.storage.local.set({ "dark": _dark });
                    if (_messengerData) _messengerData.setAttribute("dark", _dark);
                    else document.body.setAttribute("dark", _dark);
                });
            });
            /*  */
            window.setTimeout(function () {
                _toolbarData.setAttribute("show", false)
            }, 3000);
            _toolbarData.addEventListener('mouseenter', function (e) {
                this.setAttribute("show", true)
            });
            _toolbarData.addEventListener('mouseleave', function (e) {
                this.setAttribute("show", false)
            });
        }
    }, 300);
}

const load = () => {
    init();
    window.removeEventListener("load", load, false);
};

window.addEventListener("load", load, false);