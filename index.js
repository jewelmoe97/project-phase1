




let change;

let table = document.querySelector("table");

let body = document.body;

let id = document.querySelector(".id");

let todo = document.querySelector(".todo");

let done = document.querySelector(".done");

function getdata() {
  const Url = "http://localhost:3000/list";

  fetch(Url, {
    method: "GET",
  })
    .then((response) => response.text())

    .then((result) => {
      change = JSON.parse(result);
      console.log(change);

      for (let i = 0; i < change.length; i++) {
        let i_view = change[i].id;

        var main = document.createElement("tr");

        body.append(main);

        table.append(main);

        let d1 = document.createElement("td");
        let d2 = document.createElement("td");
       
        let d4 = document.createElement("button");
        let d5 = document.createElement("td");

        let d6 = document.createElement('button');

        d5.append(d6);
        
        d6.textContent='Done';
        d6.classList.add('done');

        d1.textContent = change[i].id;
        d2.textContent = change[i].todo;
       
        d4.textContent = "Delete";
        d4.classList.add("delete");

        main.append(d1);

        main.append(d2);

        

        d5.append(d4);

        main.append(d5);


        d6.addEventListener("click" , function(){
			d2.classList.toggle('underline');
		})
           
        

        d4.onclick = function () {
          fetch(`http://localhost:3000/list/${change[i].id}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              window.location.href = "index.html";
            });
        };
      }
    });
}

getdata();

const addbtn = document.querySelector(".add");

let ip = document.querySelector(".ip");

addbtn.addEventListener("click", add);

function add() {
  if (ip.value == "") {
    alert("Please input list ");
    ip.value = "";
    ip.focus();
  } else {
    function loaddata() {
      const Url = " http://localhost:3000/list";

      let data = {
        todo: ip.value,
        
      };

      fetch(Url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.text())

        .then((data) => {
          console.log("Success", data);
          window.location.href = "index.html";
        })

        .catch((error) => {
          console.log(error);
        });
    }

    loaddata();
  }
}

window.addEventListener("keydown", function keydw(e) {
  if (e.key == "Enter") {
    return add();
  }
});
