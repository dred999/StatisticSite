// Собственные события для счётчиков «Рамблер/топ-100» и Top.Mail.Ru (MyTracker)
// cta_click     — нажатие кнопок «Выбрать место» / «Собрать снасть» на главной
// feedback_send — отправка формы на странице «Связаться»
// В MyTracker имя события может содержать только латинские буквы и цифры,
// поэтому туда они уходят как ctaClick и feedbackSend.
var TMR_ID = "3801303";
var TMR_NAMES = { cta_click: "ctaClick", feedback_send: "feedbackSend" };

function sendTmrGoal(name, data) {
  try {
    var _tmr = window._tmr || (window._tmr = []);
    _tmr.push({ id: TMR_ID, type: "reachGoal", goal: TMR_NAMES[name] || name.replace(/[^A-Za-z0-9]/g, ""), params: data || {} });
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

// Кнопки-ссылки: сначала отправляем событие, переход — через 400 мс,
// чтобы счётчики успели передать данные до ухода со страницы.
document.addEventListener("click", function (e) {
  var el = e.target.closest("[data-event]");
  if (!el) return;
  sendTop100Event(el.dataset.event, { label: el.dataset.label || el.textContent.trim() });
  var href = el.getAttribute("href");
  if (href && !e.ctrlKey && !e.metaKey && !e.shiftKey && el.target !== "_blank") {
    e.preventDefault();
    setTimeout(function () { location.href = href; }, 400);
  }
});
