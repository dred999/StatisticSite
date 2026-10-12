// Собственные события для счётчиков «Рамблер/топ-100» и Top.Mail.Ru (MyTracker)
// cta_click     — нажатие кнопок «Выбрать место» / «Собрать снасть» на главной
// feedback_send — отправка формы на странице «Связаться»
var TMR_ID = "3801303";

function sendTmrGoal(name, data) {
  try {
    var _tmr = window._tmr || (window._tmr = []);
    _tmr.push({ id: TMR_ID, type: "reachGoal", goal: name, params: data || {} });
  } catch (e) { /* счётчик не загружен */ }
}

function sendTop100Event(name, data) {
  data = Object.assign({ page: location.pathname }, data || {});
  try {
    if (window.top100Counter) {
      window.top100Counter.trackEvent(name, data);
    }
  } catch (e) { /* счётчик не загружен — событие не отправляем */ }
  sendTmrGoal(name, data);
}

document.addEventListener("click", function (e) {
  var el = e.target.closest("[data-event]");
  if (el) sendTop100Event(el.dataset.event, { label: el.dataset.label || el.textContent.trim() });
});
