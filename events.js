// Собственные события для «Рамблер/топ-100»
// cta_click     — нажатие кнопок «Выбрать место» / «Собрать снасть» на главной
// feedback_send — отправка формы на странице «Связаться»
function sendTop100Event(name, data) {
  try {
    if (window.top100Counter) {
      window.top100Counter.trackEvent(name, Object.assign({ page: location.pathname }, data || {}));
    }
  } catch (e) { /* счётчик не загружен — событие не отправляем */ }
}

document.addEventListener("click", function (e) {
  var el = e.target.closest("[data-event]");
  if (el) sendTop100Event(el.dataset.event, { label: el.dataset.label || el.textContent.trim() });
});
