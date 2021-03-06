var _ = require('underscore');

module.exports = function (menuService, messagesService, securityService, themeService, entityDescriptionService, trackingService, jadeParserService, securityConfigService) {
    var service = {};

    service.vars = function (req, obj) {
        var result = obj || {};
        var acceptLanguageHeader = req.header('Accept-Language');
        _.extend(result, {
            menuService: menuService,
            entityTypeId: req.params.entityTypeId,
            messages: messagesService.messages(acceptLanguageHeader),
            locale: messagesService.extractLocale(acceptLanguageHeader),
            user: req.user,
            securityService: securityService,
            entityTitle: req.params.entityTypeId && entityDescriptionService.entityDescription(entityDescriptionService.entityTypeIdCrudId(req.params.entityTypeId)).title || undefined,
            tracking: trackingService.trackingTemplateVars(),
            parser: jadeParserService,
            securityConfigService: securityConfigService,
            services: {
                menuService: menuService,
                entityTypeId: req.params.entityTypeId,
                messages: messagesService.messages(acceptLanguageHeader),
                locale: messagesService.extractLocale(acceptLanguageHeader),
                user: req.user,
                securityService: securityService,
                themeService: themeService
            }
        });
        return result;
    };

    service.setupLocals = function (req, res, obj) {
        res.locals = _.extend(res.locals, service.vars(req, obj));
    };

    return service;
};