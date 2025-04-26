import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  imagePaths?: string[];
}

const ManagePosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "", // Store category name, not ID
    tags: [] as string[], // Store tags by name
    images: [] as File[],
  });

  interface Category {
    _id: string;
    name: string;
  }

  interface Tag {
    _id: string;
    name: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch posts, categories, and tags
  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3000/api/post");
    const fetchedPosts = Array.isArray(res.data) ? res.data : res.data.posts;
    setPosts(fetchedPosts || []);
  };

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:3000/api/categories");
    setCategories(res.data.categories || []);
  };

  const fetchTags = async () => {
    const res = await axios.get("http://localhost:3000/api/tags");
    setTags(res.data.tags || []);
  };

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle file changes (images)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setForm(prev => ({ ...prev, images: Array.from(files) }));
    }
  };

  // Handle multiple tag selection
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setForm(prev => ({ ...prev, tags: selectedOptions }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category); // Use category name here
    form.tags.forEach((tag) => {
      formData.append("tags", tag); // Use tag name here
    });
    form.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      if (editingPostId) {
        await axios.put(`http://localhost:3000/api/post/${editingPostId}`, form);
        setEditingPostId(null);
      } else {
        await axios.post("http://localhost:3000/api/post/", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        });
      }
      setForm({ title: "", content: "", category: "", tags: [], images: [] });
      fetchPosts();
      setShowForm(false);

      toast.success(
        editingPostId ? "Post updated successfully!" : "Post created successfully!",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Handle post edit
  const handleEdit = (post: Post) => {
    setForm({
      title: post.title,
      content: post.content,
      category: post.category,  // Set category name directly
      tags: post.tags,  // Set tags names directly
      images: [],
    });
    setEditingPostId(post._id);
    setShowForm(true);
  };

  // Handle post delete
  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/post/${id}`);
    fetchPosts();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-500">Add Blog Post</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          {showForm ? "Cancel" : "Add New Post"}
        </button>
      </div>

      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="content"
            placeholder="Post Content"
            value={form.content}
            onChange={handleChange}
            className="w-full border p-2 rounded h-32"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            multiple
            name="tags"
            value={form.tags}
            onChange={handleTagChange}
            className="w-full border p-2 rounded"
          >
            {tags.map((tag) => (
              <option key={tag._id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            {editingPostId ? "Update Post" : "Create Post"}
          </button>
        </motion.form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow-md space-y-2">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
            <p className="text-sm text-gray-400">{post.category}</p>
            <div className="flex space-x-2 mt-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(post)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePosts;
