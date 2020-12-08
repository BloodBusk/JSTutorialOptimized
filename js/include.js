/*Include function for multipled implimented html pages inside other html pages*/
window.onload = () => {
    let includeHTML = (a, b) => {
        let c = /^(?:file):/;
        let d = new XMLHttpRequest;
        let e = 0;
        //event handler for readyState changes
        d.onreadystatechange = () => {
            //when ready state is 4, operation is complete, this is where we handle the request
            4 == d.readyState && (e = d.status);
            c.test(location.href) && d.responseText && (e = 200);
            4 == d.readyState && 200 == e && (a.outerHTML = d.responseText);
        };
        try {
            d.open("GET", b, !0); //3 parameters of open(method, url, readState value must not be 0, an unsent state)
            d.send(); //sends the XMLHttpRequest to server
        } catch (exc) {}
    }
    //searches through all tags names and finds the tags with attribute include-html and gets them
    let c = document.getElementsByTagName("*");
    for (let b in c) {
        c[b].hasAttribute && c[b].hasAttribute("include-html") && includeHTML(c[b], c[b].getAttribute("include-html"))
    }
};
