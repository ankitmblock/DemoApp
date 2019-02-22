$(document).ready(function(){
  var marks = [];
      var drawings = [];
      var totalMarks = 0;
      var isFinishedDrawing = false;

      var drawOnMouseMove = function(event) {
        var artboard = document.getElementById('artboard-svg');
        var lastMark = Object.assign({}, marks[marks.length - 1]);
        var layerX = event.layerX;
        var layerY = event.layerY;

        drawLineAtMark({
          fromX: lastMark.fromX,
          fromY: lastMark.fromY,
          toX: layerX,
          toY: layerY,
        });

        if (!drawings.length || totalMarks <= artboard.childElementCount) {
          // delete most recent svg line
          removeRecentLine()
        }
      }

      var removeMouseMoveListener = function() {
        document
            .getElementById('artboard-svg')
            .removeEventListener('mousemove', drawOnMouseMove);
      }

      var reset = function () {
        var artboard = document.getElementById('artboard-svg')
        marks = [];
        drawings = [];
        artboard.innerHTML = "";
        totalMarks = 0;
        removeMouseMoveListener();
      }

      var removeRecentLine = function(isFinishing) {
        var artboard = document.getElementById('artboard-svg');
        setTimeout(() => {
          if (artboard.childElementCount > 1) {
            artboard.removeChild(artboard.children[artboard.childElementCount - (isFinishing ? 1 : 2)], 1);
          }
        }, 0);
      }

      var finishCurrentDrawing = function () {
        removeMouseMoveListener();
        removeRecentLine(true)
        isFinishedDrawing = true;
        marks.splice(marks.length - 2, 1);
        drawings.push(Object.assign([], marks));
        marks = []
      }

      var drawLineAtMark = function(mark) {
        var artboard = document.getElementById('artboard-svg')

        var newLine = document.createElement('Line');
        newLine.setAttribute('x1', mark.fromX);
        newLine.setAttribute('y1', mark.fromY);
        newLine.setAttribute('x2', mark.toX);
        newLine.setAttribute('y2', mark.toY);
        newLine.setAttribute("style", "stroke:rgb(255,0,0);stroke-width:2");

        artboard.appendChild(newLine)

        // SVG don't rerender dynamically added elements, so had to do this work around.
        artboard.innerHTML = artboard.innerHTML
      }

      var startOrMarkNewPoint = function (event) {
        var layerX = event.layerX;
        var layerY = event.layerY;
        totalMarks += 1;

        if (!marks.length) {
          isFinishedDrawing = false;
          marks.push({
            fromX: layerX,
            fromY: layerY,
          });

          document
            .getElementById('artboard-svg')
            .addEventListener('mousemove', drawOnMouseMove);
        } else {
          var previousMark = marks[marks.length - 1];
          marks[marks.length - 1] = Object.assign({}, previousMark, {
            toX: layerX,
            toY: layerY,
          });

          marks[marks.length] = {
            fromX: layerX,
            fromY: layerY,
          };
          previousMark = marks[marks.length - 2];

          drawLineAtMark(previousMark)
        }
      }

      var save = function () {
        if (!isFinishedDrawing) {
          finishCurrentDrawing();
        }
        
        $.ajax({
          url:"setImageDimension",
          method:'GET',
          data:{
            datas : JSON.stringify(drawings)
          },
          type:"json",
          success:function(result){
            console.log(result);
            if(result.status==200){
              console.log('success')
            }else{
              console.log('failed')
      
            }
          }
        })

        console.log('Final list of drawings', drawings);
      }

      document
        .getElementById('artboard-svg')
        .addEventListener('click', startOrMarkNewPoint);

      document
      .getElementById('btn-save')
      .addEventListener('click', save);

      document
        .getElementById('btn-reset')
        .addEventListener('click', reset);

        document
        .getElementById('btn-finish')
        .addEventListener('click', finishCurrentDrawing);
})

