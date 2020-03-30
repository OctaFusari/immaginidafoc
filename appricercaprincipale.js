window.onload = ()=>{
    var bottonecerca = document.getElementById("vai");
    var primapag = document.querySelector("#primapag"); 
    var centro = document.querySelector("#centro");
    var home = document.getElementById("ricaricahome");  
    var home1 = document.getElementById("ricaricahome2");
    var divpi = document.querySelector("#divpi"); 
    var apiid = "F_w-jOpJC1uH59SKw4fF2Y11r4effiTmXhTgGJmdCl8";
    function cercaImg(){
        var q = document.getElementById("search").value;
        const linkbase = "https://api.unsplash.com/search/photos?";
        var link = linkbase + "query=" + q + "&client_id=" + apiid;
        /*let response = fetch(link);*/
        return fetch(link)/*response*/;
    }

    function getImg(){
        divpi.innerHTML ='';
        var HTML = ``;
        var HTML1 = `<div id="divimg">`;
        var HTML2 = `</div>`;
        cercaImg().then((response)=>{
            if(response.ok){
                response.json().then(dati=>{
                    let arr = [];
                    while(arr.length < 4){
                        var r = Math.floor(Math.random() * 10) + 1;
                        if(arr.indexOf(r) === -1) arr.push(r);
                    }
                    console.log(arr);
                    
                    for(var i = 1; i < 4; i++){
                        try{
                            var erroreid = "errore"+i;
                            var arri = arr[i];
                            console.log(arri);
                            String(arri);
                            var img = dati.results[arri].urls.regular;
                            var a = dati.results[arri].user.username;
                            var p = dati.results[arri].alt_description;
                            var q = document.getElementById("search").value;
                            var aut = "autore"+i;
                            var ii = "ii"+i;
                            HTML = HTML + `
                                <div class="${ii}">
                                    <a id="${aut}" style="color: orange !important">${a}</a>
                                    <p>${p}</p>
                                    <img src="${img}" alt="immagine">
                                </div>
                            `;
                        }
                        catch(err){
                            HTML.innerHTML = HTML = HTML + `<p id="${erroreid}">immagine non trovata</p>`;
                            document.getElementById("querytext").innerHTML = ``;
                        }
                    }
                        divpi.innerHTML = HTML1 + HTML + HTML2 ;
                    let h1 = document.querySelector("#querytext"); 
                    if( q != undefined){
                        h1.innerHTML  = q;
                    }
                })     
            }
        })

        setTimeout(function(){
            try{
                var img1art = document.getElementById("autore1");    
                var img2art = document.getElementById("autore2");   
                var img3art = document.getElementById("autore3"); 
                img1art.addEventListener("click", ()=>{getImgByAuthor(img1art.innerHTML)});
                img2art.addEventListener("click", ()=>{getImgByAuthor(img2art.innerHTML)});
                img3art.addEventListener("click", ()=>{getImgByAuthor(img3art.innerHTML)});
            }catch(err){
                document.getElementById("errore").innerHTML = ``;
            }
        }, 1000);
    }

    bottonecerca.addEventListener("click", getImg);
    
    function getImgDataByAuthor(q) {
        var h1 = document.querySelector("#querytext"); 
        const linkbase = "https://api.unsplash.com/search/users?";
        var link = linkbase + "query=" + q + "&client_id=" + apiid;
        var response = fetch(link);
        response.then(data => {
                return data.json();
        }).then(data => {
            
            var artid = data.results[0].username;
            primapag.innerHTML = `<h1>Artista: ${artid}</h1>`;
            h1.innerHTML = '';
            console.log(artid);
            const linkbase2 = "https://api.unsplash.com/users/";
            var link2 = linkbase2 + artid + "/photos?client_id=" + apiid;
            console.log(link2);
            return fetch(link2);
            
        }).then(data => {
            console.log(data);
            return data.json();
            
        }).then(data => {
            divpi.innerHTML ='';
            var HTML = ``;
            var valmassimo = 10;
            for(var i = 0; i < data.length && valmassimo; i++){
                var prova = data[i].urls.regular;
                HTML = HTML + `
                
                    <img src="${prova}" class="imgart" alt="${q}" style=" object-fit:cover; width:30%;">
                
                `;
            }
            divpi.innerHTML = HTML;
            centro.style = "width: 100%";

        })
    }

    function getImgByAuthor(q) {
        getImgDataByAuthor(q);
    }

    home.addEventListener("click", ()=>{window.location.reload()});
    home1.addEventListener("click", ()=>{window.location.reload()});

    

}