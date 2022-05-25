const auth = "563492ad6f9170000100000183786d49667b4e96afccc9318e3056af";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

// Add event listeners
searchInput.addEventListener("input", updateInput);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);
function updateInput(e) {
  searchValue = e.target.value;
}
// creating nodules for fetching and generate
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}
function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add(".gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a href=${photo.src.original} >Download</a>
    </div>
    <img src=${photo.src.large}></img>`;
    gallery.appendChild(galleryImg);
    // galleryImg.addEventListener("hover", (photo) => {
    //   const choiceList = document.createElement("div");
    //   choiceList.classList.add("choice-overlay");
    //   const list = document.createElement("ul");
    //   list.classList.add("choice-list");
    //   document.createElement("li");
    // });
  });
}
async function curatedPhotos() {
  fetchLink = `
  https://api.pexels.com/v1/curated?per_page=15&page=1
`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
  //   data parsed into object that we can make use of
}
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1
  `;
  const data = await fetchApi(fetchLink);
  //   data parsed into object that we can make use of
  generatePictures(data);
}
// for clearing the loaded image and typed word after clicking search
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page};
`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
curatedPhotos();
