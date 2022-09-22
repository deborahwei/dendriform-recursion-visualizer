import { setAttributes } from "../utilities/util"

export default class NavBar {
    constructor() { 
        this.navArea = document.createElement('div')
        this.navArea.classList.add('nav-area')

        this.topNav = document.createElement('div')
        this.navArea.appendChild(this.topNav)
        this.topNav.classList.add('top-nav')
        
        const title = document.createElement('h1')
        title.textContent = "DENDRIFORM"
        this.topNav.appendChild(title)
        
        const subheading = document.createElement('h3')
        subheading.textContent = "a recursion visualizer"
        this.topNav.appendChild(subheading)

        const description = document.createElement('h3')
        description.textContent = "/ˈdendrəˌfôrm/ : having the shape or form of a tree"
        this.navArea.appendChild(description)

        this.socials = document.createElement('div')
        this.socials.classList.add('socials')
        this.navArea.appendChild(this.socials)
        this.createSocials()
    }

    createSocials() {  
        const angelList = document.createElement('i')
        angelList.classList.add("fa-brands", "fa-angellist", "fa-2xl")
        this.socials.appendChild(angelList)
        setAttributes(angelList, {
            title: 'AngelList'
        })
        angelList.addEventListener("click", () => {
            window.open("https://angel.co/u/deborahwei")
        })

        const linkedIn = document.createElement('i')
        linkedIn.classList.add("fa-brands", "fa-linkedin", "fa-2xl")
        this.socials.appendChild(linkedIn)
        setAttributes(linkedIn, {
            title: 'LinkedIn'
        })
        linkedIn.addEventListener("click", () => {
            window.open("https://www.linkedin.com/in/deborah-wei-163b10152/")
        })

        const personalSite = document.createElement('img')
        personalSite.src = "assets/images/tree.png"
        setAttributes(personalSite, {
            title: 'Personal Site'
        })
        this.socials.appendChild(personalSite)
        personalSite.addEventListener("click", () => {
            window.open("https://deborahwei.dev/")
        })

        const gitHub = document.createElement('i')
        gitHub.classList.add("fa-brands", "fa-github-square", "fa-2xl")
        this.socials.appendChild(gitHub)
        setAttributes(gitHub, {
            title: 'Github'
        })
        gitHub.addEventListener("click", () => {
            window.open("https://github.com/deborahwei/dendriform")
        })

        const personalSite2 = document.createElement('i')
        personalSite2.classList.add("fa-solid", "fa-user", "fa-xl")
        this.socials.appendChild(personalSite2)
        setAttributes(personalSite2, {
            title: 'Personal Site'
        })
        personalSite2.addEventListener("click", () => {
            window.open("https://deborahwei.dev/")
        })

    }

    getDOMObject() { 
        return this.navArea
    }
}