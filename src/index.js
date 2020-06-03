'use strict';
import {checkBright} from "./histogram";
import * as faceapi from "face-api.js";

export default function checkPhoto(id) {
    if (!id) return;

    (async () => {
        await faceapi.nets.tinyFaceDetector.loadFromUri('./models');
        const detection = await faceapi.detectAllFaces(id, new faceapi.TinyFaceDetectorOptions());
        const brightResult = checkBright(id);
        let errors=[];
        if (brightResult===1){
            console.warn("Темное изображение");
            errors.push(-1);
        }
        if (brightResult===2){
            console.warn("Светлое изображение");
            errors.push(-2);
        }
        if (!detection.length) {
            console.error("Лицо не обнаружено");
            errors.push(-3);

        } else {
            if (detection.length > 1) {
                console.error("Обнаружено несколько лиц");
                errors.push(-4);
            } else {
                console.info("Все ОК");
            }
        }
        return errors;
    })();


}