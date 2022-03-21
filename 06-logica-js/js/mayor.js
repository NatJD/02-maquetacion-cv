var n1 = prompt("Ingrese un número");
var n2 = prompt("Ingrese un número");
var n3 = prompt("Ingrese un número");

console.log(n1,n2,n3);
if (n1>n2 && n1>n3) {
    alert("El número mayor de los tres ingresados es "+n1);
} else if (n2>n1 && n2>n3) {
    alert("El número mayor de los tres ingresados es "+n2);
} else {
    alert("El número mayor de los tres ingresados es "+n3);
}