/**
 * 
 * aj(ax) (Get or Post)
 * @TODO: include option for responseAsObject
 * 
 * @param  {} params 
 * @return void
 *
 */
function aj(d) {
    var request = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHttp") : window.XMLHttpRequest ? new XMLHttpRequest() : false; //  another ternary;
    
    // calls the error function if request is false, then returns
    if (!request && d.error('File not found')) return; 

    request.onreadystatechange = function() { 
        if (4 == request.readyState) {
            if (200 == request.status) 
                d.success(d.responseAsObject ? JSON.parse(request.responseText) : request.responseText);
            else 
                d.error(request)

            if (d.done instanceof Function) d.done(request)
        }
    };
    //  + (d.requestType == "GET" ? + "?" + d.data : "")
    console.log(d);
    request.open(
        (d.requestType||"POST"), 
        d.url + (
            d.route 
            ? 
                "/" + d.data 
            : 
                d.requestType == "GET" 
                ? 
                    "?" + d.data 
                : 
                    ""
        ), 
        true);
    
    request.setRequestHeader('X-Requested-With', (d.requestedWith||'XMLHttpRequest'));
    request.setRequestHeader('Content-type', (d.contentType||'application/x-www-form-urlencoded')); 
    request.send(d.data);
    console.log(request);
}
