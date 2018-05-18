import {Controller, Get, Req, Res} from "@nestjs/common";
const fs = require('fs')
@Controller()
export class InicioController {

    @Get('Home')
    mostrarHome(@Req() request, @Res() response){
        let indexHTML = '<!DOCTYPE html>' +
            '<head>' +
            '<title>NEST-DEBER</title>' +
            '</head>';
        fs.readFile(__dirname + '/html/header.html', "utf8", (err, data)=>{
            if(err && data.length == 0){
                console.log("Header: " + data.length);
                return response
                    .status(500)
                    .send("Error");
            }else{
                indexHTML += data;
                fs.readFile(__dirname + '/html/contenido.html', "utf8", (err, data)=>{
                    if(err && data.length == 0){
                        console.log("Contenido: " + data.length);
                        return response
                            .status(500)
                            .send("Error");
                    }else{
                        indexHTML += data;
                        fs.readFile(__dirname + '/html/footer.html', "utf8", (err, data)=>{
                            if(err && data.length == 0){
                                console.log("Footer: " + data.length);
                                return response
                                    .status(500)
                                    .send("Error");
                            }else{
                                indexHTML += data;
                                return response.status(200).send(indexHTML);
                            }
                        });
                    }
                });
            }
        });
    }
}