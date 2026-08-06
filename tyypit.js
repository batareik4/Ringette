class Tapahtuma {
    constructor(title, description, startDate, endDate, imageUrl, link, category, location, coordinatesLink, id = -1) {
        this.id = id
        this.title = title
        this.description = description
        this.startDate = startDate
        this.endDate = endDate
        this.imageUrl = imageUrl
        this.link = link
        this.category = category
        this.location = location
        this.coordinatesLink = coordinatesLink
    }
}