makeGraph=function(gData){  
              
        //Initialise Graph  
        var g = new canvasGraph('graph'); 
                     
        gData.sort(sortNumByZ);  
                  
        //draw graph   
        g.drawGraph(gData);   
  
    }  //pasar el array como argumento