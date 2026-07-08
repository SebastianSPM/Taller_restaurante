const prompt = require('prompt-sync')();

let pedido = []
let stop = 1;
let aux = "";
let newMenu = []
let opcion = 0;
let opcionAnterior = 0;

const menu = [
    {
        nombre:"sopa",
        precio:8000,
        categoria:"suave",
        disponible:true
    },
    {
        nombre:"hamburguesa",
        precio:12000,
        categoria:"fuerte",
        disponible:true
    },
    {
        nombre:"helado",
        precio:6000,
        categoria:"Postre",
        disponible:false
    },
    {
        nombre:"jugo de naranja",
        precio:4000,
        categoria:"Bebida",
        disponible:true
    }
]

const menuPrincipal = () => {
    console.log("1) Mostrar platos");
    console.log("2) Mostrar platos disponibles");
    console.log("3) Pedir platos");
    console.log("4) Calcular cuenta");
}

const mostrarMenu = (newMenu) => {
    for(let i = 0; i < newMenu.length; i++){
        console.log(`Plato: ${newMenu[i].nombre} - Precio: ${newMenu[i].precio}`);
    }
}

const soloDisponible = (menu) => {

    let newMenu = [];

    for(let i = 0; i < menu.length; i++){
        if(menu[i].disponible != false){
            newMenu.push(menu[i])
        }
    }
    console.log(" === MENU === ");
    
    return newMenu;
}

const tomarPedido = (newMenu) => {
    do{

        console.log(" === PEDIDO === ");

        console.log("1) Agregar un nuevo plato");
        console.log("2) Quitar el último plato:");
        console.log("3) Salir ");

        opcion = parseInt(prompt("Ingresa la opción:  "));

        if(opcion == 1){
            aux = prompt("Ingresa el nombre del plato: ");
            if(aux == "" || aux.length < 0){
                console.log("No haz agregado ningun plato");
            }else{
                for(let i = 0; i < newMenu.length; i++)
                    if(newMenu[i].nombre == aux){
                        console.log("\nSe agrego un nuevo plato\n");
                        
                        pedido.push(newMenu[i]);
                        break;
                    }else{
                        console.log("Este plato no existe, agrega nuevamente...");
                    }
            }
        }else if(opcion == 2){
            aux = prompt("¿Quitar el último plato?(si/no): ");
        }else if(opcion == 3){
            aux = prompt("Salir del menú de pedidos?(si/no): ").toLowerCase();
            if(aux == 'si'){
                stop = 0;
                return pedido;
            }
        }else{
            console.log("\nEsa opción no existe, seleccióne(1-3)...\n");
            
        }

    }while(stop != 0);

}

const calcularCuenta = (pedido) => {
    let sumaPedido = 0.0
    const IVA = 0.19;
    let total = 0.0;
    
    for(let i = 0; i < pedido.length; i++){
        sumaPedido += pedido[i].precio;
    }

    total = (sumaPedido * IVA) + sumaPedido;

    console.log("\nPEDIDO");
    
    console.log("subtotal: ", sumaPedido);
    console.log("IVA: ", IVA * 100, "%");
    console.log("total: ", total);
    
}


while(stop != 0){

    menuPrincipal()
    opcion = parseInt(prompt("Selecciona una opción: "));

    switch(opcion){
        case 1:
            mostrarMenu(newMenu);
            break;
        case 2:
            newMenu = soloDisponible(menu);
            opcionAnterior = 2;
            break;
        case 3:
            if(opcionAnterior == 0){
                console.log("Porfavor, primero mire los platos disponibles(opcion 2)...");
            }else{
                pedido = tomarPedido(newMenu);
            }
            break;
        case 4:
            if(pedido === undefined || pedido == []){
                console.log("Porfavor, primero pida los platos(opcion 3)...");
            }else{
                calcularCuenta(pedido)
            }
            break;
        default:
            console.log("\nSelecciona una de las 4 opciones.\n");
    }

    
}