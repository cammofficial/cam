var mk = MindFusion.Keyboard;
var KeyboardLayout = MindFusion.Keyboard.KeyboardLayout;

document.addEventListener("DOMContentLoaded", function (event)
{
    document.getElementById("selectedLang").selectedIndex = -1;

    var vk = mk.VirtualKeyboard.create(document.getElementById("keyboard"));
    vk.render();
    vk.scaleToFitParent = false;

    document.getElementById("selectedLang").onchange = function (event)
    {
        switch (event.target.value)
        {
            case 'Std':
                vk.layout = KeyboardLayout.compactLayout();
                break;
            case 'Fr':
                vk.layout = KeyboardLayout.create(layoutDefFr);
                break;
            case 'De':
                vk.layout = KeyboardLayout.create(layoutDefDe);
                break;
            case 'Es':
                vk.layout = KeyboardLayout.create(layoutDefEs);
                break;
        }
    }
});

function showKeyboard()
{
    var x = document.getElementById("keyboard");
    x.style.display = "block";
}

function hideKeyboard()
{
    var x = document.getElementById("keyboard");
    x.style.display = "none";
}