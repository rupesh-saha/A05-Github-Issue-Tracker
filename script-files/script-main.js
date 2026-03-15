
const loadAllIssue = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((issues) => {
      showAllIssue(issues.data);
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
    
    <div class="bg-base-100 h-[100%] rounded p-6 border-t-4 ${issue.status === "closed" ? 'border-purple-500' : 'border-emerald-500' }">

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

loadAllIssue();