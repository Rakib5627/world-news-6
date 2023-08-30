const loadCategories = async () => {
  try {
      const url = `https://openapi.programming-hero.com/api/news/categories`;
      const res = await fetch(url);
      const data = await res.json();
      catDisplay(data.data.news_category);
  }

  catch (error) {
      console.error(error);
  }
}
const catDisplay = (categories) =>{
     categories.forEach(category => {
        const container = document.getElementById('cat-container');
        const div = document.createElement('div');
        div.classList.add('d-lg-inline');
        div.innerHTML = 
        `<div onclick="loadNews('${category.category_id}')">
        ${category.category_name}
        </div>`
        ;
        container.appendChild(div);
    });
}

const loadNews = async(id) =>{
    spinner(true);
    try{
       const url2 = `https://openapi.programming-hero.com/api/news/category/${id}`
       const res2= await fetch(url2);
       const data = await res2.json();
       displayNews(data.data);
    }
    catch (error) {
      console.error(error);    
    }
}

const displayNews = (data) =>{
    
    data.sort(function (a, b) {
    return b.total_view - a.total_view;
    });
    
    const container = document.getElementById('news-container');
    const getNumber = document.getElementById('number');
    let number = 0 ;
    container.innerText ='';
    data.forEach(news =>{
        const div = document.createElement('div');
        div.innerHTML=`  
        <div class="card mb-3 shadow-lg" >
        <div class="row g-0">
          <div class="col-md-3">
            <img src="${news.image_url}" class="img-fluid rounded-start " alt="...">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text">${news.details.slice(0,200)+"..."}</p><br>
              <div class="d-flex align-items-end justify-content-between">
                  <div class="">
                    <div class=" w-25 h-25">
                       <img src="${news.author.img}" class="img-fluid w-25 border rounded-5">
                    </div>
                    <p class="card-text"><small class="text-muted">Author : ${news.author.name? news.author.name:'No data'}</small></p>
                  </div> 
                  <div class="d-flex">
                    <p class="fw-bolder mx-5">Views:<span>${news.total_view?news.total_view:'0'}</span></p>
                  
                    <button onClick="modal('${news._id}')" class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        `;
        container.appendChild(div);
        number++;
    })
    getNumber.innerText = number;
    spinner(false);
}
const spinner = isLoading =>{
    const spinner = document.getElementById('loader');
    if(isLoading == true){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}
const modal = async(id)=>{
    const url3= `https://openapi.programming-hero.com/api/news/${id}`;
    const res3 = await fetch(url3);
    const data =await res3.json();
    displayModal(data.data[0]);
}


const displayModal = news =>{
    const container = document.getElementById('modal-news');
    container.innerText=``;
        const div = document.createElement('div');
        div.innerHTML =`
        <h3>${news.title}</h3>
        <img src="${news.image_url}" class="img-fluid w-50 border rounded"><br>
        <p>Author : ${news.author.name? news.author.name:'No data'}</p>
        <p>${news.details}</p>
        <p>${news.author.published_date}</p>
        `;
        container.appendChild(div);
}

loadCategories();