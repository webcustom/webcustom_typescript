



// export type ProjectsType = {
//     anons_img: string
//     id: number
//     link: string
//     slug: string
//     title: string
// }

export interface ProjectType{
    id: number
    title: string
    slug: string
    link: string
    anons_img: string
}

export type ProjectDetailType = {
    detail_img: string
    gallery_imgs: ProjectDetailGallery
    link: string
    title: string
}

export interface ProjectDetailGallery{
    bigsize: Array<string>
    fullsize: Array<string>
    miniature: Array<string>
}


export type FormType = {
    yourname: string
    youremail: string
    yourmessage: string
}