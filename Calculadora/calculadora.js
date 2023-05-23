let calculadora = document.querySelector(".marco");
let visor = document.querySelector(".visor");
visor.innerHTML ="0";
visor.status= 'N';  //N: nuevo (borrar), U: usado (para agregarle datos)
visor.buffer='';    //va a servir como una global para implementar el buffer
calculadora.addEventListener('click', leerTecla);
function leerTecla(event){
   let tecla = event.target;
   let visor = document.querySelector(".visor");
   let resdo, oper;
   switch (tecla.dataset.tipo){
      case  "num": 
         if (visor.status == "N"){
            visor.status = "";
            visor.innerHTML = "";
         }
         visor.innerHTML += tecla.innerHTML; 
         break;
      case 'signo': 
         visor.innerHTML = cambiarSigno(visor.innerHTML);
         break; 
      case 'oper': 
         visor.buffer += visor.innerHTML;
         oper = tecla.innerHTML == "Enter"?"":tecla.innerHTML;
         if(esEjecutable(visor.buffer)){
            resdo = ejecutar(visor.buffer);
            if(resdo !="ERROR" && oper !=""){
               visor.buffer = resdo+oper;
            }
            else{
               visor.buffer = "";
               }
            visor.innerHTML = resdo;
            }
         else{
            visor.buffer += oper;
         }
        visor.status = "N";
        break; 
      case 'borrar':              
         visor.buffer = "";
         visor.innerHTML=0;
         visor.status="N";              
   }
}

//cambio de signo de una cadena numérica
function cambiarSigno(valor){
    let num = parseInt(valor);
    let res = valor;
    if(!isNaN(num)){
        num = num*(-1);
        res = num.toString();
    }
    return res;
}
function esEjecutable(expresion){
    let condicion = /^[+-]?\d+[\d\.]*[\+\-\*\/][+-]?\d+/;
    return condicion.test(expresion);
}
//Ejecutar la expresión pasada que será de la forma
//numero operador numero (ej.: 45+6)
function ejecutar(expresion){
    let partes = expresion.match(/(^[+-]?\d+\.?\d*)([\+\-\*\/])([+-]?\d+\.?\d*)/);
    let valor=0;
    partes[1] = parseFloat(partes[1]);
    partes[3] = parseFloat(partes[3]);
    switch (partes[2]){
        case '+':
            valor = partes[1]+partes[3]
                break;
        case '-':
            valor = partes[1]-partes[3]
                break;
        case '*':
            valor = partes[1]*partes[3]
                break;
        case '/':
            valor = partes[1]/partes[3]
                break;
        default:
            valor = "ERROR";
    }
    valor = valor.toString();
    valor = valor.substr(0,10);
    return valor;
}