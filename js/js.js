
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var aterrizado = null;
//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("speed");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");

	//definición de eventos

	//botones de la pantalla tales como play, reset y opciones
	
	document.getElementById("play").onclick=function(){
		play();
	}
	document.getElementById("reset").onclick=function(){
		reset();
	}
	document.getElementById("pause").onclick=function(){
		pause();
	}
	document.getElementById("opciones").onclick=function(){
		opciones();
	}
	document.getElementById("cerrar_opciones").onclick=function(){
		cerrar_opciones();
	}

	//niveles de dificultad

	document.getElementById("facil").onclick=function(){
		facil();
	}
	document.getElementById("normal").onclick=function(){
		normal();
	}
	document.getElementById("dificil").onclick=function(){
		dificil();
	}

	//boton about

	document.getElementById("Abutton").onclick=function(){
		about();
	}

	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}

	//boton movil

	function is_touch_device() {
		if ('ontouchstart' in window) {
			document.getElementById("boton").style.display="inline-block";}		
	is_touch_device();
	}

	//encender/apagar al apretar/soltar la tecla espacio (keycode == 32 = tecla espacio)
	document.onkeydown = function(evt) {
   	 	evt = evt || window.event;
    	if (evt.keyCode == 32) {
       		motorOn();
   		}
	}
	document.onkeyup = motorOff;
	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
	
	//Boton movil
	var boton=document.getElementById("boton");
	function handlerFunction(event) {
		motorOn();
	}
	function endingFunction(event) {
		motorOff();
	}

function about(){
	location.href="About.html";
}

function facil(){
	stop();
	v=0;
	y = 10;
	g = 1.622;
	a = g;
	dt = 0.016683;
	c=100;
	document.getElementById("fuel").innerHTML=100;
	cerrar_opciones();
	start();
}

function normal(){
	stop();
	v=0;
	y = 10;
	g = 1.622;
	a = g;
	dt = 0.016683;
	c=70;
	document.getElementById("fuel").innerHTML=70;
	cerrar_opciones();
	start();
}
function dificil(){
	stop();
	v=0;
	y = 10;
	g = 1.622;
	a = g;
	dt = 0.016683;
	c=35;
	document.getElementById("fuel").innerHTML=35;
	cerrar_opciones();
	start();
}
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=v.toFixed(2);
	altura.innerHTML=(70.22-y).toFixed(2);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} 
	else { 
		stop();
		aterrizado=true;
		end();
	}
}
function motorOn(){
	//el motor da aceleración a la nave
	a=-g;
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null){
		document.getElementById("imgNave").src = "img/ovni_encendido.png";
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	}
	if (c==0){ //si la nave se ha quedado sin combustible el motor se detiene
		motorOff();
	}
	if (aterrizado){ 
		motorOff();
	}	
}
function motorOff(){
	document.getElementById("imgNave").src = "img/ovni.png";
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML=c.toFixed(2);	
}

function opciones(){
	pause();
	document.getElementById("ajustes").style.display="inline-block";
	document.getElementById("victoria").style.display="none";
	document.getElementById("derrota").style.display="none";
}

function cerrar_opciones(){
	document.getElementById("ajustes").style.display="none";
}

//Botón play
function play() {
	stop();
	start();
	document.getElementById("play").style.display="none";
	document.getElementById("pause").style.display="inline-block";
}

//Botón pausa
function pause() {
	stop();
	document.getElementById("pause").style.display="none";
	document.getElementById("play").style.display="inline-block";
}

function reset() {
	stop();
	v=0;
	y = 10;
	g = 1.622;
	a = g;
	dt = 0.016683;
	c=100;
	document.getElementById("fuel").innerHTML=100;
	start();
}

function end(){
	if (v>5) {
		document.getElementById("derrota").style.display="inline-block";
	}

	else{
		document.getElementById("victoria").style.display="inline-block"
	}
}