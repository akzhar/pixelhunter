var imageView = (function () {
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

  // Managing size
  // @param  {object} frame описывает размеры рамки, в которые должно быть вписано изображение
  // @param  {object} given описывает размеры изображения, которые нужно подогнать под рамку
  // @return {object} новый объект, который будет содержать изменённые размеры изображения
  function resize(frame, given) {
    let width = given.width;
    let height = given.height;
    if (width > frame.width) {
      const multiplier = width / frame.width;
      width = frame.width;
      height = Math.floor(height / multiplier);
    }
    if (height > frame.height) {
      const multiplier = height / frame.height;
      height = frame.height;
      width = Math.floor(width / multiplier);
    }
    return {width, height};
  }

  class ImageView extends AbstractView {

    constructor(questionNumber, game) {
      super();
      this.questionNumber = questionNumber;
      this.game = game;
      if (game.gameType === 3) {
        this.img = game.questions[0].img[this.questionNumber];
      } else {
        this.img = game.questions[this.questionNumber].img[0];
      }
    }

    get template() {
      const imgSize = resize(this.game.frameSize, this.img.size);
      return `<img src="${this.img.src}" alt="Option ${this.questionNumber + 1}" width="${imgSize.width}" height="${imgSize.height}">`;
    }

    render() {
      const parentElement = document.querySelectorAll('div.game__option')[this.questionNumber];
      parentElement.appendChild(this.element);
    }
  }

  return ImageView;

}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS1zY3JlZW4vaW1hZ2Utdmlldy5qcyIsInNvdXJjZXMiOlsianMvYWJzdHJhY3Qtdmlldy5qcyIsImpzL3Jlc2l6ZS5qcyIsImpzL2dhbWUtc2NyZWVuL2ltYWdlLXZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZWxlbWVudHMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJzdHJhY3RWaWV3IHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8g0LLQvtC30LLRgNCw0YnQsNC10YIg0YHRgtGA0L7QutGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRgNCw0LfQvNC10YLQutGDXG4gIGdldCB0ZW1wbGF0ZSgpIHt9XG5cbiAgLy8g0YHQvtC30LTQsNC10YIg0Lgg0LLQvtC30LLRgNCw0YnQsNC10YIgRE9NLdGN0LvQtdC80LXQvdGCINC90LAg0L7RgdC90L7QstC1INGI0LDQsdC70L7QvdCwXG4gIC8vINC00L7Qu9C20LXQvSDRgdC+0LfQtNCw0LLQsNGC0YwgRE9NLdGN0LvQtdC80LXQvdGCINGBINC/0L7QvNC+0YnRjNGOINC80LXRgtC+0LTQsCByZW5kZXIsINC00L7QsdCw0LLQu9GP0YLRjCDQtdC80YMg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCwg0YEg0L/QvtC80L7RidGM0Y4g0LzQtdGC0L7QtNCwIGJpbmQg0Lgg0LLQvtC30LLRgNCw0YnQsNGC0Ywg0YHQvtC30LTQsNC90L3Ri9C5INGN0LvQtdC80LXQvdGCXG4gIC8vINCc0LXRgtC+0LQg0LTQvtC70LbQtdC9INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDQu9C10L3QuNCy0YvQtSDQstGL0YfQuNGB0LvQtdC90LjRjyDigJQg0Y3Qu9C10LzQtdC90YIg0LTQvtC70LbQtdC9INGB0L7Qt9C00LDQstCw0YLRjNGB0Y8g0L/RgNC4INC/0LXRgNCy0L7QvCDQvtCx0YDQsNGJ0LXQvdC40Lgg0Log0LPQtdGC0YLQtdGAINGBINC/0L7QvNC+0YnRjNGOINC80LXRgtC+0LTQsCByZW5kZXIsINC00L7Qu9C20L3RiyDQtNC+0LHQsNCy0LvRj9GC0YzRgdGPINC+0LHRgNCw0LHQvtGC0YfQuNC60LggKNC80LXRgtC+0LQgYmluZCkuXG4gIC8vINCf0YDQuCDQv9C+0YHQu9C10LTRg9GO0YnQuNGFINC+0LHRgNCw0YnQtdC90LjRj9GFINC00L7Qu9C20LXQvSDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0YzRgdGPINGN0LvQtdC80LXQvdGCLCDRgdC+0LfQtNCw0L3QvdGL0Lkg0L/RgNC4INC/0LXRgNCy0L7QvCDQstGL0LfQvtCy0LUg0LPQtdGC0YLQtdGA0LAuXG4gIGdldCBlbGVtZW50KCkge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcbiAgICAvLyBpZiAoIWVsZW1lbnRzLmhhc093blByb3BlcnR5KHRlbXBsYXRlKSkge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICBjb25zdCBlbGVtID0gZGl2LmZpcnN0Q2hpbGQ7XG4gICAgICBlbGVtZW50c1t0ZW1wbGF0ZV0gPSBlbGVtO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vIHJldHVybiBlbGVtZW50c1t0ZW1wbGF0ZV07XG4gICAgLy8gfVxuICB9XG5cbiAgLy8g0L7RgtGA0LjRgdC+0LLRi9Cy0LDQtdGCIERPTS3RjdC70LXQvNC10L3Rgiwg0LTQvtCx0LDQstC70Y/QtdGCINC90LXQvtCx0YXQvtC00LjQvNGL0LUg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG1haW4uY2VudHJhbGApO1xuICAgIGNvbnN0IG9sZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbWFpbmApO1xuICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQob2xkRWxlbWVudCk7XG4gICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgLy8g0LTQvtCx0LDQstC70Y/QtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcbiAgLy8g0JzQtdGC0L7QtCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQvdC40YfQtdCz0L4g0L3QtSDQtNC10LvQsNC10YJcbiAgLy8g0JXRgdC70Lgg0L3Rg9C20L3QviDQvtCx0YDQsNCx0L7RgtCw0YLRjCDQutCw0LrQvtC1LdGC0L4g0YHQvtCx0YvRgtC40LUsINGC0L4g0Y3RgtC+0YIg0LzQtdGC0L7QtCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L/QtdGA0LXQvtC/0YDQtdC00LXQu9GR0L0g0LIg0L3QsNGB0LvQtdC00L3QuNC60LUg0YEg0L3QtdC+0LHRhdC+0LTQuNC80L7QuSDQu9C+0LPQuNC60L7QuVxuICBiaW5kKCkge31cbn1cbiIsIi8vIE1hbmFnaW5nIHNpemVcbi8vIEBwYXJhbSAge29iamVjdH0gZnJhbWUg0L7Qv9C40YHRi9Cy0LDQtdGCINGA0LDQt9C80LXRgNGLINGA0LDQvNC60LgsINCyINC60L7RgtC+0YDRi9C1INC00L7Qu9C20L3QviDQsdGL0YLRjCDQstC/0LjRgdCw0L3QviDQuNC30L7QsdGA0LDQttC10L3QuNC1XG4vLyBAcGFyYW0gIHtvYmplY3R9IGdpdmVuINC+0L/QuNGB0YvQstCw0LXRgiDRgNCw0LfQvNC10YDRiyDQuNC30L7QsdGA0LDQttC10L3QuNGPLCDQutC+0YLQvtGA0YvQtSDQvdGD0LbQvdC+INC/0L7QtNC+0LPQvdCw0YLRjCDQv9C+0LQg0YDQsNC80LrRg1xuLy8gQHJldHVybiB7b2JqZWN0fSDQvdC+0LLRi9C5INC+0LHRitC10LrRgiwg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDRgdC+0LTQtdGA0LbQsNGC0Ywg0LjQt9C80LXQvdGR0L3QvdGL0LUg0YDQsNC30LzQtdGA0Ysg0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuZXhwb3J0IGRlZmF1bHQgIGZ1bmN0aW9uIHJlc2l6ZShmcmFtZSwgZ2l2ZW4pIHtcbiAgbGV0IHdpZHRoID0gZ2l2ZW4ud2lkdGg7XG4gIGxldCBoZWlnaHQgPSBnaXZlbi5oZWlnaHQ7XG4gIGlmICh3aWR0aCA+IGZyYW1lLndpZHRoKSB7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IHdpZHRoIC8gZnJhbWUud2lkdGg7XG4gICAgd2lkdGggPSBmcmFtZS53aWR0aDtcbiAgICBoZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodCAvIG11bHRpcGxpZXIpO1xuICB9XG4gIGlmIChoZWlnaHQgPiBmcmFtZS5oZWlnaHQpIHtcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gaGVpZ2h0IC8gZnJhbWUuaGVpZ2h0O1xuICAgIGhlaWdodCA9IGZyYW1lLmhlaWdodDtcbiAgICB3aWR0aCA9IE1hdGguZmxvb3Iod2lkdGggLyBtdWx0aXBsaWVyKTtcbiAgfVxuICByZXR1cm4ge3dpZHRoLCBoZWlnaHR9O1xufVxuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tIFwiLi4vYWJzdHJhY3Qtdmlldy5qc1wiO1xuaW1wb3J0IHJlc2l6ZSBmcm9tIFwiLi4vcmVzaXplLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG5cbiAgY29uc3RydWN0b3IocXVlc3Rpb25OdW1iZXIsIGdhbWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucXVlc3Rpb25OdW1iZXIgPSBxdWVzdGlvbk51bWJlcjtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIGlmIChnYW1lLmdhbWVUeXBlID09PSAzKSB7XG4gICAgICB0aGlzLmltZyA9IGdhbWUucXVlc3Rpb25zWzBdLmltZ1t0aGlzLnF1ZXN0aW9uTnVtYmVyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbWcgPSBnYW1lLnF1ZXN0aW9uc1t0aGlzLnF1ZXN0aW9uTnVtYmVyXS5pbWdbMF07XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIGNvbnN0IGltZ1NpemUgPSByZXNpemUodGhpcy5nYW1lLmZyYW1lU2l6ZSwgdGhpcy5pbWcuc2l6ZSk7XG4gICAgcmV0dXJuIGA8aW1nIHNyYz1cIiR7dGhpcy5pbWcuc3JjfVwiIGFsdD1cIk9wdGlvbiAke3RoaXMucXVlc3Rpb25OdW1iZXIgKyAxfVwiIHdpZHRoPVwiJHtpbWdTaXplLndpZHRofVwiIGhlaWdodD1cIiR7aW1nU2l6ZS5oZWlnaHR9XCI+YDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2LmdhbWVfX29wdGlvbicpW3RoaXMucXVlc3Rpb25OdW1iZXJdO1xuICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztFQUVlLE1BQU0sWUFBWSxDQUFDO0FBQ2xDO0VBQ0EsRUFBRSxXQUFXLEdBQUcsRUFBRTtBQUNsQjtFQUNBO0VBQ0EsRUFBRSxJQUFJLFFBQVEsR0FBRyxFQUFFO0FBQ25CO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxFQUFFLElBQUksT0FBTyxHQUFHO0VBQ2hCLElBQUksTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztFQUNuQztFQUNBLE1BQU0sTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDaEQsTUFBTSxHQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztFQUMvQixNQUFNLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7RUFFbEMsTUFBTSxPQUFPLElBQUksQ0FBQztFQUNsQjtFQUNBO0VBQ0E7RUFDQSxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsTUFBTSxHQUFHO0VBQ1gsSUFBSSxNQUFNLGFBQWEsR0FBRyxR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
