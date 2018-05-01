import ArticleCompare from "../modules/article-compare";

const CLASS_SLIDER = 'article-compare';

class ArticleCompareController {
  init() {
    const articleCompares = Array.from(document.querySelectorAll(`.${CLASS_SLIDER}`));
    articleCompares.forEach((ac) => new ArticleCompare({
      wrapper: ac,
    }));
  }
}

export const articleCompareController = new ArticleCompareController();
