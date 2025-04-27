export interface Post {
    title: string;
    content: string;
    _id: number;
    authorName: string;
    createdAt: Date;
    imagePaths: string[];
    comments: string;
    ratings: number;
    category: {
      id: string;   // ID of the category
      name: string; // Name of the category
    };
  }