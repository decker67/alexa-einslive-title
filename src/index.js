'use strict';
const Alexa = require('alexa-sdk');
const live1 = require('live1');
const APP_ID = 'amzn1.ask.skill.d9414751-12b3-46fe-941c-248eeb3bfca1';

const languageStrings = {
    'de-DE': {
        'translation': {
            'SKILL_NAME': '1live',
            'INTRO_MESSAGE': 'Auf 1Live läuft gerade <break time="500ms"/>',
            'VON_MESSAGE': ' von ',

            'HELP_MESSAGE': "Ich sage Dir was auf 1Live gerade läuft.",
            'HELP_REPROMPT': "Was möchtest Du wissen?",
            'STOP_MESSAGE': 'Tschüss'
        }
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetActualTitle');
    },

    'GetActualTitle': function () {
        live1.actualTitle((song) => {
            const speechOutput = song.title ?
                this.t('INTRO_MESSAGE') + song.title + this.t('VON_MESSAGE') + song.artist :
                this.t('INTRO_MESSAGE') + song.artist;
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), song.artist);
        });
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t(HELP_MESSAGE);
        const reprompt = this.t(HELP_REPROMPT);
        this.emit(':ask', speechOutput, reprompt);
    },

    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t(STOP_MESSAGE));
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t(STOP_MESSAGE));
    }
};