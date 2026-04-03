import { App } from 'vue'

export default (app: App<Element>) => {
  app.directive('btnDebounce', {
    mounted(el, binding) {
      el.addEventListener('click', () => {
        if (!el.disabled) {
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
          }, binding.value || 1000)
        }
      })
    }
  })
}