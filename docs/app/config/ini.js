define(function(require, exports, module){
    var config = {
        uri: module.id || module.uri
    };
    config.indexPath = "/home";
    config.notFoundPath = "/404";
    config.pathViewMap = {
        "/home": "",
		"/mvc":"",
        "/404": ""
    };
    config.defaultViewName = "app/views/layouts/default";
    return config;
});
