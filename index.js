show_data();

let ip = document.querySelector(".ip");

let table = document.querySelector('table');

const addbtn = document.querySelector(".add");

addbtn.addEventListener("click", add);


async function show_data(){


  const Url = "http://localhost:3000/list";
   
    await fetch(Url, {
      method: "GET",
    })
      .then((response) => response.text())
  
      .then((result) => {
          
        if(result == null){
          task = [];
        }

        else{
          task = JSON.parse(result);
        }
        
        cb(task);

         
      })
  
      .catch( (err) =>{
        console.log(err);
      } )
 

  
}

function cb(res){
  let table = document.querySelector('table');

  let results = '';
    
   results += '<tr> <th>No.</th> <th>I wanna...</th> <th>Action</th>'
  
  res.forEach( (a,index)=>{
       
   results += `<tr> <td> ${a.id} </td>
      <td class='t3'>  ${a.todo} </td>
      <td>  <button class='done' onclick='done(${index})'> Done  </button> 
        <button class='delete' onclick='del(${a.id})'> Delete </button>     </td>  
     </tr>`

    
  })

  table.innerHTML = results;

  results += '</tr>'

 
}


async function del(del_id){
      
  await fetch(`http://localhost:3000/list/${del_id}`, {
    method: "DELETE",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})

.then( (response) =>{
 return response.text();

})

.then( (ress) =>{
  console.log(ress);
  return show_data();
})

.catch( (err) =>{
  console.log(err);
} )



}


function done(id){

 
  let t3 = document.querySelectorAll('.t3');
   

  t3[id].classList.toggle('underline');
 
}



function add(e){
  e.preventDefault();

  if (ip.value == "") {
    alert("Please input list ");
    ip.value = "";
    ip.focus();

  }


  else{

   async function loaddata(){

      const Url = " http://localhost:3000/list";

      let data = {
        todo: ip.value,
        
      };

     await fetch(Url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.text())

        .then((data) => {
          console.log("Success", data);
          ip.value = '';
          ip.focus();
          show_data();
         
       
        })

        .catch((error) => {
          console.log(error);
        });
    }
    loaddata();
    }  

}

   let black = true;

  
   
 let dark = document.querySelector('.dark');

 
 if(black == true){
  dark.textContent = 'Background Change'
  
 }

 

 let body = document.body;

 let red = document.querySelector('.red');


 dark.addEventListener('click', function(){
  console.log('change to light mode');
  body.classList.toggle('light');
  
  table.classList.toggle('lb');
 })



window.addEventListener("keydown", function keydw(e) {
  if (e.key == "Enter") {
    return  add(e);
  }
});







