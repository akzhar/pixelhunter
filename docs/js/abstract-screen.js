var abstractScreen = (function () {
  'use strict';

  class AbstractView {

    constructor() {}

    // возвращает строку, содержащую разметку
    get template() {}

    // создает и возвращает DOM-элемент на основе шаблона
    // должен создавать DOM-элемент с помощью метода render, добавлять ему обработчики, с помощью метода bind и возвращать созданный элемент
    // Метод должен использовать ленивые вычисления — элемент должен создаваться при первом обращении к геттер с помощью метода render, должны добавляться обработчики (метод bind).
    // При последующих обращениях должен использоваться элемент, созданный при первом вызове геттера.
    get element() {
      const template = this.template;
      // if (!elements.hasOwnProperty(template)) {
        const div = document.createElement(`div`);
        div.innerHTML = template;
        const elem = div.firstChild;
        return elem;
      // } else {
        // return elements[template];
      // }
    }

    // отрисовывает DOM-элемент, добавляет необходимые обработчики
    render() {
      const parentElement = document.querySelector(`main.central`);
      const oldElement = document.querySelector(`#main`);
      parentElement.removeChild(oldElement);
      parentElement.appendChild(this.element);
    }

    // добавляет обработчики событий
    // Метод по умолчанию ничего не делает
    // Если нужно обработать какое-то событие, то этот метод должен быть переопределён в наследнике с необходимой логикой
    bind() {}
  }

  class ConfirmModalView extends AbstractView {

    constructor() {
      super();
    }

    get template() {
      return `<section class="modal">
              <form class="modal__inner">
                <button class="modal__close" type="button">
                  <span class="visually-hidden">Закрыть</span>
                </button>
                <h2 class="modal__title">Подтверждение</h2>
                <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
                <div class="modal__button-wrapper">
                  <button class="modal__btn modal__btn--ok">Ок</button>
                  <button class="modal__btn modal__btn--cancel">Отмена</button>
                </div>
              </form>
            </section>`;
    }

    render() {
      const parentElement = document.querySelector(`#main`);
      parentElement.appendChild(this.element);
    }

    bind(cb) {
      const parentElement = document.querySelector(`#main`);
      const modal = document.querySelector(`.modal`);
      const closeBtn = modal.querySelector(`.modal__close`);
      const cancelBtn = modal.querySelector(`.modal__btn--cancel`);
      const okBtn = modal.querySelector(`.modal__btn--ok`);
      document.addEventListener(`keydown`, (evt) => {
        if (evt.keyCode === 27) {
          evt.preventDefault();
          parentElement.removeChild(modal);
        }
      });
      closeBtn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        parentElement.removeChild(modal);
      });
      cancelBtn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        parentElement.removeChild(modal);
      });
      okBtn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        cb();
      });
    }
  }

  class AbstractScreen {

    constructor() {
      this.gameModel = null;
      this.game = null;
      this.view = null;
      this.timer = null;
      this.startScreen = null;
      this.nextScreen = null;
      this.endScreen = null;
    }

    // метод показа экрана отрисовывает экран и запускает метод _onScreenShow
    show() {
      this.view.render();
      this._onScreenShow();
    }

    // метод реализует бизнес логику экрана
    _onScreenShow() {}

    // метод перезапускает игру
    _restartGame() {
      const confirmModal = new ConfirmModalView();
      confirmModal.render();
      confirmModal.bind(() => {
        this.gameModel.reset();
        this.startScreen.show();
        if (this.timer) {
          this.timer.stop();
        }
      });
    }
  }

  return AbstractScreen;

}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3Qtc2NyZWVuLmpzIiwic291cmNlcyI6WyJzcmMvanMvYWJzdHJhY3Qtdmlldy5qcyIsInNyYy9qcy91dGlsLXZpZXdzL2NvbmZpcm0tbW9kYWwtdmlldy5qcyIsInNyYy9qcy9hYnN0cmFjdC1zY3JlZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZWxlbWVudHMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJzdHJhY3RWaWV3IHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8g0LLQvtC30LLRgNCw0YnQsNC10YIg0YHRgtGA0L7QutGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRgNCw0LfQvNC10YLQutGDXG4gIGdldCB0ZW1wbGF0ZSgpIHt9XG5cbiAgLy8g0YHQvtC30LTQsNC10YIg0Lgg0LLQvtC30LLRgNCw0YnQsNC10YIgRE9NLdGN0LvQtdC80LXQvdGCINC90LAg0L7RgdC90L7QstC1INGI0LDQsdC70L7QvdCwXG4gIC8vINC00L7Qu9C20LXQvSDRgdC+0LfQtNCw0LLQsNGC0YwgRE9NLdGN0LvQtdC80LXQvdGCINGBINC/0L7QvNC+0YnRjNGOINC80LXRgtC+0LTQsCByZW5kZXIsINC00L7QsdCw0LLQu9GP0YLRjCDQtdC80YMg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCwg0YEg0L/QvtC80L7RidGM0Y4g0LzQtdGC0L7QtNCwIGJpbmQg0Lgg0LLQvtC30LLRgNCw0YnQsNGC0Ywg0YHQvtC30LTQsNC90L3Ri9C5INGN0LvQtdC80LXQvdGCXG4gIC8vINCc0LXRgtC+0LQg0LTQvtC70LbQtdC9INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDQu9C10L3QuNCy0YvQtSDQstGL0YfQuNGB0LvQtdC90LjRjyDigJQg0Y3Qu9C10LzQtdC90YIg0LTQvtC70LbQtdC9INGB0L7Qt9C00LDQstCw0YLRjNGB0Y8g0L/RgNC4INC/0LXRgNCy0L7QvCDQvtCx0YDQsNGJ0LXQvdC40Lgg0Log0LPQtdGC0YLQtdGAINGBINC/0L7QvNC+0YnRjNGOINC80LXRgtC+0LTQsCByZW5kZXIsINC00L7Qu9C20L3RiyDQtNC+0LHQsNCy0LvRj9GC0YzRgdGPINC+0LHRgNCw0LHQvtGC0YfQuNC60LggKNC80LXRgtC+0LQgYmluZCkuXG4gIC8vINCf0YDQuCDQv9C+0YHQu9C10LTRg9GO0YnQuNGFINC+0LHRgNCw0YnQtdC90LjRj9GFINC00L7Qu9C20LXQvSDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0YzRgdGPINGN0LvQtdC80LXQvdGCLCDRgdC+0LfQtNCw0L3QvdGL0Lkg0L/RgNC4INC/0LXRgNCy0L7QvCDQstGL0LfQvtCy0LUg0LPQtdGC0YLQtdGA0LAuXG4gIGdldCBlbGVtZW50KCkge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcbiAgICAvLyBpZiAoIWVsZW1lbnRzLmhhc093blByb3BlcnR5KHRlbXBsYXRlKSkge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICBjb25zdCBlbGVtID0gZGl2LmZpcnN0Q2hpbGQ7XG4gICAgICBlbGVtZW50c1t0ZW1wbGF0ZV0gPSBlbGVtO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vIHJldHVybiBlbGVtZW50c1t0ZW1wbGF0ZV07XG4gICAgLy8gfVxuICB9XG5cbiAgLy8g0L7RgtGA0LjRgdC+0LLRi9Cy0LDQtdGCIERPTS3RjdC70LXQvNC10L3Rgiwg0LTQvtCx0LDQstC70Y/QtdGCINC90LXQvtCx0YXQvtC00LjQvNGL0LUg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG1haW4uY2VudHJhbGApO1xuICAgIGNvbnN0IG9sZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbWFpbmApO1xuICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQob2xkRWxlbWVudCk7XG4gICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgLy8g0LTQvtCx0LDQstC70Y/QtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcbiAgLy8g0JzQtdGC0L7QtCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQvdC40YfQtdCz0L4g0L3QtSDQtNC10LvQsNC10YJcbiAgLy8g0JXRgdC70Lgg0L3Rg9C20L3QviDQvtCx0YDQsNCx0L7RgtCw0YLRjCDQutCw0LrQvtC1LdGC0L4g0YHQvtCx0YvRgtC40LUsINGC0L4g0Y3RgtC+0YIg0LzQtdGC0L7QtCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L/QtdGA0LXQvtC/0YDQtdC00LXQu9GR0L0g0LIg0L3QsNGB0LvQtdC00L3QuNC60LUg0YEg0L3QtdC+0LHRhdC+0LTQuNC80L7QuSDQu9C+0LPQuNC60L7QuVxuICBiaW5kKCkge31cbn1cbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSBcIi4uL2Fic3RyYWN0LXZpZXcuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybU1vZGFsVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYDxzZWN0aW9uIGNsYXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJtb2RhbF9faW5uZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibW9kYWxfX2Nsb3NlXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7Ql9Cw0LrRgNGL0YLRjDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJtb2RhbF9fdGl0bGVcIj7Qn9C+0LTRgtCy0LXRgNC20LTQtdC90LjQtTwvaDI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJtb2RhbF9fdGV4dFwiPtCS0Ysg0YPQstC10YDQtdC90Ysg0YfRgtC+INGF0L7RgtC40YLQtSDQvdCw0YfQsNGC0Ywg0LjQs9GA0YMg0LfQsNC90L7QstC+PzwvcD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWxfX2J1dHRvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibW9kYWxfX2J0biBtb2RhbF9fYnRuLS1va1wiPtCe0Lo8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtb2RhbF9fYnRuIG1vZGFsX19idG4tLWNhbmNlbFwiPtCe0YLQvNC10L3QsDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L3NlY3Rpb24+YDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI21haW5gKTtcbiAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gIH1cblxuICBiaW5kKGNiKSB7XG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNtYWluYCk7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAubW9kYWxgKTtcbiAgICBjb25zdCBjbG9zZUJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoYC5tb2RhbF9fY2xvc2VgKTtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKGAubW9kYWxfX2J0bi0tY2FuY2VsYCk7XG4gICAgY29uc3Qgb2tCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKGAubW9kYWxfX2J0bi0tb2tgKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGBrZXlkb3duYCwgKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC5rZXlDb2RlID09PSAyNykge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChtb2RhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQobW9kYWwpO1xuICAgIH0pO1xuICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChtb2RhbCk7XG4gICAgfSk7XG4gICAgb2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNiKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBDb25maXJtTW9kYWxWaWV3IGZyb20gJy4vdXRpbC12aWV3cy9jb25maXJtLW1vZGFsLXZpZXcuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBYnN0cmFjdFNjcmVlbiB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5nYW1lTW9kZWwgPSBudWxsO1xuICAgIHRoaXMuZ2FtZSA9IG51bGw7XG4gICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgICB0aGlzLnN0YXJ0U2NyZWVuID0gbnVsbDtcbiAgICB0aGlzLm5leHRTY3JlZW4gPSBudWxsO1xuICAgIHRoaXMuZW5kU2NyZWVuID0gbnVsbDtcbiAgfVxuXG4gIC8vINC80LXRgtC+0LQg0L/QvtC60LDQt9CwINGN0LrRgNCw0L3QsCDQvtGC0YDQuNGB0L7QstGL0LLQsNC10YIg0Y3QutGA0LDQvSDQuCDQt9Cw0L/Rg9GB0LrQsNC10YIg0LzQtdGC0L7QtCBfb25TY3JlZW5TaG93XG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnJlbmRlcigpO1xuICAgIHRoaXMuX29uU2NyZWVuU2hvdygpO1xuICB9XG5cbiAgLy8g0LzQtdGC0L7QtCDRgNC10LDQu9C40LfRg9C10YIg0LHQuNC30L3QtdGBINC70L7Qs9C40LrRgyDRjdC60YDQsNC90LBcbiAgX29uU2NyZWVuU2hvdygpIHt9XG5cbiAgLy8g0LzQtdGC0L7QtCDQv9C10YDQtdC30LDQv9GD0YHQutCw0LXRgiDQuNCz0YDRg1xuICBfcmVzdGFydEdhbWUoKSB7XG4gICAgY29uc3QgY29uZmlybU1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbFZpZXcoKTtcbiAgICBjb25maXJtTW9kYWwucmVuZGVyKCk7XG4gICAgY29uZmlybU1vZGFsLmJpbmQoKCkgPT4ge1xuICAgICAgdGhpcy5nYW1lTW9kZWwucmVzZXQoKTtcbiAgICAgIHRoaXMuc3RhcnRTY3JlZW4uc2hvdygpO1xuICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgdGhpcy50aW1lci5zdG9wKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7RUFFZSxNQUFNLFlBQVksQ0FBQztBQUNsQztFQUNBLEVBQUUsV0FBVyxHQUFHLEVBQUU7QUFDbEI7RUFDQTtFQUNBLEVBQUUsSUFBSSxRQUFRLEdBQUcsRUFBRTtBQUNuQjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsRUFBRSxJQUFJLE9BQU8sR0FBRztFQUNoQixJQUFJLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7RUFDbkM7RUFDQSxNQUFNLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFH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QVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUN2QyxLQUFLLENBQUMsQ0FBQztFQUNQLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUs7RUFDN0MsTUFBTSxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7RUFDM0IsTUFBTSxFQUFFLEVBQUUsQ0FBQztFQUNYLEtBQUssQ0FBQyxDQUFDO0VBQ1AsR0FBRztFQUNIOztFQ3BEZSxNQUFNLGNBQWMsQ0FBQztBQUNwQztFQUNBLEVBQUUsV0FBVyxHQUFHO0VBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7RUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztFQUNyQixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ3JCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7RUFDdEIsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztFQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0VBQzNCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7RUFDMUIsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLElBQUksR0FBRztFQUNULElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztFQUN2QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztFQUN6QixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsYUFBYSxHQUFHLEVBQUU7QUFDcEI7RUFDQTtFQUNBLEVBQUUsWUFBWSxHQUFHO0VBQ2pCLElBQUksTUFBTSxZQUFZLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0VBQ2hELElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO0VBQzFCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNO0VBQzVCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztFQUM3QixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7RUFDOUIsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7RUFDdEIsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0VBQzFCLE9BQU87RUFDUCxLQUFLLENBQUMsQ0FBQztFQUNQLEdBQUc7RUFDSDs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
