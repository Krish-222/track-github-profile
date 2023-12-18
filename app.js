// const url="https://api.github.com/users/"

// fetch("https://api.github.com/users/anshuopinion").then(response=>response.json()).then(result=>{console.log(result)}).catch(err=>{console.log("Error....")})

const searchButton = document.querySelector(".search-button")
const profilePage = document.querySelector(".profile-page")
const searchArea = document.querySelector(".search-area")
const container = document.querySelector(".root")

// const profilePage=document.querySelector(".profile-page")
async function fetchGithubProfile() {
    // const searchArea=document.querySelector(".search-area")
    const response = await fetch(`https://api.github.com/users/${searchArea.value.toLowerCase()}`)
    console.log(response)
    const result = await response.json();
    console.log(result)
    return result
}
searchButton.addEventListener("click", () => {
    // const searchArea=document.querySelector(".search-area");
    if (searchArea.value == '') {
        return alert("please-write-something")
    }
    else {
        fetchGithubProfile().then(result => {
            console.log(result)

            if (result.login == undefined) {
                container.innerHTML = `
            <div><h3 class="error"> Profile Not Found</h3></div>
                                 `
            }
            else {
                container.innerHTML = `
            <div class="profile-page">
            <div class="top">
                <div class="profile-top-left">
                    <img src="${result.avatar_url}" class="user-image">
                    <h4 class="username">${result.name}
                        <div>@${searchArea.value}</div>
                    </h4>
                </div>
                <div class="profile-top-right">
                    <button><a href="${result.html_url}">Check Profile</a></button>
                </div>
            </div>
            <div class="about">${result.bio}</div>
            <div class="status">
                <div class="followers">Followers<div>${result.followers}</div></div>
                <div class="repos">Repositories<div>${result.public_repos}</div></div>
                <div class="following">Following<div>${result.following}</div></div>

            </div>
        </div>`
            }
            
        }).catch(err => { console.log("Page Not Found") })
    }
})
