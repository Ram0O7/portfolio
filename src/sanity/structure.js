export const structure = (S) =>
  S.list()
    .title("Writing desk")
    .items([
      S.documentTypeListItem("blog").title("Blog articles"),
      S.documentTypeListItem("project").title("Projects"),
      S.divider(),
      S.documentTypeListItem("post").title("Other posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
    ]);
