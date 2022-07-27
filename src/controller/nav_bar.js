export default class NavBar {
    constructor() { 
        this.navArea = document.createElement('div')
        this.navArea.classList.add('nav-area')
        
        const title = document.createElement('h1')
        title.textContent = "DENDRIFORM"
        this.navArea.appendChild(title)

        const name = document.createElement('h2')
        name.textContent = "Deborah Wei "
        this.navArea.appendChild(name)

        this.socials = document.createElement('div')
        this.socials.classList.add('socials')
        this.navArea.appendChild(this.socials)
        this.createSocials()
    }

    createSocials() { 
        const linkedIn = document.createElement('i')
        linkedIn.classList.add("fa-brands", "fa-linkedin", "fa-2xl")
        this.socials.appendChild(linkedIn)

        const gitHub = document.createElement('i')
        gitHub.classList.add("fa-brands", "fa-github-square", "fa-2xl")
        this.socials.appendChild(gitHub)
    }

    getDOMObject() { 
        return this.navArea
    }
}