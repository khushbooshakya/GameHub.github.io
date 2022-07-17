fetch("game.txt")
  .then((data) => {
    return data.json();
  })
  .then((completedata) => {
    let data1 = "";
    completedata.map((values) => {
      data1 += ` <div class="game" >
          <h1 class="title" id="title">${values.title}</h1>
          <p class ="platform">${values.platform}</p>
          <p class="score">${values.score}</p>
          <p class="genre">${values.genre}</p>
          <p class="editors_choice">${values.editors_choice}</p>
        </div>`;
    });
    document.getElementById("games").innerHTML = data1;
  })
  .catch((err) => {
    console.log(err);
  });

const search = () => {
  const searchbox = document.getElementById("search-item").value.toUpperCase();
  const storeitems = document.getElementById("games");
  const product = document.querySelectorAll(".game");
  const pname = storeitems.getElementsByTagName("h1");

  for (var i = 0; i < pname.length; i++) {
    let match = product[i].getElementsByTagName("h1")[0];

    if (match) {
      let textvalue = match.textContent || match.innerHTML;
      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
        product[i].style.display = "";
      } else {
        product[i].style.display = "none";
      }
    }
  }
};

//filtr and sort
(function () {
  let field = document.getElementById("games");
  let li = Array.from(field.children);

  function FilterProduct() {
    for (let i of li) {
      const name = i.querySelector("platform");
      const x = name.textContent;
      i.setAttribute(".games", x);
    }

    let indicator = document.querySelector(".indicator").children;

    this.run = function () {
      for (let i = 0; i < indicator.length; i++) {
        indicator[i].onclick = function () {
          for (let x = 0; x < indicator.length; x++) {
            indicator[x].classList.remove("active");
          }
          this.classList.add("active");
          const displayItems = this.getAttribute("data-filter");

          for (let z = 0; z < li.length; z++) {
            li[z].style.transform = "scale(0)";
            setTimeout(() => {
              li[z].style.display = "none";
            }, 500);

            if (
              li[z].getAttribute("games") == displayItems ||
              displayItems == "all"
            ) {
              li[z].style.transform = "scale(1)";
              setTimeout(() => {
                li[z].style.display = "block";
              }, 500);
            }
          }
        };
      }
    };
  }

  function SortProduct() {
    let select = document.getElementById("select");
    let ar = [];
    for (let i of li) {
      const last = i.lastElementChild;
      const x = last.textContent.trim();
      const y = Number(x.substring(1));
      i.setAttribute("game", y);
      ar.push(i);
    }
    this.run = () => {
      addevent();
    };
    function addevent() {
      select.onchange = sortingValue;
    }
    function sortingValue() {
      if (this.value === "Default") {
        while (field.firstChild) {
          field.removeChild(field.firstChild);
        }
        field.append(...ar);
      }
      if (this.value === "LowToHigh") {
        SortElem(field, li, true);
      }
      if (this.value === "HighToLow") {
        SortElem(field, li, false);
      }
    }
    function SortElem(field, li, asc) {
      let dm, sortli;
      dm = asc ? 1 : -1;
      sortli = li.sort((a, b) => {
        const ax = a.getAttribute("score");
        const bx = b.getAttribute("score");
        return ax > bx ? 1 * dm : -1 * dm;
      });
      while (field.firstChild) {
        field.removeChild(field.firstChild);
      }
      field.append(...sortli);
    }
  }

  new FilterProduct().run();
  new SortProduct().run();
})();
