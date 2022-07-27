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
        const linkedIn = document.createElement('i')
        linkedIn.classList.add("fa-brands", "fa-linkedin", "fa-2xl")
        this.socials.appendChild(linkedIn)
        linkedIn.addEventListener("click", () => {
            window.open("https://www.linkedin.com/in/deborah-wei-163b10152/")
        })

        const personalSite = document.createElement('img')
        personalSite.src = "assets/images/tree.png"
        this.socials.appendChild(personalSite)
        personalSite.addEventListener("click", () => {
            window.open("")
        })

        const gitHub = document.createElement('i')
        gitHub.classList.add("fa-brands", "fa-github-square", "fa-2xl")
        this.socials.appendChild(gitHub)
        gitHub.addEventListener("click", () => {
            window.open("https://github.com/deborahwei/dendriform")
        })

    }

    getDOMObject() { 
        return this.navArea
    }
}