#Canvas 3D Graph#
___

##Descripcion del proyecto##
***
El proyecto consiste en crear un visualizador y editor de graficas en 3D, utilizando XUL como ambiente grafico y herramienta de desarollo, en conjunto con [CoffeeScript](http://coffeescript.org/) y [D3.JS](http://d3js.org/). Los datos se cargan desde un archivo XML.







##Sobre la libereria Canvas3DGraph.js##
***
Canvas3DGraph es una libreria en Javascript creada por  Dragan Bajcic bajo licencia BSD. Esta librería es  utilizada para dibujar gráficos de barra en 3D dentro de un tag canvas.
	
## Datos a graficar ##
***
Los datos que se van a graficar se pasan en un array, el cual en cada posicion contiene a su vez un associative array con los valores para la terna (x,y,z).

<pre><code>gData=new Array();                 
gData[0]={x:500,y:500,z:500};  
gData[1]={x:500,y:400,z:600};  
gData[2]={x:500,y:300,z:700};  
gData[3]={x:500,y:200,z:800};  
gData[4]={x:500,y:100,z:900}; </code></pre>

## Dibujando en el canvas ##
***
Para dibujar en el canvas, se debe primero ordenar cada elemento del array de mayor a menor, tomando en cuenta el valor z de cada uno. Esto se realiza con

<pre><code>gData.sort(sortNumByZ);</code></pre>
En donde "sortNumByZ" es una funcion incluida en la libreria de Canvas3DGraph.

##Implementacion de la solucion##
***
El programa cuenta con una interfaz en XUL (main.xul), con un menu con la opcion de cargar un archivo XML y un canvas, en el cual se dibuja la grafica en 3D. Para realizar las acciones, se cuenta con una clase en [CoffeeScript](http://coffeescript.org/) llamada "File" en el archivo llamado "main.coffee" que despues de pasarla por el compilador de CoffeeScript se convierte a "main.js". Ademas, se tiene el archivo "graph.js" con una unica funcion, la cual recibe un Array con los datos a graficar y los dibuja.

###Estructura de los archivos XML###
***
<pre><code>&lt;Coordenadas>

	&lt;Bar  x="num"  y="num2"  z="num3" /> 

	&lt;Bar  x="num"  y="num2"  z="num3" /> 

	...

&lt;/Coordenadas> </code></pre>

###Pruebas de funcionalidad###
***
![](Capture.png)


![](Capture2.png)


![](Capture3.png)


![](Capture4.png)

###Limitaciones observadas y posibles mejoras###
***
- Para lograr que funcionara, se tuvo que poner el tag de HTML  &lt;div> y el tag &lt;canvas>.
- Se desconoce por que aparece un texto en la esquina inferior izquierda. Se sabe que se pone cuando se grafica.
- Se le podria agregar a la grafica numeros en los ejes X,Y,Z para ubicar mejor la grafica.

##[Referencias](referencias.html)##
***




