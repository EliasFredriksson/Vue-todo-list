const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @use "@/scss/_Colors.scss" as Colors;
                    @use "@/scss/_Mixins.scss" as Mixins;
                    @use "@/scss/_Variables.scss" as Vars;
                    `,
            },
        },
    },
});
