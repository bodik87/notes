export interface IChapter {
  id: string;
  chapterTitle: string;
}

export interface IFolder {
  id: string;
  folderTitle: string;
  chapterId: string;
}

export type LinkType = { id: string; type: "link"; title: string; url: string };

export interface IArticle {
  id: string;
  articleBody: string;
  folderId: string;
  links?: LinkType[];
}

export interface IQuickNote {
  id: string;
  quickNoteBody: string;
}

export interface IPinnedNote {
  pinnedNoteBody: string;
}

export interface IUser {
  name: string;
  password: string;
}

export interface ISnippet {
  id: string;
  body: string;
}

export interface ITodo {
  id: string;
  todoBody: string;
  isCompleted: boolean;
}
