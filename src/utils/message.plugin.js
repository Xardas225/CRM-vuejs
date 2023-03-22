export default {
    install: (app) => {
        app.config.globalProperties.$message = (html) => {
            window.M.toast({html})
        }
        
        app.config.globalProperties.$error = (html) => {
            window.M.toast({html: `[Ошибка]: ${html}`})
        }
    }
}