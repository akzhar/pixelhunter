var debug = (function () {
  'use strict';

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

  return debug;

}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWcuanMiLCJzb3VyY2VzIjpbImpzL2RlYnVnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERFQlVHX09OID0gdHJ1ZTtcbmNvbnN0IFNUWUxFID0gYHN0eWxlPVwiYm94LXNoYWRvdzogMHB4IDBweCAxMHB4IDEycHggcmdiYSgxOSwxNzMsMjQsMSk7XCJgO1xuXG5mdW5jdGlvbiBpc1Bob3RvKGFuc3dlcikge1xuICByZXR1cm4gKERFQlVHX09OICYmIGFuc3dlciA9PT0gYHBob3RvYCkgPyBTVFlMRSA6IGBgO1xufVxuXG5mdW5jdGlvbiBpc1BhaW50KGFuc3dlcikge1xuICByZXR1cm4gKERFQlVHX09OICYmIGFuc3dlciA9PT0gYHBhaW50YCkgPyBTVFlMRSA6IGBgO1xufVxuXG5mdW5jdGlvbiBpc0NvcnJlY3QoaXNDb3JyZWN0KSB7XG4gIHJldHVybiAoREVCVUdfT04gJiYgaXNDb3JyZWN0KSA/IFNUWUxFIDogYGA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtpc1Bob3RvLCBpc1BhaW50LCBpc0NvcnJlY3R9O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztFQUNBLE1BQU0sS0FBSyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQztBQUN6RTtFQUNBLFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRTtFQUN6QixFQUFFLE9BQU8sQ0FBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN2RCxDQUFDO0FBQ0Q7RUFDQSxTQUFTLE9BQU8sQ0FBQyxNQUFNLEVBQUU7RUFDekIsRUFBRSxPQUFPLENBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDdkQsQ0FBQztBQUNEO0VBQ0EsU0FBUyxTQUFTLENBQUMsU0FBUyxFQUFFO0VBQzlCLEVBQUUsT0FBTyxDQUFZLENBQUMsU0FBUyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUM5QyxDQUFDO0FBQ0Q7QUFDQSxjQUFlLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUM7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
