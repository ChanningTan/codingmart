/**
 * Created by Channing on 2016/11/4.
 */

var EventUtil = {
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};



//main-------------------------------------------------
function imageToggle(){
    var li = document.querySelectorAll('#header-ul li');
    var li_dot = document.querySelectorAll('#dots li');
    var turnLeft = document.querySelector('span.turn-left');
    var turnRight = document.querySelector('span.turn-right');
    var len = li.length;

    function setPageView(index){

        if (index >= len){
            index = 0;
        } else if (index < 0){
            index = len-1;
        }

        for (var i=0; i<len; i++){
            if (i == index){
                li[i].classList.remove("hidden");
                li_dot[i].classList.add('selected');
            } else {
                li[i].classList.add("hidden");
                li_dot[i].classList.remove('selected');
            }
        }
    }

    function clickTurnRight(){

        for (var i=0; i<len; i++){
            if (li_dot[i].classList.contains("selected")){
               break;
            }
        }
        setPageView(i+1);
    }
    function clickTurnLeft(){

        for (var i=0; i<len; i++){
            if (li_dot[i].classList.contains("selected")){
                break;
            }
        }
        setPageView(i-1);
    }

    function clickDots(event){

        for (var i=0; i<len; i++){
            if (li_dot[i] == event.target){
                break;
            }
        }
        setPageView(i);
    }

    //add event-------------------
    for (var i=0; i<len; i++){
        EventUtil.addEvent(li_dot[i], 'click', clickDots);
        EventUtil.addEvent(turnLeft, 'click', clickTurnLeft);
        EventUtil.addEvent(turnRight, 'click', clickTurnRight);
    }

}

imageToggle();



























