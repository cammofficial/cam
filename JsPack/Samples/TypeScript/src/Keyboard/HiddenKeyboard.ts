import * as k from '@mindfusion/keyboard';
import { layoutDefFr } from './french-symbols';
import { layoutDefDe } from './german-symbols';
import { layoutDefEs } from './spanish-symbols';

document.addEventListener("DOMContentLoaded", function (event) {
    (<HTMLSelectElement>document.getElementById("selectedLang")).selectedIndex = -1;

    var vk = k.VirtualKeyboard.create(document.getElementById("keyboard"));
    vk.render();
    vk.scaleToFitParent = false;

    document.getElementById("selectedLang").onchange = function (event) {
        switch ((<HTMLSelectElement>event.target).value) {
            case 'Std':
                vk.layout = k.KeyboardLayout.compactLayout();
                break;
            case 'Fr':
                vk.layout = k.KeyboardLayout.create(layoutDefFr);
                break;
            case 'De':
                vk.layout = k.KeyboardLayout.create(layoutDefDe);
                break;
            case 'Es':
                vk.layout = k.KeyboardLayout.create(layoutDefEs);
                break;
        }
    }
});

document.getElementById("text").addEventListener("focus",
    () => {
        var x = document.getElementById("keyboard");
        x.style.display = "block";
    });

document.getElementById("text").addEventListener("blur",
    () => {
        var x = document.getElementById("keyboard");
        x.style.display = "none";
    });