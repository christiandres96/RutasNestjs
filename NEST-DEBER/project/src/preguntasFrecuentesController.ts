import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';

interface PreguntaFrecuente {
    pregunta: string;
    respuesta: string;
}

let preguntasFrecuentes = [];

@Controller("Preguntas")
export class PreguntasFrecuentesController {

    @Post('nuevaPregunta')
    obtenerPreguntas(@Req() request, @Res() response, @Body() body){
        Object.keys(request.body).forEach((key)=>{
            let nuevaPregunta = {
                pregunta: key,
                respuesta: request.body[key]
            };
            preguntasFrecuentes.push(nuevaPregunta);
        })
    }

    @HttpCode(200)
    @Get('mostrarPreguntas')
    mostrarPreguntas(){
        console.log(preguntasFrecuentes);
        let contenidoHTML = "<!DOCTYPE html>" +
            "<head>" +
            "<title>Preguntas Frecuentes</title>" +
            "</head>" +
            "<body>"
        preguntasFrecuentes.forEach((value, index, preguntasFrecuentes)=>{
            contenidoHTML += "<h1>" + value.pregunta + "</h1>" + "<br/>" + "<p>" + value.respuesta + "</p>" + "<br/>";
        });
        contenidoHTML += "</body>";
        return contenidoHTML;
    }
}