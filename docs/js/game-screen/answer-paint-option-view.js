var answerPaintOptionView = (function () {
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

  const STYLE = `style="box-shadow: 0px 0px 10px 12px rgba(19,173,24,1);"`;

  function isPhoto(answer) {
    return ( answer === `photo`) ? STYLE : ``;
  }

  function isPaint(answer) {
    return ( answer === `paint`) ? STYLE : ``;
  }

  function isCorrect(isCorrect) {
    return ( isCorrect) ? STYLE : ``;
  }

  var debug = {isPhoto, isPaint, isCorrect};

  class AnswerPaintOptionView extends AbstractView {

    constructor(answerIndex, game) {
      super();
      this.answerIndex = answerIndex;
      this.game = game;
      this.correctAnswer = game.questions[0].correctAnswer;
    }

    get template() {
      return `<div class="game__option" data-answer="${this.answerIndex}" data-gameindex="${this.game.gameIndex}" ${debug.isCorrect(this.correctAnswer === this.answerIndex)}>
              <!-- PLACE FOR IMAGE -->
            </div>`;
    }

    render() {
      const parentElement = document.querySelector('form.game__content--triple');
      parentElement.appendChild(this.element);
    }

    bind(cb) {
      const answerElement = document.querySelectorAll(`.game__option`)[this.answerIndex];
      answerElement.addEventListener(`click`, cb);
    }
  }

  return AnswerPaintOptionView;

}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS1zY3JlZW4vYW5zd2VyLXBhaW50LW9wdGlvbi12aWV3LmpzIiwic291cmNlcyI6WyJqcy9hYnN0cmFjdC12aWV3LmpzIiwianMvZGVidWcuanMiLCJqcy9nYW1lLXNjcmVlbi9hbnN3ZXItcGFpbnQtb3B0aW9uLXZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZWxlbWVudHMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJzdHJhY3RWaWV3IHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8g0LLQvtC30LLRgNCw0YnQsNC10YIg0YHRgtGA0L7QutGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRgNCw0LfQvNC10YLQutGDXG4gIGdldCB0ZW1wbGF0ZSgpIHt9XG5cbiAgLy8g0YHQvtC30LTQsNC10YIg0Lgg0LLQvtC30LLRgNCw0YnQsNC10YIgRE9NLdGN0LvQtdC80LXQvdGCINC90LAg0L7RgdC90L7QstC1INGI0LDQsdC70L7QvdCwXG4gIC8vINC00L7Qu9C20LXQvSDRgdC+0LfQtNCw0LLQsNGC0YwgRE9NLdGN0LvQtdC80LXQvdGCINGBINC/0L7QvNC+0YnRjNGOINC80LXRgtC+0LTQsCByZW5kZXIsINC00L7QsdCw0LLQu9GP0YLRjCDQtdC80YMg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCwg0YEg0L/QvtC80L7RidGM0Y4g0LzQtdGC0L7QtNCwIGJpbmQg0Lgg0LLQvtC30LLRgNCw0YnQsNGC0Ywg0YHQvtC30LTQsNC90L3Ri9C5INGN0LvQtdC80LXQvdGCXG4gIC8vINCc0LXRgtC+0LQg0LTQvtC70LbQtdC9INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDQu9C10L3QuNCy0YvQtSDQstGL0YfQuNGB0LvQtdC90LjRjyDigJQg0Y3Qu9C10LzQtdC90YIg0LTQvtC70LbQtdC9INGB0L7Qt9C00LDQstCw0YLRjNGB0Y8g0L/RgNC4INC/0LXRgNCy0L7QvCDQvtCx0YDQsNGJ0LXQvdC40Lgg0Log0LPQtdGC0YLQtdGAINGBINC/0L7QvNC+0YnRjNGOINC80LXRgtC+0LTQsCByZW5kZXIsINC00L7Qu9C20L3RiyDQtNC+0LHQsNCy0LvRj9GC0YzRgdGPINC+0LHRgNCw0LHQvtGC0YfQuNC60LggKNC80LXRgtC+0LQgYmluZCkuXG4gIC8vINCf0YDQuCDQv9C+0YHQu9C10LTRg9GO0YnQuNGFINC+0LHRgNCw0YnQtdC90LjRj9GFINC00L7Qu9C20LXQvSDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0YzRgdGPINGN0LvQtdC80LXQvdGCLCDRgdC+0LfQtNCw0L3QvdGL0Lkg0L/RgNC4INC/0LXRgNCy0L7QvCDQstGL0LfQvtCy0LUg0LPQtdGC0YLQtdGA0LAuXG4gIGdldCBlbGVtZW50KCkge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcbiAgICAvLyBpZiAoIWVsZW1lbnRzLmhhc093blByb3BlcnR5KHRlbXBsYXRlKSkge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICBjb25zdCBlbGVtID0gZGl2LmZpcnN0Q2hpbGQ7XG4gICAgICBlbGVtZW50c1t0ZW1wbGF0ZV0gPSBlbGVtO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vIHJldHVybiBlbGVtZW50c1t0ZW1wbGF0ZV07XG4gICAgLy8gfVxuICB9XG5cbiAgLy8g0L7RgtGA0LjRgdC+0LLRi9Cy0LDQtdGCIERPTS3RjdC70LXQvNC10L3Rgiwg0LTQvtCx0LDQstC70Y/QtdGCINC90LXQvtCx0YXQvtC00LjQvNGL0LUg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG1haW4uY2VudHJhbGApO1xuICAgIGNvbnN0IG9sZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbWFpbmApO1xuICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQob2xkRWxlbWVudCk7XG4gICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgLy8g0LTQvtCx0LDQstC70Y/QtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcbiAgLy8g0JzQtdGC0L7QtCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQvdC40YfQtdCz0L4g0L3QtSDQtNC10LvQsNC10YJcbiAgLy8g0JXRgdC70Lgg0L3Rg9C20L3QviDQvtCx0YDQsNCx0L7RgtCw0YLRjCDQutCw0LrQvtC1LdGC0L4g0YHQvtCx0YvRgtC40LUsINGC0L4g0Y3RgtC+0YIg0LzQtdGC0L7QtCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L/QtdGA0LXQvtC/0YDQtdC00LXQu9GR0L0g0LIg0L3QsNGB0LvQtdC00L3QuNC60LUg0YEg0L3QtdC+0LHRhdC+0LTQuNC80L7QuSDQu9C+0LPQuNC60L7QuVxuICBiaW5kKCkge31cbn1cbiIsImNvbnN0IERFQlVHX09OID0gdHJ1ZTtcbmNvbnN0IFNUWUxFID0gYHN0eWxlPVwiYm94LXNoYWRvdzogMHB4IDBweCAxMHB4IDEycHggcmdiYSgxOSwxNzMsMjQsMSk7XCJgO1xuXG5mdW5jdGlvbiBpc1Bob3RvKGFuc3dlcikge1xuICByZXR1cm4gKERFQlVHX09OICYmIGFuc3dlciA9PT0gYHBob3RvYCkgPyBTVFlMRSA6IGBgO1xufVxuXG5mdW5jdGlvbiBpc1BhaW50KGFuc3dlcikge1xuICByZXR1cm4gKERFQlVHX09OICYmIGFuc3dlciA9PT0gYHBhaW50YCkgPyBTVFlMRSA6IGBgO1xufVxuXG5mdW5jdGlvbiBpc0NvcnJlY3QoaXNDb3JyZWN0KSB7XG4gIHJldHVybiAoREVCVUdfT04gJiYgaXNDb3JyZWN0KSA/IFNUWUxFIDogYGA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtpc1Bob3RvLCBpc1BhaW50LCBpc0NvcnJlY3R9O1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tIFwiLi4vYWJzdHJhY3Qtdmlldy5qc1wiO1xuaW1wb3J0IGRlYnVnIGZyb20gJy4uL2RlYnVnLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5zd2VyUGFpbnRPcHRpb25WaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3IHtcblxuICBjb25zdHJ1Y3RvcihhbnN3ZXJJbmRleCwgZ2FtZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hbnN3ZXJJbmRleCA9IGFuc3dlckluZGV4O1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5jb3JyZWN0QW5zd2VyID0gZ2FtZS5xdWVzdGlvbnNbMF0uY29ycmVjdEFuc3dlcjtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJnYW1lX19vcHRpb25cIiBkYXRhLWFuc3dlcj1cIiR7dGhpcy5hbnN3ZXJJbmRleH1cIiBkYXRhLWdhbWVpbmRleD1cIiR7dGhpcy5nYW1lLmdhbWVJbmRleH1cIiAke2RlYnVnLmlzQ29ycmVjdCh0aGlzLmNvcnJlY3RBbnN3ZXIgPT09IHRoaXMuYW5zd2VySW5kZXgpfT5cbiAgICAgICAgICAgICAgPCEtLSBQTEFDRSBGT1IgSU1BR0UgLS0+XG4gICAgICAgICAgICA8L2Rpdj5gO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtLmdhbWVfX2NvbnRlbnQtLXRyaXBsZScpO1xuICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIGJpbmQoY2IpIHtcbiAgICBjb25zdCBhbnN3ZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmdhbWVfX29wdGlvbmApW3RoaXMuYW5zd2VySW5kZXhdO1xuICAgIGFuc3dlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBjYik7XG4gIH1cbn1c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
