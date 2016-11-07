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
        function setHidden(obj){
            obj.classList.remove('opacity1');
            obj.classList.add('opacity0');
        }
        function setShow(obj){
            obj.classList.remove('opacity0');
            obj.classList.add('opacity1');
        }
        function setIndex(){
            for (var j=0; j<len; j++){
                if (j == index){
                    li[j].style['z-index'] = 9;
                }else {
                    li[j].style['z-index'] = 1;
                }
            }
        }

        if (index >= len){
            index = 0;
        } else if (index < 0){
            index = len-1;
        }

        for (var i=0; i<len; i++){
            if (i == index){
                li_dot[i].classList.add('selected');
                setShow(li[i]);
            } else {
                li_dot[i].classList.remove('selected');
                setHidden(li[i]);
            }
        }

        setTimeout(setIndex, 400);
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

    var auto = setInterval(clickTurnRight, 4000);

    //add event-------------------
    for (var i=0; i<len; i++){
        EventUtil.addEvent(li_dot[i], 'click', clickDots);
        EventUtil.addEvent(li_dot[i], 'mouseover', function(){
            clearInterval(auto);
        });
        EventUtil.addEvent(li_dot[i], 'mouseout', function(){
            auto = setInterval(clickTurnRight, 4000);
        });
    }

    EventUtil.addEvent(turnLeft, 'click', clickTurnLeft);
    EventUtil.addEvent(turnLeft, 'mouseover', function(){
        clearInterval(auto);
    });
    EventUtil.addEvent(turnLeft, 'mouseout', function(){
        auto = setInterval(clickTurnRight, 4000);
    });

    EventUtil.addEvent(turnRight, 'click', clickTurnRight);
    EventUtil.addEvent(turnRight, 'mouseover', function(){
        clearInterval(auto);
    });
    EventUtil.addEvent(turnRight, 'mouseout', function(){
        auto = setInterval(clickTurnRight, 4000);
    });
}

imageToggle();



























