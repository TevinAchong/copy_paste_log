var button = document.getElementById("copy-button-1"); 
var contentHolder = document.getElementById("content-holder");
var copy_paste_log = []; 
var paste_text = "";


document.addEventListener('copy', function(e) {
    e.preventDefault(); 

    var selection = window.getSelection().toString(); 

    var escaped = escapeHtml(selection); 

    e.clipboardData.setData('text/plain', escaped);

    copy_paste_log.push(selection);
    console.log(copy_paste_log);

    var copy_menu = document.getElementById("copy-paste-log"); 

    var outer_li = document.createElement("li"); 
    outer_li.classList.add("dropdown-submenu"); 
    copy_menu.appendChild(outer_li); 

    var outer_a = document.createElement("a"); 
    outer_a.classList.add("test");
    outer_a.tabIndex = "-1"; 
    outer_a.href = "#"; 
    outer_a.innerHTML = "Log Index #" + copy_paste_log.length; 
    outer_li.appendChild(outer_a); 

    var arrow_span = document.createElement("span"); 
    arrow_span.classList.add("caret");
    outer_a.appendChild(arrow_span); 

    var inner_ul = document.createElement("ul"); 
    inner_ul.classList.add("dropdown-menu"); 
    outer_li.appendChild(inner_ul); 

    var inner_li = document.createElement("li"); 
    inner_ul.appendChild(inner_li); 

    var inner_a = document.createElement("a"); 
    inner_a.tabIndex = "-1"; 
    inner_a.href = "#"; 
    inner_a.innerHTML = selection; 
    inner_a.classList.add("options"); 
    inner_a.id = "option_" + (copy_paste_log.length).toString(); 
    inner_a.onclick = function() {
        getId(inner_a); 
    }
    inner_li.appendChild(inner_a); 

});

document.addEventListener('paste', function(e) {
    if (copy_paste_log.length === 1)
        return; 
    e.preventDefault();
    if ((document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT') && (copy_paste_log.length > 0)){
        
        var paste_area = document.activeElement;
        document.getElementById("copy_log").style.display = "block";
        var options = document.getElementsByClassName('options'); 
        console.log(options);
        
        window.getId = function(object) { //Retrieves the ID of the picture, and compares it to the ID of the modals, if a match is found, the modal is displayed
            for (var i = 0; i < options.length; i += 1) {
                if (options[i].id === object.id) {
                    paste_text = options[i].innerHTML; 
                    console.log(paste_text); 
                    paste_area.value = paste_area.value + " " + paste_text;
                    document.getElementById("copy_log").style.display = "none";
                }
            }
        };

        
    }
});


function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
 }


