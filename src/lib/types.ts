export interface IChapter {
  id: string;
  chapterTitle: string;
}

export interface IFolder {
  id: string;
  folderTitle: string;
  chapterId: string;
}

export interface IArticle {
  id: string;
  articleBody: string;
  folderId: string;
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

export interface ITextToCopy {
  id: string;
  textToCopy: string;
}

export interface ITodo {
  id: string;
  todoBody: string;
  isCompleted: boolean;
}
