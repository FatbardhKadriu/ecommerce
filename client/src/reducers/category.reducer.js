import { categoryConstants } from "../actions/constants";

const INITIAL_STATE = {
    categories: [],
    loading:    false,
    error:      null
};

// const buildNewCategories = (parentId, categories, category) => {
//     let myCategories = []

//     if (parentId == undefined) {
//         return [
//             ...categories,
//             {
//                 _id: category._id,
//                 name: category.name,
//                 slug: category.slug,
//                 children: []
//             }
//         ]
//     }

//     for (const cat of categories) {

//         if (cat._id == parentId) {
//             myCategories.push({
//                 ...cat,
//                 children: cat.children ? buildNewCategories(parentId, [...cat.children, {
//                     _id: category._id,
//                     name: category.name,
//                     slug: category.slug,
//                     parentId: category.parentId,
//                     children: category.children
//                 }], category) : []
//             })    
//         } 
//         else {
//             myCategories.push({
//                 ...cat,
//                 children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
//             })    
//         }

//     }

//     return myCategories
// }
 
const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            return { 
                ...state,
                categories: action.payload.categories
            }
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            return { 
                ...state
            }
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            return {
                ...state
            }     
        default:
            return state
    }
}

export default categoryReducer