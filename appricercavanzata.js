
window.onload = ()=>{
    var bottonecerca = document.getElementById("search");
    var divpi = document.querySelector("#divpi"); 
    var apiid = "F_w-jOpJC1uH59SKw4fF2Y11r4effiTmXhTgGJmdCl8";
    
     function cercaImg(){
        var c0 = document.getElementById("c0").value;
        var c2 = document.getElementById("c2").value;
        var c3 = document.getElementById("c3").value;
        const linkbase = "https://api.unsplash.com/search/photos?";
        var link = linkbase + "query="+c0+"&color="+c2+"&order_by="+c3+"&client_id=" + apiid;
        //+c0+"?orientation="+c1+"&color="+c2+"&order_by="+c3+
        console.log(link);
        /*let response = fetch(link);*/
        return fetch(link)/*response*/;
    }
    function getImg(){
        divpi.innerHTML = '';
        var HTML = ``;
        var HTML1 = `<div id="divimg">`;
        var HTML2 = `</div>`;
        cercaImg().then((response)=>{
            if(response.ok){
                response.json().then(dati=>{
                    let h1 = document.querySelector("#querytext");
                    let arr = [];
                    while(arr.length < 3){
                        var r = Math.floor(Math.random() * 9) + 1;
                        if(arr.indexOf(r) === -1) arr.push(r);
                    }
                    console.log(arr);
                    try{
                        for(var i = 0; i < 3; i++){
                            var arri = arr[i];
                            console.log(arri);
                            String(arri);
                                var img = dati.results[arri].urls.regular;
                                var a = dati.results[arri].user.username;
                                var p = dati.results[arri].alt_description;
                                var q = document.getElementById("search").value;
                                var aut = "autore"+(i+1);
                                HTML = HTML + `
                                    <div class="divavanzato">
                                        <a id="${aut}"style="color: orange !important">${a}</a>
                                        <p>${p}</p>
                                        <img class="immginiavanzate" src="${img}" alt="immagine">
                                    </div>
                                `;
                            }}
                            catch(err){
                                document.getElementById("errore").innerHTML = `immagine non trovata`;
                            }
                        
                        
                    
                    divpi.innerHTML = HTML1 + HTML + HTML2 ;

                    if( q != undefined){
                        h1.innerHTML  = q;
                    }
 
                })     
            }
        })
        setTimeout(function(){
            try{
                let artista1 = document.getElementById("autore1");
                let artista2 = document.getElementById("autore2");
                let artista3 = document.getElementById("autore3");
                artista1.addEventListener("click", ()=>{getImgByAuthor(artista1.innerHTML)});
                artista2.addEventListener("click", ()=>{getImgByAuthor(artista2.innerHTML)});
                artista3.addEventListener("click", ()=>{getImgByAuthor(artista3.innerHTML)});
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

        })
    }


    function getImgByAuthor(q) {
        getImgDataByAuthor(q);}


}