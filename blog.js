const posts = [
  {
    id: 0,
    title:
      "US–Iran–Israel War (2026): Causes, Timeline, Global Impact, and the Risk of World War 3",
    category: "Geopolitics",
    tag: "Geopolitics",
    image: "images/post1.jpg",
    content:
      "<h3>Introduction</h3><p>In late February 2026, the Middle East was pushed into one of the most dangerous geopolitical crises in modern history. A coordinated military strike by the United States and Israel targeted key military and nuclear facilities in Iran, reportedly killing Iran's Supreme Leader Ali Khamenei and several senior officials.<br>The operation—often referred to as Operation Epic Fury in media reports—triggered a rapid escalation of hostilities. Iran retaliated with missile and drone strikes against Israeli cities, US military bases in the Persian Gulf, and strategic infrastructure in the region.</p><p>Within days:</p><ul><li>global oil prices surged above $100 per barrel</li><li>international shipping routes faced disruption</li><li>millions of civilians were displaced</li><li>major world powers warned about the risk of a wider conflict</li></ul><p>The situation raised an alarming question worldwide:<br><b>Could the US-Iran-Israel conflict escalate into a global war?</b><br><br>This article provides a detailed analysis of the causes, timeline, global consequences, and possible future outcomes of the conflict.</p><h3>Why Are the US, Iran, and Israel Fighting?</h2><p>The confrontation between Iran, Israel, and the United States did not begin in 2026. It is the result of decades of political rivalry, ideological conflict, and regional power struggles.</p>",
  },

  {
    id: 1,
    title: "Interactivity connect consumer",
    category: "Design",
    tag: "Web",
    image: "images/post2.jpg",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut enim ad minim veniam quis nostrud exercitation.",
  },

  {
    id: 2,
    title: "Marketing Strategy to bring more affect",
    category: "Marketing",
    tag: "Marketing",
    image: "images/post3.jpg",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Duis aute irure dolor in reprehenderit.",
  },

  {
    id: 3,
    title: "Marketing Strategy to bring more affect",
    category: "Community",
    tag: "Social Media",
    image: "images/post4.jpg",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepteur sint occaecat cupidatat non proident.",
  },
];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const post = posts[id];

/* BLOG CONTENT */

document.getElementById("blogTitle").innerText = post.title;
document.getElementById("blogCategory").innerText = post.category;
document.getElementById("blogImage").src = post.image;
document.getElementById("blogTag").innerText = "Tag : " + post.tag;
document.getElementById("blogContent").innerHTML = post.content;

/* READING TIME */

const words = post.content.split(" ").length;
const readingTime = Math.ceil(words / 200);

document.getElementById("readingTime").innerText =
  "⏱ " + readingTime + " min read";

/* LIKE POST */

let likeKey = "likes_" + id;
let likes = localStorage.getItem(likeKey) || 0;

document.getElementById("likeCount").innerText = likes;

document.getElementById("likeBtn").onclick = function () {
  likes++;
  localStorage.setItem(likeKey, likes);

  document.getElementById("likeCount").innerText = likes;
};

/* COMMENTS STORAGE */

const commentsKey = "comments_" + id;

function getComments() {
  let comments = JSON.parse(localStorage.getItem(commentsKey)) || [];

  comments.forEach((c) => {
    if (!c.replies) c.replies = [];
    if (!c.likes) c.likes = 0;
    c.replies.forEach((r) => {
      if (!r.likes) r.likes = 0;
    });
  });

  return comments;
}

function saveComments(comments) {
  localStorage.setItem(commentsKey, JSON.stringify(comments));
}

/* LOAD COMMENTS */

function loadComments() {
  const comments = getComments();

  const container = document.getElementById("commentsList");

  container.innerHTML = "";

  comments.forEach((c, index) => {
    container.innerHTML += `

<div class="card p-2 mb-2">

<strong>${c.name}</strong>

<p id="commentText${index}">${c.text}</p>

<div class="mb-2">

<button class="btn btn-sm btn-outline-primary"
onclick="likeComment(${index})">
👍 ${c.likes}
</button>

<button class="btn btn-sm btn-outline-secondary"
onclick="showReplyBox(${index})">
Reply
</button>

<button class="btn btn-sm btn-outline-warning"
onclick="editComment(${index})">
Edit
</button>

<button class="btn btn-sm btn-outline-danger"
onclick="deleteComment(${index})">
Delete
</button>

</div>

<div id="replyBox${index}"></div>

<div class="ms-4 mt-2">

${c.replies
  .map(
    (r, rIndex) => `

<div class="card p-2 mb-1">

<strong>${r.name}</strong>

<p id="replyText${index}_${rIndex}">${r.text}</p>

<button class="btn btn-sm btn-outline-primary"
onclick="likeReply(${index},${rIndex})">
👍 ${r.likes}
</button>

<button class="btn btn-sm btn-outline-warning"
onclick="editReply(${index},${rIndex})">
Edit
</button>

<button class="btn btn-sm btn-outline-danger"
onclick="deleteReply(${index},${rIndex})">
Delete
</button>

</div>

`,
  )
  .join("")}

</div>

</div>

`;
  });
}

loadComments();

/* ADD COMMENT */

function addComment() {
  const name = document.getElementById("commentName").value;
  const text = document.getElementById("commentText").value;

  if (name === "" || text === "") return;

  let comments = getComments();

  comments.push({
    name: name,
    text: text,
    likes: 0,
    replies: [],
  });

  saveComments(comments);

  document.getElementById("commentName").value = "";
  document.getElementById("commentText").value = "";

  loadComments();
}

/* DELETE COMMENT */

function deleteComment(index) {
  let comments = getComments();

  comments.splice(index, 1);

  saveComments(comments);

  loadComments();
}

/* EDIT COMMENT */

function editComment(index) {
  let comments = getComments();

  let newText = prompt("Edit your comment", comments[index].text);

  if (newText) {
    comments[index].text = newText;

    saveComments(comments);

    loadComments();
  }
}

/* LIKE COMMENT */

function likeComment(index) {
  let comments = getComments();

  comments[index].likes++;

  saveComments(comments);

  loadComments();
}

/* REPLY BOX */

function showReplyBox(index) {
  const box = document.getElementById("replyBox" + index);

  box.innerHTML = `

<input id="replyName${index}" class="form-control mb-1" placeholder="Your name">

<textarea id="replyText${index}" class="form-control mb-1" placeholder="Write reply"></textarea>

<button class="btn btn-danger btn-sm"
onclick="addReply(${index})">
Reply
</button>

`;
}

/* ADD REPLY */

function addReply(index) {
  const name = document.getElementById("replyName" + index).value;
  const text = document.getElementById("replyText" + index).value;

  if (name === "" || text === "") return;

  let comments = getComments();

  comments[index].replies.push({
    name: name,
    text: text,
    likes: 0,
  });

  saveComments(comments);

  loadComments();
}

/* DELETE REPLY */

function deleteReply(cIndex, rIndex) {
  let comments = getComments();

  comments[cIndex].replies.splice(rIndex, 1);

  saveComments(comments);

  loadComments();
}

/* EDIT REPLY */

function editReply(cIndex, rIndex) {
  let comments = getComments();

  let newText = prompt("Edit reply", comments[cIndex].replies[rIndex].text);

  if (newText) {
    comments[cIndex].replies[rIndex].text = newText;

    saveComments(comments);

    loadComments();
  }
}

/* LIKE REPLY */

function likeReply(cIndex, rIndex) {
  let comments = getComments();

  comments[cIndex].replies[rIndex].likes++;

  saveComments(comments);

  loadComments();
}

/* LATEST POSTS WITH THUMBNAILS */

const latestContainer = document.getElementById("latestPosts");

if (latestContainer) {
  latestContainer.innerHTML = "";

  posts.slice(0, 4).forEach((p) => {
    latestContainer.innerHTML += `

<li class="latest-post-item">

<a href="blog.html?id=${p.id}" class="latest-post-link">

<img src="${p.image}" class="latest-post-thumb">

<span class="latest-post-title">
${p.title}
</span>

</a>

</li>

`;
  });
}
