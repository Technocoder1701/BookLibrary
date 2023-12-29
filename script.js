let btn = document.getElementById("sub-btn");
let bookName = document.getElementById("BookName");
let author = document.getElementById("Author");
let allBookList = document.getElementById("allBookList");
let favCard = document.getElementById("favCard");
let fav = document.getElementById("fav");
let bookType=false;
let favBook;
let editActive =false;
let editItem=null;
let [adventure,story,motivational] = document.getElementsByClassName("checked_value");
btn.addEventListener("click",addBook);
showBooks();
function addBook(e){
  e.preventDefault();
  if(adventure.checked){
    bookType="Adventure"
  }else if(story.checked){
    bookType="Ascent story"
  }else{
    bookType="Motivational"
  }
  fav.checked?favBook=true:favBook=false;
  if(bookName.value==""||author.value==""){
    alert("Enter Book name and author name...😡😡😡");
  }else{
      let books = localStorage.getItem("book");
      let bookarr;
      if(books===null){
        bookarr = [];
      }else{
        bookarr = JSON.parse(localStorage.getItem("book"));
      }
    
      if(editActive){
         bookarr[editItem].bookName=bookName.value;
        bookarr[editItem].author=author.value;
        bookarr[editItem].favBook=favBook;
        bookarr[editItem].bookType =bookType;
      }else{
       let bookObj ={
        bookName:bookName.value,
        author:author.value,
        bookType:bookType,
        favBook:favBook,
        }
        bookarr.push(bookObj);
      }
      
      localStorage.setItem("book",JSON.stringify(bookarr));
      bookName.value="";
      author.value="";
      adventure.checked=true;
      fav.checked=false;
  }
  showBooks();
  showFavBooks();
}

function showBooks(){
   allBookList.innerHTML="";
  let books = localStorage.getItem("book");
  let bookarr;
  //console.log(books.length)
  if(books===null||books.length===2){
    allBookList.innerHTML =`<p class="text-center col-12 py-3">No Records found..</p>`;
    document.getElementById("clearAll").style.visibility="hidden";
    bookarr = [];
    // console.log("right");
  }else{
    bookarr = JSON.parse(localStorage.getItem("book"));
    document.getElementById("clearAll").style.visibility="visible";
  }
  if(bookarr.length<=2){
    document.getElementById("clearAll").style.cursor="not-allowed";
    document.getElementById("clearAll").classList.add("disabled");
  }else{
     document.getElementById("clearAll").style.cursor="pointer";
    document.getElementById("clearAll").classList.remove("disabled");
  }
  //console.log(bookarr.length);
  bookarr.forEach((e,i)=>{
    allBookList.innerHTML += `<tr class="addedBook">
              <th scope="row">${e.favBook?"❤":""}${i+1}</th>
              <td>${e.bookName}</td>
              <td>${e.author}</td>
              <td>${e.bookType}</td>
              <td class="text-center"><button class="btn btn-sm btn-outline-danger" onclick="bookDelete(${i})" >Delete</button>${e.favBook?`<button class="btn mx-1 btn-sm btn-outline-success" onclick="removeFav(${i})" >Remove fav ❤</button>`:`<button class="btn mx-1 btn-sm btn-outline-success" onclick="addFav(${i})" >Add fav ❤</button>`}<button class="btn btn-sm btn-outline-primary" onclick="edit(${i})" >Edit</button></td>
            </tr>`;
  })
}
function bookDelete(id){
  let bookarr = JSON.parse(localStorage.getItem("book"));
  bookarr.splice(id,1);
  localStorage.setItem("book",JSON.stringify(bookarr));
  showBooks();
  showFavBooks();
}
function bookAllDelete(){
  if(localStorage.getItem("book")!=null){
  JSON.parse(localStorage.getItem("book")).length<=2?"":localStorage.clear();
  }
  showBooks();
  showFavBooks();
}

document.getElementById("searchBtn").addEventListener("click",searchList);
function searchList(){
  // e.preventDefault();
  // showBooks();
  let svalue = document.getElementById("search").value;
  showBooks();
  let filterArr = [];
  let regx = new RegExp(svalue,"gi");
  let addedbook= document.getElementsByClassName("addedBook");
   if(addedbook.length>0){
    Array.from(addedbook).forEach((e)=>{
      Array.from(e.children).forEach((e,i,arr)=>{
        // console.log(arr.length-1,i);
        if(i<arr.length-1){
          if(regx.test(e.innerHTML)){
            // console.log(e.parentElement);
            filterArr.push(e.parentElement); 
          }
        }
      })
    })
     search(filterArr);
  }
   
}
function search(arr){
   if(arr.length<=2){
    document.getElementById("clearAll").style.cursor="not-allowed";
    document.getElementById("clearAll").classList.add("disabled");
  }else{
    document.getElementById("clearAll").style.cursor="pointer";
    document.getElementById("clearAll").classList.remove("disabled");
  }
  allBookList.innerHTML="";
  if(arr.length===0){
    allBookList.innerHTML =`<p class="text-center py-3">No Records found..</p>`;
    document.getElementById("clearAll").style.visibility="hidden";
  }else{
    arr.forEach((e)=>{
      allBookList.append(e);
    })
  }
}
function showAllBook(id){
  
  if(document.getElementById(id).value.length===0){
    //document.getElementById("clearAll").style.visibility="visible";
    showBooks();
    showFavBooks();
  }else{
    //document.getElementById("clearAll").style.visibility="hidden";
    searchList();
    showFavBooks();
  }
}
//fav book code here
window.addEventListener("load",()=>{
  //console.log("HI")
  for(let i=1;i<=4;i++){
    favCard.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-xl-3">
          <div class="card" aria-hidden="true">
            <div class="placeholder bg-secondary" style="height:150px;"></div>
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
            </div>
          </div>
       </div>`
  }
 // showFavBooks();
})
let t;
favCard.addEventListener("mouseenter",function(e) {
  // console.log("right");
  t = setTimeout(()=>{
    showFavBooks();
  },500)
 
});
favCard.addEventListener("mouseleave",function(e) {
   clearTimeout(t);
});
function showFavBooks(){
      favCard.innerHTML="";
      let books = localStorage.getItem("book");
      let bookarr;
      if(books===null||books.length===2){
        //favCard.innerHTML =`<p class="text-center py-3">No Records found..</p>`;
        bookarr = [];
      }else{
        bookarr = JSON.parse(localStorage.getItem("book"));
      }
      if(bookarr.length<=2){
        document.getElementById("clearAll").style.cursor="not-allowed";
      }else{
         document.getElementById("clearAll").style.cursor="pointer";
      } 
      let favBookAvl = false;
      bookarr.forEach((e,i)=>{
        if(e.favBook){
          favBookAvl = true;
          favCard.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-xl-3">
                       <div class="card">
                      
                       <img src="https://source.unsplash.com/random/300x250?query=${e.bookName}" class="card-img-top" alt="books">
                           
                            <div class="card-body">
                              <h5 class="card-title">Book: ${e.bookName}</h5>
                              <p class="card-text">Author: ${e.author}</p>
                              <p class="card-text">Topic: ${e.bookType}</p>
                             <button class="btn btn-sm btn-outline-danger" onclick="bookDelete(${i})" >Delete</button><button class="btn mx-1 btn-sm btn-outline-success" onclick="removeFav(${i})" >Remove fav ❤</button><button class="btn btn-sm btn-outline-primary" onclick="edit(${i})" >Edit</button>
                            </div>
              </div>
         </div>`;
        }
        
      })
        if(!favBookAvl){
          if(books===null||books.length===2){
            favCard.innerHTML =`<p class="text-center py-3">No Records found..</p>`;
          }else{
            favCard.innerHTML =`<p class="text-center py-3 ">Favourite books not available...😥😥😥</p>`; 
          }
          }
}


function addFav(id){
  let bookarr = JSON.parse(localStorage.getItem("book"));
  bookarr[id].favBook=true;
  localStorage.setItem("book",JSON.stringify(bookarr));
  showBooks();
  showFavBooks();
}
function removeFav(id){
  let bookarr = JSON.parse(localStorage.getItem("book"));
  bookarr[id].favBook=false;
  localStorage.setItem("book",JSON.stringify(bookarr));
  showBooks();
  showFavBooks();
}
function edit(id){
  let bookarr = JSON.parse(localStorage.getItem("book"));
  bookName.value=bookarr[id].bookName;
  author.value=bookarr[id].author;
  fav.checked = bookarr[id].favBook;
  if(bookarr[id].bookType==="Adventure"){
    adventure.checked =true;
  }else if(bookarr[id].bookType==="Ascent story"){
    story.checked=true;
  }else{
    motivational.checked=true;
  }
  editActive=true;
  editItem=id;
  bookName.focus();
  
}