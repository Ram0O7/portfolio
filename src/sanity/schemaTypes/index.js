import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { blogType } from "./blogType";
import { projectType } from "./projectType";
export const schema = {
  types: [
    blogType,
    projectType,
    blockContentType,
    postType,
    categoryType,
    authorType,
  ],
};
