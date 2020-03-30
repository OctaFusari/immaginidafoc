window.onload = ()=>{
    var bottonecerca = document.getElementById("vai");
    var divimg = document.querySelector("#divimg"); 
    var primapag = document.querySelector("#primapag"); 
    var centro = document.querySelector("#centro");

    var home = document.getElementById("ricaricahome");  
    var divpi = document.getElementById("#divpi"); 
    function cercaImg(){
        var q = document.getElementById("search").value;
        var apiid = "F_w-jOpJC1uH59SKw4fF2Y11r4effiTmXhTgGJmdCl8";
        const linkbase = "https://api.unsplash.com/search/photos?";
        var link = linkbase + "query=" + q + "&client_id=" + apiid;
        /*let response = fetch(link);*/
        return fetch(link)/*response*/;
    }

    function getImg(){
        divimg.innerHTML ='';
        var HTML = ``;
        var HTML1 = `<div id="divimg">`;
        var HTML2 = `</div`;
        var ricerca = document.getElementById("search");
        cercaImg().then((response)=>{
            if(response.ok){
                response.json().then(dati=>{

                    for(var i = 1; i < 4; i++){
                        let randomImg = Math.floor(Math.random() * 10);
                        var img = dati.results[randomImg].urls.regular;
                        var a = dati.results[randomImg].user.username;
                        var p = dati.results[randomImg].alt_description;
                        var q = document.getElementById("search").value;
                        let aut = "autore"+i;
                        HTML = HTML + `
                            <div class="ii2">
                                <a id="${aut}">${a}</a>
                                <p>${p}</p>
                                <img src="${img}" alt="immagine">
                            </div>
                        `;

                    }
                    divpi.innerHTML = HTML1 + HTML + HTML2 ;
                    let h1 = document.querySelector("#querytext"); 
                    h1.innerHTML  = q;
                })     
            }
        })
        setTimeout(function(){
            var img1art = document.getElementById("autore1");    
            var img2art = document.getElementById("autore2");   
            var img3art = document.getElementById("autore3"); 
            img1art.addEventListener("click", ()=>{getImgByAuthor(img1art.innerHTML)});
            img2art.addEventListener("click", ()=>{getImgByAuthor(img2art.innerHTML)});
            img3art.addEventListener("click", ()=>{getImgByAuthor(img3art.innerHTML)});
        }, 4000);
    }

    bottonecerca.addEventListener("click", getImg);

    function getImgDataByAuthor(q) {
        var h1 = document.querySelector("#querytext"); 
        var apiid = "F_w-jOpJC1uH59SKw4fF2Y11r4effiTmXhTgGJmdCl8";
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
            divimg.innerHTML ='';
            
            var HTML = ``;
            var valmassimo = 10;
            for(var i = 0; i < data.length && valmassimo; i++){
                var prova = data[i].urls.regular;
                HTML = HTML + `
                
                    <img src="${prova}" class="imgart" alt="${q}" style=" object-fit:cover; width:14%; display: block">
                
                `;
            }
            divimg.innerHTML = HTML;
            centro.style = "height: 40cm";

        })
    }

    function getImgByAuthor(q) {
        getImgDataByAuthor(q);
    }

    home.addEventListener("click", ()=>{window.location.reload()});

}