function include(url) {
    var script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('body')[0].append(script);
}

include('static/natashagame/js/constants.js')
include('static/natashagame/js/elements.js')
setTimeout(include,100,'static/natashagame/js/main.js')