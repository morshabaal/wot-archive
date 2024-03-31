// import json data
const file = await fetch("./data.json");
const data = await file.json();

// add event listener
document.getElementById("btnSearch").addEventListener("click", (e) => {
    const query = document.getElementById("search").value.toLowerCase();
    const searchOption = document.querySelector('input[name="searchOption"]:checked').value;

    const results = data.flat().filter(post => {
        if (searchOption === "content") return post.content.toLowerCase().includes(query);
        else if (searchOption === "author") return post.author.toLowerCase().includes(query);
        else if (searchOption === "title") return post.threadTitle.toLowerCase().includes(query);
    });

    // Sort results by the "datePosted" column
    results.sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));

    // clear previous results
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    // create post for each item
    results.forEach(result => {
        const post = document.createElement("div");
        post.classList.add("post");

        const thread = document.createElement("div");
        thread.classList.add("thread");
        const threadLink = document.createElement("a");
        threadLink.href = result.link;
        threadLink.textContent = "[thread link]";
        thread.appendChild(threadLink);
        const span = document.createElement("span");
        span.textContent = result.threadTitle;
        thread.appendChild(span);

        const posttop = document.createElement("div");
        posttop.classList.add("posttop");

        const username = document.createElement("div");
        username.classList.add("username");
        username.textContent = result.author;

        const date = document.createElement("div");
        date.classList.add("date");
        date.textContent = new Date(result.datePosted.replace("T", " ")).toLocaleString();

        const posttext = document.createElement("div");
        posttext.classList.add("posttext");
        posttext.innerHTML = result.content;

        posttop.appendChild(username);
        posttop.appendChild(date);
        post.appendChild(thread);
        post.appendChild(posttop);
        post.appendChild(posttext);
        resultsList.appendChild(post);
    });
});
