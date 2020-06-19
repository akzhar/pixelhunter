var gameModel = (function () {
  'use strict';

  const config = {
    GAMES_COUNT: 10,
    LIVES_COUNT: 3,
    TIME_TO_ANSWER: 30000, // 30 sec
    GAME_TYPE: {
      one: 1,
      two: 2,
      three: 3
    }
  };

  class GameModel {
    constructor() {
      this._playerName = ``;
      this._lives = config.LIVES_COUNT;
      this._answers = [];
      this._games = GameModel.getNewGames();
      this._isGameOver = false;
    }

    set playerName(name) {
      this._playerName = name;
    }

    get lives() {
      return this._lives;
    }

    get answers() {
      return this._answers;
    }

    get games() {
      return this._games;
    }

    get isGameOver() {
      return this._isGameOver;
    }

    reset() {
      this._lives = config.LIVES_COUNT;
      this._answers = [];
      this._isGameOver = false;
    }

    addAnswer(answer) {
      this._answers.push(answer);
    }

    minusLive() {
      if (this._lives === 0) {
        this._isGameOver = true;
      }
      if (this._lives) {
        this._lives--;
      }
    }

    static getNewGames() {
      const games = [];

      for (let i = 0; i < config.GAMES_COUNT; i++) {
        const gameType = GameModel.getRandomGameType();
        switch (gameType) {
          case config.GAME_TYPE.one:
            games.push(GameModel.getGameType1(i));
            break;
          case config.GAME_TYPE.two:
            games.push(GameModel.getGameType2(i));
            break;
          case config.GAME_TYPE.three:
            games.push(GameModel.getGameType3(i));
            break;
        }
      }

      return games;
    }

    static getRandomGameType() {
      return Math.round(Math.random() * (config.GAME_TYPE.three - config.GAME_TYPE.one) + config.GAME_TYPE.one);
    }

    static getGameType1(index) {
      // 1 изображение
      // в этом режиме пользователь должен определить картина это или фотография
      return {
        gameIndex: index,
        gameType: config.GAME_TYPE.one,
        frameSize: {width: 705, height: 455},
        task: `Угадай, фото или рисунок?`,
        questions:
        [
          {
            img:
            [
              {
                src: `https://k42.kn3.net/D2F0370D6.jpg`,
                size: {width: 468, height: 354}
              }
            ],
            correctAnswer: `paint`
          }
        ]
      };
    }

    static getGameType2(index) {
      // 2 изображения
      // для каждого из изображений пользователь должен указать картина это или фотография
      return {
        gameIndex: index,
        gameType: config.GAME_TYPE.two,
        frameSize: {width: 468, height: 458},
        task: `Угадайте для каждого изображения фото или рисунок?`,
        questions:
        [
          {
            img:
            [
              {
                src: `https://k42.kn3.net/CF42609C8.jpg`,
                size: {width: 600, height: 831}
              }
            ],
            correctAnswer: `paint`
          },
          {
            img:
            [
              {
                src: `http://i.imgur.com/1KegWPz.jpg`,
                size: {width: 1080, height: 720}
              }
            ],
            correctAnswer: `photo`
          }
        ]
      };
    }

    static getGameType3(index) {
      // 3 изображения
      // пользователю нужно выбрать одно — либо нужно выбрать единственную фотографию, либо единственную картину
      return {
        gameIndex: index,
        gameType: config.GAME_TYPE.three,
        frameSize: {width: 304, height: 455},
        task: `Найдите рисунок среди изображений`,
        questions: [
          {
            img:
            [
              {
                src: `https://k32.kn3.net/5C7060EC5.jpg`,
                size: {width: 1200, height: 900}
              },
              {
                src: `https://i.imgur.com/DiHM5Zb.jpg`,
                size: {width: 1264, height: 1864}
              },
              {
                src: `http://i.imgur.com/DKR1HtB.jpg`,
                size: {width: 1120, height: 2965}
              }
            ],
            correctAnswer: 0
          }
        ]
      };
    }
  }

  return GameModel;

}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS1tb2RlbC9nYW1lLW1vZGVsLmpzIiwic291cmNlcyI6WyJzcmMvanMvY29uZmlnLmpzIiwic3JjL2pzL2dhbWUtbW9kZWwvZ2FtZS1tb2RlbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb25maWcgPSB7XG4gIEdBTUVTX0NPVU5UOiAxMCxcbiAgTElWRVNfQ09VTlQ6IDMsXG4gIFRJTUVfVE9fQU5TV0VSOiAzMDAwMCwgLy8gMzAgc2VjXG4gIEdBTUVfVFlQRToge1xuICAgIG9uZTogMSxcbiAgICB0d286IDIsXG4gICAgdGhyZWU6IDNcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTW9kZWwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9wbGF5ZXJOYW1lID0gYGA7XG4gICAgdGhpcy5fbGl2ZXMgPSBjb25maWcuTElWRVNfQ09VTlQ7XG4gICAgdGhpcy5fYW5zd2VycyA9IFtdO1xuICAgIHRoaXMuX2dhbWVzID0gR2FtZU1vZGVsLmdldE5ld0dhbWVzKCk7XG4gICAgdGhpcy5faXNHYW1lT3ZlciA9IGZhbHNlO1xuICB9XG5cbiAgc2V0IHBsYXllck5hbWUobmFtZSkge1xuICAgIHRoaXMuX3BsYXllck5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0IGxpdmVzKCkge1xuICAgIHJldHVybiB0aGlzLl9saXZlcztcbiAgfVxuXG4gIGdldCBhbnN3ZXJzKCkge1xuICAgIHJldHVybiB0aGlzLl9hbnN3ZXJzO1xuICB9XG5cbiAgZ2V0IGdhbWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9nYW1lcztcbiAgfVxuXG4gIGdldCBpc0dhbWVPdmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0dhbWVPdmVyO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5fbGl2ZXMgPSBjb25maWcuTElWRVNfQ09VTlQ7XG4gICAgdGhpcy5fYW5zd2VycyA9IFtdO1xuICAgIHRoaXMuX2lzR2FtZU92ZXIgPSBmYWxzZTtcbiAgfVxuXG4gIGFkZEFuc3dlcihhbnN3ZXIpIHtcbiAgICB0aGlzLl9hbnN3ZXJzLnB1c2goYW5zd2VyKTtcbiAgfVxuXG4gIG1pbnVzTGl2ZSgpIHtcbiAgICBpZiAodGhpcy5fbGl2ZXMgPT09IDApIHtcbiAgICAgIHRoaXMuX2lzR2FtZU92ZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbGl2ZXMpIHtcbiAgICAgIHRoaXMuX2xpdmVzLS07XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldE5ld0dhbWVzKCkge1xuICAgIGNvbnN0IGdhbWVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5HQU1FU19DT1VOVDsgaSsrKSB7XG4gICAgICBjb25zdCBnYW1lVHlwZSA9IEdhbWVNb2RlbC5nZXRSYW5kb21HYW1lVHlwZSgpO1xuICAgICAgc3dpdGNoIChnYW1lVHlwZSkge1xuICAgICAgICBjYXNlIGNvbmZpZy5HQU1FX1RZUEUub25lOlxuICAgICAgICAgIGdhbWVzLnB1c2goR2FtZU1vZGVsLmdldEdhbWVUeXBlMShpKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgY29uZmlnLkdBTUVfVFlQRS50d286XG4gICAgICAgICAgZ2FtZXMucHVzaChHYW1lTW9kZWwuZ2V0R2FtZVR5cGUyKGkpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBjb25maWcuR0FNRV9UWVBFLnRocmVlOlxuICAgICAgICAgIGdhbWVzLnB1c2goR2FtZU1vZGVsLmdldEdhbWVUeXBlMyhpKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGdhbWVzO1xuICB9XG5cbiAgc3RhdGljIGdldFJhbmRvbUdhbWVUeXBlKCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoY29uZmlnLkdBTUVfVFlQRS50aHJlZSAtIGNvbmZpZy5HQU1FX1RZUEUub25lKSArIGNvbmZpZy5HQU1FX1RZUEUub25lKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRHYW1lVHlwZTEoaW5kZXgpIHtcbiAgICAvLyAxINC40LfQvtCx0YDQsNC20LXQvdC40LVcbiAgICAvLyDQsiDRjdGC0L7QvCDRgNC10LbQuNC80LUg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINC00L7Qu9C20LXQvSDQvtC/0YDQtdC00LXQu9C40YLRjCDQutCw0YDRgtC40L3QsCDRjdGC0L4g0LjQu9C4INGE0L7RgtC+0LPRgNCw0YTQuNGPXG4gICAgcmV0dXJuIHtcbiAgICAgIGdhbWVJbmRleDogaW5kZXgsXG4gICAgICBnYW1lVHlwZTogY29uZmlnLkdBTUVfVFlQRS5vbmUsXG4gICAgICBmcmFtZVNpemU6IHt3aWR0aDogNzA1LCBoZWlnaHQ6IDQ1NX0sXG4gICAgICB0YXNrOiBg0KPQs9Cw0LTQsNC5LCDRhNC+0YLQviDQuNC70Lgg0YDQuNGB0YPQvdC+0Lo/YCxcbiAgICAgIHF1ZXN0aW9uczpcbiAgICAgIFtcbiAgICAgICAge1xuICAgICAgICAgIGltZzpcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNyYzogYGh0dHBzOi8vazQyLmtuMy5uZXQvRDJGMDM3MEQ2LmpwZ2AsXG4gICAgICAgICAgICAgIHNpemU6IHt3aWR0aDogNDY4LCBoZWlnaHQ6IDM1NH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6IGBwYWludGBcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0R2FtZVR5cGUyKGluZGV4KSB7XG4gICAgLy8gMiDQuNC30L7QsdGA0LDQttC10L3QuNGPXG4gICAgLy8g0LTQu9GPINC60LDQttC00L7Qs9C+INC40Lcg0LjQt9C+0LHRgNCw0LbQtdC90LjQuSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LTQvtC70LbQtdC9INGD0LrQsNC30LDRgtGMINC60LDRgNGC0LjQvdCwINGN0YLQviDQuNC70Lgg0YTQvtGC0L7Qs9GA0LDRhNC40Y9cbiAgICByZXR1cm4ge1xuICAgICAgZ2FtZUluZGV4OiBpbmRleCxcbiAgICAgIGdhbWVUeXBlOiBjb25maWcuR0FNRV9UWVBFLnR3byxcbiAgICAgIGZyYW1lU2l6ZToge3dpZHRoOiA0NjgsIGhlaWdodDogNDU4fSxcbiAgICAgIHRhc2s6IGDQo9Cz0LDQtNCw0LnRgtC1INC00LvRjyDQutCw0LbQtNC+0LPQviDQuNC30L7QsdGA0LDQttC10L3QuNGPINGE0L7RgtC+INC40LvQuCDRgNC40YHRg9C90L7Quj9gLFxuICAgICAgcXVlc3Rpb25zOlxuICAgICAgW1xuICAgICAgICB7XG4gICAgICAgICAgaW1nOlxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3JjOiBgaHR0cHM6Ly9rNDIua24zLm5ldC9DRjQyNjA5QzguanBnYCxcbiAgICAgICAgICAgICAgc2l6ZToge3dpZHRoOiA2MDAsIGhlaWdodDogODMxfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgY29ycmVjdEFuc3dlcjogYHBhaW50YFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaW1nOlxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3JjOiBgaHR0cDovL2kuaW1ndXIuY29tLzFLZWdXUHouanBnYCxcbiAgICAgICAgICAgICAgc2l6ZToge3dpZHRoOiAxMDgwLCBoZWlnaHQ6IDcyMH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6IGBwaG90b2BcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0R2FtZVR5cGUzKGluZGV4KSB7XG4gICAgLy8gMyDQuNC30L7QsdGA0LDQttC10L3QuNGPXG4gICAgLy8g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GOINC90YPQttC90L4g0LLRi9Cx0YDQsNGC0Ywg0L7QtNC90L4g4oCUINC70LjQsdC+INC90YPQttC90L4g0LLRi9Cx0YDQsNGC0Ywg0LXQtNC40L3RgdGC0LLQtdC90L3Rg9GOINGE0L7RgtC+0LPRgNCw0YTQuNGOLCDQu9C40LHQviDQtdC00LjQvdGB0YLQstC10L3QvdGD0Y4g0LrQsNGA0YLQuNC90YNcbiAgICByZXR1cm4ge1xuICAgICAgZ2FtZUluZGV4OiBpbmRleCxcbiAgICAgIGdhbWVUeXBlOiBjb25maWcuR0FNRV9UWVBFLnRocmVlLFxuICAgICAgZnJhbWVTaXplOiB7d2lkdGg6IDMwNCwgaGVpZ2h0OiA0NTV9LFxuICAgICAgdGFzazogYNCd0LDQudC00LjRgtC1INGA0LjRgdGD0L3QvtC6INGB0YDQtdC00Lgg0LjQt9C+0LHRgNCw0LbQtdC90LjQuWAsXG4gICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGltZzpcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNyYzogYGh0dHBzOi8vazMyLmtuMy5uZXQvNUM3MDYwRUM1LmpwZ2AsXG4gICAgICAgICAgICAgIHNpemU6IHt3aWR0aDogMTIwMCwgaGVpZ2h0OiA5MDB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzcmM6IGBodHRwczovL2kuaW1ndXIuY29tL0RpSE01WmIuanBnYCxcbiAgICAgICAgICAgICAgc2l6ZToge3dpZHRoOiAxMjY0LCBoZWlnaHQ6IDE4NjR9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzcmM6IGBodHRwOi8vaS5pbWd1ci5jb20vREtSMUh0Qi5qcGdgLFxuICAgICAgICAgICAgICBzaXplOiB7d2lkdGg6IDExMjAsIGhlaWdodDogMjk2NX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6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