import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#8246AF',
                secondary: '#c2db6f',
                // primary: '#a67cb7',
                accent: colors.shades.black,
                positive: '#97D700',
                negative: '#FF0000',
                warning: '#EF5B25',
            },
            dark: {
                primary: colors.blue.lighten3,
            },
        },
    },
});