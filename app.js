const auth = "563492ad6f9170000100000183786d49667b4e96afccc9318e3056af";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
let searchValue;

async function curatedPhotos() {
  const dataFetch = await fetch("https://api.pexels.com/v1/curated", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  //   data parsed into object that we can make use of
  data.photos.forEach((photo) => {
    console.log(photo);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add(".gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();
