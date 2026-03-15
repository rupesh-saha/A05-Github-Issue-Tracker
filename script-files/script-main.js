let allIssueData = [];

const loadAllIssue = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((issues) => {
      allIssueData = issues.data;
      showAllIssue(allIssueData);
      totalStat();
    })
}

const showAllIssue = (issues) => {
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";

  issues.forEach((issue) => {
    const issueCard = document.createElement("div");

    let badgeClass = "bg-[#fde9e9] text-[#ff2d2d]";
    
    if (issue.priority === "medium"){
      badgeClass = "bg-[#fff6d1] text-[#F59E0B]";
    }
    else if (issue.priority === "low") {
      badgeClass = "bg-[#eeeff2] text-[#9CA3AF]";
    }
    else {
      badgeClass = "bg-[#fde9e9] text-[#ff2d2d]";
    }


    issueCard.innerHTML = `
    
    <div onclick="fetchIssueDetail(${issue.id})" class="bg-base-100 h-[100%] rounded p-6 border-t-4 ${issue.status === "closed" ? 'border-purple-500' : 'border-emerald-500' }">

      <div class="flex flex-row-reverse mb-3">
        <a class="btn rounded-[100px] btn-soft ${badgeClass} font-medium">${issue.priority}</a>
      </div>

      <h2 class="font-semibold mb-2">${issue.title}</h2>
      <p class="text-[0.75rem] font-light text-[#64748B] mb-3">${issue.description}</p>

      <div class="flex items-center gap-1">
        ${createBtn(issue.labels)}
      </div>

      <hr class="border-t border-base-300 opacity-100 my-4">

      <p class="font-light text-[#64748B] text-[0.75rem] mb-2">#${issue.id} by ${issue.author}</p>
      <p class="font-light text-[#64748B] text-[0.75rem] mb-2">${issue.createdAt}</p>


    </div>
    `;

    issueContainer.append(issueCard);
  });

}

const createBtn = (arr) => {
  const htmlElement = arr.map((el) => `<a class="text-xs px-3 py-1 rounded-full w-fit bg-[#edf0fe] text-[#4a00ff] font-medium">${el}</a>`);
  return htmlElement.join(" ");
}


let currentTab = "all";

const filterIssue = (tabName) => {
  let filtered;

  if (tabName === "all") {
    filtered = allIssueData;
  }
  else {
    filtered = allIssueData.filter(issue => issue.status === tabName);
  }

  showAllIssue(filtered);
  totalStat();
} 

const removeActive = () => {
  const allBtn = document.querySelectorAll(".tab-btn");
  allBtn.forEach((btn)=>{
    btn.classList.remove("active");
  })
}

const switchTab = (tabName) => {
  removeActive();
  const clickBtn = document.getElementById(`${tabName}-btn`);
  console.log(clickBtn);
  clickBtn.classList.add("active");

  filterIssue(tabName);
  totalStat();
}

const totalStat = () => {
  const issueContainer = document.getElementById("issue-container");

  const issueCounter = document.getElementById("issue-counter");

  issueCounter.innerText = issueContainer.children.length;
}

document.getElementById("search-btn").
  addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("search-input");
    const searched = input.value.trim().toLowerCase();

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searched}`;

    fetch(url)
      .then((res) => res.json())
      .then((issues) => {
        removeActive();
        showAllIssue(issues.data);
        totalStat();
      });

  });

document.getElementById("search-btn-device").
  addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("search-input-device");
    const searched = input.value.trim().toLowerCase();

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searched}`;

    fetch(url)
      .then((res) => res.json())
      .then((issues) => {
        removeActive();
        showAllIssue(issues.data);
        totalStat();
      });
    
    totalStat();
  });

  const fetchIssueDetail = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    

    fetch(url)
      .then((res) => res.json())
      .then((cards) => showIssueDetail(cards.data));
  }

  const showIssueDetail = (detail) => {
  const detailContainer = document.getElementById("details-container");

  let badgeClass = "bg-[#fde9e9] text-[#ff2d2d]";
    
  if (detail.priority === "medium"){
    badgeClass = "bg-[#fff6d1] text-[#F59E0B]";
  }
  else if (detail.priority === "low") {
    badgeClass = "bg-[#eeeff2] text-[#9CA3AF]";
  }
  else {
    badgeClass = "bg-[#fde9e9] text-[#ff2d2d]";
  }

  let statusClass = "bg-[#00a96e] text-[white]";

  if (detail.status === "closed") {
    statusClass = "bg-[#ad46ff] text-[white]"
  }
  else {
    statusClass = "bg-[#00a96e] text-[white]";
  }

  detailContainer.innerHTML = `
    <div>
          <h2 class="text-3xl font-bold mb-3">${detail.title}</h2>

          <div class="flex gap-1 items-center">
            <a class="text-xs px-3 py-1 rounded-full w-fit ${statusClass} font-semibold">${detail.status}</a>
            <p class="text-[#64748B] text-xs">&#183; ${detail.status} by ${detail.author}</p>
            <p class="text-[#64748B] text-xs">&#183;   ${detail.createdAt}</p>
          </div>

          <div class="flex items-center gap-2 mt-4 mb-4">
            ${createBtn(detail.labels)}
          </div>

          <p class="text-[#64748B] mb-6">
            The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.
          </p>

          <div class="rounded-lg p-4 bg-[#f8fafc] flex gap-25 items-center">
            <div>
              <h2 class="text-[#64748B] font-light">Assignee:</h2>
              <h2 class="font-semibold">${detail.assignee}</h2>
            </div>
            <div>
              <h2 class="text-[#64748B] font-light mb-1">Priority:</h2>
              <a class="px-3 py-1 rounded-full w-fit ${badgeClass} font-medium">${detail.priority}</a>
            </div>
          </div> 
    </div>
  `;

  document.getElementById("word_modal").showModal();
  }


loadAllIssue();
totalStat();

