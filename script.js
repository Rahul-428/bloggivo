const posts = [
  {
    title:
      "US–Iran–Israel War (2026): Causes, Timeline, Global Impact, and the Risk of World War 3",
    category: "Geopolitics",
    tag: "Design",
    image: "images/post1.jpg",
  },

  {
    title: "Interactivity connect consumer",
    category: "Design",
    tag: "Web",
    image: "images/post2.jpg",
  },

  {
    title: "Marketing Strategy to bring more affect",
    category: "Marketing",
    tag: "Marketing",
    image: "images/post3.jpg",
  },

  {
    title: "Marketing Strategy to bring more affect",
    category: "Community",
    tag: "Social Media",
    image: "images/post4.jpg",
  },

  {
    title: "Creative UI ideas",
    category: "Creative",
    tag: "UI",
    image: "images/post5.jpg",
  },

  {
    title: "Digital marketing tricks",
    category: "Marketing",
    tag: "Marketing",
    image: "images/post6.jpg",
  },

  {
    title: "Digital marketing tricks",
    category: "Marketing",
    tag: "Marketing",
    image: "images/post7.jpg",
  },

  {
    title: "Digital marketing tricks",
    category: "Marketing",
    tag: "Marketing",
    image: "images/post7.jpg",
  },
];

const postContainer = document.getElementById("postContainer");

let currentPage = 1;
const perPage = 6;

let searchText = "";
let selectedTag = "";
let selectedCategory = "";

function filterPosts() {
  return posts.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(searchText) ||
      post.category.toLowerCase().includes(searchText) ||
      post.tag.toLowerCase().includes(searchText);

    const matchTag = selectedTag === "" || post.tag === selectedTag;

    const matchCategory =
      selectedCategory === "" || post.category === selectedCategory;

    return matchSearch && matchTag && matchCategory;
  });
}

function displayPosts() {
  const filtered = filterPosts();

  postContainer.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  const pagePosts = filtered.slice(start, end);

  pagePosts.forEach((post, index) => {
    const blogURL = `blog.html?id=${posts.indexOf(post)}`;

    postContainer.innerHTML += `

<div class="col-md-6">

<div class="blog-card">

<img src="${post.image}">

<div class="blog-card-body">

<small>${post.category}</small>

<h5>${post.title}</h5>

<a href="${blogURL}" class="btn btn-danger btn-sm">
Learn More
</a>

<div class="share-box mt-3">

<a class="share facebook" target="_blank"
href="https://www.facebook.com/sharer/sharer.php?u=${blogURL}">
<i class="fab fa-facebook-f"></i>
</a>

<a class="share twitter" target="_blank"
href="https://twitter.com/intent/tweet?url=${blogURL}">
<i class="fab fa-twitter"></i>
</a>

<a class="share linkedin" target="_blank"
href="https://www.linkedin.com/sharing/share-offsite/?url=${blogURL}">
<i class="fab fa-linkedin-in"></i>
</a>

<a class="share whatsapp" target="_blank"
href="https://wa.me/?text=${blogURL}">
<i class="fab fa-whatsapp"></i>
</a>

<a class="share instagram" target="_blank"
href="https://www.instagram.com/">
<i class="fab fa-instagram"></i>
</a>

<button class="share copy" onclick="copyLink('${blogURL}')">
<i class="fa fa-link"></i>
</button>

</div>

</div>

</div>

</div>

`;
  });

  document.getElementById("pageNum").innerText =
    `Page ${currentPage} of ${Math.ceil(filtered.length / perPage)}`;
}

displayPosts();

function copyLink(url) {
  navigator.clipboard.writeText(url);
  alert("Link copied!");
}

/* SEARCH */

document.getElementById("searchInput").addEventListener("keyup", function () {
  searchText = this.value.toLowerCase();

  currentPage = 1;

  displayPosts();
});

/* TAGS */

const tags = [...new Set(posts.map((p) => p.tag))];

const tagContainer = document.getElementById("tagsContainer");

tags.forEach((tag) => {
  const el = document.createElement("span");

  el.className = "tag";

  el.innerText = tag;

  el.onclick = () => {
    selectedTag = tag;
    currentPage = 1;
    displayPosts();
  };

  tagContainer.appendChild(el);
});

/* CATEGORY */

const categories = [...new Set(posts.map((p) => p.category))];

const categorySelect = document.getElementById("categoryFilter");

categories.forEach((cat) => {
  const option = document.createElement("option");

  option.value = cat;
  option.innerText = cat;

  categorySelect.appendChild(option);
});

categorySelect.addEventListener("change", function () {
  selectedCategory = this.value;

  currentPage = 1;

  displayPosts();
});

/* PAGINATION */

document.getElementById("nextBtn").onclick = () => {
  const filtered = filterPosts();

  if (currentPage * perPage < filtered.length) {
    currentPage++;

    displayPosts();
  }
};

document.getElementById("prevBtn").onclick = () => {
  if (currentPage > 1) {
    currentPage--;

    displayPosts();
  }
};

/* HERO TYPING EFFECT */

const typingLines = [
  "Ideas, Stories & Knowledge",
  "Thoughts, Stories & Experiences",
  "Insights, Tutorials & Inspiration",
  "Development & Tech Articles",
  "Inspiration for Developers",
];

let lineIndex = 0;
let charIndex = 0;
let typingElement = document.getElementById("typingText");
let typingSpeed = 70;

function typeEffect() {
  if (charIndex < typingLines[lineIndex].length) {
    typingElement.textContent += typingLines[lineIndex].charAt(charIndex);

    charIndex++;

    setTimeout(typeEffect, typingSpeed);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = typingLines[lineIndex].substring(
      0,
      charIndex - 1,
    );

    charIndex--;

    setTimeout(eraseEffect, 40);
  } else {
    lineIndex++;

    if (lineIndex >= typingLines.length) {
      lineIndex = 0;
    }

    setTimeout(typeEffect, 300);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (typingElement) {
    typeEffect();
  }
});

/* ============================= */
/* DYNAMIC LATEST POSTS SIDEBAR */
/* ============================= */

const latestPostsContainer = document.getElementById("latestPostsHome");

if (latestPostsContainer) {
  latestPostsContainer.innerHTML = "";

  posts.slice(0, 4).forEach((post) => {
    const blogURL = `blog.html?id=${posts.indexOf(post)}`;

    latestPostsContainer.innerHTML += `

<li class="latest-post-item">

<a href="${blogURL}" class="latest-post-link">

<img src="${post.image}" class="latest-post-thumb">

<span class="latest-post-title">
${post.title}
</span>

</a>

</li>

`;
  });
}
