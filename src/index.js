/* 
    Ici c'est le point d'entrée de notre application
    on importe nos script js, nos styles scss ou css
    et on démarre l'application
*/
import { run } from "./app/app";
import "./main.scss";
import { AlertService } from "./app/alert.service";
import { ComponentService } from "./app/component.service";
const alertService = new AlertService();
const componentService = new ComponentService();
run(alertService, componentService);
console.log("J");
let test = "Hello Webpack !";
